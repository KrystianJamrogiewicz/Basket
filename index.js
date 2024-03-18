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
}

// Stworzenie klasy Product - przedmiot
class Product {
	constructor(productName, productPrice) {
		this.name = productName;
		this.price = productPrice;
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

console.log(oranges);
console.log(cucumbers);

console.log(shopBasket);
