

import { localStorageWork } from './local_stor.js';
const learned = document.getElementById('learned');
const leftToLearn = document.getElementById('left_to_learn');

export function tableBtn(wordsArr, wordTable, flag = false) {
	let learnedWord = localStorageWork.getRecord();


	createResultTable(learnedWord, wordsArr, wordTable, flag);
}

function createResultTable(learnedWord, wordsArr, word_table, flag) {
	let tbody = document.createElement('tbody');

	let learningWordQuantity = learnedWord.length;
	let wordsArrQuantity = wordsArr.length;


	let TableRowQuantity =
		learningWordQuantity > wordsArrQuantity
			? learningWordQuantity
			: wordsArrQuantity;
	if (flag == 'learned') {

		document.getElementById('left_to_learn').style.display = 'none';
		document.getElementById('learned').style.display = '';
	} else if (flag == 'not_learned') {
		document.getElementById('learned').style.display = 'none';
		document.getElementById('left_to_learn').style.display = '';
	} else {
		document.getElementById('left_to_learn').style.display = '';
		document.getElementById('learned').style.display = '';
	}

	addResultQuantityInTable(learningWordQuantity, wordsArrQuantity, flag);

	for (let i = 0; i < TableRowQuantity - 1; i++) {
		let tr = document.createElement('tr');

		


		if (flag == false || flag == 'learned') {

			if (learnedWord[i]) {
				tr.appendChild(getTd(learnedWord[i]?.eng, 'green'));
				tr.appendChild(getTd(learnedWord[i]?.rus, 'green'));
			} else {
				tr.appendChild(getTd());
				tr.appendChild(getTd());
			}
		}
		if (flag == false || flag == 'not_learned') {

			if (wordsArr[i]) {
				tr.appendChild(getTd(wordsArr[i]?.eng));
				tr.appendChild(getTd(wordsArr[i]?.rus));

			} else {
				tr.appendChild(getTd());
				tr.appendChild(getTd());
			}
		}

		tbody.appendChild(tr);
	}
	if (word_table.children[1]) {
		word_table.removeChild(word_table.children[1]);
	}
	word_table.appendChild(tbody);
}

function getTd(data = 'undefine', color = 'red') {
	let td = document.createElement('td');
	if (data != 'undefine') {
		td.textContent = data;
		td.classList.add(color);
	}
	return td
}


function addResultQuantityInTable(learnedQ, leftToLearnQ) {
	learned.textContent = `Выучено ${learnedQ}`;
	leftToLearn.textContent = `Осталось ${leftToLearnQ}`;
}