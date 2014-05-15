var shoppingAgreement = 'Do you want to add items to your shopping bag?';
var itemsAvailable = [
    {name: 'top', price: 9.99},
    {name: 'skirt', price: 19.99},
    {name: 'shorts', price: 14.99},
    {name: 'shirt', price: 24.99},
    {name: 'bag', price: 29.99},
    {name: 'dress', price: 24.99}
];
var shoppingCart = {
    itemList: [],
    itemsQuantity: 0,
    addItem: function(item) {
        this.itemList.push(item);
        this.itemsQuantity++;
    },
    deleteItem: function(item) {
        var idx = this.itemList.indexOf(item);
        this.itemList.splice(idx, 1);
    },
    calcCost: function() {
        var totalCost = 0;
        for (var i = 0; i < this.itemList.length; i++) {
            totalCost += this.itemList[i].price;
        }
        return totalCost;
    }
};

function askQuestion(question, acceptCallback, declineCallback) {
    if (question) {
        acceptCallback();
    } else {
        declineCallback();
    }
}

function startShopping() {
    var enteredItemName = prompt('Please enter item name!');
    var availability = false;
    if (enteredItemName !== null) {
        for (var i = 0; i < itemsAvailable.length; i++) {
            if (enteredItemName.toLowerCase() === itemsAvailable[i].name) {
                shoppingCart.addItem(itemsAvailable[i]);
                availability = true;
                break;
            }
        }
        if (!availability) {
            alert('This item is unavailable!');
        }
        askQuestion(confirm(shoppingAgreement), startShopping, finishShopping);
    } else {
        finishShopping();
    }
}

function finishShopping() {
    if (shoppingCart.itemList.length > 0) {
        for (var i = 0; i < shoppingCart.itemsQuantity; i++) {
            showMessage(shoppingCart.itemList[i].name);
        }
        showMessage(shoppingCart.calcCost());
    } else {
        showMessage('We finished!');
    }
}

function showMessage(text) {
    var infoTag = document.createElement('p');
    infoTag.innerHTML = text;
    document.body.appendChild(infoTag);
}

askQuestion(confirm(shoppingAgreement), startShopping, finishShopping);