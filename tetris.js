
const scoreBoard = document.getElementById('score-board');



const gameBoardCanvas = document.getElementById('game-area');
const ctx = gameBoardCanvas.getContext('2d');

const nextBlockScreen = document.getElementById('next-block');
const nctx = nextBlockScreen.getContext('2d');


function setupCanvas(canvas,ctx) {
    let scale = window.devicePixelRatio;
    canvas.style.width = canvas.width + 'px';
    canvas.style.height = canvas.height + 'px';
    canvas.style.position = 'absolute';
    canvas.width = Math.floor(canvas.width*scale);
    canvas.height = Math.floor(canvas.height*scale);
    ctx.scale(scale,scale);
    return canvas;
}
gbWidth = gameBoardCanvas.clientWidth;
gbHeight = gameBoardCanvas.clientHeight;

nbWidth = nextBlockScreen.clientWidth;
nbheight = nextBlockScreen.clientHeight;
setupCanvas(gameBoardCanvas,ctx);
setupCanvas(nextBlockScreen,nctx);




const Z = [
    [[1,1,0],[0,1,1],[0,0,0]],
    [[0,0,1],[0,1,1],[0,1,0]],
    [[0,0,0],[1,1,0],[0,1,1]],
    [[0,1,0],[1,1,0],[1,0,0]]
];
const S = [
    [[0,1,1],[1,1,0],[0,0,0]],
    [[0,1,0],[0,1,1],[0,0,1]],
    [[0,0,0],[0,1,1],[1,1,0]],
    [[1,0,0],[1,1,0],[0,1,0]]
];
const J = [
    [[0,1,0],[0,1,0],[1,1,0]],
    [[1,0,0],[1,1,1],[0,0,0]],
    [[0,1,1],[0,1,0],[0,1,0]],
    [[0,0,0],[1,1,1],[0,0,1]]
];
const L = [
    [[0,1,0],[0,1,0],[0,1,1]],
    [[0,0,0],[1,1,1],[1,0,0]],
    [[1,1,0],[0,1,0],[0,1,0]],
    [[0,0,1],[1,1,1],[0,0,0]]
];
const T = [
    [[0,0,0],[1,1,1],[0,1,0]],
    [[0,1,0],[1,1,0],[0,1,0]],
    [[0,1,0],[1,1,1],[0,0,0]],
    [[0,1,0],[0,1,1],[0,1,0]]
];
const I = [
    [[0,1,0,0],[0,1,0,0],[0,1,0,0],[0,1,0,0]],
    [[0,0,0,0],[1,1,1,1],[0,0,0,0],[0,0,0,0]],
    [[0,0,1,0],[0,0,1,0],[0,0,1,0],[0,0,1,0]],
    [[0,0,0,0],[0,0,0,0],[1,1,1,1],[0,0,0,0]]
];
const O = [
    [[0,0,0,0],[0,1,1,0],[0,1,1,0],[0,0,0,0]],
    [[0,0,0,0],[0,1,1,0],[0,1,1,0],[0,0,0,0]],
    [[0,0,0,0],[0,1,1,0],[0,1,1,0],[0,0,0,0]],
    [[0,0,0,0],[0,1,1,0],[0,1,1,0],[0,0,0,0]]
];
const TETROMINOS = [[Z,'red'],
                    [S,'green'],
                    [J,'blue'],
                    [L,'yellow'],
                    [T,'orange'],
                    [I,'cyan'],
                    [O,'magenta']];
/*

const S = [
    [[0,0,0],[0,0,0],[0,0,0]],
    [[0,0,0],[0,0,0],[0,0,0]],
    [[0,0,0],[0,0,0],[0,0,0]],
    [[0,0,0],[0,0,0],[0,0,0]]
];
*/

var gameBoard = [];
const ROWS = 20;
const COLUMNS = 10;
const EMPTY = 'white';
const GRIDSTYLE = 'gray';
const CS = 30;
var score = 0;
var gameOver = false;


scoreBoard.innerHTML = `<p>Score<br></br>${score}<\p>`





for(let r = 0; r < ROWS; r++) {
    gameBoard[r] = [];
    for(let c = 0; c < COLUMNS; c++) {
        gameBoard[r][c] = EMPTY;
    }
}

function drawBoard() {
	for(let c = 0; c < COLUMNS; c++) {
		for(let r = 0; r < ROWS; r++) {
			ctx.beginPath();
			ctx.rect(c*30,r*30,30,30);
			ctx.fillStyle = gameBoard[r][c];
			ctx.fill();
			ctx.lineWidth = 1;
            ctx.strokeStyle = GRIDSTYLE;
			ctx.stroke();
            
		}
	}
}

function createTet(next) {
    return new Tetromino(TETROMINOS[next][0],0,TETROMINOS[next][1]);
}

currentTetromino = createTet(Math.floor(Math.random() * TETROMINOS.length),ctx);



function checkBoard() {

	let columnCount = 0;
	let breakRow = 0;
	let breakCount = 0;


    

	for(let r = 0; r < ROWS; r++) {
		for(let c = 0; c < COLUMNS; c++) {
			if(gameBoard[r][c] !== EMPTY) {
                
				columnCount++;
			}
		}

		if(columnCount >= COLUMNS) {
			breakRow = r;
			breakCount++;
			for(let c = 0; c < COLUMNS; c++) {
				gameBoard[r][c] = EMPTY;
			}
		}
		columnCount = 0;
	}
	//console.log('breakRow:',breakRow,'breakCount',breakCount);
	//console.log(breakRow-breakCount);
	shiftBoard(breakRow-breakCount,breakCount);
    if(breakCount===1) {
        score+=40;
    }else if (breakCount===2) {
        score+=100;
    }else if (breakCount===3) {
        score+=300;
    }else if (breakCount===4) {
        score+=1200;
    }

    scoreBoard.innerHTML = `<p>Score<br></br>${score}<\p>`
    
	
}
function shiftBoard(end,rows) {
	let temp = EMPTY;
	for(let r = end; r > 0; r--) {
			for(let c = 0; c < COLUMNS; c++) {
				temp = gameBoard[r][c];
				gameBoard[r+rows][c] = temp;
	
			}
		}
}

function drawBlock(x,y,color,ctx) {
    ctx.beginPath();
    ctx.rect(x*CS,y*CS,30,30);
    ctx.fillStyle = color;
    ctx.lineWidth = 2;
    ctx.fill();
    ctx.strokeStyle = 'black';
    ctx.stroke();
}

function displayNextBlock(next) {
    nctx.clearRect(0,0,nbWidth,nbheight);
    let tet = TETROMINOS[next][0][0];
    for(let r = 0; r < tet.length; r++) {
        for(let c = 0; c < tet.length; c++) {
            if(tet[r][c]) {
                drawBlock(r+2,c+2,TETROMINOS[next][1],nctx);
            }
        }
    }
}
function Tetromino(tet,side,color) {
    this.tet = tet;
    this.side = side;
    this.currentTet = tet[this.side];
    this.color = color;
    this.x = 3;
    this.y = -2;
    this.nextBlock = Math.floor(Math.random() * TETROMINOS.length);
    displayNextBlock(this.nextBlock);
}
Tetromino.prototype.update = function() {

    if(this.collision(0,1,this.currentTet)) {

    for(let r = 0; r < this.currentTet.length; r++) {
        for(let c = 0; c < this.currentTet.length; c++) {
            if(this.currentTet[r][c]) {
            if(this.y+r < 0) {
                alert("GAME OVER")
                gameOver = true;
                return;
                }
            }
        }
    }
}
    if(this.collision(0,1,this.currentTet)) {

        for(let r = 0; r < this.currentTet.length; r++) {
            for(let c = 0; c < this.currentTet.length; c++) {
                if(this.currentTet[r][c]) {
                    gameBoard[this.y+r][this.x+c] = this.color;
                }
            }
        }
            currentTetromino = createTet(this.nextBlock);
            speed = 500;
            checkBoard();
    } else {
        this.undraw();
        this.y++;
        this.draw();
    }
}
Tetromino.prototype.rotate = function() {

    let nextSide = this.currentTet;
    let push = 0;

    if(this.side+1 < this.tet.length-1) {
       nextSide = this.tet[this.side+1];
    } else {
       nextSide = this.tet[0];
    }

    if(this.side < this.tet.length-1) {
        this.side++;
    } else {
        this.side = 0;
    }

    if(this.collision(0,0,nextSide)) {
        if(this.x < COLUMNS/2) {
            push = 1;
        } else {
            push = -1;
        }
    }
    if(!this.collision(push,0,this.currentTet)) {
        this.undraw();
        this.x+=push;
        this.currentTet = this.tet[this.side];
        this.draw();
        
    }
}
Tetromino.prototype.left = function() {

    if(!this.collision(-1,0,this.currentTet)) {
        this.undraw();
        this.x--;
        this.draw();
    }
}
Tetromino.prototype.right = function() {

    if(!this.collision(1,0,this.currentTet)) {
        this.undraw();
        this.x++;
        this.draw();
    }
}
Tetromino.prototype.fill = function(fillColor) {
    for(let r = 0; r < this.currentTet.length; r++) {
		for(let c = 0; c < this.currentTet.length; c++) {
			if(this.currentTet[r][c]) {
                
				drawBlock(this.x+c,this.y+r,fillColor,ctx);	
			}
		}
	}
}
Tetromino.prototype.draw = function() {
    this.fill(this.color);
}
Tetromino.prototype.undraw = function() {
    ctx.clearRect(0,0,gbWidth,gbHeight);
    this.fill(EMPTY);
    drawBoard();
}
Tetromino.prototype.collision = function(x,y,tet) {
    if(tet===undefined) return;
    for(let r = 0; r < tet.length; r++) {
        for(let c = 0; c < tet.length; c++) {
            if(tet[r][c]) {
                let newX = this.x + x + c;
                let newY = this.y + y + r;
                if(newX < 0 || newX >= COLUMNS || newY >= ROWS){
                    return true;
                }

                if(newY < 0){
                    continue;
                }

                if( gameBoard[newY][newX] != EMPTY){
                    return true;
                }
            }
        }
    }
    return false;

}
var dropStart = Date.now();
var speed = 500;

document.addEventListener('keydown', e => {
	
	if(e.key === 'ArrowUp') {
		currentTetromino.rotate();
	}
	if(e.key === 'ArrowRight') {
		currentTetromino.right();
	}
	if(e.key === 'ArrowLeft') {
		currentTetromino.left();
	}
	if(e.key === 'ArrowDown') {
		speed=100;
		
	}
	if(e.key === ' ') {
		speed = 0;
	}
})
document.addEventListener('keyup', e => {
	if(e.key === 'ArrowDown') {
		speed = 500;
	}
})
drawBoard();
function main() {



    let now = Date.now();
    let delta = now - dropStart;
    if(delta > speed) {
        
        currentTetromino.update();
        dropStart = Date.now();
    }

    if(gameOver) {
        return;
    } else {
        window.requestAnimationFrame(main);
    }
}
main();

