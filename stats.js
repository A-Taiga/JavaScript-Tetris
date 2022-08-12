const stats = document.getElementsByClassName('tets');
const statContainer = document.getElementById('stats-container');
const statSize = 15;


var zStat = 0;
var sStat = 0;
var jStat = 0;
var lStat = 0;
var tStat = 0;
var iStat = 0;
var oStat = 0;


const statBrick = (() => {
    const path = new Path2D();
    path.lineTo(0,0);
    path.lineTo(statSize,0);
    path.lineTo(statSize,statSize);
    path.lineTo(0,statSize);
    path.closePath(); 
    return path;
})();


for(let i = 0; i < stats.length; i++) {
    let tet = TETROMINOS[i][0][0];
    let tx = 0;
    let ty = 0;
/////////////////centering///////////////
    if(i===0||i===1) {
        tx = statSize/2;
        ty = statSize;
    } else if(i===2) {
        tx = statSize;
        ty = statSize/2;
    } else if(i===3) {
        tx = statSize/2;
        ty = statSize/2;
    }else if(i===4) {
        tx = statSize/2;
        ty = 0;
    } else if(i===5) {
        tx = statSize/2;
        ty = 2.5;/////////weird
    } else if (i===6) {
        tx = 0;
        ty = 0;
    }
    let sctx = stats[i].getContext('2d');
    setupCanvas(stats[i],sctx);
    for(let r = 0; r < tet.length; r++) {
        for(let c = 0; c < tet.length; c++) {
            if(tet[r][c]) {
                sctx.save();
                sctx.translate(tx,ty);
                drawBrick(statBrick,c,r,1,TETROMINOS[i][1],'black',sctx,statSize);
                sctx.restore();
            }
        }
    }
}

function updateStat(tet) {
    
        if(tet === Z) { 
            zStat+=1
            statContainer.querySelectorAll('p')[1].textContent = zStat;

        }
        else if(tet===S) { 
            sStat+=1
            statContainer.querySelectorAll('p')[2].textContent = sStat;
        }
        else if(tet===J) { 
            jStat+=1
            statContainer.querySelectorAll('p')[3].textContent = jStat;
        }
        else if(tet===L) { 
            lStat+=1
            statContainer.querySelectorAll('p')[4].textContent = lStat;
        }
        else if(tet===T) { 
            tStat+=1
            statContainer.querySelectorAll('p')[5].textContent = tStat;
        }
        else if(tet===I) { 
            iStat+=1
            statContainer.querySelectorAll('p')[6].textContent = iStat;
        }
        else if(tet===O) { 
            oStat+=1
            statContainer.querySelectorAll('p')[7].textContent = oStat;
        }
}
function resetStats() {
    zStat = 0;
    sStat = 0;
    jStat = 0;
    lStat = 0;
    tStat = 0;
    iStat = 0;
    oStat = 0;
    statContainer.querySelectorAll('p')[1].textContent = zStat;
    statContainer.querySelectorAll('p')[2].textContent = sStat;
    statContainer.querySelectorAll('p')[3].textContent = jStat;
    statContainer.querySelectorAll('p')[4].textContent = lStat;
    statContainer.querySelectorAll('p')[5].textContent = tStat;
    statContainer.querySelectorAll('p')[6].textContent = iStat;
    statContainer.querySelectorAll('p')[7].textContent = oStat;
}




