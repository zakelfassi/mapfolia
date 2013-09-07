define(['models/Picture'], function(Picture) {
 
  return describe("Picture", function() {
    var location;

    beforeEach(function() {
      picture = new Picture();
    });

    it("should set defaults", function() {
      expect(picture.get("photo_title")).toEqual("Untitled");
      expect(picture.get("photo_file_url")).toEqual("http://placehold.it/300x300");
      expect(picture.get("longitude")).toEqual(0);
      expect(picture.get("latitude")).toEqual(0);
      expect(picture.get("upload_date")).toEqual("Today");
    });

    it("should set new model attributes", function() {
      picture.set("photo_title", "LOL");
      expect(picture.get("photo_title")).toEqual("LOL");
    });
  });
});