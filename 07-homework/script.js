(function ecommerce() {
    /* Dom Elements */
    var itemsListElement = document.getElementById('items');
    var cartElement = document.getElementById('cart');
    var totalCostElement = document.getElementById('total-cost');
    var popupElement = document.getElementById('popup');
    var popupCheckoutElement = document.getElementById('popup-checkout');
    var popupOrderElement = document.getElementById('popup-order-details');
    var firstNameField = document.getElementById('first-name');
    var lastNameField = document.getElementById('last-name');
    var addressField = document.getElementById('address');

    var shop = {
        stock: {
            itemsList: [
                {name: 'bag', price: 59, qty: 5, totalQty: 5, imgUrl: 'img/bag.jpg'},
                {name: 'dress', price: 69, qty: 3, totalQty: 3, imgUrl: 'img/dress.jpg'},
                {name: 'jacket', price: 49, qty: 18, totalQty: 18, imgUrl: 'img/jacket.jpg'},
                {name: 'jumper', price: 32, qty: 1, totalQty: 1, imgUrl: 'img/jumper.jpg'},
                {name: 'sneakers', price: 59, qty: 12, totalQty: 12, imgUrl: 'img/sneakers.jpg'},
                {name: 'shorts', price: 40, qty: 5, totalQty: 5, imgUrl: 'img/shorts.jpg'},
                {name: 'socks', price: 2, qty: 2, totalQty: 2, imgUrl: 'img/socks.jpg'},
                {name: 'skirt', price: 2, qty: 2, totalQty: 2, imgUrl: 'img/skirt.jpg'},
                {name: 'shoes', price: 2, qty: 2, totalQty: 2, imgUrl: 'img/shoes.jpg'},
                {name: 'top', price: 19, qty: 7, totalQty: 7, imgUrl: 'img/top.jpg'}
            ],
            updateStock: function(item, reservedCount) {
                item.qty = item.totalQty - reservedCount;
                showItems();
                shop.cart.calcCost();
                showCart(cartElement, totalCostElement, true);
            }
        },
        cart: {
            itemsList: [],
            itemsQuantity: 0,
            totalCost: 0,
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
            addItem: function(item) {
                var cartItem = this.getCartItem(item);
                if (cartItem === null) {
                    cartItem = new CartItem(item);
                    this.itemsList.push(cartItem);
                } else {
                    cartItem.qty++;
                }
                shop.stock.updateStock(cartItem.item, cartItem.qty);
            },
            deleteItem: function(cartItemIdx) {
                cartItem = this.itemsList.splice(cartItemIdx, 1)[0];
                shop.stock.updateStock(cartItem.item, 0);
            },
            updateQty: function(item, enteredQty) {
                var cartItem = this.getCartItem(item);
                if (enteredQty === 0) {
                    this.deleteItem(this.itemsList.indexOf(cartItem));
                } else {
                    cartItem.qty = enteredQty;
                }
                shop.stock.updateStock(cartItem.item, cartItem.qty);
            },
            calcCost: function() {
                this.totalCost = 0;
                this.itemsQuantity = 0;
                for (var i = 0; i < this.itemsList.length; i++) {
                    var currentItem = this.itemsList[i];
                    this.itemsQuantity += currentItem.qty;
                    this.totalCost += currentItem.item.price * currentItem.qty;
                }
            }
        }
    };

    function CartItem(item) {
        this.item = item;
        this.qty = 1;
    }

    /* Event handlers */
    itemsListElement.addEventListener('click', function(e) {
        var target = e.target;
        e.preventDefault();
        if (target.tagName === 'A') {
            itemIdx = target.parentNode.getAttribute('id');
            shop.cart.addItem(shop.stock.itemsList[itemIdx]);
        }
    }, false);

    cartElement.addEventListener('click', function(e) {
        var target = e.target;
        e.preventDefault();
        if (target.tagName === 'A') {
            var targetIndex = parseInt(target.parentNode.parentNode.getAttribute('index'), 10);
            if (target.attributes.class.value === 'btn-remove') {
                //Remove item from cart
                shop.cart.deleteItem(targetIndex);
            } else if (target.attributes.class.value === 'btn-change-qty') {
                //Change item quantity
                var enteredQty = parseInt(prompt('Please, type quantity'), 10);
                if (!isNaN(enteredQty)) {
                    //if total qty of items in stock is greater than enetered value            
                    if (shop.cart.itemsList[targetIndex].item.totalQty >= enteredQty) {
                        shop.cart.updateQty(shop.cart.itemsList[targetIndex].item, enteredQty);
                    } else {
                        alert('Sorry, there are no so many items in stock');
                    }
                }
            }
        }
    }, false);

    totalCostElement.addEventListener('click', function(e) {
        var target = e.target;
        e.preventDefault();
        if (target.tagName === 'A' && target.attributes.class.value === 'btn-checkout') {
            popupElement.style.display = 'block';
            popupCheckoutElement.style.display = 'block';
        }
    }, false);

    popupElement.addEventListener('click', function(e) {
        var target = e.target;
        e.preventDefault();
        if (target.tagName === 'A') {
            if (target.attributes.class.value === 'btn-ok') {
                validateForm();
            } else if (target.attributes.class.value === 'btn-cancel') {
                popupElement.style.display = 'none';
                popupCheckoutElement.style.display = 'none';
            } else if (target.attributes.class.value === 'btn-close') {
                popupElement.style.display = 'none';
                popupOrderElement.style.display = 'none';
            }
        }
    }, false);

    /* Output Functions */
    function validateForm() {
        if (firstNameField.value !== '' && lastNameField.value !== '' && addressField.value !== '') {
            showOrderDetails(firstNameField.value, lastNameField.value, addressField.value);
        } else {
            alert('Please fill all required fields');
        }
    }

    function showOrderDetails(firstNameValue, lastNameValue, addressValue) {
        var popupInner = popupOrderElement.getElementsByClassName('popup-content')[0];
        var orderFragment = document.createDocumentFragment();

        var personalInfo = document.createDocumentFragment();
        var name = document.createElement('p');
        var address = document.createElement('p');

        var cartDetails = document.createElement('table');
        var costDetails = document.createElement('p');

        name.innerHTML = 'Dear ' + firstNameValue + ' ' + lastNameValue + '!';
        personalInfo.appendChild(name);
        address.innerHTML = 'Your order will be shipped soon to: ' + addressValue;
        personalInfo.appendChild(address);

        showCart(cartDetails, costDetails, false);
        orderFragment.appendChild(personalInfo);
        orderFragment.appendChild(cartDetails);
        orderFragment.appendChild(costDetails);
        popupInner.innerHTML = '';
        popupInner.appendChild(orderFragment);

        popupCheckoutElement.style.display = 'none';
        popupOrderElement.style.display = 'block';
    }

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
        itemsListElement.innerHTML = '';
        itemsListElement.appendChild(itemsList);
    }

    function showCartItem(cartList, cartItem, index, showButtons) {
        var cartItemElement = document.createElement('tr');
        var name = document.createElement('td');
        var price = document.createElement('td');
        var qty = document.createElement('td');
        name.innerHTML = cartItem.item.name;
        price.innerHTML = cartItem.item.price + '$';
        qty.innerHTML = cartItem.qty;
        cartItemElement.setAttribute('index', index);
        cartItemElement.appendChild(name);
        cartItemElement.appendChild(price);
        cartItemElement.appendChild(qty);
        if (showButtons) {
            var actions = document.createElement('td');
            var removeBtn = document.createElement('a');
            var changeQtyBtn = document.createElement('a');
            removeBtn.innerHTML = 'Remove';
            removeBtn.setAttribute('href', '#');
            removeBtn.setAttribute('class', 'btn-remove');
            changeQtyBtn.innerHTML = 'Change Quantity';
            changeQtyBtn.setAttribute('href', '#');
            changeQtyBtn.setAttribute('class', 'btn-change-qty');
            actions.appendChild(removeBtn);
            actions.appendChild(changeQtyBtn);
            cartItemElement.appendChild(actions);
        }
        cartList.appendChild(cartItemElement);
    }

    function showCart(cartContainerElement, costContainerElement, showButtons) {
        var cartList = document.createElement('tbody');
        var checkoutBtnElement = document.createElement('a');
        for (var i = 0; i < shop.cart.itemsList.length; i++) {
            if (showButtons) {
                showCartItem(cartList, shop.cart.itemsList[i], i, true);
                checkoutBtnElement.innerHTML = 'Checkout';
                checkoutBtnElement.setAttribute('href', '#');
                checkoutBtnElement.setAttribute('class', 'btn-checkout');
            } else {
                showCartItem(cartList, shop.cart.itemsList[i], i, false);
            }
        }
        cartContainerElement.innerHTML = cartList.innerHTML;
        costContainerElement.innerHTML = 'Total ' + shop.cart.totalCost + '$';
        console.log(costContainerElement);
        if (showButtons) {
            costContainerElement.appendChild(checkoutBtnElement);
        }
    }

    showItems();
})();
