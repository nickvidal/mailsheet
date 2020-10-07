function onInstall(e) {
  onOpen(e);
}

function onOpen() {
    var ui = SpreadsheetApp.getUi();
  
    ui.createMenu('Mail Sheet')
        .addItem('Send campaign...', 'sendCampaign')
    .addSeparator()
        .addItem('Check bounced', 'checkBounced')
        .addItem('Check unsubscribed', 'checkUnsubscribed')
      .addToUi();
}

function sendCampaign() {
  var html = doGet();
  SpreadsheetApp.getUi()
      .showSidebar(html);
}

function doGet(request) {
  return HtmlService.createTemplateFromFile('Campaign')
      .evaluate()
      .setSandboxMode(HtmlService.SandboxMode.IFRAME)
      .setTitle('Mail Sheet')
      .setWidth(300);
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
      .getContent();
}

function getCampaigns() {
  var leadSheet = SpreadsheetApp.getActiveSheet();
  var leadRange = leadSheet.getRange(2, 4, leadSheet.getLastRow());
  var leadData = leadRange.getValues();
  
  var unique = getUnique(leadData);
  
  return unique;
}

function getUnique(a) {
    var seen = {};
    var out = [];
    var len = a.length;
    var j = 0;
    for(var i = 0; i < len; i++) {
         var item = a[i];
         if(seen[item] !== 1) {
               seen[item] = 1;
               out[j++] = item;
         }
    }
    return out;
}

function sendEmails(campaign, template, subject) {
  
  var email = Session.getActiveUser().getEmail();
  
  var leadSheet = SpreadsheetApp.getActiveSheet();
  var leadRange = leadSheet.getRange(2, 1, leadSheet.getLastRow(), leadSheet.getLastColumn());
  var leadData = leadRange.getValues();
  
  var logSent = Array();
  var logFailed = Array();

  var contacted = getDateString();
  
  var nextStatus = "";
  
  switch (template) {
    case "T1":
      nextStatus = "T2";
    break;
    case "T2":
      nextStatus = "T3";
    break;
    case "T3":
      nextStatus = "T4";
    break;
  }

  var doc = DriveApp.getFilesByName(campaign + " (" + template + ")");
  var docId = doc.hasNext() ? doc.next().getId() : 0;
  
  if (docId == 0) {
    // Template missing
    logFailed.push("'" + campaign + " (" + template + ")' missing.");
  } else {
    for (var i = 0; ((i < leadData.length-1) && (logSent.length <= 100)); ++i) {
      var row = leadData[i];
      var lead = row[1];
      var status = row[2];
      var campaignName = row[3];
      var sentTo = row[8];
          
      if ((campaignName == campaign) && (status == template)) {
        sendEmail(row, docId, subject);
        
        leadSheet.getRange(2 + i, 3).setValue(nextStatus);
        leadSheet.getRange(2 + i, 5).setValue(contacted);
        logSent.push(lead + ": '" + campaign + " (" + template + ")' sent to <" + sentTo + ">.");
      }
      SpreadsheetApp.flush();
    }
  }
  
  // Prepare email
  var subject = "[Mail Sheet] Send Emails";
  var body = "";
  // Sent
  if (logSent.length >= 100)
    body += "You may send batches of 100 emails. To continue, send it again.\n\n";
  if (logSent.length > 0) body += "- Emails sent:\n\n";
  for (var r = 0; r < logSent.length; ++r) {
    body += logSent[r] + "\n";
  }
  // Failed
  if (logFailed.length > 0) body += "\n\n" + "- Emails failed:\n\n";
  for (var r = 0; r < logFailed.length; ++r) {
    body += logFailed[r] + "\n";
  }
  
  if (logSent.length + logFailed.length == 0) {
    body = "No emails sent.";
  }
  
  GmailApp.sendEmail(email, subject, body);
}

function sendEmail(row, docId, subject) {
  var myEmail = Session.getActiveUser().getEmail();
  
  var myName = row[0];
  var myFirstName = myName.substring(0, myName.indexOf(" "));
  var lead = row[1];
  var status = row[2];
  var firstName = row[5];
  var lastName = row[6];
  var email = row[8];
  
  var doc = DocumentApp.openById(docId);
  var body = doc.getBody().getText();

  body = body.replace(/{{Lead}}/gi, lead);
  body = body.replace(/{{First Name}}/gi, firstName);
  body = body.replace(/{{Last Name}}/gi, lastName);
    
  body += "\r" + myFirstName + "\r\r\r\r" +
          "--\r" +
          "[YOUR ADDRESS]\r\r" +
          "To unsubscribe: [YOUR UNSUBSCRIBE LINK]" + email;

  if (status != "T1") {
    // Reply
    // Using Gmail API due to reply in the same thread feature
    // TODO: Handle thread not found
    var threads = GmailApp.search("in:Sent to:" + email, 0, 1);
    var thread = threads[0];
    var threadId = thread.getId();
    var subject = thread.getFirstMessageSubject();
    
    // needed for auth scope
    var forScope = GmailApp.getInboxUnreadCount();
    
    var raw =
      'MIME-Version: 1.0' + '\r\n' +
      'From: ' + myName + ' <' + myEmail + '>' + '\r\n' +
      'To: ' + email + '\r\n' +
      'Subject: ' + subject + '\r\n' +
      'Content-Type: text/plain; charset=UTF-8' + '\r\n' +
      '\r\n' + body;
    
    var eBody = Utilities.base64EncodeWebSafe(raw, Utilities.Charset.UTF_8);
    
    var params = { method: "post",
                   contentType: "application/json",
                   headers: {
                     "Authorization": "Bearer " + ScriptApp.getOAuthToken(),
                   },
                   payload: JSON.stringify({
                    "userId": "me",
                    "raw": eBody,
                    "threadId": threadId
                   })
                 };

    var resp = UrlFetchApp.fetch("https://www.googleapis.com/gmail/v1/users/me/messages/send", params);
    
  } else {
    // First email
    GmailApp.sendEmail(email, subject, body, { name: myName });
  }
}

function getDateString() {
  var date = new Date();
  var year = date.getYear();
  // getMonth starts at 0
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var currentDate = month + "/" + day + "/" + year;
  return currentDate;
}

function checkBounced() {
  var myEmail = Session.getActiveUser().getEmail();
  
  var leadSheet = SpreadsheetApp.getActiveSheet();
  var leadRange = leadSheet.getRange(2, 1, leadSheet.getLastRow(), leadSheet.getLastColumn());
  var leadData = leadRange.getValues();
  
  var leadEmails = Array();
  var bouncedEmails = Array();
  var logBounced = Array();
  
  var bounced = GmailApp.search("from:mailer-daemon OR from:postmaster ", 0, 25);
  
  for (var i = 0; i < bounced.length; i++) {
    var thread = bounced[i];
    var messages = thread.getMessages();
    var message = messages[0];
    
    thread.markRead();
    
    if (message.getFrom() == myEmail) {
      bouncedEmails.push(message.getTo());
    } else {
      var body = (messages[1]) ? messages[1].getBody() : messages[0].getBody();
      var at = body.indexOf("@");
      
      var start = body.lastIndexOf(" ", at);
      var last = body.indexOf(" ", at);
      var toEmail = body.slice(start, last);

      var greater = toEmail.indexOf(">");
      if (greater > 0) toEmail = toEmail.slice(greater+1);
      var colon = toEmail.indexOf(":");
      if (colon > 0) toEmail = toEmail.slice(colon+1);
      var semiColon = toEmail.indexOf(";");
      if (semiColon > 0) toEmail = toEmail.slice(semiColon+1);
    
      var less = toEmail.indexOf("<");
      if (less > 0) toEmail = toEmail.slice(0,less);
      var parenthesis = toEmail.indexOf('"');
      if (parenthesis > 0) toEmail = toEmail.slice(0,parenthesis);
      
      bouncedEmails.push(toEmail);
    }
  }
  
  for (var i = 0; i < leadData.length-1; ++i) {
    var row = leadData[i];
    var status = row[2];
    var email = row[8];
    
    if ((status == "T1") || (status == "T2") || (status == "T3")) {
      var bounced = bouncedEmails.indexOf(email);
      if (bounced > 0) {
        leadSheet.getRange(2 + i, 3).setValue("BOUNCED");
        logBounced.push(email);
      }
    }
  }
  // Prepare email
  var subject = "[Mail Sheet] Check Bounced Emails";
  var body = "";
  // Bounced Emails
  if (logBounced.length > 0) body += "- Bounced emails:\n\n";
  for (var r = 0; r < logBounced.length; ++r) {
    body += logBounced[r] + "\n";
  }
  
  if (logBounced.length == 0)
    body = "No new bounced emails found.";
  
  GmailApp.sendEmail(myEmail, subject, body);
  SpreadsheetApp.flush();
}

function checkUnsubscribed() {
  var myEmail = Session.getActiveUser().getEmail();
  
  var leadSheet = SpreadsheetApp.getActiveSheet();
  var leadRange = leadSheet.getRange(2, 1, leadSheet.getLastRow(), leadSheet.getLastColumn());
  var leadData = leadRange.getValues();
  
  var unsubSheet = SpreadsheetApp.openById("[YOUR UNSUBSCRIBE SHEET]").getSheets()[0];
  var unsubRange = unsubSheet.getRange(1, 1, unsubSheet.getLastRow(), unsubSheet.getLastColumn());
  var unsubData = unsubRange.getValues();
  
  var leadEmails = Array();
  var unsubEmails = Array();
  var unsubIndex = Array();
  var logUnsub = Array();
  
  for (var i = 0; i < unsubData.length; ++i) {
    var row = unsubData[i];
    var email = row[1];
    var status = row[2];
    
    if (status != "UNSUBBED") {
      unsubEmails.push(email.toLowerCase());
      unsubIndex.push(i);
    }
    
  }
    
  for (var i = 0; i < leadData.length-1; ++i) {
    var row = leadData[i];
    var status = row[2];
    var email = row[8];
    
    if (!(status == "UNSUBBED")) {
      var unsub = unsubEmails.indexOf(email.toLowerCase())
      if (unsub > 0) {
        var unsubIdx = unsubIndex[unsub];
        unsubSheet.getRange(1 + unsubIdx, 3).setValue("UNSUBBED");
        leadSheet.getRange(2 + i, 3).setValue("UNSUBBED");
        logUnsub.push(email);
      }
    }
  }
  // Prepare email
  var subject = "[Mail Sheet] Check Unsubscribed";
  var body = "";
  // Unsusbscribed
  if (logUnsub.length > 0) body += "- Unsubscribed:\n\n";
  for (var r = 0; r < logUnsub.length; ++r) {
    body += logUnsub[r] + "\n";
  }
  
  if (logUnsub.length == 0)
    body = "No new unsubscribed.";
  
  GmailApp.sendEmail(myEmail, subject, body);
  SpreadsheetApp.flush();
}
