
const before = document.getElementById('outer-container');

function gameOverScreen() {
    let div = document.createElement('div');
    div.id = 'game-over';
    div.style.position = 'absolute';
    div.style.width = 100 + 'vw';
    div.style.height = 100 + 'vh';
    div.style.backgroundColor = 'hsl(0, 100%, 0%, .8)';
    div.style.fontFamily = 'helvetica';
    div.style.fontSize = '50px';
    div.style.color = 'white';
    div.style.textAlign = 'center';
    div.style.marginTop = '-10px';
    div.style.minWidth = '500px';
    div.innerHTML = `<p>GAME OVER</p>
                    <br>
                    <p>Final score</p>
                    <br>
                    <p>${score}</p>`;
    let button = document.createElement('button');
    button.id = 'restart-button';
    button.textContent = 'Restart';
    button.style.fontSize = '25px';
    button.onclick = function() {
        resetStats();
        gameOver = false;
        gameBoard = [];
        initGameBoard();
        currentTetromino = createTet(Math.floor(Math.random() * 7));
        drawBoard();
        main();
        document.body.removeChild(document.getElementById('game-over'));
        
    }
    div.append(button);

    return div;
}

//document.body.insertBefore(gameOverScreen(),before);



