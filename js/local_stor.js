class LocalStor {
	constructor(name) {
		this.name = name;
	}

	/**
	 * Сохраняет данные в localStorage, переводя их в строку
	 * @param {any} data - Данные для сохранения (массив, объект и т.д.)
	 */
	setRecord(data) {
		try {
			localStorage.setItem(this.name, JSON.stringify(data));
		} catch (error) {
			console.error("Ошибка записи в localStorage:", error);
		}
	}

	/**
	 * Получает данные из localStorage и парсит их.
	 * Если данных нет или JSON поврежден — возвращает false.
	 * @returns {any|boolean} - Распарсенные данные или false
	 */
	getRecord() {
		const record = localStorage.getItem(this.name);
		
		// Если записи вообще нет (getItem вернул null), сразу возвращаем false
		if (record === null) {
			return false;
		}

		// Защищаем парсинг строки. Если внутри лежит "битый" JSON, приложение не упадет
		try {
			return JSON.parse(record);
		} catch (error) {
			console.error("Ошибка чтения/парсинга данных из localStorage:", error);
			return false;
		}
	}
}

// Экспортируем готовый инстанс 
export const localStorageWork = new LocalStor('learnedWords');
