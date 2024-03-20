// Stworzenie klasy Basket - koszyk
class Basket {
	// Konstruktor, każdy nowy obiekt typu Basket będzie posiadał właściwość: pusta tablice items.
	constructor() {
		this.items = []; // this TRZEBA STOSOWAĆ W KONSTRUKTORZE, odnosi się do obiektu na którym zostało wywołane zdarzenie (nowy obiekt typu Basket).
	}
	// Skrócona metoda tworzenia konstruktora (działa tak jak ta po wyżej, ale jest mniej czytelna)
	// items = [];

	//Metoda dodawania przedmiotu do koszyka
	add(item) {
		this.items.push(item); // Dodawanie przedmiotu (item) do tablicy (items)
	}

	// Metoda obliczania całkowitej wartości koszyka
	getTotalValue() {
		// Zastosowanie metody reduce
		// prev = poprzednia waartość, curr = obecna waartość, 0 = początekowa waartość
		return this.items.reduce((prev, curr) => prev + curr.price, 0); // Zwróci sumę wszystkich cen prodktów w tablicy (items)

		// Zastosowanie pętli for
		/*

		let totalValue = 0;
		for (let i = 0; i < this.items.length; i++) {
			totalValue += this.items[i].price;
		}
		return totalValue;
        */
	}

	// Metoda wyświetlania listy przedmiotów
	getBasketSummary() {
		// map zwróci nową tablicę z dwoma kolumnami (id, text), która następnie zostanie zwrócona przez metode getBasketSummary
		return this.items.map((product, i) => {
			return {
				id: i + 1, // Uzyskanie id produktu z indeksu tablicy
				text: `${i + 1}. ${product.name} - ${product.price.toFixed(2)} PLN`, //Wypisanie atrybutów produktu
			};
		});
	}

	// Metoda usuwania przedmiotu z koszyka
	remove(no) {
		this.items.splice(no - 1, 1); // Usuwanie przedmiotu o podanym indeksie i = indeks od którego zacznie się usówanie, 1 = ilość przedmiotów do usunięcia
	}

	// Metoda czyszcząca koszyk
	clear() {
		this.items.length = 0; // Ustawia długość tablicy na 0
		// this.items = [];
		// this.items.splice(0);
	}
}

// Stworzenie klasy Product - przedmiot
class Product {
	constructor(productName, productPrice) {
		this.name = productName;
		this.price = productPrice;
	}
	// Metoda zmiany ceny
	setNewPrice(newPrice) {
		this.price = newPrice;
	}
}
