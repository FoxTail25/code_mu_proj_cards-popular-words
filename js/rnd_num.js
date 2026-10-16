/**
 * Возвращает случайное целое число в диапазоне от min (включительно) до max (не включая max).
 * Идеально подходит для работы с индексами массивов.
 */
export function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}
