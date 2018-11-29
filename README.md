# cabcharge-test
carcharge code test

## Single Page Web App Challenge #1
Create a service (backend + frontend) that accepts the necessary information and sends emails. It should provide an abstraction between two different email service providers. If one of the services goes down, your service can quickly failover to a different provider without affecting your customers.

# Tech Stack
## React Frontend
Files located under /frontend folder

## Backend with NodeJS + Express
Files located under /


# Demo Usage
## install package for nodejs backend
yarn install
## install package for react frontend
cd frontend <br/>
yarn install <br/>

## run demo
cd .. (change directory to code base root directory) <br/>
yarn dev or npm run dev <br/>

ps: if any errors, pls install concurrently and nodemon global or local<br/>
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

Unit test only and front end component test only have skeleton