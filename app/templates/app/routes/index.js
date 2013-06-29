import Thing from '../models/index';

var IndexRoute = Ember.Route.extend({
  model: function(params, transition) {
    return Thing.find();
  },
  setupController: function (controller, model) {
    controller.set("content", model);
  }
});

export default IndexRoute;