function Cat(name, owner) {
  this.name = name;
  this.owner = owner;
}

Cat.prototype.cuteStatement = function () {
  return this.owner + " loves " + this.name;
}

gizmo = new Cat("Gizmo", "Ned")
breakfast = new Cat("Breakfast", "Kush")

Cat.prototype.cuteStatement = function () {
  return "Everyone loves " + this.name;
}

Cat.prototype.meow = function () {
  return "meow";
}

breakfast.meow = function () {
  return "double meow";
}

console.log(gizmo.meow());
console.log(breakfast.meow());
