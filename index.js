// Stworzenie klasy Basket - koszyk
class Basket {
	constructor() {
		this.items = [];
	}
	// Skrócona metoda tworzenia konstruktora (działa tak jak ta po wyżej, ale jest mniej czytelna)
	// items = [];

	//Metoda dodawania przedmiotu do koszyka
	add(item) {
		this.items.push(item); // dodawanie przedmiotu do tablicy
	}

	// Metoda obliczania całkowitej wartości
	getTotalValue() {
		// Zastosowanie metody reduce
		// prev = poprzednia waartość, curr = obecna waartość, 0 = początekowa waartość
		return this.items.reduce((prev, curr) => prev + curr.price, 0);

		// Zastosowanie pętli for
		/*
		let totalValue = 0;
		for (let i = 0; i < this.items.length; i++) {
			totalValue += this.items[i].price;
		}
		return totalValue;
        */
	}
}

// Stworzenie klasy Product - przedmiot
class Product {
	constructor(productName, productPrice) {
		this.name = productName;
		this.price = productPrice;
	}
	// Metoda dodawania nowej ceny
	setNewPrice(newPrice) {
		this.price = newPrice;
	}
}

// Tworzenie obiektu
const shopBasket = new Basket();
const oranges = new Product(
	(productName = "Pomarańcze ULZ"),
	(productPrice = 7.55)
);
const cucumbers = new Product(
	(productName = "Ogórek duży"),
	(productPrice = 8.65)
);

// Metoda dodawania przedmiotu do koszyka
shopBasket.add(oranges);
shopBasket.add(cucumbers);

console.log(shopBasket.getTotalValue());
