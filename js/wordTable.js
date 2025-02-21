

import { localStorageWork } from './local_stor.js';
const learned = document.getElementById('learned')
const leftToLearn = document.getElementById('left_to_learn');

export function tableBtn(wordsArr, wordTable) {
	let learnedWord = localStorageWork.getRecord()


	createResultTable(learnedWord, wordsArr, wordTable)
}

function createResultTable(learnedWord, wordsArr, word_table) {
	let tbody = document.createElement('tbody');

	let learningWordQuantity = learnedWord.length;
	let wordsArrQuantity = wordsArr.length;


	let TableRowQuantity =
	learningWordQuantity > wordsArrQuantity
			? learningWordQuantity
			: wordsArrQuantity;

	addResultQuantityInTable(learningWordQuantity, wordsArrQuantity)

	for(let i = 0; i < TableRowQuantity-1; i++) {
		let tr = document.createElement('tr');

		tr.appendChild(getTd(learnedWord[i]?.eng));
		tr.appendChild(getTd(learnedWord[i]?.rus));

		tr.appendChild(getTd(wordsArr[i]?.eng));
		tr.appendChild(getTd(wordsArr[i]?.rus));
		tbody.appendChild(tr)
	}
	if (word_table.children[1]) {
		word_table.removeChild(word_table.children[1])
	}
	word_table.appendChild(tbody)
}

function getTd(data) {
	let td = document.createElement('td')
	if (data != 'undefine') {
		td.textContent = data
	} 
	return td
}


function addResultQuantityInTable(learnedQ, leftToLearnQ) {
learned.textContent = `Выучено ${learnedQ}`;
leftToLearn.textContent = `Осталось выучить ${leftToLearnQ}`;
}