import { createCard } from './create_card.js';
import { localStorageWork } from './local_stor.js';
import { getRandomInt } from './rnd_num.js';
import { words } from './words.js';
import { tableBtn } from './wordTable.js';

const cardBlock = document.querySelector('.card_block');
document.getElementById('clearLearningWorldBtn').addEventListener('click', reserLearningWorld);

const wordTable = document.getElementById("word_table");
document.getElementById('wordTableBtn').addEventListener('click', (event) => {
	console.log(wordTable.style.display == 'none')
	if(wordTable.style.display == 'none') {
		wordTable.style.display = 'table'
		event.target.textContent =  'Скрыть результат';
	} else {
		wordTable.style.display = 'none'
		event.target.textContent =  'Посмотреть результат';
	}
});



let wordsArr = [...words];
let learnedWords = [];
let learnedWordsFromLocal = localStorageWork.getRecord();
let randomWord;
let card;



if (learnedWordsFromLocal) {
	learnedWords = [...learnedWordsFromLocal];
	let engLearnedWords = learnedWords.map(e => e.eng);
	// console.log('массив изученных слов', engLearnedWords);
	wordsArr = wordsArr.filter(e => {
		if (!engLearnedWords.includes(e.eng)) {
			return e
		};
	})
	// console.log('длинна массива со словами для изучения', wordsArr.length)

}


function getCard(data) {

	card = createCard(data, iKnowFunc, iDontKnowFunc);
	cardBlock.appendChild(card);
	setTimeout(() => {
		card.classList.remove('bern')
		// console.log('длинна блока с карточками', [...cardBlock.children].length);
		deleteOldCard()
	}
		, 1
	)
}

function iKnowFunc() {
	// console.log('длинна массива слов для изучения', wordsArr.length)
	localStorageWork.setRecord(learnedWords)
	let indexRandomWord = wordsArr.indexOf(randomWord);
	wordsArr.splice(indexRandomWord, 1)
	// console.log('длинна массива слов для изучения', wordsArr.length)
	
	goOut()
	getRndCard()
}
function iDontKnowFunc(reset) {
	if (reset == 'reset') {
		// learnedWords.pop()
		goOut()
		getRndCard()
	} else {

		learnedWords.pop()
		let [, rus] = [...card.children];
		rus.classList.remove('hide')
		setTimeout(
			() => {
				goOut()
				getRndCard()
			}, 1000 // вреимя задержки смены карточки при показе перевода слова.
		)
	}

}

function goOut() {
	card.classList.add('go_out')
}


function getRndCard() {
	const min = 0;
	let max = wordsArr.length;
	let rndWordIndex = getRandomInt(min, max);
	// Что бы проверит работостособность функции получения рандомного слова и выученных слов. 
	// Надо поставить max = 1; и в if (rndWordIndex == wordsArr.length) заменить wordsArr.lenth на 1
	if (rndWordIndex == wordsArr.length) {
		
		getWordFromLearnedWord(); // функция получения рандомного слова из выученных слов
		
	} else {
		randomWord = wordsArr[rndWordIndex];
	}
	learnedWords.push(randomWord);
	getCard(randomWord)

	changeTableData()
}

function reserLearningWorld() {
	wordsArr = [...words];
	learnedWords = [];
	localStorageWork.setRecord(learnedWords);
	iDontKnowFunc('reset')
	tableBtn(wordsArr, wordTable)
}


function deleteOldCard() {
	let cardBlockElementLength = [...cardBlock.children].length;
	if (cardBlockElementLength > 2) {
		[...cardBlock.children].forEach((e, i) => {
			if (i != cardBlockElementLength - 2 && i != cardBlockElementLength - 1) {
				cardBlock.removeChild(e)
			}
		})
	}
}

function getWordFromLearnedWord() {
	
	if (learnedWords.length > 0 ) {
		let rndWordIndex = getRandomInt(0, learnedWords.length - 1);
		randomWord = learnedWords[rndWordIndex];
		learnedWords.splice(learnedWords.indexOf(randomWord), 1);
		localStorageWork.setRecord(learnedWords)
	} else {
		getRndCard()
	}
}

function changeTableData() {
	
	tableBtn(wordsArr, wordTable)
}


getRndCard()

tableBtn(wordsArr, wordTable)


