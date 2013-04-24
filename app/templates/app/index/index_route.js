<%= namespace %>.IndexRoute = Ember.Route.extend({
  model: function() {
    return Ember.Object.create({
      text: "Hello World!"
    });
  }
});

