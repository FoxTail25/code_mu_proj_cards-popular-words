import { createCard } from './create_card.js';
import { localStorageWork } from './local_stor.js';
import { getRandomInt } from './rnd_num.js';
import { words } from './words.js';

const cardBlock = document.querySelector('.card_block');


let wordsArr = [...words];
let learnedWords = [];
let learnedWordsFromLocal =  localStorageWork.getRecord();
let randomWord;

if(learnedWordsFromLocal) {
	learnedWords = [...learnedWordsFromLocal];
	let engLearnedWords = learnedWords.map(e => e.eng);
	console.log(engLearnedWords)
	wordsArr = wordsArr.filter(e => {
		if (!engLearnedWords.includes(e.eng)) {
			return e 
		}
		 
	})
	console.log(wordsArr.length)

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
	
	localStorageWork.setRecord(learnedWords)
	console.log(wordsArr.indexOf(randomWord))
	goOut()
	getRndCard()
}
function iDontKnowFunc() {
	learnedWords.pop()
	let [, rus] = [...card.children];
	rus.classList.remove('hide')
	setTimeout(
		() => {
			goOut()
			getRndCard()
		}, 1000
	)
}

function goOut() {
	card.classList.add('go_out')
}


function getRndCard() {
	const min = 0;
	let max = wordsArr.length - 1;
	let rndWordIndex = getRandomInt(min, max);
	randomWord = wordsArr[rndWordIndex];
	learnedWords.push(randomWord)
	getCard(randomWord)
}

getRndCard()