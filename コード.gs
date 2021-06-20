var webhook = "https://discord.com/api/webhooks/856217570285060107/0PJsKBBCUnxPJliOwP29Eyg_5mDVbZ61nbqkO2q1Shs7XP3JqVCqaPPDiFJ3oIZ3NKon" //second one
// var webhook = "https://discord.com/api/webhooks/855838568286650379/lhvq1wSmrGPBfxV5AhPMxKPYsp2B-TiHUcG1ongm9gvL5v1N_SNvU-VXhm_umvO13Lxz";
// test channel
// var webhook = "https://discord.com/api/webhooks/855515617234518047/0IsLRINjFpji3dAK1VjqTmSVGfNAN3C8RPJh7w8yRbRiiizKB_2m28L4bW25DeUIiJhE";

var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("speed");
var chart = sheet.getCharts()[0];
var folderId = '1rDPeiodjk972j2r0yeBlxUH9gYRzXh0Z';  // Googleドライブの一時フォルダのID
var folder = DriveApp.getFolderById(folderId);  

var today = Utilities.formatDate(new Date(), 'Asia/Tokyo', 'YYYY-MM-dd');
  

  
var lastRow = sheet.getLastRow();


function sendMessage() {
 var graphImg = chart.getBlob(); // グラフを画像に変換
 var file = folder.createFile(graphImg);
 file.setName(today);
 file.setSharing(DriveApp.Access.ANYONE,DriveApp.Permission.EDIT);
 var imgLink= file.getDownloadUrl();
//  var imgLink = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSOn2i__lJ-9XzNWWQV3cTXJiSfMAdteg4tCLI6eWhw-CW42pXuDDQ5mA5OA7_VUUyu5KZB8kgA58c4/pubchart?oid=235544223&format=image"
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
