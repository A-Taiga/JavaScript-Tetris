
//Game board canvas
const gameCanvas = document.getElementById('game-board');
const gctx = gameCanvas.getContext('2d');
gcWidth = gameCanvas.clientWidth;
gcHeight = gameCanvas.clientHeight;

//Next tetromino canvas
const nextCanvas = document.getElementById('next-block');
const nctx = nextCanvas.getContext('2d');
ncWidth = nextCanvas.clientWidth;
ncHeight = nextCanvas.clientHeight;

const scoreBoard = document.getElementById('score-board').childNodes[3];


function setupCanvas(canvas,ctx) {
    let scale = window.devicePixelRatio+10;
    canvas.style.width = canvas.width + 'px';
    canvas.style.height = canvas.height + 'px';
    canvas.width = Math.floor(canvas.width * scale);
    canvas.height = Math.floor(canvas.height * scale);
    ctx.scale(scale,scale);
    return canvas;
}

setupCanvas(gameCanvas,gctx);
setupCanvas(nextCanvas,nctx);







var gameOver = false;
const ROWS = 20;
const COLUMNS = 10;
const CS = 30;
const EMPTY = 'white';
var gameBoard = [];
var score = 0;
const TETROMINOS = [[Z,'red'],
                    [S,'green'],
                    [J,'blue'],
                    [L,'purple'],
                    [T,'orange'],
                    [I,'cyan'],
                    [O,'magenta']];

const style = (() => {
    const path = new Path2D()
    path.moveTo(3,8);
    path.lineTo(3,3);
    path.moveTo(2,3);
    path.lineTo(8,3);
    return path;
})();


const brick = (() => {
    const path = new Path2D();
    path.lineTo(0,0);
    path.lineTo(CS,0);
    path.lineTo(CS,CS);
    path.lineTo(0,CS);
    path.closePath(); 
    
    return path;
})();
                    





var currentTetromino = createTet(Math.floor(Math.random() * 7));
let start = Date.now();
let speed = 500;


function initGameBoard() {
    for(let r = 0; r < ROWS; r++) {
        gameBoard[r] = [];
        for(let c = 0; c < COLUMNS; c++) {
            gameBoard[r][c] = EMPTY;
        }
    }
}

function drawBrick(path,x,y,lineWidth,color,strokeColor,ctx) {
    
    ctx.transform(1,0,0,1,CS*x,CS*y);
    ctx.fillStyle = color;
    ctx.lineWidth = 2;
    ctx.fill(path);
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = strokeColor;
    ctx.stroke(path);
    ctx.transform(1,0,0,1,-CS*x,-CS*y);
}



function drawBoard() {
    for(let r = 0; r < ROWS; r++) {
        for(let c = 0; c < COLUMNS; c++) {
            let lineWidth = 1;
            if(gameBoard[r][c]!=='white') {
                lineWidth = 2;
            } else {
                lineWidth = 1;
            }
            gctx.translate(0,0);
            drawBrick(brick,c,r,lineWidth,gameBoard[r][c],'black',gctx);
            drawBrick(style,c,r,lineWidth,'white','white',gctx);
            
        }
    }
}




function drawNext(next) {
    let tet = TETROMINOS[next][0][0];
    let tx = 0;
    let ty = 0;
    ////////////////////////////there has to be another way to center the pices properly
    if(next===0||next===1) {
        tx = ncWidth/3.6;
        ty = ncHeight/2.857 /////////////////////weidrd offset
    } else if(next===2) {
        tx = ncWidth/2.857; /////////////////////weidrd offset
        ty = ncHeight/3.6;
    } else if(next===3) {
        tx = ncWidth/5
        ty = ncHeight/3.6; 
    }else if(next===4) {
        tx = ncWidth/3.6;
        ty = ncHeight/5;
    } else if(next===5) {
        tx = ncWidth/3.6;
        ty = ncHeight/5;
    } else if (next===6) {
        tx = ncWidth/5;
        ty = ncHeight/5;
        
    }
    for(let r = 0; r < tet.length; r++) {
        for(let c = 0; c < tet.length; c++) {
            if(tet[r][c]) {
                nctx.save();
                nctx.translate(tx,ty);
                drawBrick(brick,c,r,2,TETROMINOS[next][1],'black',nctx);
                drawBrick(style,c,r,2,TETROMINOS[next][1],'white',nctx);


                nctx.restore();
            }
        }
    }
}


function createTet(next) {
    return new Tetromino(TETROMINOS[next][0],0,TETROMINOS[next][1],Math.floor(Math.random()* 7));
}
function checkBoard() {
    let shifts = 0;
    let columnCount = 0;
    let rows = 0;
    let gap = 0;
    for(let r = 0; r < ROWS; r++) {
        
        for(let c = 0; c < COLUMNS; c++) {
            if(gameBoard[r][c] !== EMPTY) {
                columnCount++;
            }
        }
        if(columnCount === COLUMNS) {
            shifts++;
            shift(r);
        }
        columnCount = 0;
        if(rows!==0) {
            gap++;
        }
    }
    switch(shifts) {
        case 1: score+=40;
            break;
        case 2: score+=100;
            break;
        case 3: score+=300;
            break;
        case 4: score+=1200;
            break;
        default: score+=0;
            break;
    }
    scoreBoard.textContent = score;
}
function shift(start) {
    let temp = EMPTY
    for(let c = 0; c < COLUMNS; c++) {
        gameBoard[start][c] = EMPTY;
    }
    for(let c = 0; c < COLUMNS; c++) {
        for(let r = start-1; r >= 0; r--) {
            if(r!==19) {
                if(gameBoard[r+1][c]===EMPTY) {
                    temp = gameBoard[r][c];
                    gameBoard[r+1][c] = temp;
                    gameBoard[r][c] = EMPTY;
                }
            }
        }
    }
}

function Tetromino(tet,side,color,next) {/////////////////////////////TETROMINO
    this.tet = tet;
    this.side = side;
    this.color = color;
    this.next = next;
    this.currentSide = this.tet[this.side];
    this.x = 3;
    this.y = -1;
    this.shadowX = this.x;
    this.shadowY = ROWS;
    nctx.clearRect(0,0,ncWidth,ncHeight);
    drawNext(this.next);
}

Tetromino.prototype.update = function() {/////////////////////////////UPDATE

  

    if(this.collision(0,1,this.currentSide)) {
        for(let r = 0; r < this.currentSide.length; r++) {
            for(let c = 0; c < this.currentSide.length; c++) {
                if(this.currentSide[r][c]) {
                    try {
                        gameBoard[this.y+r][this.x+c] = this.color;
                    } catch {
                        console.log('game over');
                        gameOver = true;
                        return;
                    }
                }
            }
        }
        checkBoard();
        currentTetromino = createTet(this.next);
        drawBoard();
        speed = 500;
    } else {
        
        this.undraw();
        this.y++;
        this.draw();
    }
    


}
Tetromino.prototype.rotate = function() {/////////////////////////////ROTATE
    let nextSide = this.tet[(this.side+1)%this.tet.length];
    let pushX = 0;

    if(this.collision(0,0,nextSide)){
        if(this.x > COLUMNS/2){
            if(this.tet===I&&this.side===0) {
                pushX = -2;
            } else {
                pushX = -1;
            }
        }else{
            if(this.tet===I&&this.side===2) {
                pushX=2;
            } else {
                pushX = 1;
            }
        }
    }

    if(!this.collision(pushX,0,nextSide)) {
        
        this.undraw();
        this.x+=pushX;
        this.side = (this.side+1)%this.tet.length;
        this.currentSide = nextSide;
        this.draw();
    }
    

}
Tetromino.prototype.moveLeft = function() {/////////////////////////////MOVE LEFT
    if(!this.collision(-1,0,this.currentSide)) {
        this.undraw();
        this.x--;
        this.draw();
    } 
    
}
Tetromino.prototype.moveRight = function() {/////////////////////////////MOVE RIGHT
    if(!this.collision(1,0,this.currentSide)) {
        this.undraw();
        this.x++;
        this.draw();
    }
}
Tetromino.prototype.fill = function(color) {/////////////////////////////FILL
    for(let r = 0; r < this.currentSide.length; r++) {
        for(let c = 0; c < this.currentSide.length; c++) {
            if(this.currentSide[r][c]) {


                drawBrick(brick,this.x+c,this.y+r,2,color,'black',gctx);
                drawBrick(style,this.x+c,this.y+r,2,'white','white',gctx);
                
                
            }
        }
    }
}
Tetromino.prototype.draw = function() {/////////////////////////////DRAW
    
    this.fill(this.color);
    this.shadow();

}
Tetromino.prototype.undraw = function() {/////////////////////////////UNDRAW
    
    gctx.clearRect(0,0,gcWidth,gcHeight);
    this.fill(EMPTY);
    drawBoard();
    
}
Tetromino.prototype.collision = function(x,y,tet) {/////////////////////////////COLLISION
    for( r = 0; r < tet.length; r++){
        for(c = 0; c < tet.length; c++){
            if(!tet[r][c]){
                continue;
            }
            let newX = this.x + c + x;
            let newY = this.y + r + y;
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
    return false;
}

Tetromino.prototype.shadow = function() {//////////////////////////////////SHADOW






}
document.addEventListener('keydown', e => {
    if(e.key === 'ArrowDown') {
        speed = 100;
    }
    if(e.key === 'ArrowRight') {
        currentTetromino.moveRight();
    }
    if(e.key === 'ArrowLeft') {
        currentTetromino.moveLeft();
    }
    if(e.key === 'ArrowUp') {
        currentTetromino.rotate();
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




function main() {
    if(!gameOver)  {
        let now = Date.now();
        let delta = now - start;
        if(delta > speed) {
            currentTetromino.update();
            start = Date.now();
        }
        requestAnimationFrame(main);
        
    } else {
        document.body.insertBefore(gameOverScreen(),before);
        return;
    }
}







initGameBoard();
drawBoard();












