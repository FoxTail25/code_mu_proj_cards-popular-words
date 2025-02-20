
const cardBlock = document.querySelector('.card_block');
window.addEventListener('resize', getWidth);

function getWidth(){
    let width = window.innerWidth;
    cardBlock.style.width = `${width}px`
    console.log('width',width)
}

getWidth()