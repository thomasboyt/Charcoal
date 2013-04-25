var yeoman = require('yeoman-generator');
var util = require('util');

var ModuleGenerator = module.exports = function(args, options) {
  yeoman.generators.NamedBase.apply(this, arguments);

  this.controllerType = options['controllerType'] || '';

  this.on('end', function() {
    console.log("Created the module " + this.modulename + " in the folder " + this.dir);
  });
};

util.inherits(ModuleGenerator, yeoman.generators.NamedBase);

ModuleGenerator.prototype.createModule = function() {
  this.name = this._.underscored(this.name);
  this.namespace = this._.classify(this.appname);
  this.modulename = this._.classify(this.name);

  var dir = this.dir = "app/" + this.name + "/";
  
  this.template("controller.js", dir + "controller.js");
  this.template("model.js", dir + "model.js");
  this.template("route.js", dir + "route.js");
  this.template("view.js", dir + "view.js");
  this.template("main.js", dir + "main.js");
  this.copy("template.handlebars", dir + this.name + ".handlebars");
};

