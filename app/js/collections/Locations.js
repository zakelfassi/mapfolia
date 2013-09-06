// Filename: collections/Locations.js

define([
  'jquery',
  'underscore',
  'backbone',
  'models/Location',
  'views/LocationsListView'
], function($, _, Backbone, Location, LocationsListView){
  var Locations = Backbone.Collection.extend({
    model: Location,
    
    initialize: function(){
      console.log('Locations initialized.');
    }
  });
 
  return Locations;
});
