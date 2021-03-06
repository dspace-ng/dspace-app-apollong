define([
  'backbone',
  'views/panels',
  'views/featureBox',
  'views/miniMap'
], function(Backbone, panels, FeatureBox, MiniMap) {


  // /**
  //  * X-Browser Fullscreen API Calls
  //  */
  // function reqBFS () {
  //   var e = document.documentElement;
  //   if (e.requestFullscreen) {
  //     e.requestFullscreen();
  //   } else if (e.mozRequestFullScreen) {
  //     e.mozRequestFullScreen();
  //   } else if (e.webkitRequestFullScreen) {
  //     e.webkitRequestFullScreen();
  //   }
  // }

  // function exitBFS () {
  //   if (document.exitFullscreen) {
  //     document.exitFullscreen();
  //   } else if (document.mozCancelFullScreen) {
  //     document.mozCancelFullScreen();
  //   } else if (document.webkitCancelFullScreen) {
  //     document.webkitCancelFullScreen();
  //   }
  // }


  /**
   * Class: UI
   *
   * elements:
   * * <overlaysPanel>
   * * <FeatureBox>
   * * <MiniMap>
   * * <StatusPanel>
   * * <ControlPanel>
   */
  var UI = Backbone.View.extend({

    /**
     * Property: el
     *
     * DOM element which will host UI '#id'
     *
     * Property: $el
     *
     * Backbone wrapped element to reuse
     */
    el: '#ui',

    /**
     * Property: fullScreen
     *
     * keeps state if UI fullScreen defaulting to false
     */
    fullScreen: false,

    /**
     * Property: overlaysPanel
     *
     * <OverlaysPanel> *ui element* for managing active overlays
     */
    overlaysPanel: new panels.Overlays(),

    /**
     * Property: optionsPanel
     *
     * <OptionsPanel> *ui element* for options dialog
     */
    optionsPanel: new panels.Options(),

    /**
     * Events: events
     *
     * delegting events on UI
     */
    events: {
        'click #toggleFeatureBox': 'boxToggle'
      , 'click #toggleMiniMap': 'miniMapToggle'
      , 'click #toggleFullscreen': 'fullscreenToggle'
      , 'click #featureOptions': 'toggleOverlaysPanel'
      , 'click #userOptions': 'toggleOptionsPanel'
    },

    /**
     * Method: initialize
     */
    initialize: function(){
      var self = this;

      /**
       * Property: world
       *
       * reference to the <World> from init options
       */
      this.world = this.options.world;

      /**
       * Property: map
       *
       * reference to the <Map> from init options
       *
       * passed to <MiniMap>
       * used to jump <Map>
       */

      this.map = this.options.map;

      /**
       * Property: aether
       *
       * event aggregator from <World>
       */
      this.aether = this.options.aether;


      /**
       * Event: feature:current
       *
       * jumps map to feature set to current
       */
      this.aether.on('feature:current', function( feature ){
        self.jumpMapToFeature(feature);
      });

      /**
       * featureBox
       * FIXME at this moment hardcoded passing second collection on a world
       */
      this.featureBox = new FeatureBox({ aether: this.aether, collection: this.world.featureCollections[1]});

      /**
       * creates minimap
       */
      this.miniMap = new MiniMap({world: this.world, config: this.map.config});

      /**
       * creates statusPanel
       */
      this.statusPanel = new panels.Status({model: this.world.user});
      this.controlPanel = new panels.Control({world: this.world });

    },

    /**
     * Method: render
     *
     * render all elements and sets them visible
     */
    render: function(){
      this.featureBox.visible = true;

      this.miniMap.render();
      this.miniMap.visible = true;

      this.statusPanel.render();
      this.statusPanel.visible = true;

      this.controlPanel.render();
      this.controlPanel.visible = true;
    },

    /**
     * Method: boxToggle
     *
     * toggles <FeatureBox>
     */
    boxToggle: function() {
      this.featureBox.toggle();
    },

    /**
     * Method: miniMapToggle
     *
     * toggles <MiniMap>
     */
    miniMapToggle: function(){
      this.miniMap.toggle();
    },

    /**
     * Method: toggleOverlaysPanel
     *
     * toggles <OverlaysPanel>
     */
    toggleOverlaysPanel: function(){
      this.overlaysPanel.toggle();
    },

    /**
     * Method: toggleOptionsPanel
     *
     * toggles <OptionsPanel>
     */
    toggleOptionsPanel: function() {
      this.optionsPanel.toggle();
    },

    /**
     * Method: fullscreenToggle
     *
     * toggles fulls creen mode
     */
    fullscreenToggle: function() {
      if(this.fullScreen) {
        this.miniMap.show();
        this.statusPanel.show();
        this.featureBox.show();
        this.fullScreen = false;
      } else {
        this.miniMap.hide();
        this.statusPanel.hide();
        this.featureBox.hide();
        this.fullScreen = true;
      }
    },

    /**
     * Method: jumpMapToFeature
     *
     * delegates to <Map> jumping to given feature
     *
     * Parameters:
     *
     *   feature - <Feature>
     */
     jumpMapToFeature: function( feature ){
       this.map.jumpToFeature(feature);
     }
  });

  return UI;

});
