import { createCard } from './create_card.js';
import { localStorageWork } from './local_stor.js';
import { getRandomInt } from './rnd_num.js';
import { words } from './words.js';

const cardBlock = document.querySelector('.card_block');
document.getElementById('clearLearningWorldBtn').addEventListener('click', reserLearningWorld);


let wordsArr = [...words];
let learnedWords = [];
let learnedWordsFromLocal =  localStorageWork.getRecord();
let randomWord;

if(learnedWordsFromLocal) {
	learnedWords = [...learnedWordsFromLocal];
	let engLearnedWords = learnedWords.map(e => e.eng);
	console.log('массив изученных слов', engLearnedWords);
	wordsArr = wordsArr.filter(e => {
		if (!engLearnedWords.includes(e.eng)) {
			return e 
		};
		 
	})
	console.log('длинна массива со словами для изучения', wordsArr.length)

}

let card;

function getCard(data) {

	card = createCard(data, iKnowFunc, iDontKnowFunc);
	cardBlock.appendChild(card);
	setTimeout(() =>
		card.classList.remove('bern'), 1
	)
}

function iKnowFunc() {
	// console.log('длинна массива слов для изучения', wordsArr.length)
	localStorageWork.setRecord(learnedWords)
	let indexxRandomWord = wordsArr.indexOf(randomWord);
	wordsArr.splice(indexxRandomWord,1)
	// console.log('длинна массива слов для изучения', wordsArr.length)
	goOut()
	getRndCard()
}
function iDontKnowFunc(reset) {
	if(reset) {
		learnedWords.pop()
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
	let max = wordsArr.length - 1;
	let rndWordIndex = getRandomInt(min, max);
	randomWord = wordsArr[rndWordIndex];
	learnedWords.push(randomWord);
	getCard(randomWord)
}

function reserLearningWorld(){
	wordsArr = [...words];
	learnedWords = [];
	localStorageWork.setRecord(learnedWords);
	iDontKnowFunc('reset')
}

getRndCard()