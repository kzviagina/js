//Inheritance

//Employee classes
function Employee (name, age, sex) {
    this.name = name;
    this.age = age;
    this.sex = sex;
}

Employee.prototype.comeToWork = function () {
    console.log(this.name + ' came to work');
};
Employee.prototype.leaveWork = function () {
    console.log(this.name + ' left work');
};
Employee.prototype.takeVacation = function () {
    console.log(this.name + ' is on vacation');
};
Employee.prototype.receiveSalary = function () {
    var pronoun;
    pronoun = (this.sex === 'male' || this.sex === 1) ? 'his' : 'her';
    console.log(this.name + ' received ' + pronoun + ' salary');
};
Employee.prototype.retire = function () {
    console.log(this.name + ' retired');
};

//var me = new Employee('Kate', 26, 0);

function Cleaner () {
    this.cleanUp = function () {
        console.log(this.name + ' started to clean up');
    };
}

function Guard () {
    this.guardPlace = function () {
        console.log(this.name + ' started to guard');
    };
}

function Boss () {
    
}

//CTO & Manager inherit from Boss
function CEO () {
    
}

function CTO () {
    
}

function Manager () {
    this.assignTask = function () {};
}

function Developer () {
    this.codeLines = 0;
    this.tasks = [];
    this.toCode = function () {
        if (this.tasks.length) {
            console.log('And so you code...');
            this.codeLines++;
        }
    };
    this.fixBugs = function () {
        if (this.codeLines > 0) {
            console.log('Compile and load... In debug mode');
        }
    };
}

//Trainee inherits from Developer do not receive salary
function Trainee () {
    
}

//company
function Company () {
    this.cleaners = [];
    this.guards = [];
    this.trainees = [];
    this.qa = [];
    this.developers = [];
    this.managers = [];
    this.directors = [];
    
    
    
    this.hireEmployee = function (person) {
        //company.push(person);
    };
    this.fireEmployee = function (person) {
        //var idx = person.indexOf(companyArr);
        //companyArr.splice(idx, 1);
    };
}