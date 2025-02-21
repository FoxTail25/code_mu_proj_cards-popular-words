
const wordCardSample = document.getElementById('word_cart_sample');
let wordCard = wordCardSample.cloneNode(true)
wordCard.removeAttribute('id');
wordCardSample.parentElement.removeChild(wordCardSample);

export function createCard(data, knowFunc, dontknowFunc) {
	let newWordCard = wordCard.cloneNode(true);
	let [eng, rus, knowBtn, dontKnowbtn] = [...newWordCard.children];
	eng.textContent = data.eng;
	rus.textContent = data.rus;
	knowBtn.addEventListener('click', knowFunc)
	dontKnowbtn.addEventListener('click', (e)=> {
		dontknowFunc()
	})
	newWordCard.classList.add('bern')
	return newWordCard
}