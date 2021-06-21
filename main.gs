
var webhook = "WEBHOOK-URL";

var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("speed");
var chart = sheet.getCharts()[0];
var folderId = 'FOLDER-ID';  // Googleドライブの一時フォルダのID
var folder = DriveApp.getFolderById(folderId);  

var today = Utilities.formatDate(new Date(), 'Asia/Tokyo', 'YYYY-MM-dd');
  

  
var lastRow = sheet.getLastRow();


function sendMessage() {
 var graphImg = chart.getBlob(); // グラフを画像に変換
 var file = folder.createFile(graphImg);
 file.setName(today);
 file.setSharing(DriveApp.Access.ANYONE,DriveApp.Permission.EDIT);
 var imgLink= file.getDownloadUrl();
 console.log(imgLink);
 console.log(today);
 DriveApp.getFolderById(folderId).removeFile(file);
//  file.setTrashed(true);
 
 var jsonData = {
   embeds: [
     {
       "title": "speed per minute",
       "description":sheet.getRange(lastRow, 1).getValue(),
       "color": 11730954,
       "image":{url:imgLink},
       
       "fields": [
         {
           "name": sheet.getRange(1, 2).getValue(),
           "value": sheet.getRange(lastRow, 2).getValue()+'/min',
           "inline":false
         },
         {
           "name": sheet.getRange(1, 3).getValue(),
           "value": sheet.getRange(lastRow, 3).getValue()+'/min',
           "inline":false
         },
         {
           "name": sheet.getRange(1, 4).getValue(),
           "value": sheet.getRange(lastRow, 4).getValue()+'/min',
           "inline":false
         },
         {
           "name": sheet.getRange(1, 5).getValue(),
           "value": sheet.getRange(lastRow, 5).getValue()+'/min',
           "inline":false
         },
         {
           "name": sheet.getRange(1, 6).getValue(),
           "value": sheet.getRange(lastRow, 6).getValue()+'/min',
           "inline":false
         }
       ]
     }
   ]
 };
 
 var payload = JSON.stringify(jsonData);
 var options = {
   "method" : "post",
   "contentType" : "application/json",
   "payload" : payload
 };
 UrlFetchApp.fetch(webhook,options);
};
