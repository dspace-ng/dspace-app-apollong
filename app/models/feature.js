define([
  'underscore',
  'backbone',
  'Math.uuid'
], function(_, Backbone, MathUUID) {
  /**
   * Class: Feature
   *
   * single geographical featue of interest
   * with option to set from geoJSON feature object
   *
   * (see feature.png)
   */
  var Feature = Backbone.Model.extend({
	/**
	 * Method: initialize
	 * 
	 * initializes a <Feature> from a <location>
	 */
    initialize: function(location){
      if(location) {
        this.set(location);
      }

      if(! this.get('properties')) {
        this.set('properties', {});
      }

      if(! this.get('geometry')) {
        this.set('geometry', {});
      }

      if(! this.get('id')) {
        this.set('id', MathUUID.uuid());
      }

    },
	/**
	 * Method: getLatLon
	 * 
	 * retrives latitude and longitude
	 */
    getLatLon: function() {
      var coords = this.get('geometry').coordinates || [];
      return {
        lat: coords[1],
        lon: coords[0]
      };
    },
	/**
	 * Method: setLatLon
	 * 
	 * sets latitude and longitude
	 */
    setLatLon: function(lat, lon) {
      var geometry = this.get('geometry') || {};
      geometry.coordinates = [lon, lat];
      this.set('geometry', geometry);
      this.trigger('position-changed', this.getLatLon());
    }
  });

  return Feature;
});
