import { localStorageWork } from './local_stor.js';

// Кешируем DOM-элементы на самом верху (выполняется один раз при загрузке модуля)
const learned = document.getElementById('learned');
const leftToLearn = document.getElementById('left_to_learn');

export function tableBtn(wordsArr, wordTable, flag = false) {
	let learnedWord = localStorageWork.getRecord();

	if (!learnedWord) {
		learnedWord = []; // Если записи в локальном хранилище нет, используем пустой массив
	}

	createResultTable(learnedWord, wordsArr, wordTable, flag);
}

function createResultTable(learnedWord, wordsArr, word_table, flag) {
	const tbody = document.createElement('tbody');

	const learningWordQuantity = learnedWord.length;
	const wordsArrQuantity = wordsArr.length;

	// Управляем видимостью заголовков в зависимости от фильтра
	leftToLearn.style.display = flag === 'learned' ? 'none' : '';
	learned.style.display = flag === 'not_learned' ? 'none' : '';

	// Обновляем счетчики количества слов
	addResultQuantityInTable(learningWordQuantity, wordsArrQuantity);

	// Определяем, по какому массиву будем строить строки таблицы
	let renderArr = [];
	if (flag === 'learned') {
		renderArr = learnedWord;
	} else if (flag === 'not_learned') {
		renderArr = wordsArr;
	} else {
		// В режиме "Все" берем длину самого длинного массива, чтобы показать максимум данных
		const maxLength = Math.max(learningWordQuantity, wordsArrQuantity);
		renderArr = new Array(maxLength).fill(null);
	}

	// Строим строки таблицы (исправлен баг с i < length - 1, теперь выводятся абсолютно все слова)
	for (let i = 0; i < renderArr.length; i++) {
		const tr = document.createElement('tr');

		// Рендерим колонку выученных слов (если выбран режим "Все" или "Выучено")
		if (flag === false || flag === 'learned') {
			if (learnedWord[i]) {
				tr.appendChild(getTd(learnedWord[i].eng, 'green'));
				tr.appendChild(getTd(learnedWord[i].rus, 'green'));
			} else if (flag === false) {
				// В режиме "Все" добавляем пустые ячейки для сохранения структуры сетки, если слова кончились
				tr.appendChild(getTd());
				tr.appendChild(getTd());
			}
		}

		// Рендерим колонку оставшихся слов (если выбран режим "Все" или "not_learned")
		if (flag === false || flag === 'not_learned') {
			if (wordsArr[i]) {
				tr.appendChild(getTd(wordsArr[i].eng));
				tr.appendChild(getTd(wordsArr[i].rus));
			} else if (flag === false) {
				tr.appendChild(getTd());
				tr.appendChild(getTd());
			}
		}

		tbody.appendChild(tr);
	}

	// Безопасное удаление старого tbody через селектор, не привязанное к индексам children
	const oldTbody = word_table.querySelector('tbody');
	if (oldTbody) {
		oldTbody.remove();
	}
	
	word_table.appendChild(tbody);
}

// Избавление от дефолтной строки 'undefine' в пользу чистого null
function getTd(data = null, color = 'red') {
	const td = document.createElement('td');
	if (data !== null) {
		td.textContent = data;
		td.classList.add(color);
	}
	return td;
}

function addResultQuantityInTable(learnedQ, leftToLearnQ) {
	learned.textContent = `Выучено ${learnedQ}`;
	leftToLearn.textContent = `Осталось ${leftToLearnQ}`;
}
