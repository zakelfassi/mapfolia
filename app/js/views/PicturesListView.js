// Filename: views/PicturesListView.js

define([
  'jquery',
  'underscore',
  'backbone',
  'collections/Pictures',
  'text!templates/pictures.html'
], function($, _, Backbone, Pictures, picturesTemplate){

  var PicturesListView = Backbone.View.extend({
    el: $("#container .pictures"),
    initialize: function () {
    },
    events: {
      "click .picture": "openClosePicture",
    },
    render: function (){
      var cPicturesTemplate = _.template(picturesTemplate, {pictures: this.collection.models});
      this.$el.html(cPicturesTemplate);

      return this.$el;
    },
    openClosePicture: function (e) {
      var $picture = $(e.currentTarget);

      if (e.currentTarget.dataset["opened"] == "true") {
        e.currentTarget.dataset["opened"] = "false";
        $picture.css({
          'width': '350px',
          'height': '200px'
        });
      }
      else {
        e.currentTarget.dataset["opened"] = "true";
        $picture.css({
          'width': $picture.children().first().css('width'),
          'height': $picture.children().first().css('height')
        });
      }
    }
  });

  return PicturesListView;
});
