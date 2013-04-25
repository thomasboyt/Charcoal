# Developing with Yeoman & Grunt

*This file is automatically added to your repo when you create it with `yo charcoal`. It is strongly encouraged to keep it here so that users unfamilar with the build process can easily get up and running with your project!*

This project was generated with [Charcoal](https://github.com/thomasboyt/charcoal), a [Yeoman](http://yeoman.io) generator which creates scaffolding for Ember.js projects. It uses [Bower](http://bower.io/) for managing browser dependencies and [Grunt](http://gruntjs.com/) to build. If you're unfamilar with any or all of these tools, read this document to get up and running with development on this repo.

## Getting Started

If you just cloned this repo, you'll need some dependencies. (if you just created this project with `yo charcoal`, skip this section).

First, make sure you have installed [node.js](http://nodejs.org) and [npm](https://npmjs.org/). After that, you'll want to install the Grunt CLI client and Bower with:

```shell
npm install -g grunt-cli
npm install -g bower
```

Then install both Grunt dependencies and Bower dependencies with:

```shell
npm install
bower install
```

Finally, if you'd like to use Charcoal's generators to speed-up development, install Yeoman and Charcoal with:

```shell
npm install -g yeoman
npm install -g generator-charcoal
```

Your environment is now all set up! 

## Using Grunt

Applications generated with Charcoal come with a variety of pre-configured tasks (as seen in `/charcoal/grunt.js`). Rather than edit these directly, it's recommended to edit tasks in the actual `Gruntfile.js` in the root of your project. 

Usually, you'll be running one of three tasks:

* `grunt server` - Build unminifed assets to `tmp/` and host a static server.
* `grunt build` - Build minified assets for distribution.
* `grunt test` - Run tests.

These tasks simply run a variety of other tasks. These can be modified how you like.

For example, if you'd rather use Mocha instead of the default Jasmine to run your tests:

* `npm install grunt-mocha` (and don't forget to add it to your `package.json` dependencies)
* Configure `grunt-mocha` in Grunt according to its documentation
* Replace the `jasmine` task in the `test` definition with `mocha`

This can be extended as much as needed. Want to add LESS compilation? Simply install `grunt-contrib-less`, configure it, and add it to your `server` and `build` tasks. You're free to define as many custom tasks as you'd like.

## Writing Applications

### Using grunt-neuter

`grunt-neuter` is a plugin for managing "dependencies" between your app's various files. Unlike RequireJS or Browserify or any number of other dependency management systems, `grunt-neuter` is only interested in concatinating your files together in the proper order. It has only one function you need to worry about: a global `require()` processor. 

With the default configuration, files should be referenced relative to your `app/` folder. For example, if you wanted to require `/app/foo/bar.js`, you'd simply say `require(foo/bar)`.

### Generating modules

If you installed Yeoman and `generator-charcoal`, you can easily generate Ember "modules." These are simply folders grouping related functionality. An example module might be:

```
app/
|---> my_module/
      |---> controller.js
      |---> model.js
      |---> route.js
      |---> view.js
      |---> main.js
      |---> template.handlebars
```

You can generate a module like this with `yo charcoal:module <module name>`. 

### Using templates

Charcoal's default Gruntfile builds templates for you with the `ember_templates` task. This simply collects all `handlebars` or `hbs` files and compiles them to a second script that is added to your page. To reference a template in your app, just reference the name of the template (i.e. `my_module/my_template.handlebars` should be referenced as `my_template`).

## Using Bower
