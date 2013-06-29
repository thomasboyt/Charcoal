'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');

var CharcoalGenerator = module.exports = function CharcoalGenerator(args, options) {
  yeoman.generators.Base.apply(this, arguments);

  this.indexFile = this.readFileAsString(path.join(this.sourceRoot(), 'public/index.html'));
  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.namespace = this._.classify(this.appname);
};

util.inherits(CharcoalGenerator, yeoman.generators.Base);

CharcoalGenerator.prototype.welcome = function() {
  this.log('This generator will generate a new Ember application called '
           + this._.classify(this.appname) + ' in the folder '
           + this.env.cwd + '.');
};

CharcoalGenerator.prototype.askFor = function() {
  var cb = this.async();

  var prompts = [];

  prompts.push({
    default: 'Y/n',
    name: 'continue',
    message: 'Do you want to continue?'
  });

  this.prompt(prompts, function (err, props) {
    if (err) {
      return this.emit('error', err);
    }

    if (props.continue.match(/y/i)) {
      cb();
    }

  }.bind(this));
};

CharcoalGenerator.prototype.createDirLayout = function() {
  this.mkdir('app');
  this.mkdir('app/helpers');
};

CharcoalGenerator.prototype.git = function() {
  this.copy('gitignore', '.gitignore');
  this.copy('gitattributes', '.gitattributes');
};

CharcoalGenerator.prototype.bower = function() {
  this.copy('bowerrc', '.bowerrc');
  this.template('_bower.json', 'bower.json');
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
  this.directory('configurations/');
  this.template('Gruntfile.js');
};

CharcoalGenerator.prototype.mochaTests = function() {
  this.template('test/index.html');
  this.template('test/main.js');
  this.template('test/spec/index_spec.js');
};

CharcoalGenerator.prototype.writeIndex = function() {
  this.indexFile = this.appendFiles({
    html: this.indexFile,
    fileType: 'css',
    optimizedPath: 'styles/main.css',
    sourceFileList: [
      'components/normalize-css/normalize.css',
      'styles/style.css'
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
  this.write('public/index.html', this.indexFile);

  // Styles
  this.copy('styles/style.css', 'styles/style.css');

  // Example Module
  this.template('app/controllers/index.js');
  this.template('app/models/index.js');
  this.template('app/routes/index.js');
  this.template('app/views/index.js');
  this.template('app/templates/index.handlebars');

  // app/ files
  this.template('app/templates/application.handlebars');
  this.template('app/app.js');
  this.template('app/router.js');
  this.template('app/store.js');
  this.template('vendor/loader.js');

  // Generated docs
  this.template('README.md');
};
