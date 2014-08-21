//Inheritance
function extend(Child, Parent) {
    var F = function() { };
    F.prototype = Parent.prototype;
    Child.prototype = new F();
    Child.prototype.constructor = Child;
    Child.superclass = Parent.prototype;
}


//Football players factory
var PlayerFactory = (function() {

    var factory = {
        contsructors: {
            Player: function (name) {
                this.name = name;
                this.type = 'player';
                this.sex = 'male';
            },
            Goalkeeper: function() {
                arguments.callee.superclass.constructor.apply(this, arguments);
                this.type = 'goalkeeper';
            },
            Halfback: function (name) {
                arguments.callee.superclass.constructor.apply(this, arguments);
                this.type = 'halfback';
            },
            Defender: function (name) {
                arguments.callee.superclass.constructor.apply(this, arguments);
                this.type = 'defender';
            }
        },
        getInstance: function(className) {
            if (this.contsructors[className]) {
                return new this.contsructors[className](arguments[1]);
            } else {
                throw Error('Unknown class name ' + className);
            }
        }
    };
    
    //Player
    factory.contsructors.Player.prototype.pass = function() {
        console.log(this.name + ' gives pass');
    };
    
    
    //Goalkeeper
    extend(factory.contsructors.Goalkeeper, factory.contsructors.Player);    
    factory.contsructors.Goalkeeper.prototype.makeSave = function() {
        console.log('I\'ve caught the ball');
    };
    
    //Halfback
    extend(factory.contsructors.Halfback, factory.contsructors.Player);
    
    //Defender
    extend(factory.contsructors.Defender, factory.contsructors.Player);
    
    return factory;
})();

var leo = PlayerFactory.getInstance('Player', 'Leo');
var viktor = PlayerFactory.getInstance('Goalkeeper', 'Viktor Valdes');




//singleton & observer
//begin, end, delete player from field
function Match () {}

//mediator
//listen to events on field and inform funs
function Commentator () {}

//listen to commentator
function Fan () {}

// iterator + list of players who play the game
//players replacement, add players before match (not more than 11), team name, max players (if there was red card), not more than 1 goalkeeper
function Team () {}
