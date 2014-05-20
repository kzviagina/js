var dateField = document.getElementById('date');
var descrField = document.getElementById('descr');

var recordsList = {
    recordsArr: [],
    addRecord: function(date, descr) {
        this.recordsArr.push(new Record(date, descr));
    },
    deleteRecord: function(index) {
        this.recordsArr.splice(index, 1);
    }
};

function Record(date, descr) {
    this.date = date;
    this.descr = descr;
    this.resolved = false;
    this.markResolved = function() {
        this.resolved = true;
    };
}

function showRecordsList() {
    var recordTag, checkbox;
    var recordsListTag = document.getElementById('results');
    recordsListTag.innerHTML = '';
    for (var i = 0; i < recordsList.recordsArr.length; i++) {
        recordTag = document.createElement('p');
        recordTag.id = i;
        if (recordsList.recordsArr[i].resolved) {
            recordTag.style.background = '#a4e0e0';
        }
        checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        recordTag.appendChild(checkbox);
        recordTag.innerHTML += 'Date ' + recordsList.recordsArr[i].date + ' Description ' + recordsList.recordsArr[i].descr;
        recordsListTag.appendChild(recordTag);
    }
}

function getRecordsIndexes() {
    var recordsListTag = document.getElementById('results');
    var recordTag = recordsListTag.getElementsByTagName('p');
    var ids = [];
    for (var i = 0; i < recordTag.length; i++) {
        var checkbox = recordTag[i].getElementsByTagName('input')[0];
        if (checkbox.checked) {
            ids.push(parseInt(recordTag[i].getAttribute('id'), 10));
        }
    }
    return ids;
}

function doAction(action) {
    var indexArr = getRecordsIndexes();
    for (var i = indexArr.length - 1; i >= 0; i--) {
        switch (action) {
            case 'delete':
                recordsList.deleteRecord(indexArr[i]);
                break;
            case 'resolve':
                recordsList.recordsArr[indexArr[i]].markResolved();
                break;
        }
        showRecordsList();
    }
}

document.getElementById('add').onclick = function() {
    var date = dateField.value;
    var descr = descrField.value;
    if (date !== '' && descr !== '') {
        recordsList.addRecord(date, descr);
        dateField.value = '';
        descrField.value = '';
    } else {
        alert('Please enter data!');
    }
    showRecordsList();
};

document.getElementById('delete').onclick = function() {
    doAction('delete');
};

document.getElementById('resolve').onclick = function() {
    doAction('resolve');
};