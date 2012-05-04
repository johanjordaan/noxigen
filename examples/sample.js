var Option = function() {
  this.text = new TextField(20);
  this.value = new IntField();
}
module.exports.Option = Option

var Question = function() {
  this.text = new TextField(20);
  this.hints = new ArrayField(new TextField(20));
  this.options = new ArrayField(new Option());
} 
module.exports.Question = Question
