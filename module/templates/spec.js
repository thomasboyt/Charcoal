import 'app' as App;

App.rootElement = "#ember";
App.setupForTesting();
App.injectTestHelpers();

describe("<%= _.titleize(name) %>", function() {
  beforeEach(function () {
    Ember.run(App, App.advanceReadiness);
  });
  afterEach(function () {
    App.reset();
  });

  it("does something", function(done) {
    // put your assertions here
    done();
  });
});
