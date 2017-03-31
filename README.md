# mailsheet
Send Emails from Google Sheets

![MailSheet Screenshot](https://github.com/nickvidal/mailsheet/blob/master/MailSheet_Screenshot.png)


## Overview

**MailSheet** perfectly integrates with **G Suite** to provide a simple yet powerful **marketing automation** solution.

* Use **Google Sheets** to organize a list of leads.
* Create campaign templates using **Google Docs**.
* Send emails that appear in your **Gmail** account.


## Setup

The setup takes about 30 minutes.

This is well worth it because in the long-run MailSheet will help you save time. 

If you need any help, feel free to contact me for [support](#support).


### Create the Unsubscribe Link

When sending mass email or bulk email, you must provide an *Unsubscribe link* to comply with [CAN-SPAM](https://en.wikipedia.org/wiki/CAN-SPAM_Act_of_2003).

A simple solution is to create a Google Form:
- Create a new form called Unsubscribe on Google Forms.
- Edit the first question to become a *Short answer text*.
- Edit the question to something like: "*Please enter your email address below to unsubscribe*".
- From the menu: Responses > ... > Select response destination > Create a new spreadsheet.
- From the menu: Responses > View responses in Sheets.
- In the Unsubscribe sheet, add a third column called "*Status*".
- Copy the Document ID of the Unsubscribe sheet:
  - The URL will look something like: `https://docs.google.com/spreadsheets/d/[YOUR UNSUBSCRIBE SHEET]/edit`
  - The Document ID is the code at `[YOUR UNSUBSCRIBE SHEET]`
- Create an Unsubscribe Link: `[YOUR UNSUBSCRIBE LINK]`
  - If you have a website, you can redirect something like https://example.com/unsubscribe to your Unsubscribe Form.
  - Alternatively, you may also use the Google Form directly as your unsubscribe link. Be sure to use the *Preview* link.


### Create a Campaign

The next step is to create a Campaign using Google Docs:
- Create a new Document.
- Copy the following text:

> Hello {{First Name}},
> 
> Your surname is {{Last Name}} and you work at {{Lead}}.
> 
> Regards

- Save the document as "*Test (T1)*".
- You may make a copy as "*Test (T2)*" and another one as "*Test (T3)*".
- MailSheet provides mail merge functionality for `{{First Name}}`, `{{Last Name}}`, and `{{Lead}}`.


### Create the Leads Spreadsheet

Finally, you are ready to create your Leads sheet. 

- Create a new spreadsheet on Google Sheets
- Add the following columns in the first row:
  - Owner, Lead, Status, Campaign, Contacted, First Name, Last Name, Title, Email
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
    - `[YOUR UNSUBSCRIBE SHEET]`
- Create file Campaign.html:
  - From the menu: File > New > Html file
  - Copy content from [Campaign.html](https://github.com/nickvidal/mailsheet/blob/master/Campaign.html)
- Create file Style.html:
  - From the menu: File > New > Html file
  - Copy content from [Style.html](https://github.com/nickvidal/mailsheet/blob/master/Style.html)
- Save all files and close the Script editor.
- Enter some data in the Leads sheet.
- Under Campaign, fill in the campaign name: "*Test*"
- Under Status, enter: "*T1*"

### Send a Campaign

Let's send your first campaign!

- Please reload your Leads sheet.
- You'll be asked to give the appropriate permissions to MailSheet.
- From the menu: Mail Sheet > Send campaign...
- The MailSheet sidebar will open.
- Select "*Test*" as the Campaign.
- Select "*T1*" as the Template.
- Enter a *Subject* for the email.
- Click on the *Send Campaign* button.
- Watch the *Status* get updated row by row (from "*T1*" to "*T2*").
- Go to your Gmail and look at the *Sent Mail* folder.
- Go to your *Inbox* and review the MailSheet email with a summary of the results.
- If you send the second and third templates ("*T2*" and "*T3*"), the emails will show up as a threaded conversation.

### Final Considerations

**MailSheet** allows you to be **more organized** and **save time**.

I encourage you to use this saved time to do **better prospecting** and create more **personalized campaigns**.

This will provide a **better experience** for everyone!

I hope you enjoy using **MailSheet**!

### Support

Setup Costs:
- For a single user: U$100.
- For an organization: U$500 (I'll deploy MailSheet as a Web app so that all users can use it).

With MailSheet, there are *no monthly charges* and *no email sending limit* (just the [one](https://support.google.com/a/answer/166852?hl=en) from *G Suite* itself).

MailSheet is *open source*, so customization and integration is much easier.

You may integrate MailSheet with your CRM (Salesforce, Hubspot, Pipedrive, etc).

Please contact nickvidal AT gmail.com.

![MailSheet](https://github.com/nickvidal/mailsheet/blob/master/mailsheet.png)
