define(['models/Picture', 'collections/Pictures', 'sinon'], function(Picture, Pictures, sinon) {
 
  return describe("Pictures", function() {
    var pictures;

    beforeEach(function() {
      // Madrid, spain
      pictures = new Pictures({
        maxx: -3.52491150000003,
        maxy: 40.5635903,
        minx: -3.834161799999947,
        miny: 40.3120639,
        pictureSize: "medium"
      });
      this.server = sinon.fakeServer.create();
    });

    afterEach(function() {
      this.server.restore();
    });

    it("should initialize Pictures", function() {
      expect(pictures.length).toEqual(1);
      expect(pictures.maxx).toEqual(-3.52491150000003);
      expect(pictures.pictureSize).toEqual("medium");
    });

    it("should fetch pictures from Panoramio", function() {
  
      this.server.respondWith(
        "GET",
        "http://www.panoramio.com/map/get_panoramas.php?set=public&from=0&to=20&maxx=-3.52491150000003&maxy=40.5635903&minx=-3.834161799999947&miny=40.3120639&size=medium&mapfilter=true&callback=",
        [200,
          {"Content-Type": "application/json"},
          '{count: 7282, has_more: true, map_location: Object, photos: Array[20]}'
        ]);
      pictures.fetch();

      expect(pictures.length).toEqual(1);
    });
  });
});