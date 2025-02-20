// const wordTable = document.getElementById("word_table");
// document.getElementById('wordTableBtn').addEventListener('click', tableBtn);

import { localStorageWork } from './local_stor.js'


export function tableBtn(wordsArr, wordTable) {
	let learnedWord = localStorageWork.getRecord()
	console.log(learnedWord.length)
	console.log(wordsArr.length)
	console.log(wordTable)

	createResultTable(learnedWord, wordsArr, wordTable)
}

function createResultTable(learnedWord, wordsArr, word_table) {
	let tbody = document.createElement('tbody');

	let TableRowQuantity =
		learnedWord.length > wordsArr.length
			? learnedWord.length
			: wordsArr.length;
	console.log(TableRowQuantity);

	for(let i = 0; i < TableRowQuantity-1; i++) {
		let tr = document.createElement('tr');

		tr.appendChild(getTd(learnedWord[i]?.eng));
		tr.appendChild(getTd(learnedWord[i]?.rus));

		tr.appendChild(getTd(wordsArr[i]?.eng));
		tr.appendChild(getTd(wordsArr[i]?.rus));
		tbody.appendChild(tr)
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