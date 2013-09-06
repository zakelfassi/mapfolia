define(["jquery","underscore","backbone","models/Location","collections/Locations","collections/Pictures","views/PicturesListView","text!templates/locations.html"],function(e,t,n,r,i,s,o,u){var a=n.View.extend({el:e("#container .locations"),initialize:function(){t.bindAll(this,"loadPictures","positionMap"),this.event_aggregator.bind("location:loadPictures",this.loadPictures)},events:{"click .location":"positionMap"},render:function(){var e=t.template(u,{locations:this.collection.models});return this.$el.html(e),this.$el},positionMap:function(t){var n=t.currentTarget.dataset.cid,r=this.collection.get(n),i=new google.maps.LatLng(r.get("lat"),r.get("lng"));this.event_aggregator.trigger("map:resetMap",i),this.event_aggregator.trigger("map:addMarker",r),e("input#search").val(r.get("formatted_address")),this.refresh()},loadPictures:function(t){var n=this;e("input#search").val(t.get("formatted_address")),window.setTimeout(function(){n.event_aggregator.trigger("map:zoomIn")},500),console.log("loading pictures ...");var r=new s({pictureSize:"medium",maxx:t.get("maxx"),maxy:t.get("maxy"),minx:t.get("minx"),miny:t.get("miny")});r.fetch({success:function(t){this.picturesListView&&(this.picturesListView.undelegateEvents(),e(this.picturesListView.el).removeData().unbind(),this.picturesListView.$el.html("")),this.picturesListView=new o({collection:t}),picturesListView.render()}})},refresh:function(){this.$el.empty()}});return a});