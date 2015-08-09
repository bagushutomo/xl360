(function(XM) {

  XM.apply(XM, {
    // intended for utility class
    util: {
      cachebuster: function() {
        return '?cb=' + Math.random() * 10000000000000000;
      }
    },

    // intended for component package..
    com: {},

    // intended for calling internal method via browser console..
    proxy: {
      abortImageLoaded: function() {}
    },

    config: {
      isFullExp: true
    },

    mediaqueries: {
      smallOnly : 'screen and (min-width: 0px) and (max-width: 768px)',
      mediumUp:   'screen and (min-width: 769px)',
      mediumOnly: 'screen and (min-width: 769px) and (max-width: 992px)',
      mobileOnly: 'screen and (min-width: 0px) and (max-width: 992px)',
      largeUp:    'screen and (min-width: 993px)',
      largeOnly:  'screen and (min-width: 993px) and (max-width: 1200px)',
      xLargeOnly: 'screen and (min-width: 1201px) and (max-width: 1440px)',
      xxLargeUp:  'screen and (min-width: 1441px)'
    }
  });

})(XM);