// Filename: models/Picture.js

define([
  'underscore',
  'backbone'
], function(_, Backbone) {
  var Picture = Backbone.Model.extend({
    defaults: {
      photo_title: "Untitled",
      photo_file_url: "http://placehold.it/300x300",
      longitude: "0",
      latitude: "0",
      upload_date: "Today"
    },
    initialize: function() {
      this.on("change", function(model) {
        console.log("Model changed to " + model);
      });
    }
  });

  return Picture;
});
