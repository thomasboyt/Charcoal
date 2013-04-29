<%= namespace %>.IndexRoute = Ember.Route.extend({
  setupController: function (controller) {
    controller.set("content", <%= namespace %>.IndexModel.find());
  }
});

