// Filename: routes/AppRouter.js

define([
  'jquery',
  'underscore',
  'backbone',
  'views/MapView',
  'views/SearchView',
], function($, _, Backbone, MapView, SearchView) {
  
  var AppRouter = Backbone.Router.extend({
    routes: {
      'home': 'showHome',
      // Default route
      '*actions': 'default'
    }
  });
  
  var initialize = function(){
    console.log('Router initialized');
    Backbone.View.prototype.event_aggregator = _.extend({}, Backbone.Events);

    var appRouter = new AppRouter;

    appRouter.on('route:default', function (actions) {
      var mapView = new MapView();
      var searchView = new SearchView();

      mapView.render();
      searchView.render();
    });

    Backbone.history.start({ pushState: true});
  };

  return { 
    initialize: initialize
  };
});
