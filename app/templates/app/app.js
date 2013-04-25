window.<%= namespace %> = Ember.Application.create();

// Default load order. Can be overriden as you see fit.
require("store");
require("modules/*/model");
require("modules/*/controller");
require("modules/*/view");
require("helpers/*");
require("router");
require("modules/*/route");
