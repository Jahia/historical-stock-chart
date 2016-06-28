/*
 * the function transform the finance
 * Quandl data to envision data.
 * */
function toDataJsonTimeseries(originalJson, reverse){
  var
      index = [],
      price = [],
      priceData = [],
      volume = [],
      volumeData = [],
      summary = [],
      summaryTicks = [];


  var i, length = originalJson.dataset.data.length;

  for (i = 0; i < length; i++) {
    index.push(i);
    priceData.push(originalJson.dataset.data[i][4]);
    volumeData.push(originalJson.dataset.data[i][5]);
    summaryTicks.push(
        {"date":   originalJson.dataset.data[i][0],
          "open":   originalJson.dataset.data[i][1],
          "high":   originalJson.dataset.data[i][2],
          "low":    originalJson.dataset.data[i][3],
          "close":  originalJson.dataset.data[i][4],
          "volume": originalJson.dataset.data[i][5]}
    );
  }

  if(reverse){
    priceData.reverse();
    volumeData.reverse();
    summaryTicks.reverse();
  }

  price.push(index);
  price.push(priceData);
  volume.push(index);
  volume.push(volumeData);
  summary.push(index);
  summary.push(priceData);

  return JSON.parse(JSON.stringify({
    summaryTicks : summaryTicks,
    price : price,
    volume : volume,
    summary : summary
  }));
}


/*
 *  the function call the function getJsonData
 *  with timeout = 300 sec
 * */
function callEnvisionChartTimeseries(_div_id, _text_id, _jsonUrl, _dateInterval, _dateRange){
  setTimeout( function() {
    getJsonDataTimeseries(_div_id, _text_id, _jsonUrl, _dateInterval, _dateRange);
  }, 1500);
}

/*
 * the function get the json
 * data from url.
 * */
function getJsonDataTimeseries(_div_id, _text_id, _jsonUrl, _dateInterval, _dateRange){
  var dateNow = Date.today();
  var dateTimeParameters = '';

  if(!(_dateInterval === '') && !(_dateRange === '')){
    if(_dateInterval == 'M'){
      var newDate = Date.today().add(-_dateRange).months();
      dateTimeParameters =  'end_date='+ dateNow.getFullYear() + '-' + (dateNow.getMonth() + 1) + '-' + dateNow.getDate() + '&start_date=' + + newDate.getFullYear() + '-' + (newDate.getMonth() + 1) + '-' + newDate.getDate();
    }
    else if(_dateInterval == 'Y'){
      var newDate = Date.today().add(-_dateRange).year();
      dateTimeParameters =  'end_date='+ dateNow.getFullYear() + '-' + (dateNow.getMonth() + 1) + '-' + dateNow.getDate() + '&start_date=' + + newDate.getFullYear() + '-' + (newDate.getMonth() + 1) + '-' + newDate.getDate();
    }else{
      dateTimeParameters = '';
    }

  }

  if(!(_dateInterval === '') ){
    if(_jsonUrl.includes("?")){
      dateTimeParameters = '&' + dateTimeParameters;
    }else{
      dateTimeParameters = '?' + dateTimeParameters;
    }
    _jsonUrl = _jsonUrl + dateTimeParameters;
  }
  //console.log(jsonUrl);

  /* get the data from url*/
  $.getJSON(
      _jsonUrl,
      function(data) {
        fillJsonDataTimeseries(data, _div_id, _text_id);
      }
  );

}

/*
 * the function get the json data and fill
 * the envision chart.
 * */
function fillJsonDataTimeseries(financeDataJson, _div_id, _text_id) {

  var financeData = toDataJsonTimeseries(financeDataJson, true);
  var container = document.getElementById(_div_id), options;

  $('#' + _text_id).text(financeDataJson.dataset.name + ":");

  options = {
    container : container,
    data : {
      detail : financeData.price,
      summary : financeData.price
    },
    // An initial selection
    selection : {
      data : {
        x : {
          min : 100,
          max : 200
        }
      }
    }
  };

  chart = new envision.templates.TimeSeries(options);

  window.onresize = function (event) {
    chart.vis.components.forEach(function(component){
      component.draw();
      $(".envision-timeseries-connection").find("canvas").hide();
      $('#' + _div_id).css("background","none");
    });
  };
  
}
