var Grub = require('./Grub');

var Bee = function () {
    Grub.call(this);
    this.age = 5,
    this.color = 'yellow',
    this.job = 'Keep on growing'
};

Bee.prototype.eat = function(){
    return Grub.prototype.eat()
}

module.exports = Bee;
