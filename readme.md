# Charcoal: An alternative Ember generator 

This an alternative Ember generator forked from [Yeoman's offical Ember Generator](https://github.com/yeoman/generator-ember). 

This generator creates a new Ember project that uses Bower to handle dependencies and builds with [Trek's Grunt-Neuter task](https://github.com/trek/grunt-neuter). It uses a "module" pattern for the file structure rather than the traditional controller, model, view, route, and template folders. 

What Charcoal has:

* A generator for creating a new Ember project, including dependencies via Bower.
* A default set of smart conventions and Grunt tasks to support it.
* A generator to create new Ember modules.
* [A guide to building projects with Yeoman+Grunt+Bower+Charcoal.](https://github.com/thomasboyt/charcoal/blob/master/app/templates/charcoal/readme.md)

What Charcoal does not have:

* A bunch of extra command-line arguments for generating things. I mean, who wants to scaffold out an entire model on the command line? Gah. That's what writing code is for!
* Extra static asset tasks that you'll just end up customizing the hell out of anyways.

What Charcoal does not have *yet*:

Lots of things! See [the issues page](https://github.com/thomasboyt/charcoal/issues) for a short-term roadmap. I try to keep my development as transparent as possible.

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
  |--- controller.js
  |--- module.js
  |--- route.js
  |--- view.js
  |--- foo.handlebars
```

## Bower

The default Bower configuration includes JQuery, Handlebars, Ember, and Ember Data. The first three are all their latest stable revision, while Ember Data is always pulled from [ember-data-latest.js](http://builds.emberjs.com.s3.amazonaws.com/ember-data-latest.js).

## Options

* `--skip-install`

  Skips the automatic execution of `bower` and `npm` after scaffolding has finished.

## License

[BSD license](http://opensource.org/licenses/bsd-license.php)
