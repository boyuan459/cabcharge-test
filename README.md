# cabcharge-test
carcharge code test

# Demo Usage
yarn dev or npm run dev

ps: if any errors, pls install concurrently and nodemon global or local
npm install -g nodemon concurrently

# How to use
## Compose email
Click Compose on the sidebar, fill content and send, you will get feedback like
success or failed

## Sent mailbox
Click Sent on the sidebar, this is the list of your sent email

### Limitation
Following UI are only for prototype, not implemented in the backed:
1. Global search is not implemented,
2. In Sent page, marked as read and delete is not implemented

Backend only implemented mailgun, no time to do sendgrid