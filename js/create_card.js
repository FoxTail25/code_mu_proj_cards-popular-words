
// Получаем шаблон карточки из DOM один раз при загрузке модуля
const wordCardSample = document.getElementById('word_cart_sample');

// Клонируем его для последующего использования как чистый шаблон
const wordCard = wordCardSample.cloneNode(true);
wordCard.removeAttribute('id');

// Удаляем исходный шаблон из документа, чтобы он не мешался в разметке
wordCardSample.parentElement.removeChild(wordCardSample);

/**
 * Создает новую карточку слова на основе шаблона
 * @param {Object} data - Объект с данными слова ({ eng: '...', rus: '...' })
 * @param {Function} knowFunc - Коллбэк для кнопки "Знаю"
 * @param {Function} dontKnowFunc - Коллбэк для кнопки "Не знаю"
 * @returns {HTMLElement} - Готовый DOM-элемент карточки
 */
export function createCard(data, knowFunc, dontKnowFunc) {
	const newWordCard = wordCard.cloneNode(true);
	
	// Деструктурируем дочерние элементы напрямую, без лишнего спреда [...]
	const [eng, rus, knowBtn, dontKnowBtn] = newWordCard.children;
	
	eng.textContent = data.eng;
	rus.textContent = data.rus;
	
	// { once: true } автоматически удаляет слушатель после первого клика.
	// Это защищает приложение от утечек памяти при удалении карточек из DOM.
	knowBtn.addEventListener('click', knowFunc, { once: true });
	dontKnowBtn.addEventListener('click', dontKnowFunc, { once: true });
	
	newWordCard.classList.add('bern');
	
	return newWordCard;
}
