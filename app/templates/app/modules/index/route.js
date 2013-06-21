import './model' as Thing;

var IndexRoute = Ember.Route.extend({
  model: function(params, transition) {
    return Thing.find();
  },
  setupController: function (controller, model) {
    controller.set("content", model);
  }
});

export = IndexRoute;