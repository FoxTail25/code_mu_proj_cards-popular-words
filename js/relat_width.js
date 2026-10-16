
const cardBlock = document.querySelector('.card_block');
window.addEventListener('resize', getWidth);

function getWidth() {
    const windowInnerWidth = document.documentElement.clientWidth;
    + windowInnerWidth < 1024
        ? cardBlock.style.width = windowInnerWidth - 20 + 'px' // -20 = полоса прокрутки
        : cardBlock.style.width = '1024px';
}
getWidth();
