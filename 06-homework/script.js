var htmlElement = document.getElementById('div-with-id');

/* 1 */
var attrs = [];

function appendDiv() {
    var div = document.createElement('div');
    document.body.appendChild(div);
    return div;
};
var div = appendDiv();

function getAttrs(el) {
    for (var i = 0; i < el.attributes.length; i++) {
        if (typeof el.attributes[i] !== 'function') {
            attrs.push(el.attributes[i].nodeName);
        }
    }
    return attrs;
}

function showAttrs(htmlElement) {
    var attrsText = getAttrs(htmlElement);
    if (htmlElement.children.length) {
        for (var i = 0; i < htmlElement.children.length; i++) {
            showAttrs(htmlElement.children[i]);
        } 
    }
    div.innerHTML = attrsText;
}

/* 2 & 3 Calc valid and invalid links qty */
function calcLinks(el) {
    var links = el.getElementsByTagName('a');
    var validLinksQty = 0, invalidLinksQty = 0;
    var linksInfo = document.createElement('p');
    
    if (links.length) {
        for (var i = 0; i < links.length; i++) {
            if (typeof (links[i].attributes.href) !== 'undefined') {
                validLinksQty++;
            } else {
                invalidLinksQty++;
                var attr = document.createAttribute('not-valid');
                attr.nodeValue = true;
                links[i].attributes.setNamedItem(attr);
            }
        }
    }
    
    el.style.border = '1px solid #f00';
    linksInfo.style.color = '#f00';
    linksInfo.innerHTML = 'Valid links quantity: ' + validLinksQty + ' and not valid links quantity: ' + invalidLinksQty;
    el.appendChild(linksInfo);
}

/* 4 */
var tagToDelete = document.getElementById('tagToDelete');
function removeTags(tag) {
    var docTags = document.getElementsByTagName('*');
    var tagsList = document.getElementsByTagName(tag);
    var tagExists = false;
    
    for (var i = 0; i < docTags.length; i++) {
        if (tag.toLowerCase() === docTags[i].tagName.toLowerCase()) {
            tagExists = true;
        }
    }
    
    if (!tagExists) {
        alert('There are no such tag in the document');
    } else {
        var deletedInfo = document.createTextNode('Deleted tag <' + tag + '> quantity: ' + tagsList.length);
        for (var i = tagsList.length-1; i >= 0; i--) {
            tagsList[i].parentNode.removeChild(tagsList[i]);
        }
    }
    document.body.appendChild(deletedInfo);    
}

/* 5 */
function showSiblings(el) {
    var parent = el.parentNode;
    for (var i = 0; i < parent.children.length; i++) {
        if (el.tagName === parent.children[i].tagName && el !== parent.children[i]) {
            console.log(parent.children[i]);
        }
    }
}

/* Execute functions */
showAttrs(htmlElement);
calcLinks(htmlElement);
document.getElementById('removeTags').onclick = function() {
    removeTags(tagToDelete.value);
};
showSiblings(htmlElement);