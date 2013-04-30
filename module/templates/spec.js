describe("<%= _.titleize(name) %>", function() {
  beforeEach(function () {
    Ember.run(<%= namespace %>, <%= namespace %>.advanceReadiness);
  });
  afterEach(function () {
    <%= namespace %>.reset();
  });

  it("does something", function(done) {
    // put your assertions here
    done();
  });
});
