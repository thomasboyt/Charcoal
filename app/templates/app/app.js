import Resolver from 'resolver';

import Router from './router';
import Store from './store';

import Thing from './models/index';

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

export default App;