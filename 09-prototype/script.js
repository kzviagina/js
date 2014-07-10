//Inheritance
function extend(Child, Parent) {
    var F = function() { };
    F.prototype = Parent.prototype;
    Child.prototype = new F();
    Child.prototype.constructor = Child;
    Child.superclass = Parent.prototype;
}


//Employee classes
//name - String
//age - Number
//sex - String or Bool (1 - male, 0 - female)
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

//Cleaner
function Cleaner () {
    Cleaner.superclass.constructor.apply(this, arguments);
    this.cleanUp = function () {
        console.log(this.name + ' started to clean up');
    };
}
//Guard
function Guard () {
    Guard.superclass.constructor.apply(this, arguments);
    this.guardPlace = function () {
        console.log(this.name + ' started to guard');
    };
}

function Boss () {
    Boss.superclass.constructor.apply(this, arguments);
}

//CTO & Manager inherit from Boss
function CEO () {
    CEO.superclass.constructor.apply(this, arguments);
}

function CTO () {
    CTO.superclass.constructor.apply(this, arguments);
}

function Manager () {
    Manager.superclass.constructor.apply(this, arguments);
    this.assignTask = function () {};
}
//Developer
function Developer () {
    Developer.superclass.constructor.apply(this, arguments);
    this.codeLines = 0;
    this.tasks = [1];
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
function Trainee() {
    Trainee.superclass.constructor.apply(this, arguments);
    this.receiveSalary = function() {
        console.log(this.name + ' is trainee and can\'t receive salary');
    };
}

//Inheritance
extend(Cleaner, Employee);
extend(Guard, Employee);
extend(Boss, Employee);
extend(CEO, Boss);
extend(CTO, Boss);
extend(Manager, Boss);
extend(Developer, Employee);
extend(Trainee, Developer);

var me = new Developer('Kate', 26, 0);
var he = new Trainee('Serg', 24, 1);

//Company
function Company () {
    this.employees = {};
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