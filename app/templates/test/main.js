// Stub out window.start() and window.stop() methods Ember Testing looks for
window.start = function() {};
window.stop = function() {};

// Runs every *_spec module loaded from spec
var specs = Ember.keys(define.registry).filter(function(key) {
  return key.indexOf("spec/") === 0;
});
specs.forEach(requireModule);