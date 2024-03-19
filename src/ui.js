const buyBtns = [...document.querySelectorAll("[data-price]")]; //Zamienienie alementu NodeList na tablice [...]
const basketUl = document.querySelector(".basket-list");

const basket = new Basket();

const createBasketUi = () => {
	basketUl.innerText = "";
	for (const oneProductInfo of basket.getBasketSummary()) {
		const newLi = document.createElement("li");
		newLi.innerText = oneProductInfo;
		basketUl.appendChild(newLi);
	}
};

function addProductToBasket(event) {
	const name = event.target.dataset.name;
	const price = Number(event.target.dataset.price);
	//Element na którym został wywołany event, dataset to atrybuty data-nazwa
	const newProduct = new Product(name, price);
	basket.add(newProduct);
	createBasketUi();
}

for (const btn of buyBtns) {
	btn.addEventListener("click", addProductToBasket);
}
