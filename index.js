const bombs = [];
let gamePoints = 0;
var canPlay = true;


function updateGamePoints() {
    
    const gamePointsElement = document.getElementById("gamePoints");
   
    gamePointsElement.innerHTML = "Game Points: "+gamePoints;
}

function addGrid() {
    const appElement = document.getElementById("app");
    for(let i=0; i<9; i++) {
        const row = document.createElement("div");
        for(let j=0; j<9; j++) {
            const index = i*9 + j;
            const column = document.createElement("div");
            column.style.display = "inline-block";
            column.style.width = "60px";
            column.style.height = "60px";
            column.style.border = "1px solid black";
            column.style.textAlign = "center";
            column.style.verticalAlign = "middle";
            column.setAttribute("index", index);

            //click event on column
            column.addEventListener("click", function() {
                //console.log("inside click event listener");
                if(canPlay) {
                    //console.log("inside canPlay if");
                    if(bombs.includes(index)) {
                        column.style.background = "url('clicked-bomb.jpg') no-repeat center";
                        column.style.backgroundSize = "60px 60px";
                        canPlay = false;
                        showAllBombs(index);
                        updateGamePoints();
                        gameOver();
                    }
                    else {
                        column.style.background = "green";
                        gamePoints++;
                        updateGamePoints();
                        if(gamePoints == 71) {
                            youWon();
                        }
                    }
                }
               
            });
            
            row.appendChild(column);
        }
        appElement.appendChild(row);
    }
    appElement.style.justifyContent = "center";
}

function youWon() {
    const gameOverElement = document.getElementById("game-over");
    gameOverElement.innerHTML = "You Won";
    const restartButton = document.getElementById("restart-game");
    restartButton.style.visibility = "visible";
}

function gameOver() {
    const gameOverElement = document.getElementById("game-over");
    gameOverElement.innerHTML = "Game Over";
    const restartButton = document.getElementById("restart-game");
    restartButton.style.visibility = "visible";
}

function restartGame() {
    canPlay = true;
    gamePoints = 0;
    updateGamePoints();
    const gameOverElement = document.getElementById("game-over");
    gameOverElement.innerHTML = "";
    const restartButton = document.getElementById("restart-game");
    restartButton.style.visibility = "hidden";
    //clear grid
    const appElement = document.getElementById("app");
    appElement.innerHTML = "";
    bombs.length = 0;

    //add new grid
    generateBombs();
    console.log(bombs);
    addGrid();
}

function showAllBombs(clickedBombIndex) {
   //show all bombs
   for(let i=0; i<9; i++) {
       for(let j=0; j<9; j++) {
           let index = i*9 + j;
           const columnWithBomb = document.querySelector("[index="+'"'+index+'"'+"]");
           const anyColumn = columnWithBomb.getAttribute("index");
           if(bombs.includes(parseInt(anyColumn)) && parseInt(anyColumn) != clickedBombIndex) {
                columnWithBomb.style.background = "url('bomb-inside.png') no-repeat center";
                columnWithBomb.style.backgroundSize = "55px 55px";
           }
       }
   }
   //show all bombs
}

function generateBombs() {
    while(bombs.length != 10) {
        const randomNum = Math.floor(Math.random()*100);
        if(randomNum < 81 && !bombs.includes(randomNum)) {
            bombs.push(randomNum);
        }
    }
    
}

addGrid();
generateBombs();
console.log(bombs);