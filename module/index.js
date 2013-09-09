var yeoman = require('yeoman-generator');
var util = require('util');
var argv = require('optimist').argv;

var ModuleGenerator = module.exports = function(args, options) {
  yeoman.generators.NamedBase.apply(this, arguments);

  this.controllerType = options.controllerType || '';

  if (!this.name) {
    this.log.error("ERROR: You must specify a name when generating a module.");
    process.exit(1);
  }

  this.on('end', function() {
    this.log.ok("Created the module " + this.modulename + " in the folder " + this.dir);
  });
};

util.inherits(ModuleGenerator, yeoman.generators.NamedBase);

ModuleGenerator.prototype.createModule = function() {
  this.name = this._.underscored(this.name);
  this.namespace = argv.namespace || this._.classify(this.appname);
  this.modulename = this._.classify(this.name);

  var dir = this.dir = "app/modules/" + this.name + "/";

  this.template("controller.js", dir + "controller.js");
  this.template("model.js", dir + "model.js");
  this.template("route.js", dir + "route.js");
  this.template("view.js", dir + "view.js");
  this.template("spec.js", "test/spec/" + this.name + "_spec.js");
  this.copy("template.handlebars", dir + "index.handlebars");
};

