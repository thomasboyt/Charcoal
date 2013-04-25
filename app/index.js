'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');

var CharcoalGenerator = module.exports = function CharcoalGenerator(args, options) {
  yeoman.generators.Base.apply(this, arguments);

  this.indexFile = this.readFileAsString(path.join(this.sourceRoot(), 'index.html'));
  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });
};

util.inherits(CharcoalGenerator, yeoman.generators.Base);

CharcoalGenerator.prototype.welcome = function() {
  console.log("Hold on while I generate '" + this._.titleize(this.appname) + "'!\n");
};

CharcoalGenerator.prototype.askFor = function() {
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

CharcoalGenerator.prototype.createDirLayout = function() {
  this.mkdir('app');
  this.mkdir('app/modules');
  this.mkdir('app/helpers');

  this.mkdir('assets');
  this.mkdir('assets/styles');
  this.mkdir('assets/images');
  this.mkdir('assets/js');
};

CharcoalGenerator.prototype.git = function() {
  this.copy('gitignore', '.gitignore');
  this.copy('gitattributes', '.gitattributes');
};

CharcoalGenerator.prototype.bower = function() {
  this.copy('bowerrc', '.bowerrc');
  this.template('_component.json', 'component.json');
};

CharcoalGenerator.prototype.packageFile = function() {
  this.copy('_package.json', 'package.json');
};

CharcoalGenerator.prototype.jshint = function() {
  this.copy('jshintrc', '.jshintrc');
};

CharcoalGenerator.prototype.editorConfig = function() {
  this.copy('editorconfig', '.editorconfig');
};

CharcoalGenerator.prototype.gruntfile = function() {
  this.template('charcoal/grunt.js');
  this.template('Gruntfile.js');
};

CharcoalGenerator.prototype.writeIndex = function() {
  this.indexFile = this.appendFiles({
    html: this.indexFile, 
    fileType: 'css',
    optimizedPath: 'assets/styles/main.css',
    sourceFileList: [
      'assets/styles/normalize.css',
      'assets/styles/style.css'
    ],
    searchPath: '.'
  });

  this.indexFile = this.appendFiles({
    html: this.indexFile,
    fileType: 'js',
    optimizedPath: 'scripts/components.js',
    sourceFileList: [
      'components/jquery/jquery.js',
      'components/handlebars/handlebars.runtime.js',
      'components/ember/ember.js',
      'components/ember-data/index.js'
    ],
    searchPath: '.'
  });

  this.indexFile = this.appendFiles(this.indexFile, 'js', 'scripts/main.js', [
    'app/app.js',
    'app/compiled-templates.js'
  ], null, ['tmp']);
};

CharcoalGenerator.prototype.all = function() {
  this.write('app/index.html', this.indexFile);

  this.copy('styles/normalize.css', 'assets/styles/normalize.css');
  this.copy('styles/style.css', 'assets/styles/style.css');

  this.template('app/modules/index/route.js');
  this.template('app/modules/index/index.handlebars');
  
  this.template('app/app.js');
  this.template('app/router.js');
  this.template('app/store.js');
  this.template('app/application.handlebars');

  this.template('README.md');
  this.template('charcoal/readme.md');
};
