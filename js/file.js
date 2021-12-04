let container = document.querySelector("#container");
let dino = document.querySelector("#dino");
let dinoimg = document.querySelector("#dinoimg");
let block = document.querySelector("#block");
let road = document.querySelector("#road");
let cloud = document.querySelector("#cloud");
let score = document.querySelector("#score");
let highscore = document.querySelector("#highscore");
let gameOver = document.querySelector("#gameOver");

let interval = null;
let started = false
let playerScore = 0;
let playerHscore = 0;

let jumpsound = new Audio()
jumpsound.src="jump.mp3"

if (localStorage.getItem('highscore')) {
    playerHscore = localStorage.getItem('highscore');
    highscore.innerHTML = `HighScore <b>${playerHscore}</b>`;
}


//function for score
let scoreCounter = () => {
    playerScore++;
    score.innerHTML = `Score <b>${playerScore}</b>`;
    highscore.innerHTML = `HighScore <b>${playerHscore}</b>`;
    if (playerScore > playerHscore) {
        playerHscore = playerScore;
        highscore.innerHTML = `HighScore <b>${playerHscore}</b>`;
    }
    window.localStorage.setItem('highscore', playerHscore);
}


//start Game
window.addEventListener("keydown", e => {
    if (e.code === "Space" || e.code === "ArrowUp") {
        gameOver.style.display = "none";
        block.classList.add("blockActive");
        cloud.firstElementChild.style.animation = "cloudAnimate 50s linear infinite";
        document.querySelector('#mario').play();

        
        if (!started) interval = setInterval(scoreCounter, 200);
        started = true;
    }
});


//jump
window.addEventListener("keydown", e => {
    if (e.code === "Space" || e.code === "ArrowUp") {
        jumpsound.currentTime = 0;
        jumpsound.play()
        if (dino.classList != "dinoActive") {
            dino.classList.add("dinoActive");
            //                remove class after 0.5 seconds
            setTimeout(() => {
                dino.classList.remove("dinoActive");
            }, 500);
        }
    }    
});


//'Game Over' if 'Character' hit The 'Block' 
let result = setInterval(() => {
    let dinoBottom = parseInt(getComputedStyle(dino).getPropertyValue("bottom"));

    let blockLeft = parseInt(getComputedStyle(block).getPropertyValue("left"));

    if (dinoBottom <= 90 && blockLeft >= 20 && blockLeft <= 145) {

        gameOver.style.display = "block";
        block.classList.remove("blockActive");
        road.firstElementChild.style.animation = "none";
        cloud.firstElementChild.style.animation = "none";
        clearInterval(interval);
        document.querySelector('#mario').pause();
        document.querySelector('#mario').currentTime = 0;
        playerScore = 0;
        started = false;
    }
}, 10);
