const addProductForm = document.querySelector(".form-add-product"); // Przypisanie do stałej addProductForm elementu z dokumentu HTML o klasie: form-add-product
const nameInput = document.querySelector('[name="product-name"]'); // Przypisanie do stałej nameInput elementu z dokumentu HTML o atrybucie: name="product-name"
const priceInput = document.querySelector('[name="product-price"]');
const productsUl = document.querySelector(".products-list");

const addProductToShop = event => {
	event.preventDefault(); // Wyłącza automatyczne odświerzenie strony po jakimś wydarzeniu (dane ze strony nie znikają np po przesłaniu formularza)

	// Sposoby na odczytanie wartości przesłąnej do formularza
	const name = event.target.elements["product-name"].value; // Szybszy dostęp do danych
	const price = Number(priceInput.value); // Prostsze

	const newLi = document.createElement("li"); // Stała tworząca wiersz listy li
	const newStrong = document.createElement("strong"); // Stała tworząca element strong - pogrubiony tekst
	newStrong.innerText = name; // Wpisanie do strong tekstu (nazwy produktu)

	const newPriceText = document.createTextNode(` - ${price.toFixed(2)}`); // Stała tworząca element tekstowy (dynamiczne wprowadzanie - można łatwo zmieniać wyświetlany tekst)

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

// Funkcja wywoływana w momencie przesłania formularza
addProductForm.addEventListener("submit", addProductToShop);
