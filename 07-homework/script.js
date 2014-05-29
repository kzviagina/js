var itemsListElement = document.getElementById('items');
var cartElement = document.getElementById('cart');
var shop = {
    stock: {
        itemsList: [
            {name: 'bag', price: 59, qty: 5, totalQty: 5, imgUrl: 'img/bag.jpg'},
            {name: 'dress', price: 69, qty: 3, totalQty: 3, imgUrl: 'img/dress.jpg'},
            {name: 'jacket', price: 49, qty: 18, totalQty: 18, imgUrl: 'img/jacket.jpg'},
            {name: 'jumper', price: 32, qty: 1, totalQty: 1, imgUrl: 'img/jumper.jpg'},
            {name: 'shoes', price: 59, qty: 12, totalQty: 12, imgUrl: 'img/shoes.jpg'},
            {name: 'shorts', price: 40, qty: 5, totalQty: 5, imgUrl: 'img/shorts.jpg'},
            {name: 'socks', price: 2, qty: 2, totalQty: 2, imgUrl: 'img/socks.jpg'},
            {name: 'top', price: 19, qty: 7, totalQty: 7, imgUrl: 'img/top.jpg'}
        ]
    },
    cart: {
        itemsList: [],
        itemsQuantity: 0,
        totalCost: 0,
        addItem: function(cartItem) {
            this.itemsList.push(cartItem);
        },
        deleteItem: function(idx) {
            cartItem = this.itemsList.splice(idx, 1)[0];
            cartItem.item.qty += cartItem.qty;
            
        },
        calcCost: function() {
            this.totalCost = 0;
            this.itemsQuantity = 0;
            for (var i = 0; i < this.itemsList.length; i++) {
                var currentItem = this.itemsList[i];
                this.itemsQuantity += currentItem.qty;
                this.totalCost += currentItem.item.price * currentItem.qty;
            }
        },
        getCartItem: function(item) {
            var cartItem = null;
            for (i = 0; i < this.itemsList.length; i++) {
                if (this.itemsList[i].item === item) {
                    cartItem = this.itemsList[i];
                    break;
                }
            }
            return cartItem;
        },
        updateQty: function(item, enteredQty) {
            if (typeof(enteredQty) === 'undefined') {
                enteredQty = 1;
            }
            //if total qty of items in stock is greater than enetered value            
            if (item.totalQty >= enteredQty) {              
                var cartItem = this.getCartItem(item);
                if (cartItem === null) {
                    cartItem = new CartItem(item);
                    this.addItem(cartItem);
                }
                var diff = cartItem.qty - enteredQty;
                item.qty += diff;
                cartItem.qty = enteredQty;

                if (enteredQty === 0) {
                    this.deleteItem(this.itemsList.indexOf(cartItem));
                }
                this.calcCost();
                showItems();
                showCart();

            } else {
                alert('Sorry, there are no so many items in stock');
            }
        }
    }
};

function CartItem(item) {
    this.item = item;
    this.qty = 0;
}

/* Event handlers */
itemsListElement.addEventListener('click', function (e) {
    var target = e.target;
    e.preventDefault();
    if (target.tagName === 'A') {
        itemIdx = target.parentNode.getAttribute('id');
        shop.cart.updateQty(shop.stock.itemsList[itemIdx]);
    }
}, false);

cartElement.addEventListener('click', function (e) {
    var target = e.target;
    e.preventDefault();
    if (target.tagName === 'A') {
        var targetIndex = parseInt(target.parentNode.parentNode.getAttribute('index'), 10);
        if (target.attributes.class.value === 'btn-remove') {
            //Remove item from cart
            shop.cart.updateQty(shop.cart.itemsList[targetIndex].item, 0);
        } else if (target.attributes.class.value === 'btn-change-qty') {
            //Change item quantity
            var enteredQty = parseInt(prompt('Please, type quantity'), 10);
            if (!isNaN(enteredQty)) {
                shop.cart.updateQty(shop.cart.itemsList[targetIndex].item, enteredQty);
            }            
        }
    }
}, false);

function showItems() {
    var itemsList = document.createDocumentFragment();
    for (var i = 0; i < shop.stock.itemsList.length; i++) {
        var item = document.createElement('li');
        var img = document.createElement('img');
        var name = document.createElement('h4');
        var price = document.createElement('span');
        var button = document.createElement('a');
        item.setAttribute('id', i);
        img.setAttribute('src', shop.stock.itemsList[i].imgUrl);
        img.setAttribute('alt', shop.stock.itemsList[i].name);
        name.innerHTML = shop.stock.itemsList[i].name;
        price.innerHTML = shop.stock.itemsList[i].price + '$';
        item.appendChild(img);
        item.appendChild(name);
        item.appendChild(price);
        if (shop.stock.itemsList[i].qty > 0) {
            button.setAttribute('class', 'btn');
            button.setAttribute('href', '#');
            button.innerHTML = 'Add to bag';
            item.appendChild(button);
        }
        itemsList.appendChild(item);
    }
    itemsListElement.innerHTML  = '';
    itemsListElement.appendChild(itemsList);
}

function showCartItem(cartList, cartItem, index) {
    var cartItemElement = document.createElement('tr');
    var name = document.createElement('td');
    var price = document.createElement('td');
    var qty = document.createElement('td');
    var actions = document.createElement('td');
    var removeBtn = document.createElement('a');
    var changeQtyBtn = document.createElement('a');
    name.innerHTML = cartItem.item.name;
    price.innerHTML = cartItem.item.price;
    qty.innerHTML = cartItem.qty;
    removeBtn.innerHTML = 'Remove';
    removeBtn.setAttribute('href', '#');
    removeBtn.setAttribute('class', 'btn-remove');
    changeQtyBtn.innerHTML = 'Change Quantity';
    changeQtyBtn.setAttribute('href', '#');
    changeQtyBtn.setAttribute('class', 'btn-change-qty');
    actions.appendChild(removeBtn);
    actions.appendChild(changeQtyBtn);
    cartItemElement.setAttribute('index', index);
    cartItemElement.appendChild(name);
    cartItemElement.appendChild(price);
    cartItemElement.appendChild(qty);
    cartItemElement.appendChild(actions);
    cartList.appendChild(cartItemElement);
}

function showCart() {
    var cartList = document.createElement('tbody');
    for (var i = 0; i < shop.cart.itemsList.length; i++) {
        showCartItem(cartList, shop.cart.itemsList[i], i);
    }
    cartElement.innerHTML = cartList.innerHTML;
}

showItems();

