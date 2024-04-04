const buyBtns = [...document.querySelectorAll("[data-price]")]; // Zamienienie elementu NodeList na tablice [...]. Tworzy tablicę buyBtns zawierającą wszystkie przyciski zakupu z atrybutem data-price.
const basketUl = document.querySelector(".basket-list"); // Przypisanie do stałej basketUl elementu z dokumentu HTML o klasie: basket-list
const buyAllBtn = document.querySelector(".btn-buy-all");

const basket = new Basket(); // Tworzy nowy obiekt (koszyk) na bazie klasy: Basket

// Funkcja usuwania przedmiotu
const removeItem = event => {
	const id = Number(event.target.dataset.id);
	// event.target odnosi się do elementu, na którym zostało wywołane zdarzenie (w tym przypadku zdarzenie removeItem).
	// event.target.dataset daje dostęp do właściwości dataset elementu docelowego, która zawiera wszystkie atrybuty danych zdefiniowane na tym elemencie.
	// event.target.dataset.id pobiera wartość atrybutu data-id z elementu docelowego (na którym zostało wywołane zdarzenie removeItem).
	// Number() zamienia typ danych na number.
	basket.remove(id); // Wywołanie metody remove z klasy Basket (usuwanie przedmiotu z koszyka)
	createBasketUi(); // Wywołanie metody createBasketUi (wyswietlanie listy przedmiotów w koszyku)
};

// Funkcja dodawania prodktów do koszyka
function addProductToBasket(event) {
	const name = event.target.dataset.name;
	const price = Number(event.target.dataset.price);
	const newProduct = new Product(name, price); // Stworzenie nowego obiektu klasy Product
	basket.add(newProduct); // Dodanie nowego przedmiotu do koszyka, wywołanie metody add z klasy Basket
	createBasketUi(); // Wywołanie metody createBasketUi (wyswietlanie listy przedmiotów w koszyku)
}

// Funkcja tworzenia listy przedmiotów w koszyku
const createBasketUi = () => {
	basketUl.innerText = ""; // Czyszczenie listy przedmiotów o klasie basket-list w koszyku.
	for (const { id, name, price } of basket.getBasketSummary()) {
		// Przypisanie do stałej id i text wartości zwrócone przez metode getBasketSummary klasy Basket.
		const newLi = document.createElement("li"); // Stworzenie nowego elementu listy li
		const removeBtn = document.createElement("button");
		removeBtn.classList.add("btn-remove-product");
		removeBtn.innerText = "Usuń";
		newLi.innerHTML = `${id}.&nbsp;<strong>${name}</strong> ${price}`; // Wpisanie do nowego elementu listy li tekstu (nazwy przedmiotu i wartości) &nbsp; - dodaje spacje
		removeBtn.addEventListener("click", removeItem); // Dodanie do nowego elementu (przycisku) zdarzenia klikniecia (wywołanie metody removeItem)
		newLi.dataset.id = id; // Dodanie do nowego elementu listy li atrybutu data-id (id przedmiotu)
		basketUl.appendChild(newLi); // Dodanie do listy przedmiotów o klasie basket-list nowego elementu listy li
		newLi.appendChild(removeBtn);
	}

	const basketTotalValue = basket.getTotalValue(); // Przypisanie do stałej basketTotalValue aktualnej wartości koszyka

	// Dodanie atrybutu disabled do przycisku o klasie: buyAllBtn
	buyAllBtn.innerText = `Złóż zamówienie na kwotę:  ${basketTotalValue.toFixed(
		2
	)}`; // Napis na przycisku

	// Sprawdzenie czy koszyk nie jest pusty
	if (basketTotalValue > 0) {
		buyAllBtn.removeAttribute("disabled"); // Usuniecie atrybutu disabled (aktywny) z przycisku
	} else {
		buyAllBtn.setAttribute("disabled", "true"); // Dodanie atrybutu disabled do przycisku
	}
};

// Funkcja wywoływana w momencie klikniecia przycisku Złóż zamówienie
const buyAllProducts = () => {
	alert(
		`Złożyłeś zamówienie na kwotę: ${basket.getTotalValue().toFixed(2)} zł.`
	); // Wyswietlenie alertu imitującego zakup
	basket.clear(); // Czyszczenie koszyka
	createBasketUi(); // Wywołanie metody createBasketUi (wyswietlanie listy przedmiotów w koszyku)
};

// Pętla iterująca po tablicy wszystkich przycisków o atrybucie data-price, nadaje im nazwę btn i dodaje do nich zdarzenie klikniecia.
for (const btn of buyBtns) {
	btn.addEventListener("click", addProductToBasket); // Dodanie do przycisku zdarzenia klikniecia, które wywoła funkcje: addProductToBasket.
}

buyAllBtn.addEventListener("click", buyAllProducts); // Dodanie do przycisku buyAllBtn zdarzenia klikniecia, które wywoła funkcje: buyAllProducts.

createBasketUi();
