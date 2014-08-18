//Inheritance
function extend(Child, Parent) {
    var F = function() { };
    F.prototype = Parent.prototype;
    Child.prototype = new F();
    Child.prototype.constructor = Child;
    Child.superclass = Parent.prototype;
}


//Company
function Company(name, director) {
    var ceo = director;
    this.name = name;
    this.employees = {
        cleaners: [],
        guards: [],
        trainees: [],
        developers: [],
        managers: []
    };
    this.getArray = function (person) {
        var companyArr = [];
        switch (person.type) {
            case 'cleaner':
                companyArr = this.employees.cleaners;
                break;
            case 'guard':
                companyArr = this.employees.guards;
                break;
            case 'trainee':
                companyArr = this.employees.trainees;
                break;
            case 'developer':
                companyArr = this.employees.developers;
                break;
            case 'manager':
                companyArr = this.employees.managers;
                break;
            default:
                console.log(person.name + ' Sorry! There are no such positions in ' + this.name + '!');
        }
        return companyArr;
    };
    this.hire = function (initiator, person) {
        var companyArr = this.getArray(person);
        companyArr.push(person);
        console.log(person.name + ', welcome aboard to ' + this.name);
    };
    this.fire = function (initiator, person) {
        if (initiator === ceo || initiator === person) {
            var companyArr = this.getArray(person),
                idx = companyArr.indexOf(person);
            companyArr.splice(idx, 1);
            console.log(person.name + ' you are fired!11');
        } else {
            console.log(initiator.name + ' hasn\'t enough rules to fire ' + person.name);
        }
    };
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
function Cleaner() {
    Cleaner.superclass.constructor.apply(this, arguments);
    this.type = 'cleaner';
}
extend(Cleaner, Employee);
Cleaner.prototype.cleanUp = function() {
    console.log(this.name + ' started to clean up');
};


//Guard
function Guard () {
    Guard.superclass.constructor.apply(this, arguments);
    this.type = 'guard';
}
extend(Guard, Employee);
Guard.prototype.guardPlace = function() {
    console.log(this.name + ' started to guard');
};


function Boss () {
    Boss.superclass.constructor.apply(this, arguments);
    this.type = 'boss';
}
extend(Boss, Employee);
Boss.prototype.toInterview = function (person) {
    console.log(this.name + ' is interviewing ' + person.name);
};
Boss.prototype.hireEmployee = function (company, person) {
    company.hire(this, person);
};

//CTO & Manager inherit from Boss
function CEO () {
    CEO.superclass.constructor.apply(this, arguments);
    this.type = 'ceo';
}
extend(CEO, Boss);
CEO.prototype.fireEmployee = function (company, person) {
     company.fire(this, person);
};


//Manager
function Manager () {
    Manager.superclass.constructor.apply(this, arguments);
    this.type = 'manager';
}
extend(Manager, Boss);
Manager.prototype.assignTask = function(developer, taskName) {
    developer.receiveTask(taskName);
};

//Developer
function Developer () {
    Developer.superclass.constructor.apply(this, arguments);
    //private property
    var tasks = [];
    this.codeLines = 0;
    this.type = 'developer';
    this.acceptTask = function (taskName) {
        tasks.push(taskName);
        console.log(this.name + ' took task ' + taskName);
    };
    this.hasTasks = function () {
        return (tasks.length > 0);
    };
}
extend(Developer, Employee);
Developer.prototype.receiveTask = function(taskName) {
    if (!this.hasTasks()) {
        this.acceptTask(taskName);
    } else {
        console.log(this.name + ': Sorry, I have tasks already');
    }
};
Developer.prototype.toCode = function() {
    if (this.hasTasks()) {
        console.log('And so you code...');
        this.codeLines += 2;
    } else {
        console.log(this.name + ': I can\'t code cause I have no tasks!');
    }
};
Developer.prototype.fixBugs = function() {
    if (this.codeLines > 0) {
        console.log('Compile and load... In debug mode');
        this.codeLines--;
    } else {
        console.log('No bugs to fix!');
    }
};


//Trainee inherits from Developer but do not receive salary
function Trainee() {
    Trainee.superclass.constructor.apply(this, arguments);
    this.type = 'trainee';
}
extend(Trainee, Developer);
Trainee.prototype.receiveSalary = function() {
    console.log(this.name + ' is trainee and can\'t receive salary');
};


//Sad story
var kate = new Developer('Kate', 26, 0),
    trainee = new Trainee('Sergey', 24, 1),
    manager = new Manager('Ilona', 29, 0),
    director = new CEO('Eugene', 42, 1),
    sigma = new Company ('Sigma', director);

director.hireEmployee(sigma, manager);
manager.toInterview(kate);
director.toInterview(kate);
manager.hireEmployee(sigma, kate);
manager.toInterview(trainee);
manager.hireEmployee(sigma, trainee);

kate.comeToWork();
trainee.comeToWork();

manager.assignTask(kate, 'First task');
manager.assignTask(kate, 'Second task');

for (var i = 0; i < 3; i++) {
    kate.toCode();
}

for (var i = 0; i < 7; i++) {
    kate.fixBugs();
}

director.fireEmployee(sigma, kate);

trainee.toCode();
manager.assignTask(trainee, 'Second task');
trainee.toCode();
trainee.fixBugs();