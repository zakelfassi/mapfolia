// Filename: views/SearchView.js

define([
  'jquery',
  'underscore',
  'backbone',
  'models/Location',
  'collections/Locations',
  'views/LocationsListView',
  'text!templates/search.html'
], function($, _, Backbone, Location, Locations, LocationsListView, searchTemplate){

  var SearchView = Backbone.View.extend({
    initialize: function() {
      console.log("Search view intitialized.");
    },
    el: $("#container .header"),
    render: function(){
      var cSearchTemplate = _.template(searchTemplate, {placeholder: "Search for a location ..."});
      this.$el.append(cSearchTemplate);
    },
    events: {
      "keyup input#search": "doGeolocSearch"
    },
    doGeolocSearch: function(e) {
      var searchValue = e.currentTarget.value;

      console.log("Searching for '" + searchValue + "'");

      var geocoder = new google.maps.Geocoder();
      var geocoderRequest = { address: searchValue };
      geocoder.geocode(geocoderRequest, function(results, status){
        var locations = new Locations();

        // Populates the collection with new Geocode data.
        _.each(results, function(geocodeResult) {
          var location = new Location();
          location.setData(geocodeResult);

          locations.add(location);
        });

        // Cleanup previous LocationsListView views.
        if(this.locationsListView) {
          this.locationsListView.undelegateEvents();
          $(this.locationsListView.el).removeData().unbind();
          this.locationsListView.$el.html('');
        }
        // Init and render the locations list view.
        this.locationsListView = new LocationsListView({collection: locations});
        this.locationsListView.render();
      });
    }
  });

  return SearchView;
});
