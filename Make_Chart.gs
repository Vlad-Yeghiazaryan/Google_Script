function Getting_API_data(){

// Getting the Today's data through an API call.
var url_today = "http://data.fixer.io/api/latest?access_key=3e4220b458ee99ce5010134e060ee5b2&format=0";
var FER_today = UrlFetchApp.fetch(url_today);
var json_today = FER_today.getContentText();
var data_today = JSON.parse(json_today);



// Identifing the current and previous dates.
function subDaysFromDate(date,d){
  // d = number of day ro substract and date = start date
  var result = new Date(date.getTime()-d*(24*3600*1000));
  return result;
};
var Yesterday = Utilities.formatDate(subDaysFromDate(new Date(),1), "GMT-8", "yyyy-MM-dd");
var Today = data_today.date;




// Getting the Yesterday's data through an API call.
var Yesterday_for_url = String(Yesterday + "?");
var url_yesterday = "http://data.fixer.io/api/" + Yesterday_for_url +'access_key=3e4220b458ee99ce5010134e060ee5b2&format=0';
var FER_yesterday = UrlFetchApp.fetch(url_yesterday);
var json_yesterday = FER_yesterday.getContentText();
var data_yesterday = JSON.parse(json_yesterday);




// Setting up the range requirments throughout columns and rows bashed on the data received. 
var count_today = Object.keys(data_today.rates).length;
var count_yesterday = Object.keys(data_yesterday.rates).length;

var range_today = String("A1:"+"A"+(count_today)); // This range is for today's currency names
var valueRange_today = String("B1:"+"B"+(count_today)); // This range is for today's currency values

var range_yesterday = String("C1:"+"C"+(count_yesterday)); // This range is for yesterday's currency names
var valueRange_yesterday = String("D1:"+"D"+(count_yesterday)); // This range is for yesterday's currency values




// This arrays will hold the today's currency names and values.
 var CurrencyNames_today = [];
 var CurrencyValues_today = [];
 
// This arrays will hold the yesterday's currency names and values.
var CurrencyNames_yesterday = [];
var CurrencyValues_yesterday = [];




// Updating the values in the google sheet to match today's FER.
for (var index = 0; index < count_today; index++) {
  var Key = Object.keys(data_today.rates)[index];
  var element = data_today.rates[Key];
  
  CurrencyNames_today.push([Key]);
  CurrencyValues_today.push([element]);
};
SpreadsheetApp.getActiveSpreadsheet().getActiveSheet().getRange(range_today).setValues(CurrencyNames_today);
SpreadsheetApp.getActiveSpreadsheet().getActiveSheet().getRange(valueRange_today).setValues(CurrencyValues_today);

// Updating the values in the google sheet to match yesterday's FER.
for (var index = 0; index < count_yesterday; index++) {
  var Key = Object.keys(data_yesterday.rates)[index];
  var element = data_yesterday.rates[Key];
  
  CurrencyNames_yesterday.push([Key]);
  CurrencyValues_yesterday.push([element]);
};
SpreadsheetApp.getActiveSpreadsheet().getActiveSheet().getRange(range_yesterday).setValues(CurrencyNames_yesterday);
SpreadsheetApp.getActiveSpreadsheet().getActiveSheet().getRange(valueRange_yesterday).setValues(CurrencyValues_yesterday);

}
