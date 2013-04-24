var yeoman = require('yeoman-generator');
var util = require('util');

var Generator = module.exports = function(args, options) {
  yeoman.generators.NamedBase.apply(this, arguments);

  this.controllerType = options['controllerType'] || '';

  this.on('end', function() {
    console.log("All done :)");
  });
};

util.inherits(Generator, yeoman.generators.NamedBase);

Generator.prototype.createModule = function() {
  var name = this._.underscored(this.name);
  this.namespace = this._.classify(this.appname);
  this.modulename = this._.classify(this.name);

  var dir = this.dir = "app/" + name + "/";
  
  this.template("controller.js", dir + "controller.js");
  this.template("model.js", dir + "model.js");
  this.template("route.js", dir + "route.js");
  this.template("view.js", dir + "view.js");
  this.template("main.js", dir + "main.js");
  this.copy("template.handlebars", dir + name + ".handlebars");
};

