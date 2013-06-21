// see vendor.loader.js
import 'resolver' as Resolver;

import './router' as Router;
import './store' as Store;

import './modules/index/model' as Thing;

var App = Ember.Application.create({
  Router: Router,
  Store: Store,
  resolver: Resolver
});

// Create fixtures
Thing.FIXTURES = [
  {
    text: "Ember.js",
    url: "http://emberjs.com",
    id: 1
  },
  {
    text: "Ember Data",
    url: "https://github.com/emberjs/data",
    id: 2
  },
  {
    text: "ES6 module transpiler",
    url: "https://github.com/square/es6-module-transpiler",
    id: 3
  },
  {
    text: "Yeoman",
    url: "http://yeoman.io",
    id: 4
  }
];

export = App;