function SendGmail(Body,Image_file){
emails = "vladimir.y2000@gmail.com";
emailSubject = "Hi_from_google_script";

MailApp.sendEmail({
    to: emails,
    subject: emailSubject,
    htmlBody: Body,
    inlineImages: Image_file});
  }
  
function generate_Image_and_Send_it() {
  // Get active spreadsheet.
  var sourceSpreadsheet = SpreadsheetApp.getActive();
  
  // Get active sheet.
  var sheets = sourceSpreadsheet.getSheets();
  var sheetName = sourceSpreadsheet.getActiveSheet().getName();
  var sourceSheet = sourceSpreadsheet.getSheetByName(sheetName);
  
  var charts = sourceSpreadsheet.getActiveSheet().getCharts();
  
  if(charts.length==0){
    MailApp.sendEmail({
      to: emails,
      subject: "ERROR:"+emailSubject,
      htmlBody: "No charts in the spreadsheet"});    
    return;
  }

  var chartBlobs=new Array(charts.length); 
  var emailBody="This chart was sent by Vlad's google script automated bot.<br><h3 style='color:Blue;'>$~ Enjoy ~$</h3><br>";
  var emailImages={};
  for(var i=0;i<charts.length;i++){
    chartBlobs[i]= charts[i].getAs("image/png").setName("A_Chart_from_a_bot_"+i);
    emailBody= emailBody + "<img src='cid:chart"+i+"'><br>";
    emailImages["chart"+i]= chartBlobs[i];
  }
  SendGmail(emailBody,emailImages)
}