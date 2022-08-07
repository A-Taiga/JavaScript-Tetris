

const startScreen = document.getElementById('start');
let width = startScreen.childNodes[1].clientWidth;
let height = startScreen.childNodes[1].clientHeight;
startScreen.childNodes[1].style.marginLeft = `calc(50vw - (${width + 'px'}) / 2)`;
startScreen.childNodes[1].style.marginTop =  `calc(50vh - (${width + 'px'}) / 2)`;
const button = document.getElementById('start-button');



button.onclick = function() {
    document.body.removeChild(startScreen);
    requestAnimationFrame(main);
}
