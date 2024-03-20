const buyBtns = [...document.querySelectorAll("[data-price]")]; //Zamienienie alementu NodeList na tablice [...]
const basketUl = document.querySelector(".basket-list");
const buyAllBtn = document.querySelector(".btn-buy-all");

const basket = new Basket();

const removeItem = event => {
	const id = Number(event.target.dataset.id);
	basket.remove(id);
	createBasketUi();
};

const createBasketUi = () => {
	basketUl.innerText = "";
	for (const { id, text } of basket.getBasketSummary()) {
		const newLi = document.createElement("li");
		newLi.innerText = text;
		newLi.addEventListener("click", removeItem);
		newLi.dataset.id = id;
		basketUl.appendChild(newLi);
	}
	const basketTotalValue = basket.getTotalValue();

	buyAllBtn.innerText = `Złóż zamówienie na kwotę:  ${basketTotalValue.toFixed(
		2
	)}`;

	if (basketTotalValue > 0) {
		buyAllBtn.removeAttribute("disabled");
	} else {
		buyAllBtn.setAttribute("disabled", "true");
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

const buyAllProducts = () => {
	alert(
		`Złożyłeś zamówienie na kwotę: ${basket.getTotalValue().toFixed(2)} zł.`
	);
	basket.clear();
	createBasketUi();
};

for (const btn of buyBtns) {
	btn.addEventListener("click", addProductToBasket);
}

buyAllBtn.addEventListener("click", buyAllProducts);
