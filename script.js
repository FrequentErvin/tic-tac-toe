let turn = "player";
let isOver = false;
const cellList = document.querySelectorAll(".cell");
const cells = Array.from(cellList);
for(let i = 0; i < 9; i++){
    cells[i].addEventListener("click", function(){
        if(turn === "player") Gameboard.setSignForPlayer(cells[i],i);
    });
}

const Gameboard  = (() => {
    let gameboard = [null,null,null,null,null,null,null,null,null];
    let totalX = [];
    let totalO = [];
    let isItStalemate = null;
    const resetGameBoard = () => {
        console.log("RESET GRID ");
        gameboard = [null,null,null,null,null,null,null,null,null];
        Gameboard.gameboard = [null,null,null,null,null,null,null,null,null];
        cells.forEach((cell) => cell.textContent = "");
        totalX = [];
        totalO = [];
        turn = "player";
        isItStalemate = null;
        isOver = false;
    }
    const setSignForPlayer = (cell,i) =>{
        if(gameboard[i] !== null) return;
        cell.textContent = "X";
        cell.classList.add("proper-size");
        gameboard[i] = "X";
        Gameboard.gameboard[i] = "X";
        totalX.push(i);
        turn = "bot";
        console.log("ODIGRAO SAM JA: " + i);
        checkWinner();
        if(isOver == false) Bot.easyBot(); 
    }
    const setSignForBot = (randomMove) => {
        if(turn !== "bot") return;
        if(randomMove === undefined) return;
        const allGameCards = document.querySelectorAll('.cell');
        allGameCards[randomMove].textContent = "O"
        allGameCards[randomMove].classList.add('proper-size')
        gameboard[randomMove] = "O";
        Gameboard.gameboard[randomMove] = "O";
        totalO.push(randomMove);
        turn = "player";
        checkWinner();
    }
    const checkWinner = () => {
        const winningMoves = 
            [[0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]];
        winningMoves.forEach(el => {
            if(isOver == true) return;
            let countPlayer = [];
            let countBot = [];
            
            el.forEach(num => {
                console.log("TRENUTNI NUM " + num);
                if(isOver === true) return;
                if(totalX.includes(num)) {
                    console.log("TOTALX sadrzi " + num);
                    countPlayer.push(num)
                    if(countPlayer.length === 3) {
                        isItStalemate = false, isOver = true;
                        console.log("GAME ENDED");
                        return roundOver("player", el)
                    }
                }
                if(totalO.includes(num)) {
                    countBot.push(num)
                    if(countBot.length === 3) {
                        isItStalemate = false, isOver = true;
                        console.log("GAME ENDED");
                        return roundOver("bot", el)
                        
                    }
                }
            })
            if(totalX.length + totalO.length == 9 && isOver == false){
                console.log("TOTALX" + totalX); 
                console.log("TOTALO" + totalO); 
                isOver = true; 
                return roundOver("tie");
            }
        });
    }
    const roundOver = (...args) => {
        console.log("GAME ENDED " + args[0]);
        if(args[0] === "player"){
            console.log("You win!");
        }else if(args[0] === "bot"){
            console.log("Bot wins!");
        }else{
            console.log("TIE GAME!");
        }
        setTimeout(resetGameBoard, 2000);
    }
    return {resetGameBoard, setSignForBot, setSignForPlayer, gameboard}
})();
const Bot = (() => {
    const availableMoves = () => {
        const possibleMoves = [];
        Gameboard.gameboard.filter((el, i) => {
            if(el === null) {
                possibleMoves.push(i)
            }
        }) 
        const randomMove = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
        console.log(possibleMoves);
        return {possibleMoves, randomMove};
    }
    const easyBot = () => {
        Gameboard.setSignForBot(availableMoves().randomMove);
    } 
    return {easyBot}
})()
const restartButton = document.querySelector(".restart");
restartButton.addEventListener("click", Gameboard.resetGameBoard);