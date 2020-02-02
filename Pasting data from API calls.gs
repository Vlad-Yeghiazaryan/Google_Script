function Getting_API_data(){
// Getting the data through an API call.
var url = "http://data.fixer.io/api/latest?access_key=3e4220b458ee99ce5010134e060ee5b2&format=0";
var FER = UrlFetchApp.fetch(url);
var json = FER.getContentText();
var data = JSON.parse(json);

// Setting up the range requirments throughout columns and rows bashed on the data received. 
var count = Object.keys(data.rates).length;

var range = String("A1:"+"A"+(count)); // This range is for currency names
var valueRange = String("B1:"+"B"+(count)); // This range is for currency values


// This arrays will hold the currency names and values.
 var CurrencyNames = [];
 var CurrencyValues = [];
 
// Updating the values in the google sheet to match the latest FER.
for (var index = 0; index < count; index++) {
  var Key = Object.keys(data.rates)[index];
  var element = data.rates[Key];
  
  CurrencyNames.push([Key]);
  CurrencyValues.push([element])
};
SpreadsheetApp.getActiveSpreadsheet().getActiveSheet().getRange(range).setValues(CurrencyNames);
SpreadsheetApp.getActiveSpreadsheet().getActiveSheet().getRange(valueRange).setValues(CurrencyValues);
}
