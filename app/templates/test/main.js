// stub out the start() and stop() qunit methods ember-testing tries to use
window.start = function() {};
window.stop = function() {};

var specs = Ember.keys(define.registry).filter(function(key) {
  return key.indexOf("spec") !== -1
});
specs.forEach(requireModule);