var itemsListElement = document.getElementById('items');
var cartElement = document.getElementById('cart');
var shop = {
    cart: {
        itemList: [],
        itemsQuantity: 0,
        addItem: function(item) {
            this.itemList.push(new CartItem(item));
        },
        deleteItem: function(idx) {
            cartItem = this.itemList.splice(idx, 1)[0];
            cartItem.item.qty += cartItem.qty;
            showItems();
            showCart();
        },
        calcCost: function() {
            var totalCost = 0;
            for (var i = 0; i < this.itemList.length; i++) {
                totalCost += this.itemList[i].price;
            }
            return totalCost;
        },
        updateQty: function(item, enteredQty) {
            
            if (item.qty > 0) {
                var cartItem = null;
                for (i = 0; i < this.itemList.length; i++) {
                    if (this.itemList[i].item === item) {
                        cartItem = this.itemList[i];
                    }
                }
                
                if (typeof (enteredQty) !== 'undefined') {
                    if (enteredQty === 0) {
                        this.deleteItem(this.itemList.indexOf(cartItem));
                    }
                    else if (enteredQty >  (item.qty + cartItem.qty)) { 
                        alert('Sorry, there are no so many items in stock');
                    }
                    else {
                        var totalItemCount = item.qty + cartItem.qty;
                        this.itemsQuantity -= cartItem.qty;
                        cartItem.qty = enteredQty;
                        this.itemsQuantity += enteredQty;
                        item.qty = totalItemCount;
                        shop.itemsInStock.reserveItem(item, enteredQty);
                        
                        showCart();
                    }
                } else {
                    //If item added to cart
                    if (cartItem !== null) {
                        // Update its quantity
                        cartItem.qty++;
                    } else {
                        //Othervise add item
                        this.addItem(item);
                    }

                    shop.itemsInStock.reserveItem(item);
                    this.itemsQuantity++;
                    showCart();
                }
            }
        }
    },
    
    itemsInStock: {
        itemsList: [
            {name: 'bag', price: 59, qty: 5, imgUrl: 'img/bag.jpg'},
            {name: 'dress', price: 69, qty: 3, imgUrl: 'img/dress.jpg'},
            {name: 'jacket', price: 49, qty: 18, imgUrl: 'img/jacket.jpg'},
            {name: 'jumper', price: 32, qty: 1, imgUrl: 'img/jumper.jpg'},
            {name: 'shoes', price: 59, qty: 12, imgUrl: 'img/shoes.jpg'},
            {name: 'shorts', price: 40, qty: 5, imgUrl: 'img/shorts.jpg'},
            {name: 'socks', price: 2, qty: 2, imgUrl: 'img/socks.jpg'},
            {name: 'top', price: 19, qty: 7, imgUrl: 'img/top.jpg'}
        ],
        reserveItem: function(item, amount) {
            if (typeof(amount) !== 'undefined') {
                item.qty -= amount;
            } else {
                item.qty -= 1;
                if (item.qty === 0) {
                    showItems();
                }
            }
        }
    }
};

function CartItem(item) {
    this.item = item;
    this.qty = 1;
}

function showCart() {
    var cartList = document.createElement('tbody');
    for (var i = 0; i < shop.cart.itemList.length; i++) {
        showCartItem(cartList, shop.cart.itemList[i], i);
    }
    cartElement.innerHTML = cartList.innerHTML;
}

/* Event handlers */
itemsListElement.addEventListener('click', function (e) {
    var target = e.target;
    if (target.tagName === 'A') {
        itemIdx = target.parentNode.getAttribute('id');
        shop.cart.updateQty(shop.itemsInStock.itemsList[itemIdx]);
    }
}, false);

cartElement.addEventListener('click', function (e) {
    var target = e.target;
    if (target.tagName === 'A') {
        var targetIndex = parseInt(target.parentNode.parentNode.getAttribute('index'), 10);
        if (target.attributes.class.value === 'btn-remove') {
            //Remove item from cart
            shop.cart.deleteItem(targetIndex);            
        } else if (target.attributes.class.value === 'btn-change-qty') {
            //Change item quantity
            var enteredQty = prompt('Please, type quantity');
            shop.cart.updateQty(shop.cart.itemList[targetIndex].item, parseInt(enteredQty, 10));
        }
    }
}, false);

function showItems() {
    var itemsList = document.createDocumentFragment();
    for (var i = 0; i < shop.itemsInStock.itemsList.length; i++) {
        var item = document.createElement('li');
        var img = document.createElement('img');
        var name = document.createElement('h4');
        var price = document.createElement('span');
        var button = document.createElement('a');
        item.setAttribute('id', i);
        img.setAttribute('src', shop.itemsInStock.itemsList[i].imgUrl);
        img.setAttribute('alt', shop.itemsInStock.itemsList[i].name);
        name.innerHTML = shop.itemsInStock.itemsList[i].name;
        price.innerHTML = shop.itemsInStock.itemsList[i].price + '$';
        item.appendChild(img);
        item.appendChild(name);
        item.appendChild(price);
        if (shop.itemsInStock.itemsList[i].qty > 0) {
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

showItems();

