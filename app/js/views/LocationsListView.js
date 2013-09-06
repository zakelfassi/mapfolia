// Filename: views/LocationsListView.js

define([
  'jquery',
  'underscore',
  'backbone',
  'models/Location',
  'collections/Locations',
  'collections/Pictures',
  'views/PicturesListView',
  'text!templates/locations.html'
], function($, _, Backbone, Location, Locations, Pictures, PicturesListView,locationsTemplate){

  var LocationsListView = Backbone.View.extend({
    el: $("#container .locations"),
    initialize: function () {
      _.bindAll(this, 'loadPictures', 'positionMap');

      this.event_aggregator.bind("location:loadPictures", this.loadPictures);
    },
    events: {
      "click .location": "positionMap"
    },
    render: function (){
      var cLocationsTemplate = _.template(locationsTemplate, {locations: this.collection.models});
      this.$el.html(cLocationsTemplate);

      return this.$el;
    },
    positionMap: function (e) {
      // debugger;
      var modelCid = e.currentTarget.dataset["cid"];
      var model = this.collection.get(modelCid);

      var newCenter = new google.maps.LatLng(model.get('lat'), model.get('lng'));
      
      this.event_aggregator.trigger("map:resetMap", newCenter);
      this.event_aggregator.trigger("map:addMarker", model);

      $("input#search").val(model.get("formatted_address"));
      this.refresh();
    },
    loadPictures: function(model) {
      var _this = this;
      $("input#search").val(model.get("formatted_address"));

      window.setTimeout(function() {
        _this.event_aggregator.trigger("map:zoomIn");
      }, 500);

      console.log("loading pictures ...");
      var pictures = new Pictures({
        pictureSize: 'medium',
        maxx: model.get("maxx"),
        maxy: model.get("maxy"),
        minx: model.get("minx"),
        miny: model.get("miny"),
      });

      pictures.fetch({
        success: function(pictures) {
          if(this.picturesListView) {
            this.picturesListView.undelegateEvents();
            $(this.picturesListView.el).removeData().unbind();
            this.picturesListView.$el.html('');
          }
          this.picturesListView = new PicturesListView({collection: pictures});
          picturesListView.render();
        }
      });
    },
    refresh: function() {
      this.$el.empty();
    }
  });

  return LocationsListView;
});
