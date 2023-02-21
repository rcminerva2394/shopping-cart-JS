/*
1) Create a Product item class
   - Methods: name, quantity, increase or decrease quatity, price
2) Create different furniture class
3) Create a discounted class which will inherit the furniture type
3) Create shopping cart class
   - Methods: addItem, removeItem, getItems, getTotalPrice
*/

class Product {
  constructor(name, quantity, price) {
    this.name = name;
    this.quantity = Math.max(quantity, 0);
    this.price = Math.max(price, 0);
  }

  increaseQuantity() {
    this.quantity += this.quantity;
  }

  decreaseQuantity() {
    this.quantity -= this.quantity;
  }

  getTotalPrice() {
    return this.price * this.quantity;
  }
}

class Furniture extends Product {
  constructor(name, quantity, price, height, width, color, material) {
    super(name, quantity, price);
    this.height = height;
    this.width = width;
    this.color = color;
    this.material = material;
  }
}

class DiscountedItem extends Furniture {
  constructor(name, quantity, price, height, width, color, material, discount) {
    super(name, quantity, price, height, width, color, material);
    this.discount = discount;
  }

  applyDiscount() {
    this.price -= this.price * this.discount;
  }
}

class ShoppingCart {
  constructor() {
    this.items = [];
  }

  addItem(item) {
    this.items.push(item);
  }

  removeItem(item) {
    const index = this.items.indexOf(item);
    if (index !== -1) {
      this.items.splice(index, 1);
    }
  }

  getItems() {
    return this.items;
  }

  getTotalPrice() {
    return this.items.reduce(
      (total, currItem) => total + currItem.price * currItem.quantity,
      0
    );
  }
}
