/* call all the necessary libraries and call
   the function that fills the chart
  **/
function callIncludes(moduleUrl, div_id, text_id, jsonUrl, dateInterval, dateRange, chartType) {

  //var moduleLocation = '/modules/historical-stock-chart';
 // var moduleUrl = '/modules/historical-stock-chart';
  var modulePath = moduleUrl + '/javascript/envision';

  window.FlashCanvasOptions = {
    swfPath: modulePath + '/lib/FlashCanvas/bin/'
  };
  yepnope([
    // Libs
    modulePath + '/lib/jquery/jquery-1.7.1.min.js',
    modulePath + '/lib/flotr2/lib/bean.js',
    modulePath + '/lib/flotr2/lib/underscore-min.js',
    {
      test: (navigator.appVersion.indexOf("MSIE") != -1 && parseFloat(navigator.appVersion.split("MSIE")[1]) < 9),
      // Load for IE < 9
      yep: [
        modulePath + '/lib/FlashCanvas/bin/flashcanvas.js',
        /*'../lib/flotr2/lib/excanvas.js',*/
        modulePath + '/lib/flotr2/lib/base64.js'

      ]
    },
    modulePath + '/lib/flotr2/lib/canvas2image.js',
    /*'../lib/flotr2/lib/canvastext.js',*/
    modulePath + '/lib/bonzo/bonzo.min.js',

    // Flotr
    modulePath + '/lib/flotr2/js/Flotr.js',
    modulePath + '/lib/flotr2/js/DefaultOptions.js',
    modulePath + '/lib/flotr2/js/Color.js',
    modulePath + '/lib/flotr2/js/Date.js',
    modulePath + '/lib/flotr2/js/DOM.js',
    modulePath + '/lib/flotr2/js/EventAdapter.js',
    modulePath + '/lib/flotr2/js/Graph.js',
    modulePath + '/lib/flotr2/js/Axis.js',
    modulePath + '/lib/flotr2/js/Series.js',
    modulePath + '/lib/flotr2/js/Text.js',
    modulePath + '/lib/flotr2/js/types/lines.js',
    modulePath + '/lib/flotr2/js/types/bars.js',
    modulePath + '/lib/flotr2/js/types/points.js',
    modulePath + '/lib/flotr2/js/plugins/selection.js',
    modulePath + '/lib/flotr2/js/plugins/legend.js',
    modulePath + '/lib/flotr2/js/plugins/hit.js',
    modulePath + '/lib/flotr2/js/plugins/crosshair.js',
    modulePath + '/lib/flotr2/js/plugins/labels.js',
    modulePath + '/lib/flotr2/js/plugins/legend.js',
    modulePath + '/lib/flotr2/js/plugins/titles.js',
    {
      test: ('ontouchstart' in window),
      nope: [
        modulePath + '/lib/flotr2/js/plugins/handles.js'
      ]
    },

    // Visualization
    modulePath + '/js/Envision.js',
    modulePath + '/js/Visualization.js',
    modulePath + '/js/Component.js',
    modulePath + '/js/Interaction.js',
    modulePath + '/js/Preprocessor.js',
    modulePath + '/js/templates/namespace.js',
    modulePath + '/js/templates/Finance.js',
    modulePath + '/js/templates/TimeSeries.js',
    modulePath + '/js/templates/Zoom.js',
    modulePath + '/js/actions/namespace.js',
    modulePath + '/js/actions/hit.js',
    modulePath + '/js/actions/selection.js',
    modulePath + '/js/actions/zoom.js',
    modulePath + '/js/adapters/namespace.js',
    modulePath + '/js/adapters/flotr/namespace.js',
    modulePath + '/js/adapters/flotr/defaultOptions.js',
    modulePath + '/js/adapters/flotr/Child.js',
    modulePath + '/js/adapters/flotr/lite-lines.js',
    modulePath + '/js/adapters/flotr/whiskers.js',
    modulePath + '/js/components/namespace.js',
    modulePath + '/js/components/QuadraticDrawing.js',

    {complete:
        function () {
          if(chartType == 'finance') {
            callEnvisionChartFinance(div_id, text_id, jsonUrl, dateInterval, dateRange);
          }
          if(chartType == 'timeseries') {
            callEnvisionChartTimeseries(div_id, text_id, jsonUrl, dateInterval, dateRange);
          }
        }
    }
  ]);

}
