// selecting all required elements
const selectbox = document.querySelector(".select-box"),
    selectXbtn = selectbox.querySelector(".playerX"),
    selectObtn = selectbox.querySelector(".playerO"),
    playBoard = document.querySelector(".play-board"),
    allBox = document.querySelectorAll("section span"),
    players = document.querySelector(".players"),
    resultBox = document.querySelector(".result-box"),
    wontext = document.querySelector(".won-text"),
    replayBtn = document.querySelector(".btn");

window.onclick = () => {

    for (var i = 0; i < allBox.length; i++) {//adding onclick attribute to all available section's span
        allBox[i].setAttribute("onclick", "clickedbox(this)");
    }
}
selectXbtn.onclick = () => {
    selectbox.classList.add("hide");
    playBoard.classList.add("show");

}
selectObtn.onclick = () => {
    selectbox.classList.add("hide");
    playBoard.classList.add("show");
    players.setAttribute("class", "players active player");
}

let playerXicon = "fa-solid fa-xmark";
let playerOicon = "fa-regular fa-circle";
let playerSign = "X"; //let's assume user is player X
let runbot = true;

// user click function
function clickedbox(element) {
    // console.log(element);
    if (players.classList.contains("player")) {
        playerSign = "O";
        element.innerHTML = `<i class="${playerOicon}"></i>`; // adding circle font
        players.classList.remove("active");
        //when player selects O then we will update playerSign as O
        element.setAttribute("id", playerSign);
    }
    else {
        element.innerHTML = `<i class="${playerXicon}"></i>`; //adding cross font
        players.classList.add("active");
        // we will set the id of user span as X
        element.setAttribute("id", playerSign);

    }
    selectwinner();
    playBoard.style.pointerEvents = "none";
    element.style.pointerEvents = "none"; //a single box can't be selected multiple times by the user
    let timedelay = ((Math.random() * 1000) + 200).toFixed();
    setTimeout(() => {
        bot(runbot);
    }, timedelay);
}

// bot click function
// if by default user select player X then bot should select id=O

function bot(runbot) {
    if (runbot) {
        playerSign = "O";
        let array = []; //empty array for adding unselected span
        for (let i = 0; i < allBox.length; i++) {
            if (allBox[i].childElementCount == 0) { //childElementCount will read the no of unselected spans in section
                array.push(i);
                // console.log(i + "has no child");
            }
        }

        let randomno = array[Math.floor(Math.random() * array.length)];
        // console.log(randomno);
        if (array.length > 0) {

            if (players.classList.contains("player")) {
                allBox[randomno].innerHTML = `<i class="${playerXicon}"></i>`; // adding cross font
                players.classList.add("active");
                //when player selects O then the bot will select X
                playerSign = "X";
                allBox[randomno].setAttribute("id", playerSign);
            }
            else {
                allBox[randomno].innerHTML = `<i class="${playerOicon}"></i>`; //adding circle font
                players.classList.remove("active");
                allBox[randomno].setAttribute("id", playerSign);
            }
            selectwinner();
            allBox[randomno].style.pointerEvents = "none";
            playBoard.style.pointerEvents = "auto";
            playerSign = "X";
        }

    }


}


// checking the winner

function getClassname(idname) {
    return document.querySelector(".box" + idname).id;
}

function checkId(val1, val2, val3, sign) {
    if (getClassname(val1) == sign && getClassname(val2) == sign && getClassname(val3) == sign) {
        return true;
    }
}

function selectwinner() {
    if (checkId(1, 2, 3, playerSign) || checkId(4, 5, 6, playerSign) || checkId(7, 8, 9, playerSign) || checkId(1, 4, 7, playerSign) || checkId(2, 5, 8, playerSign) || checkId(3, 6, 9, playerSign) || checkId(1, 5, 9, playerSign) || checkId(3, 5, 7, playerSign)) {
        console.log(playerSign + " " + "is the winner!!");
        // once the match is found the bot should be stopped
        runbot = false;
        bot(runbot);

        setTimeout(() => {
            playBoard.classList.remove("show");
            resultBox.classList.add("show");
        }, 700);

        wontext.innerHTML = `Player<p>${playerSign}</p> won the game!`;
    }
    else {
        // when the match is draw
        // for that we have to check whether all the span has id and if no one won the game, we will draw the match
        if (getClassname(1) != "" && getClassname(2) != "" && getClassname(3) != "" && getClassname(4) != "" && getClassname(5) != "" && getClassname(6) != "" && getClassname(7) != "" && getClassname(8) != "" && getClassname(9) != "") {
            runbot = false;
            bot(runbot);

            setTimeout(() => {
                playBoard.classList.remove("show");
                resultBox.classList.add("show");
            }, 700);

            wontext.textContent = "Match Has Drawn!";
        }
    }
}
replayBtn.onclick = () => {
    window.location.reload(); //reloads the currents page when the button is clicked
}
