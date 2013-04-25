# Charcoal: An alternative Ember generator 

This an alternative Ember generator forked from [Yeoman's offical Ember Generator](https://github.com/yeoman/generator-ember). 

This generator creates a new Ember project that uses Bower to handle dependencies and builds with [Trek's Grunt-Neuter task](https://github.com/trek/grunt-neuter). It uses a "module" pattern for the file structure rather than the traditional controller, model, view, route, and template folders. A longer guide on using this generator is coming soon, but if you're familar with the parts involved, feel free to use it :)

## Usage

Execute these steps from the command line, one after another:

1. `mkdir webapp && cd webapp`
2. `npm install -g git@github.com:thomasboyt/charcoal.git`
3. `yo charcoal`
4. `grunt server`

A page with "Welcome to Ember.js" should appear in your browser.

## Extra Generators

`yo charcoal:module` - Generates a new folder in your `app/` containing the following:

```
foo/
  |--- foo_controller.js
  |--- foo_module.js
  |--- foo_route.js
  |--- foo_view.js
  |--- foo.handlebars
  |--- main.js
```

## Asset Compilation

The `Gruntfile` output by this generator uses the task configuration defined in `charcoal/grunt.js`, which includes various tasks that are not enabled by default.

To enable these, install the relevant Grunt plugin (i.e. `grunt-contrib-less`) and add them to the build tasks defined in `Gruntfile.js`. More documentation on both aspects of that soon.

## Bower

The default Bower configuration includes JQuery, Handlebars, Ember, and Ember Data. The first three are all their latest stable revision, while Ember Data is always pulled from [ember-data-latest.js](http://builds.emberjs.com.s3.amazonaws.com/ember-data-latest.js).

## Options

* `--skip-install`

  Skips the automatic execution of `bower` and `npm` after scaffolding has finished.

## License

[BSD license](http://opensource.org/licenses/bsd-license.php)
