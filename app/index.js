'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');

var EmberGenerator = module.exports = function EmberGenerator(args, options) {
  yeoman.generators.Base.apply(this, arguments);

  this.indexFile = this.readFileAsString(path.join(this.sourceRoot(), 'index.html'));
  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });
};

util.inherits(EmberGenerator, yeoman.generators.Base);

EmberGenerator.prototype.welcome = function() {
  console.log("Hold on while I generate '" + this._.titleize(this.appname) + "'!\n");
};

EmberGenerator.prototype.askFor = function() {
  var cb = this.async();

  var prompts = [];

  this.prompt(prompts, function (err, props) {
    if (err) {
      return this.emit('error', err);
    }

    this.namespace = this._.classify(this.appname);
    cb();
  }.bind(this));
};

EmberGenerator.prototype.createDirLayout = function() {
  this.mkdir('app');
  this.mkdir('assets');
  this.mkdir('assets/styles');
  this.mkdir('assets/images');
  this.mkdir('assets/js');
};

EmberGenerator.prototype.git = function() {
  this.copy('gitignore', '.gitignore');
  this.copy('gitattributes', '.gitattributes');
};

EmberGenerator.prototype.bower = function() {
  this.copy('bowerrc', '.bowerrc');
  this.template('_component.json', 'component.json');
};

EmberGenerator.prototype.packageFile = function() {
  this.copy('_package.json', 'package.json');
};

EmberGenerator.prototype.jshint = function() {
  this.copy('jshintrc', '.jshintrc');
};

EmberGenerator.prototype.editorConfig = function() {
  this.copy('editorconfig', '.editorconfig');
};

EmberGenerator.prototype.gruntfile = function() {
  this.template('charcoal/grunt.js');
  this.template('Gruntfile.js');
};

EmberGenerator.prototype.writeIndex = function() {
  var mainCssFiles = [];
  mainCssFiles.push('assets/styles/normalize.css');
  mainCssFiles.push('assets/styles/style.css');

  this.indexFile = this.appendStyles(this.indexFile, 'assets/styles/main.css', mainCssFiles);

  this.indexFile = this.appendScripts(this.indexFile, 'scripts/components.js', [
    'components/jquery/jquery.js',
    'components/handlebars/handlebars.runtime.js',
    'components/ember/ember.js',
    'components/ember-data/index.js'
  ]);

  this.indexFile = this.appendFiles(this.indexFile, 'js', 'scripts/main.js', [
    'app/app.js',
    'app/compiled-templates.js'
  ], null, ['app', '.tmp']);
};

EmberGenerator.prototype.all = function() {
  this.write('app/index.html', this.indexFile);

  this.copy('styles/normalize.css', 'assets/styles/normalize.css');
  this.copy('styles/style.css', 'assets/styles/style.css');

  this.template('app/index/index_route.js');
  this.template('app/index/main.js');
  this.template('app/index/index.handlebars');
  
  this.template('app/app.js');
  this.template('app/router.js');
  this.template('app/store.js');
  this.template('app/application.handlebars');

  this.template('README.md');
  this.template('charcoal/doc.md');
};
