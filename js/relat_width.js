
const cardBlock = document.querySelector('.card_block');
window.addEventListener('resize', getWidth);

function getWidth(){
    // let width = window.innerWidth;
    let width = window.document.children[0].clientWidth;
    cardBlock.style.width = `${width}px`
    console.log('clientwidth', window.document.children[0].clientWidth)
}

getWidth()