// Filename: collections/Pictures.js

define([
  'jquery',
  'underscore',
  'backbone',
  'models/Picture',
  'views/PicturesListView'
], function($, _, Backbone, Picture, PicturesListView){
  var Pictures = Backbone.Collection.extend({
    model: Picture,
    url: function () {
      var fetchUrl = 'http://www.panoramio.com/map/get_panoramas.php?set=public&from=0&to=20&maxx='+ this.maxx +'&maxy='+ this.maxy +'&minx='+ this.minx +'&miny='+ this.miny +'&size='+ this.pictureSize +'&mapfilter=true&callback=?';
      console.log(fetchUrl);
      return fetchUrl;
    },
    initialize: function(obj) {
      this.maxx = obj.maxx;
      this.maxy = obj.maxy;
      this.minx = obj.minx;
      this.miny = obj.miny;
      this.pictureSize = obj.pictureSize;
    },
    parse: function(resp, xhr) {
      return resp.photos;
    }
  });
 
  return Pictures;
});
