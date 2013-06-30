# Charcoal: An alternative Ember generator 

This an alternative Ember generator forked from [Yeoman's offical Ember Generator](https://github.com/yeoman/generator-ember). 

What Charcoal has:

* A generator for creating a new Ember project, including dependencies via Bower.
* A default set of smart conventions and Grunt tasks to support it, including an easily-extendable Grunt configuration.
* ES6 module transpiler integration. Write your app using [the next generation of JS modules](http://www.thomasboyt.com/2013/06/21/es6-module-transpiler.html) without having to set configure it yourself.
* A bundled loader file for Ember that will auto-resolve your dependencies. Never write "App.FooController" again!

What Charcoal does not have:

Lots of things! See [the issues page](https://github.com/thomasboyt/charcoal/issues) for a short-term roadmap. I try to keep my development as transparent as possible.

## Usage

First, if you haven't already, install Yeoman and Charcoal:

```sh
npm install -g yo generator-charcoal
``` 

After that:

1. Create a new project folder: `mkdir my_project && cd my_project`
1. Run `yo charcoal` to generate a new project template
1. Test to make sure it works with `grunt server`.

A page with "Welcome to Ember.js" should appear in your browser. Refer to the [development guide](https://github.com/thomasboyt/charcoal/blob/master/app/templates/charcoal/readme.md) for further information :)

## Bower

The default Bower configuration includes jQuery (2.x), Handlebars, Ember, and Ember Data. Check the `bower.json` file to see the specific versions used. Ember occasionally has compatibility issues between versions of Handlebars, Ember, and Ember Data, so if something seems broken, check to make sure you're using versions that work properly together.

## Options

* `--skip-install`

  Skips the automatic execution of `bower` and `npm` after scaffolding has finished.

## "Testing"

Testing right now is sort of ad-hoc while I figure out how to automate testing the generators. In the meantime, before a PR:

* Generate a new application and make sure that `grunt server`, `grunt test`, `grunt test:browser`, and `grunt build` are working properly.
* Generate a new module and make sure it is loaded successfully.
* Run `grunt jshint` to make sure both the application and module are linted properly.

## License

[BSD license](http://opensource.org/licenses/bsd-license.php)
