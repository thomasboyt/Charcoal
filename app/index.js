'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');

var EmberGenerator = module.exports = function EmberGenerator(args, options) {
  yeoman.generators.Base.apply(this, arguments);

  // setup the test-framework property, Gruntfile template will need this
  this.testFramework = options['test-framework'] || 'mocha';

  // for hooks to resolve on mocha by default
  if (!options['test-framework']) {
    options['test-framework'] = 'mocha';
  }

  // resolved to mocha by default (could be switched to jasmine for instance)
  this.hookFor('test-framework', { as: 'app' });

  this.indexFile = this.readFileAsString(path.join(this.sourceRoot(), 'index.html'));
  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });
};

util.inherits(EmberGenerator, yeoman.generators.Base);

EmberGenerator.prototype.welcome = function() {
  // welcome message
  var welcomeMsg =
  '\n     _-----_' +
  '\n    |       |' +
  '\n    |' + '--(o)--'.red + '|   .--------------------------.' +
  '\n   `---------´  |    ' + 'Welcome to Yeoman,'.yellow.bold + '    |' +
  '\n    ' + '( '.yellow + '_' + '´U`'.yellow + '_' + ' )'.yellow + '   |   ' + 'ladies and gentlemen!'.yellow.bold + '  |' +
  '\n    /___A___\\   \'__________________________\'' +
  '\n     |  ~  |'.yellow +
  '\n   __' + '\'.___.\''.yellow + '__' +
  '\n ´   ' + '`  |'.red + '° ' + '´ Y'.red + ' `\n';

  console.log(welcomeMsg);
};

EmberGenerator.prototype.askFor = function() {
  var cb = this.async();

  var prompts = [
    /*{
      name: 'compassBootstrap',
      message: 'Would you like to include Twitter Bootstrap for Sass?',
      default: 'Y/n'
    },*/
    {
      name: 'namespace',
      message: 'What would you like your app\'s namespace to be?',
      default: 'App'
    }
  ];


  this.prompt(prompts, function (err, props) {
    if (err) {
      return this.emit('error', err);
    }

    //this.compassBootstrap = (/y/i).test(props.compassBootstrap);
    this.compassBootstrap = false;
    this.namespace = props.namespace;
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
  this.template('yo_grunt.js');
  this.template('Gruntfile.js');
};

EmberGenerator.prototype.writeIndex = function() {
  var mainCssFiles = [];
  if (this.compassBootstrap) {
    mainCssFiles.push('assets/styles/style.css');
  } else {
    mainCssFiles.push('assets/styles/normalize.css');
    mainCssFiles.push('assets/styles/style.css');
  }

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

EmberGenerator.prototype.bootstrapJavaScript = function() {
  if (!this.compassBootstrap) {
    return;  // Skip if disabled.
  }

  // Wire Twitter Bootstrap plugins
  this.indexFile = this.appendScripts(this.indexFile, 'scripts/plugins.js', [
    'components/bootstrap-sass/js/bootstrap-affix.js',
    'components/bootstrap-sass/js/bootstrap-alert.js',
    'components/bootstrap-sass/js/bootstrap-dropdown.js',
    'components/bootstrap-sass/js/bootstrap-tooltip.js',
    'components/bootstrap-sass/js/bootstrap-modal.js',
    'components/bootstrap-sass/js/bootstrap-transition.js',
    'components/bootstrap-sass/js/bootstrap-button.js',
    'components/bootstrap-sass/js/bootstrap-popover.js',
    'components/bootstrap-sass/js/bootstrap-typeahead.js',
    'components/bootstrap-sass/js/bootstrap-carousel.js',
    'components/bootstrap-sass/js/bootstrap-scrollspy.js',
    'components/bootstrap-sass/js/bootstrap-collapse.js',
    'components/bootstrap-sass/js/bootstrap-tab.js'
  ]);
};

EmberGenerator.prototype.all = function() {
  this.write('app/index.html', this.indexFile);

  if (this.compassBootstrap) {
    this.copy('styles/style_bootstrap.scss', 'assets/styles/style.scss');
  } else {
    this.copy('styles/normalize.css', 'assets/styles/normalize.css');
    this.copy('styles/style.css', 'assets/styles/style.css');
  }

  this.template('app/index/index_route.js');
  this.template('app/index/main.js');
  this.template('app/index/index.handlebars');
  
  this.template('app/app.js');
  this.template('app/router.js');
  this.template('app/store.js');
  this.template('app/application.handlebars');
};
