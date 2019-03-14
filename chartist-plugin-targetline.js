/**
 * Chartist.js plugin to display a target line on a chart.
 * With code from @gionkunz in https://github.com/gionkunz/chartist-js/issues/235
 * and @OscarGodson in https://github.com/gionkunz/chartist-js/issues/491.
 * and @EmersonBottero in https://github.com/gionkunz/chartist-js/issues/235
 * Based on https://github.com/gionkunz/chartist-plugin-pointlabels
 */
/* global Chartist */
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(["chartist"], function (Chartist) {
      return (root.returnExportsGlobal = factory(Chartist));
    });
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like enviroments that support module.exports,
    // like Node.
    module.exports = factory(require("chartist"));
  } else {
    root['Chartist.plugins.targetline'] = factory(Chartist);
  }
}(this, function (Chartist) {
    /**
     * Chartist.js plugin to display a data label on top of the points in a line chart.
     *
     */
    /* global Chartist */
    (function(window, document, Chartist) {
    'use strict';

    var defaultOptions = {
      class: 'ct-target-line',
      value: null
    };

    Chartist.plugins = Chartist.plugins || {};
    Chartist.plugins.ctTargetLine = function(options) {

      options = Chartist.extend({}, defaultOptions, options);

      return function ctTargetLine(chart) {      
        chart.on('created', function (context) {

          if (context.options.horizontalBars ){ //vertical target bar
            var targetLineX = context.chartRect.x1 + context.axisX.projectValue(options.value);

            context.svg.elem('line', {
              x1: targetLineX,
              x2: targetLineX,
              y1: context.chartRect.y1,
              y2: context.chartRect.y2
            }, options.class);
            
          } else {//horizontal target bar
            var targetLineY =context.chartRect.y1 - context.axisY.projectValue(options.value);

            context.svg.elem('line', {
              x1: context.chartRect.x1,
              x2: context.chartRect.x2,
              y1: targetLineY,
              y2: targetLineY
            }, options.class);
            
          }
        });
      };
    };
  }(window, document, Chartist));

  return Chartist.plugins.targetline;

}));