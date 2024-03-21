// Stworzenie klasy Basket - koszyk
class Basket {
	// Konstruktor, każdy nowy obiekt typu Basket będzie posiadał właściwość: tablica items.
	// this TRZEBA STOSOWAĆ W KONSTRUKTORZE, odnosi się do obiektu na którym zostało wywołane zdarzenie (nowy obiekt typu Basket).
	constructor() {
		const ls = this.loadFromLocalStorage(); // Do stałej ls przypisz obiekt z localStorage
		this.items = ls ? ls : []; // Operator trójargumentowy jeśli ls zwróci true to wykonaj na lewo od : jeśli false to wykonaj na prawo od :
		// Alternatywy:
		/*
		if (ls) {
			this.items = ls;
		} else {
			this.items = [];
		}
		*/
		// this.items = ls || []; // Jeśli wartość po lewej od || lub obie są fałszywe to zwróci tą po prawej jeśli prawdziwa to ją zwróci
		// this.items = ls ?? []; // Nullish Operator To samo co po wyżej tylko sprawdza czy wartości są null lub undefined
		// Wersja ze sprawdzeniem localStorage w funkcji: loadFromLocalStorage
		// this.items = this.loadFromLocalStorage();
	}
	// Skrócona metoda tworzenia konstruktora (działa tak jak ta po wyżej, ale jest mniej czytelna)
	// items = [];

	//Metoda dodawania przedmiotu do koszyka
	add(item) {
		this.items.push(item); // Dodawanie przedmiotu (item) do tablicy (items)
		this.saveToLocalStorage();
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
		this.saveToLocalStorage();
	}

	// Metoda czyszcząca koszyk
	clear() {
		this.items.length = 0; // Ustawia długość tablicy na 0
		// this.items = [];
		// this.items.splice(0);
		this.saveToLocalStorage();
	}

	saveToLocalStorage() {
		// Zapisze w localStorage pod kluczem: basket-items tablice items zamienioną na typ danych string
		localStorage.setItem("basket-items", JSON.stringify(this.items));
	}

	loadFromLocalStorage() {
		// Zwróci zawartość localStorage o kluczu basket-items i zapisze jako obiekt
		return JSON.parse(localStorage.getItem("basket-items"));

		// Aktualnie przeniesione do konstruktora
		/* // Sprawdzenie czy localStorage nie jest puste = null
		const itemsJson = localStorage.getItem("basket-items");
		if (itemsJson === null) {
			return []; // Jeśli jest puste zwróci pustą tablice
		} else {
			return JSON.parse(itemsJson); // Jeśli nie jest puste zwróci obiekt z localStorage
		}
		*/
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
