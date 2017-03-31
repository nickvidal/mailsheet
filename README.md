# mailsheet
Send Emails from Google Sheets

![MailSheet Screenshot](https://github.com/nickvidal/mailsheet/blob/master/MailSheet_Screenshot.png)


## Overview

MailSheet integrates Google Sheets, Google Docs, and Gmail to provide a simple yet powerful marketing automation solution.

* Use **Google Sheets** to organize a list of leads.
* Create campaign templates using **Google Docs**.
* Send emails that appear in your **Gmail** account.


## Setup

The setup takes about 30 minutes. This is well worth it because in the long-run MailSheet will help you save thousands of hours. If you need any help, feel free to email nickvidal AT gmail.com:
- For a single user, the setup cost is U$100.
- For an organization, the cost is U$500 (I'll deploy it as a Web app so all users can use it). 


### Create the Unsubscribe Link

When sending automated emails, you must provide an *Unsubscribe link* to comply with [CAN-SPAM](https://en.wikipedia.org/wiki/CAN-SPAM_Act_of_2003).

A simple solution is to create a Google Form:
- Create a new form called Unsubscribe on Google Forms.
- Edit the first question to become a *Short answer text*.
- Edit the question to something like: "Please enter your email address below to unsubscribe".
- From the menu: Responses > ... > Select response destination > Create a new spreadsheet.
- From the menu: Responses > View responses in Sheets.
- In the Unsubscribe sheet, add a third column called "Status".
- Copy the Document ID of the Unsubscribe sheet:
  - The URL will look something like: `https://docs.google.com/spreadsheets/d/[YOUR UNSUBSCRIBE SHEET]/edit`
  - The Document ID is the code at `[YOUR UNSUBSCRIBE SHEET]`
- Create an Unsubscribe Link `[YOUR UNSUBSCRIBE LINK]`
  - If you have a website, you can redirect something like https://example.com/unsubscribe to your Unsubscribe Form.


### Create a Campaign

The next step is to create a Campaign using Google Docs:
- Create a new Document.
- Copy the following text:

> Hello {{First Name}},
> 
> Your surname is {{Last Name}} and you work at {{Lead}}.
> 
> Regards

- Save the document as *Test (T1)*.
- You may make a copy as *Test (T2)* and another one as *Test (T3)*.


### Create the Leads Spreadsheet

Finally, you are ready to create your Leads sheet. 

- Create a new spreadsheet on Google Sheets
- Add the following columns in the first row:
  - Domain, Lead, Status, Campaign, Contacted, First Name, Last Name, Title, Email
- Freeze the first row:
  - Select the first row
  - From the menu: View > Freeze > 1 row
- Open the Script editor:
  - From the menu: Tools > Script editor...
- Create file Code.gs:
  - Copy content from [Code.gs](https://github.com/nickvidal/mailsheet/blob/master/Code.gs)
  - Replace the following strings:
    - `[YOUR ADDRESS]`
    - `[YOUR UNSUBSCRIBE LINK]`
    - `[YOUR NAME] <[YOUR EMAIL]>`
    - `[YOUR NAME]`
    - `[YOUR UNSUBSCRIBE SHEET]`
- Create file Campaign.html:
  - From the menu: File > New > Html file
  - Copy content from [Campaign.html](https://github.com/nickvidal/mailsheet/blob/master/Campaign.html)
- Create file Style.html:
  - From the menu: File > New > Html file
  - Copy content from [Style.html](https://github.com/nickvidal/mailsheet/blob/master/Style.html)
- Save all files and close the Script editor.
- Enter some data in the Leads sheet.
- Under Campaign, fill in the campaign name: *Test*
- Under Status, enter: *T1*

### Send a Campaign

Let's send your first campaign!

- Please reload your Leads sheet.
- You'll be asked to give the appropriate permissions to MailSheet.
- From the menu: Mail Sheet > Send campaign...
- The MailSheet sidebar will open.
- Select *Test* as the Campaign.
- Select *T1* as the Template.
- Enter a Subject for the Email.
- Click on the *Send Campaign* button.
- Watch the *Status* get updated row by row.
- Go to your Gmail and look at the *Sent Mail* folder.
- Go to your *Inbox* and review the MailSheet email with a summary of the results.

### Thank you

I hope you enjoy using MailSheet! Please use it responsibly!

![MailSheet](https://github.com/nickvidal/mailsheet/blob/master/mailsheet.png)
