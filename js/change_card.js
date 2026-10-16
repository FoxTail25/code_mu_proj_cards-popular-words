import { createCard } from './create_card.js';
import { localStorageWork } from './local_stor.js';
import { getRandomInt } from './rnd_num.js';
import { words } from './words.js';
import { tableBtn } from './wordTable.js';


// DOM Элементы
const cardBlock = document.querySelector('.card_block');
const wordTable = document.getElementById("word_table");
const tableBlock = document.querySelector('.table_block');

document.getElementById('clearLearningWorldBtn').addEventListener('click', resetLearningWords);

// Флаг фильтрации таблицы результатов
let resultTableLearningFlag = false;

// Кнопки фильтрации результатов таблицы
document.getElementById('all_result').addEventListener('click', () => {
	resultTableLearningFlag = false;
	tableBtn(wordsArr, wordTable);
});
document.getElementById('learned_result').addEventListener('click', () => {
	resultTableLearningFlag = 'learned';
	tableBtn(wordsArr, wordTable, resultTableLearningFlag);
});
document.getElementById('remains_to_be_learned').addEventListener('click', () => {
	resultTableLearningFlag = "not_learned";
	tableBtn(wordsArr, wordTable, resultTableLearningFlag);
});

// Показ / Скрытие таблицы
document.getElementById('wordTableBtn').addEventListener('click', (event) => {
	const isHidden = tableBlock.classList.contains('hide');
	tableBlock.classList.toggle('hide');
	event.target.textContent = isHidden ? 'Скрыть результат' : 'Посмотреть результат';
});

// Инициализация состояния данных
let wordsArr = [...words];
let learnedWords = [];
const learnedWordsFromLocal = localStorageWork.getRecord();
let randomWord;
let card;

if (learnedWordsFromLocal) {
	learnedWords = [...learnedWordsFromLocal];
	// Используем Set для мгновенного поиска O(1) вместо замедляющего .includes()
	const engLearnedWordsSet = new Set(learnedWords.map(e => e.eng));
	wordsArr = wordsArr.filter(item => !engLearnedWordsSet.has(item.eng));
}

function getCard(data) {
	card = createCard(data, iKnowFunc, iDontKnowFunc);
	cardBlock.appendChild(card);
	
	// Минимальный таймаут для запуска CSS-анимации
	setTimeout(() => {
		card.classList.remove('bern');
		deleteOldCard();
	}, 1);
}

function iKnowFunc() {
	localStorageWork.setRecord(learnedWords);
	
	const indexRandomWord = wordsArr.indexOf(randomWord);
	if (indexRandomWord !== -1) {
		wordsArr.splice(indexRandomWord, 1);
	}

	goOut();
	getRndCard();
}

function iDontKnowFunc(reset) {
	// Безопасное удаление конкретного слова вместо непредсказуемого .pop()
	const wordIndex = learnedWords.indexOf(randomWord);
	if (wordIndex !== -1) {
		learnedWords.splice(wordIndex, 1);
	}

	if (reset === 'reset') {
		goOut();
		getRndCard();
	} else {
		const [, rus] = card.children; // Деструктурируем напрямую без спреда
		rus.classList.remove('hide');
		
		setTimeout(() => {
			goOut();
			getRndCard();
		}, 1000); // Время задержки перед показом перевода
	}
}

function goOut() {
	card.classList.add('go_out');
}

function getRndCard() {
	// Проверка на случай, если абсолютно все слова выучены
	if (wordsArr.length === 0 && learnedWords.length === 0) {
		alert("Поздравляем! Вы выучили все слова!");
		return;
	}

	const min = 0;
	const max = wordsArr.length + 1;
	const rndWordIndex = getRandomInt(min, max);

	if (rndWordIndex === wordsArr.length) {
		getWordFromLearnedWord(); 
	} else {
		randomWord = wordsArr[rndWordIndex];
	}
	
	if (randomWord) {
		learnedWords.push(randomWord);
		getCard(randomWord);
		changeTableData();
	}
}

function resetLearningWords() {
	wordsArr = [...words];
	learnedWords = [];
	localStorageWork.setRecord(learnedWords);
	iDontKnowFunc('reset');
	tableBtn(wordsArr, wordTable, resultTableLearningFlag);
}

function deleteOldCard() {
	const currentCards = cardBlock.children;
	const cardBlockElementLength = currentCards.length;
	
	if (cardBlockElementLength > 2) {
		// Удаляем старые карточки, оставляя только последние две (текущую и уходящую)
		for (let i = cardBlockElementLength - 3; i >= 0; i--) {
			cardBlock.removeChild(currentCards[i]);
		}
	}
}

function getWordFromLearnedWord() {
	if (learnedWords.length > 0) {
		const rndWordIndex = getRandomInt(0, learnedWords.length);
		randomWord = learnedWords[rndWordIndex];
		
		const wordIndex = learnedWords.indexOf(randomWord);
		if (wordIndex !== -1) {
			learnedWords.splice(wordIndex, 1);
		}
		localStorageWork.setRecord(learnedWords);
	} else {
		// Безопасный вызов без бесконечного цикла, если wordsArr еще не пуст
		if (wordsArr.length > 0) {
			const rndWordIndex = getRandomInt(0, wordsArr.length - 1);
			randomWord = wordsArr[rndWordIndex];
		}
	}
}

function changeTableData() {

	tableBtn(wordsArr, wordTable, resultTableLearningFlag);
}

// Первоначальный запуск
getRndCard();
tableBtn(wordsArr, wordTable, resultTableLearningFlag);


