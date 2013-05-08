# Charcoal: An alternative Ember generator 

This an alternative Ember generator forked from [Yeoman's offical Ember Generator](https://github.com/yeoman/generator-ember). 

This generator creates a new Ember project that uses Bower to handle dependencies and builds with [Trek's Grunt-Neuter task](https://github.com/trek/grunt-neuter). It uses a "module" pattern for the file structure rather than the traditional controller, model, view, route, and template folders. 

What Charcoal has:

* A generator for creating a new Ember project, including dependencies via Bower.
* A default set of smart conventions and Grunt tasks to support it.
* A generator to create new Ember modules.
* [A guide to building projects with Yeoman+Grunt+Bower+Charcoal.](https://github.com/thomasboyt/charcoal/blob/master/app/templates/charcoal/readme.md)
* Preconfigured but disabled-by-default static assets tasks. Use only the dependencies you need.

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

The default Bower configuration includes jQuery, Handlebars, Ember, and Ember Data. The first three are all their latest stable revision, while Ember Data is always pulled from [ember-data-latest.js](http://builds.emberjs.com.s3.amazonaws.com/ember-data-latest.js).

## Options

* `--skip-install`

  Skips the automatic execution of `bower` and `npm` after scaffolding has finished.

## "Testing"

Testing right now is sort of ad-hoc while I figure out how to automate testing the generators. In the meantime, before a PR:

* Generate a new application and make sure that `grunt server`, `grunt test`, `grunt test-server`, and `grunt build` are working properly.
* Generate a new module and make sure it is loaded successfully.
* Run `grunt jshint` to make sure both the application and module are linted properly.

## License

[BSD license](http://opensource.org/licenses/bsd-license.php)
