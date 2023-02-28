const CHAIRS = [
  {
    name: 'Donovan Gold',
    id: 'ch1',
    description:
      'Bar stool back gold leaf and white vinyl cushion bar stool/ height: 95 cm,width 23cm',
    img: 'imgs/donovan-gold.png',
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
    img: 'imgs/nahema.png',
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
    img: 'imgs/heritage-velvet.png',
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
    img: 'imgs/court-catania.png',
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
    img: 'imgs/camille.png',
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
    img: 'imgs/bethany.png',
    price: 169,
    height: '110 cm',
    width: '53 cm',
    color: 'dark brown',
    material: 'wood',
    discount: 0.45,
  },
];

class Product {
  constructor(name, id, description, quantity, price, img) {
    this.name = name;
    this.id = id;
    this.description = description;
    this.quantity = Math.max(quantity, 0);
    this.price = Math.max(price, 0);
    this.img = img;
  }

  increaseQuantity() {
    if (this.quantity >= 1) {
      this.quantity += 1;
    }
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity -= 1;
    }
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
    img,
    height,
    width,
    color,
    material
  ) {
    super(name, id, description, quantity, price, img);
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
    img,
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
      img,
      height,
      width,
      color,
      material
    );
    this.discount = discount;
  }

  getTotalDiscountPrice() {
    return (
      this.quantity * this.price - this.discount * this.price * this.quantity
    );
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
    chair.img,
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

class ShoppingCart {
  constructor() {
    this.items = [];
  }

  addItem(item) {
    this.items.push(item);
  }

  removeItem(id) {
    const index = this.items.findIndex((item) => item.id === id);
    if (index !== -1) {
      this.items.splice(index, 1);
    }
  }

  removeAll() {
    this.items = [];
  }

  getItems() {
    return this.items;
  }

  getTotalPrice() {
    return this.items
      .reduce(
        (total, currItem) =>
          total +
          (currItem?.discount
            ? currItem.getTotalDiscountPrice()
            : currItem.getTotalPrice()),
        0
      )
      .toFixed(2);
  }

  getTotalNumberOfItems() {
    return this.items.reduce((total, currQuan) => total + currQuan.quantity, 0);
  }
}

const cart = new ShoppingCart();
const totalItemsEl = document.querySelector('.total-cart-items');

// To display how many items are there in the shopping bag
const updateCartCounter = () => {
  const totalItems = cart.getTotalNumberOfItems();
  if (totalItems >= 1) {
    totalItemsEl.innerText = totalItems;
    totalItemsEl.classList.remove('hidden');
  } else {
    totalItemsEl.classList.add('hidden');
  }
};

// To listen to every click of the add to cart button
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
    updateCartCounter();
  });
});

/** **** YOUR CART MODAL **** */
const shoppingCartModalEl = document.querySelector('.shopping-cart-modal');
const closeCart = () => {
  shoppingCartModalEl.classList.remove('show');
};

// Closing the cart if either backdrop or close button of the modal is clicked
const modalBackdropEl = document.querySelector('.modal-backdrop');
modalBackdropEl.addEventListener('click', () => {
  closeCart();
});

const closeBtnModalCartEl = document.querySelector('.btn.close-modal-btn');
closeBtnModalCartEl.addEventListener('click', () => {
  closeCart();
});

/* DOM Elements related to the shopping bag or cart */
const cartMainContentEl = document.querySelector('.cart-main-content');
// Usually it starts with an empty cart
const initialCart = () => {
  const emptyCart = document.createElement('p');
  emptyCart.innerText = 'Your shopping bag is empty';
  emptyCart.style.textAlign = 'center';
  emptyCart.style.marginTop = '5rem';
  cartMainContentEl.append(emptyCart);
};

const displayCartItems = () => {
  updateCartCounter();
  cartMainContentEl.innerHTML = '';

  if (cart.getTotalNumberOfItems() === 0) {
    cartMainContentEl.innerHTML = '';
    initialCart();
    return;
  }

  // Create the DOM elements to display the items and its button
  const cartItems = document.createElement('div');
  cartItems.classList.add('cart-items');
  cartMainContentEl.append(cartItems);

  // Loop through the cart class and add the item into the DOM
  cart.items.forEach((item) => {
    // The cart item
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    const cartItemImg = document.createElement('img');
    const cartItemDescription = document.createElement('div');
    cartItemDescription.classList.add('cart-item-description');
    const btnRemoveItem = document.createElement('button');
    btnRemoveItem.classList.add('btn', 'remove-item');
    btnRemoveItem.innerHTML = "<i class='fa-solid fa-xmark'></i>";
    btnRemoveItem.addEventListener('click', () => {
      cart.removeItem(item.id);
      displayCartItems(); // Calling itself to show on DOM that the item is removed
    });

    // Image of the item
    cartItemImg.src = item.img;
    cartItem.setAttribute('alt', `${item.name} Chair`);
    cartItem.append(cartItemImg);
    // Name of the item
    const itemName = document.createElement('p');
    itemName.classList.add('cart-item-name');
    itemName.innerText = item.name;
    // Description of the item
    cartItemDescription.append(itemName);
    const itemDescription = document.createElement('span');
    itemDescription.innerText = item.description;
    cartItemDescription.append(itemDescription);
    // Final price of the item
    const itemFinalPrice = document.createElement('p');
    itemFinalPrice.classList.add('cart-item-price');
    itemFinalPrice.innerHTML = `${
      item?.discount
        ? `<span> $${item.getTotalDiscountPrice()}<del>$${item.getTotalPrice()}</del></span>`
        : `$${item.getTotalPrice()}`
    }`;
    cartItemDescription.append(itemFinalPrice);
    // Add Minus Buttons
    const btnsContainer = document.createElement('div');
    btnsContainer.classList.add('btns');
    const btnMinus = document.createElement('button');
    btnMinus.classList.add('btn', 'minus');
    btnMinus.innerText = '-';
    btnMinus.addEventListener('click', () => {
      item.decreaseQuantity();
      displayCartItems();
    });
    btnsContainer.append(btnMinus);
    const quantity = document.createElement('span');
    quantity.classList.add('quantity');
    quantity.innerText = item.quantity;
    btnsContainer.append(quantity);
    const btnPlus = document.createElement('button');
    btnPlus.classList.add('btn', 'plus');
    btnPlus.innerText = '+';
    btnPlus.addEventListener('click', () => {
      item.increaseQuantity();
      displayCartItems();
    });
    btnsContainer.append(btnPlus);
    cartItemDescription.append(btnsContainer);

    cartItem.append(cartItemDescription);
    cartItem.append(btnRemoveItem);
    cartItems.append(cartItem);
  });

  const totalContainer = document.createElement('div');
  totalContainer.classList.add('total');
  const totalText = document.createElement('p');
  totalText.classList.add('total-text');
  totalText.innerText = 'Total:';
  totalContainer.append(totalText);
  const totalAmount = document.createElement('p');
  totalAmount.classList.add('total-amount');
  totalAmount.innerText = `$${cart.getTotalPrice()}`;
  totalContainer.append(totalAmount);

  cartMainContentEl.append(totalContainer);
  const btnConfirm = document.createElement('button');
  btnConfirm.classList.add('btn', 'confirm');
  btnConfirm.innerText = 'Confirm';
  btnConfirm.addEventListener('click', () => {
    closeCart();
  });
  const btnDelAll = document.createElement('button');
  btnDelAll.classList.add('btn', 'delete-all');
  btnDelAll.innerText = 'Delete All';
  btnDelAll.addEventListener('click', () => {
    cart.removeAll();
    cartMainContentEl.innerHTML = '';
    totalItemsEl.classList.add('hidden');
    initialCart();
  });

  cartMainContentEl.append(btnConfirm);
  cartMainContentEl.append(btnDelAll);
};

// To display the items in the cart when shopping icon is clicked
const btnCartEl = document.querySelector('.btn__cart');
btnCartEl.addEventListener('click', () => {
  cartMainContentEl.innerHTML = '';
  // 1st. Add show class to display the your cart modal
  shoppingCartModalEl.classList.add('show');
  displayCartItems();
});
