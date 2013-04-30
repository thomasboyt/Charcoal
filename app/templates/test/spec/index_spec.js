describe("Index", function() {
  beforeEach(function () {
    Ember.run(<%= namespace %>, <%= namespace %>.advanceReadiness);
  });
  afterEach(function (done) {
    <%= namespace %>.reset();
    done();
  });
  
  it("contains the words 'Welcome to Ember.js on Charcoal'", function(done) {
    // ember.js's test promises call start(), which is equivalent to mocha's
    // done(), so we alias it
    window.start = done;

    visit("/").then(function() {
      // done() is called after this promise cb executes by ember.js's test
      // promises
      expect($("#ember-website h2").html()).to.be.equal("Welcome to Ember.js on Charcoal");

      // finishes loading fixtures so Ember Data doesn't throw an error after
      // App.reset() in teardown
      Ember.run.sync();
    });
  });
});
