/**
 * This function check the live properties and clear the interval if the live is up to date
 */
function waitForLive() {
    var onLive = checkLive();
    if (onLive) {
        clearInterval(intervalValue);
    }
}

/**
 * This function makes an api call to check if the properties in live mode are updated
 */
function checkLive() {
    $.ajax({
        type: "GET",
        url: readUrl,
        async: false,
        success: function (result) {
            return ($('#historicalChartApiUrl').val() == result.properties.apiUrl.value) && ($('#historicalChartApiKey').val() == result.properties.apiKey.value);
        }
    });
    return true;
}
/**
 * Test
 */
/**
 * This function create or update the twitter settings JCR nodes with the access settings from the form
 * @param intervalValue
 */
function createUpdateHistoricalChartParameters(intervalValue) {
    //getting the good Json form
    var jsonData;
    if (mode == 'create') {
        jsonData = "{\"children\":{\"historicalChartSettings\":{\"name\":\"historicalChartSettings\",\"type\":\"jnt:historicalChartConnector\",\"properties\":{\"apiUrl\":{\"value\":\"" + $('#historicalChartApiUrl').val() + "\"}, \"apiKey\":{\"value\":\"" + $('#historicalChartApiKey').val() + "\"}}}}}";
    }
    else {
        jsonData = "{\"properties\":{\"apiUrl\":{\"value\":\"" + $('#historicalChartApiUrl').val() + "\"},\"apiKey\":{\"value\":\"" + $('#historicalChartApiKey').val() + "\"}}}";
    }
        //Calling API to update JCR
        $.ajax({
            contentType: 'application/json',
            data: jsonData,
            dataType: 'json',
            processData: false,
            async: false,
            type: 'PUT',
            url: writeUrl,
            success: function (result) {
                //check live values every 0.5 sec untill they are up to date
                intervalValue = setInterval(waitForLive(), 500);
                window.location.reload();
            }
        });
}
/**
 * Reset form fields
 */
function resetHistoricalChartSettings() {
    $('#historicalChartApiUrl').val(jcrApiUrl);
    $('#historicalChartApiKey').val(jcrApiKey);

    $('#saveHistoricalChartSettings').attr("disabled", "disabled");
    $('#cancelChangeHistoricalChartSettings').attr("disabled", "disabled");
}
/**
 * Validates to enable the save/cancel button
 */
function validate(jqField,jcrKey){
    if ((  ($('#historicalChartApiUrl').val() != "") &&
        ($('#historicalChartApiKey').val() != ""))
        )
    {
        $('#saveHistoricalChartSettings').removeAttr("disabled");
        $('#cancelChangeHistoricalChartSettings').removeAttr("disabled");
    } else {
        $('#saveHistoricalChartSettings').attr("disabled", "disabled");
        $('#cancelChangeHistoricalChartSettings').attr("disabled", "disabled");
    }
}

/**
 * Add the keyup event listener to the form fields for validation purposes
 * */
$(document).ready(function () {

    $('#historicalChartApiUrl').keyup(function() {
        validate(this.id,jcrApiUrl);
    });
    $('#historicalChartApiKey').keyup(function() {
        validate(this.id,jcrApiKey);
    });

});

