const CHAIRS = [
  {
    name: 'Donovan Gold',
    id: 'ch1',
    description:
      'Bar stool back gold leaf and white vinyl cushion bar stool/ height: 95 cm,width 23cm',
    img: '/imgs/donovan-gold.png',
    price: 199,
    height: '95 cm',
    width: '23 cm',
    color: 'gold',
    material: 'vinyl',
  },
  {
    name: 'Nahema',
    id: 'ch2',
    description:
      'Bar stool with backrest dark blue metal/height: 110 cm, width: 53cm',
    img: '/imgs/nahema.png',
    price: 289,
    height: '110 cm',
    width: '53 cm',
    color: 'dark blue',
    material: 'metal',
    discount: 0.3,
  },
  {
    name: 'Heritage Velvet Chair',
    id: 'ch3',
    description:
      'Cafe chair with backrest blue almaz wood/height: 115 cm, width: 85cm',
    img: '/imgs/heritage-velvet.png',
    price: 489,
    height: '115 cm',
    width: '85 cm',
    color: 'blue almaz',
    material: 'wood',
  },
  {
    name: 'Court Catania Chair',
    id: 'ch4',
    description:
      'Cafe chair with backrest, blue velvet metal/height: 82 cm,width: 75cm',
    img: '/imgs/court-catania.png',
    price: 269,
    height: '82 cm',
    width: '75 cm',
    color: 'blue velvet',
    material: 'metal',
  },
  {
    name: 'Camille Chair',
    id: 'ch5',
    description:
      'Cafe chair with backrest golden olive metal/height: 101 cm,width: 53cm',
    img: '/imgs/camille.png',
    price: 339,
    height: '101 cm',
    width: '53 cm',
    color: 'golden olive',
    material: 'metal',
  },
  {
    name: 'Bethany',
    id: 'ch6',
    description:
      'Bar stool with backrest dark brown wood /height: 110 cm, width: 53cm',
    img: '/imgs/bethany.png',
    price: 169,
    height: '110 cm',
    width: '53 cm',
    color: 'dark brown',
    material: 'wood',
    discount: 0.45,
  },
];

class Product {
  constructor(name, id, description, quantity, price) {
    this.name = name;
    this.id = id;
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
    id,
    description,
    quantity,
    price,
    height,
    width,
    color,
    material
  ) {
    super(name, id, description, quantity, price);
    this.height = height;
    this.width = width;
    this.color = color;
    this.material = material;
  }
}

class DiscountedItem extends Furniture {
  constructor(
    name,
    id,
    description,
    quantity,
    price,
    height,
    width,
    color,
    material,
    discount
  ) {
    super(
      name,
      id,
      description,
      quantity,
      price,
      height,
      width,
      color,
      material
    );
    this.discount = discount;
  }

  applyDiscount() {
    this.undiscountedPrice = this.price;
    this.price -= this.price * this.discount;
  }
}

class Catalogue {
  constructor() {
    this.chairs = [];
  }

  addChair(chair) {
    this.chairs.push(chair);
  }
}

const chairCatalogue = new Catalogue();

CHAIRS.forEach((chair) => {
  let newChair;
  const args = [
    chair.name,
    chair.id,
    chair.description,
    1,
    chair.price,
    chair.height,
    chair.width,
    chair.color,
    chair.material,
  ];

  if (chair?.discount === undefined) {
    newChair = new Furniture(...args);
  } else {
    newChair = new DiscountedItem(...args, chair.discount);
  }

  chairCatalogue.addChair(newChair);
});

console.log(chairCatalogue);

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

  getTotalNumberOfItems() {
    return this.items.reduce((total, currQuan) => total + currQuan.quantity, 0);
  }
}

const cart = new ShoppingCart();
const totalItemsEl = document.querySelector('.total-cart-items');

// To listen to every click of the add item button
const btns = document.querySelectorAll('.btn.item__btn');
btns.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    const { id } = e.target;
    const foundItem = cart.items.find((item) => item.id === id);
    if (foundItem) {
      foundItem.increaseQuantity();
    } else {
      const chosenChair = chairCatalogue.chairs.find(
        (chair) => chair.id === id
      );
      cart.addItem(chosenChair);
      console.log(chosenChair);
    }
    // To display how many items added in the shopping bag
    const totalItems = cart.getTotalNumberOfItems();
    if (totalItems >= 1) {
      totalItemsEl.innerText = totalItems;
      totalItemsEl.classList.remove('hidden');
    } else {
      totalItemsEl.classList.add('hidden');
    }
  });
});

/* const items = document.querySelectorAll('.item-description-container'); */

/*
const itemName = document.querySelector('.item-name');
const itemDescription = document.querySelector('.item-description');
const itemColor = document.querySelector('.item-color');
const itemMaterial = document.querySelector('.item-material');
const itemHeight = document.querySelector('.item-height');
const itemWidth = document.querySelector('.item-width');
const itemPrice = document.querySelector('.item-price'); */

/** Applying event delegation again */
/*
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

      console.log(typeof discount);
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
    console.log(chair);
    cart.addItem(chair);
    console.log(cart.getItems());
    console.log(cart.items);
  });
});

*/
