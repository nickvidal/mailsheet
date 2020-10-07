# mailsheet
Send Emails from Google Sheets

![MailSheet Screenshot](https://github.com/nickvidal/mailsheet/blob/master/MailSheet_Screenshot.png)


## Overview

**MailSheet** integrates with **Google Workspace** to provide a simple yet powerful **email automation** solution:

* Use **Google Sheets** to organize a list of leads.
* Create campaign templates using **Google Docs**.
* Send emails that appear in your **Gmail** account.


## Quick Setup

The quick setup takes about 10 minutes.

### Create the First Template

- Make a copy of this campaign template:
https://docs.google.com/document/d/1uXxxQywbfgURrwzUdSGnnHtssIzxFm2mMVk-Dr1dsh0/edit?usp=sharing
- From the Menu: File > Make a copy...
- Be sure to name it "*Test (T1)*".

### Create the Leads Sheet

- Make a copy of this spreadsheet:
https://docs.google.com/spreadsheets/d/1va32yPCK0D1dMkz2ZtIQbnKyobgc13sDnBO_8M8xyc0/edit?usp=sharing
- From the Menu: File > Make a copy...
- In the first column (Owner), replace *YOUR NAME* with your name (yellow column).
- Add a few of your contacts (green rows).

### Send the First Template

- From the Menu: Mail Sheet > Send campaign...
- You'll be asked to give the appropriate permissions to MailSheet.
- The MailSheet sidebar will open.
- Select "*Test*" as the Campaign.
- Select "*T1*" as the Template.
- Enter a *Subject* for the email.
- Click on the *Send Campaign* button.
- Watch the *Status* get updated row by row (from "*T1*" to "*T2*").
- Go to your Gmail and look at the *Sent Mail* folder.
- Go to your *Inbox* and review the MailSheet email with a summary of the results.
- Congratulations! You just sent your first campaign template using MailSheet!

### Enable the Gmail API

Before sending a second template, you need to enable the *Gmail API* to support threaded conversations:
- Go to your Leads Sheet.
- Open the Script Editor:
  - From the Menu: Tools > Script editor...
- Inside the Script Editor:
  - From the Menu: Resources > Advanced Google services...
  - Search for Gmail API and turn it ON.
  - Click on "*These services must also be enabled in the Google API Console.*"
- Inside the Google API Console:
  - Click on "*Enable API*"
  - Search for "*Gmail API*"
  - Click on "*Enable*"
- Close the Google API Console tab.
- Close the Script editor.

*Observation*: if you have trouble with the Google API Console, please make sure you are opening from the correct Google account. You may need to log off from the other account(s).

If you plan to send bulk email, please read the next section for the complete setup.

## Complete Setup

The complete setup takes 10 more minutes.

### Create Your Unsubscribe Link

When sending mass email or bulk email, you must provide an *Unsubscribe link* to comply with [CAN-SPAM](https://en.wikipedia.org/wiki/CAN-SPAM_Act_of_2003).

A simplistic solution is to create a Google Form:
- Create a new form called Unsubscribe on Google Forms.
- Edit the first question to become a *Short answer text*.
- Edit the question to something like: "*Email address to unsubscribe*".
- From the menu: Responses > ... > Select response destination > Create a new spreadsheet.
- From the menu: Responses > View responses in Sheets.
- In the Unsubscribe sheet, add a third column called "*Status*".
- Copy the Document ID of the Unsubscribe sheet:
  - The URL will look something like: `https://docs.google.com/spreadsheets/d/[YOUR UNSUBSCRIBE SHEET]/edit`
  - The Document ID is the code at `[YOUR UNSUBSCRIBE SHEET]`
- Create an Unsubscribe Link: `[YOUR UNSUBSCRIBE LINK]`
  - You may use the Google Form directly as your unsubscribe link.
  - Be sure to use the *Get the pre-filled link* and delete just the email address from the link so that the appropriate email to be unsubscribed will be appended.
  - If you have a website, you can redirect something like https://example.com/unsubscribe?entry=email to your Google Form.

### Replace Your Unsubscribe Link

- Go to your Leads Sheet.
- Open the Script editor:
  - From the menu: Tools > Script editor...
- Edit file Code.gs:
  - Replace the following strings:
    - `[YOUR ADDRESS]`
    - `[YOUR UNSUBSCRIBE LINK]`
    - `[YOUR UNSUBSCRIBE SHEET]`
  - Uncomment the changed lines (by deleting the preceding `//`)
- Save the file and close the Script editor.

### Create the Second Template

- Go to Google Docs and create a new document.
- Copy the following text:

> Hi {{First Name}},
> 
> MailSheet supports threaded conversations.
> 
> Want to give it a try and help me test it?
>
> https://github.com/nickvidal/mailsheet
>
> Thanks,

- Paste as plain text.
  - From the Menu: Edit > Paste without formatting.
- Save the document as "*Test (T2)*".
- MailSheet provides mail merge functionality for `{{First Name}}`, `{{Last Name}}`, and `{{Lead}}`.


### Send the Second Template

- Go to your Leads Sheet.
- From the menu: Mail Sheet > Send campaign...
- The MailSheet sidebar will open.
- Select "*Test*" as the Campaign.
- Select "*T2*" as the Template.
- Since this is a follow-up, you may leave the *Subject* blank.
- Click on the *Send Campaign* button.
- Watch the *Status* get updated row by row (from "*T2*" to "*T3*").
- Go to your Gmail and look at the *Sent Mail* folder.
- Go to your *Inbox* and review the MailSheet email with a summary of the results.
- Congratulations! You are all set!

### Conclusion

**MailSheet** allows you to be **more organized** and **save time**.

I encourage you to use this saved time to do **better prospecting** and create more **personalized campaigns**.

This will provide a **better experience** for everyone!

I hope you enjoy using **MailSheet**!

![MailSheet](https://github.com/nickvidal/mailsheet/blob/master/mailsheet.png)
