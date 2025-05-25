let myRock = document.getElementById("myRock");
let myPaper = document.getElementById("myPaper");
let myScissor = document.getElementById("myScissor");
let gameResult = document.getElementById("gameResult");
let resetScore = document.getElementById("resetScore");

let score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0,
    ties: 0
};

updateScoreDisplay();

function playGame(playerMove) {
    const options = ["rock", "paper", "scissor"];
    const computerMove = options[Math.floor(Math.random() * 3)];
    let result;

    if (computerMove === playerMove) {
        result = "Tie";
        score.ties += 1;
    } else if (
        (playerMove === "rock" && computerMove === "scissor") ||
        (playerMove === "paper" && computerMove === "rock") ||
        (playerMove === "scissor" && computerMove === "paper")
    ) {
        result = "You win 🎉";
        score.wins += 1;
    } else {
        result = "You lose 🥲";
        score.losses += 1;
    }

    localStorage.setItem('score', JSON.stringify(score));
    updateScoreDisplay(playerMove, computerMove, result);
}

function updateScoreDisplay(playerMove = '', computerMove = '', result = '') {
    gameResult.innerHTML = result
        ? `Your move: ${playerMove}<br>Computer's move: ${computerMove}<br>Result: ${result}<br><br>Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`
        : `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

myRock.onclick = () => playGame("rock");
myPaper.onclick = () => playGame("paper");
myScissor.onclick = () => playGame("scissor");
resetScore.onclick = () => {
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;
    localStorage.setItem('score', JSON.stringify(score));
    updateScoreDisplay();
};