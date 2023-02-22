class Product {
  constructor(name, description, quantity, price) {
    this.name = name;
    this.description = description;
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
  constructor(
    name,
    description,
    quantity,
    price,
    height,
    width,
    color,
    material
  ) {
    super(name, description, quantity, price);
    this.height = height;
    this.width = width;
    this.color = color;
    this.material = material;
  }
}

class DiscountedItem extends Furniture {
  constructor(
    name,
    description,
    quantity,
    price,
    height,
    width,
    color,
    material,
    discount
  ) {
    super(name, description, quantity, price, height, width, color, material);
    this.discount = discount;
  }

  applyDiscount() {
    this.undiscountedPrice = this.price;
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

const items = document.querySelectorAll('.item-description-container');

/*
const itemName = document.querySelector('.item-name');
const itemDescription = document.querySelector('.item-description');
const itemColor = document.querySelector('.item-color');
const itemMaterial = document.querySelector('.item-material');
const itemHeight = document.querySelector('.item-height');
const itemWidth = document.querySelector('.item-width');
const itemPrice = document.querySelector('.item-price'); */

const cart = new ShoppingCart();

/** Applying event delegation again */
items.forEach((item) => {
  item.addEventListener('click', (e) => {
    let chair;
    let itemName;
    let itemDescription;
    let itemColor;
    let itemHeight;
    let itemWidth;
    let itemPrice;
    let itemMaterial;

    if (e.target.classList.contains('item__btn')) {
      itemName = e.target.nextElementSibling.children[0].innerHTML;
      const descriptionContainerChildren =
        e.target.nextElementSibling.children[1];
      const itemDescriptionArr =
        descriptionContainerChildren.children[0].children;
      itemDescription = descriptionContainerChildren.children[0].innerText;
      console.log(itemName, descriptionContainerChildren);
      for (let i = 0; i < itemDescriptionArr.length; i += 1) {
        if (itemDescriptionArr[i].className === 'item-color') {
          itemColor = itemDescriptionArr[i].innerText;
        } else if (itemDescriptionArr[i].className === 'item-height') {
          itemHeight = parseInt(itemDescriptionArr[i].innerText, 10);
        } else if (itemDescriptionArr[i].className === 'item-width') {
          itemWidth = parseInt(itemDescriptionArr[i].innerText, 10);
        } else if (itemDescriptionArr[i].className === 'item-material') {
          itemMaterial = itemDescriptionArr[i].innerText;
        }
      }
      itemPrice = parseInt(
        descriptionContainerChildren.children[1].innerText.substring(1),
        10
      );

      // Create a function that will get the decimal of the percentage discount
      const getDecimal = (percent) => {
        let finalDecimal;
        if (percent.length === 1) {
          finalDecimal = parseFloat(`0.0${percent}`);
        } else if (percent.length === 2) {
          finalDecimal = parseFloat(`0.${percent}`);
        }
        return finalDecimal;
      };

      const discount = getDecimal(
        parseInt(
          e.target.parentElement.parentElement.firstElementChild.innerText,
          10
        ).toString()
      );

      console.log(typeof discount, discount.length);
      if (Number.isNaN(discount)) {
        chair = new Furniture(
          itemName,
          itemDescription,
          1,
          itemPrice,
          itemHeight,
          itemWidth,
          itemColor,
          itemMaterial
        );
      } else {
        chair = new DiscountedItem(
          itemName,
          itemDescription,
          1,
          itemPrice,
          itemHeight,
          itemWidth,
          itemColor,
          itemMaterial,
          discount
        );
      }

      // cart.addItem(chair);
    }
    console.log(e.target.nextElementSibling.children);
    console.log(itemName);
    console.log(itemDescription);
    console.log(itemColor);
    console.log(typeof itemHeight, itemHeight);
    console.log(typeof itemWidth, itemWidth);
    console.log(typeof itemPrice, itemPrice);
  });
});
