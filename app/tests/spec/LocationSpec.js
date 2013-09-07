define(['models/Location'], function(Location) {
 
  return describe("Location", function() {
    var location;
    var preciseGeocodeObject;
    var notPreciseGeocodeObject;
    var testAddress = "Test Palace, Madrid";

    beforeEach(function() {
      location = new Location();
    });

    it("Should set defaults", function() {
      expect(location.get("formatted_address")).toEqual("N/A");
      expect(location.get("lat")).toEqual(0);
      expect(location.get("lng")).toEqual(0);
    });

    describe("'setData' function", function() {

      it("should set 'precise' geocode data objects", function() {
        var preciseGeocodeObject = {
          formatted_address: testAddress,
          geometry: {
            location: {
              ob: 10, //x - lat
              pb: 50 //y - lng
            },
            bounds: {
              ea: {
                b: 49, //miny
                d: 51 //maxy
              },
              ia: {
                b: 9, //minx
                d: 11 //maxx
              }
            }
          }
        };
        location.setData(preciseGeocodeObject);

        expect(location.get("formatted_address")).toEqual(testAddress);
        expect(location.get("lat")).toEqual(preciseGeocodeObject.geometry.location.ob);
        expect(location.get("lng")).toEqual(preciseGeocodeObject.geometry.location.pb);
        expect(location.get("minx")).toEqual(preciseGeocodeObject.geometry.bounds.ia.b);
        expect(location.get("maxx")).toEqual(preciseGeocodeObject.geometry.bounds.ia.d);
        expect(location.get("miny")).toEqual(preciseGeocodeObject.geometry.bounds.ea.b);
        expect(location.get("maxy")).toEqual(preciseGeocodeObject.geometry.bounds.ea.d);
      });

      it("should set 'not precise' geocode data objects", function() {
        var notPreciseGeocodeObject = {
          formatted_address: testAddress,
          geometry: {
            location: {
              ob: 4, //x - lat
              pb: 10 //y - lng
            }
          }
        };
        location.setData(notPreciseGeocodeObject);

        expect(location.get("formatted_address")).toEqual(testAddress);
        expect(location.get("lat")).toEqual(notPreciseGeocodeObject.geometry.location.ob);
        expect(location.get("lng")).toEqual(notPreciseGeocodeObject.geometry.location.pb);
        expect(location.get("minx")).toEqual(notPreciseGeocodeObject.geometry.location.pb - 0.1);
        expect(location.get("maxx")).toEqual(notPreciseGeocodeObject.geometry.location.pb + 0.1);
        expect(location.get("miny")).toEqual(notPreciseGeocodeObject.geometry.location.ob - 0.1);
        expect(location.get("maxy")).toEqual(notPreciseGeocodeObject.geometry.location.ob + 0.1);
      });
    });
  });
});