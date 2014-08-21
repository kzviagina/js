HTMLElement.prototype.printInner = function () {
    var self = this;
    function printData(el) {
        if (el !== null) {
            console.log(self.innerHTML);
            console.log(el.innerHTML);
        }
    }
    printData(this.previousElementSibling);
    printData(this.nextElementSibling);
};