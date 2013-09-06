// Filename: views/MapView.js

define([
  'jquery',
  'underscore',
  'backbone',
  'models/Location',
  'collections/Locations',
  'text!templates/home.html'
], function($, _, Backbone, Location, Locations, homeTemplate){

  var MapView = Backbone.View.extend({
    el: $("#map"),
    initialize: function () {
      _.bindAll(this, 'resetMap', 'addMarker', 'zoomIn');

      this.event_aggregator.bind("map:resetMap", this.resetMap);
      this.event_aggregator.bind("map:addMarker", this.addMarker);
      this.event_aggregator.bind("map:zoomIn", this.zoomIn);
    },
    // Init Google maps.
    initMap: function () {
      console.log("Drawing map ...");
      this.center = new google.maps.LatLng(40.4167754, -3.7037902);

      var mapOptions = {
        center: this.center, // Center on Madrid
        zoom: 2,
        disableDefaultUI: true,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };

      this.map = new google.maps.Map(this.$el[0], mapOptions);
    },
    resetMap: function(center) {
      this.center = center;
      this.map.setCenter(center);
      this.map.setZoom(8);
    },
    addMarker: function(model) {
      var _this = this;
      var initialMarkerOptions = {
        map: this.map,
        draggable: true,
        animation: google.maps.Animation.DROP,
        position: this.center,
        title: 'Show pictures of ' + model.get("formatted_address"),
        icon: 'img/photo-marker.png',
        shadow: 'img/photo-marker-shadow.png'
      };
      this.marker = new google.maps.Marker(initialMarkerOptions);

      google.maps.event.addListener(_this.marker, 'click', function() {
        _this.event_aggregator.trigger("location:loadPictures", model);
      });

      google.maps.event.addListener(_this.marker, 'dragend', function() {
        var geocoder = new google.maps.Geocoder();
        var geocoderRequest = { location: _this.marker.getPosition() };
        geocoder.geocode(geocoderRequest, function(results, status){
          var geocodeResult = results[0];
          var locationModel = new Location();
          
          locationModel.setData(geocodeResult);
          _this.resetMap(_this.marker.getPosition());
          _this.resetMarker({
            title: locationModel.get("formatted_address"),
          }, locationModel);
          _this.event_aggregator.trigger("location:loadPictures", locationModel);
        });
      });
    },
    resetMarker: function(options, model) {
      var _this = this;
      this.marker.setOptions(options);
      google.maps.event.clearListeners(_this.marker, 'click');
      
      google.maps.event.addListener(_this.marker, 'click', function() {
        _this.event_aggregator.trigger("location:loadPictures", model);
      });
    },
    zoomIn: function () {
      this.map.setZoom(14);
      this.map.setCenter(this.center);
    },
    render: function (){
      this.initMap();

      return this.$el;
    }
  });

  return MapView;
});
