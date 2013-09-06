// Filename: models/Location.js

define([
  'underscore',
  'backbone'
], function(_, Backbone) {
  var Location = Backbone.Model.extend({
    defaults: {
      formatted_address: "N/A",
      lat: 0,
      lng: 0,
      minx: 0,
      maxx: 0,
      miny: 0,
      maxy: 0
    },
    setData: function(geocodeResult) { // location is a Google Geocode location object.
      this.set({
        formatted_address: geocodeResult.formatted_address,
        lat: geocodeResult.geometry.location.ob,
        lng: geocodeResult.geometry.location.pb
      });

      if(geocodeResult.geometry.bounds) {
        this.set({
          miny: geocodeResult.geometry.bounds.ea.b,
          maxy: geocodeResult.geometry.bounds.ea.d,
          minx: geocodeResult.geometry.bounds.ia.b,
          maxx: geocodeResult.geometry.bounds.ia.d
        });
      }
      else {
        this.set({
          miny: this.get('lat') - 0.1,
          maxy: this.get('lat') + 0.1,
          minx: this.get('lng') - 0.1,
          maxx: this.get('lng') + 0.1 
        });
      }
    }
  });

  return Location;
});
