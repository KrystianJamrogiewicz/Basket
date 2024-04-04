const addProductForm = document.querySelector(".form-add-product"); // Przypisanie do stałej addProductForm elementu z dokumentu HTML o klasie: form-add-product
const removeProductForm = document.querySelector(".form-remove-product");
const nameInput = document.querySelector('[name="product-name"]'); // Przypisanie do stałej nameInput elementu z dokumentu HTML o atrybucie: name="product-name"
const priceInput = document.querySelector('[name="product-price"]');
const productsUl = document.querySelector(".products-list");
const removeProduct = document.querySelector('[name="remove-product"]');

const saveProductToLocalStorage = (name, price) => {
	const productsList = JSON.parse(localStorage.getItem("shop-products")) ?? []; // Pobiera dane z localStorage o kluczu hop-products i zamiana na typ obiekt, sprawdza czy obiekt nie jest pusty jeśli jest to przypisuje pustą tablice.
	productsList.push({ name, price }); // Dodaje do pobranego nowe obiekty. {} Tworzy obiekt z właściwością o tej samej nazwie co przesłana wartość
	localStorage.setItem("shop-products", JSON.stringify(productsList)); // Przesłanie danych w formacie string do localStorage. Zamiana (usówa stare, zapisuje nowe) danych w localStorage o kluczu shop-products na nowe
};

const addProductToShop = (name, price) => {
	const newLi = document.createElement("li"); // Stała tworząca wiersz listy li
	const newStrong = document.createElement("strong"); // Stała tworząca element strong - pogrubiony tekst
	newStrong.innerText = name; // Wpisanie do strong tekstu (nazwy produktu)

	const newPriceText = document.createTextNode(`${price.toFixed(2)}`); // Stała tworząca element tekstowy (dynamiczne wprowadzanie - można łatwo zmieniać wyświetlany tekst)

	const newBtn = document.createElement("button"); // Stała tworząca przycisk
	newBtn.classList.add("btn-buy-product"); // Dodanie klasy (btn-buy-product)
	newBtn.dataset.name = name; // Dodanie data-name = name
	newBtn.dataset.price = String(price); // Dodanie data-price = price
	newBtn.innerText = "Kup"; // Dodanie napisu na przycisk
	newBtn.addEventListener("click", addProductToBasket); // Dodanie wydarzenia które wywołuje się podczas kliknięcia (wywołanie funkcji)

	// Stworzenie 1 wierszu listy li oraz dodanie do jej środka: newStrong, newPriceText, newBtn.
	newLi.appendChild(newStrong);
	newLi.appendChild(newPriceText);
	newLi.appendChild(newBtn);

	// Użycie wcześniej stworzonego wiersza listy li w stałej productsUl czyli w klasie products-list w dokumencie html
	productsUl.appendChild(newLi);
};

const removeProductFromShoop = () => {
	// Pobranie nazwy produktu do usunięcia z pola input
	const productNameToRemove = removeProduct.value;

	// Znalezienie wszystkich przycisków produktów
	const allProductButtons = document.querySelectorAll(".btn-buy-product");

	// Iteracja przez wszystkie przyciski, aby znaleźć ten z odpowiednią nazwą produktu
	allProductButtons.forEach(button => {
		if (button.dataset.name === productNameToRemove) {
			// Znalezienie najbliższego przodka typu 'li', który jest kontenerem produktu
			const productLi = button.closest("li");

			// Usunięcie elementu 'li' z listy, jeśli produkt został znaleziony
			if (productLi) {
				productsUl.removeChild(productLi);

				// Usunięcie produktu z pamięci localStorage
				const productsList =
					JSON.parse(localStorage.getItem("shop-products")) ?? [];
				const productIndex = productsList.findIndex(
					product => product.name === productNameToRemove
				);
				if (productIndex !== -1) {
					productsList.splice(productIndex, 1);
					localStorage.setItem("shop-products", JSON.stringify(productsList));
				}
				// Usunięcie produktu z koszyka zakupowego (działa po odświeżeniu)
				const productsInCart =
					JSON.parse(localStorage.getItem("basket-items")) ?? [];
				const productInCartIndex = productsInCart.findIndex(
					product => product.name === productNameToRemove
				);
				if (productInCartIndex !== -1) {
					productsInCart.splice(productInCartIndex, 1);
					localStorage.setItem("basket-items", JSON.stringify(productsInCart));
				}
			}
		}
	});
};

const loadProdactsFromLocalStorage = () => {
	const productsList = JSON.parse(localStorage.getItem("shop-products")) ?? [];

	for (const { name, price } of productsList) {
		addProductToShop(name, price);
	}
};

const handleAddProductFormSubmit = event => {
	event.preventDefault(); // Wyłącza automatyczne odświerzenie strony po jakimś wydarzeniu (dane ze strony nie znikają np po przesłaniu formularza)

	// Sposoby na odczytanie wartości przesłąnej do formularza
	const nameFromInput = event.target.elements["product-name"].value; // Szybszy dostęp do danych
	const priceFromInput = Number(priceInput.value); // Prostsze

	addProductToShop(nameFromInput, priceFromInput);
	saveProductToLocalStorage(nameFromInput, priceFromInput);
};
const handleRemoveProductFormSubmit = event => {
	event.preventDefault(); // Wyłącza automatyczne odświerzenie strony po jakimś wydarzeniu (dane ze strony nie znikają np po przesłaniu formularza)
	removeProductFromShoop();
};

// Funkcja wywoływana w momencie przesłania formularza
addProductForm.addEventListener("submit", handleAddProductFormSubmit);
removeProductForm.addEventListener("submit", handleRemoveProductFormSubmit);
loadProdactsFromLocalStorage();
