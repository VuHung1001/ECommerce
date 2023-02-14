# Figures Shop

## Still under development!!!

## Live demo of shopping pages for clients on Heroku server (Edited: now the site is deployed on railway server)
[Figures shop](https://figures-shop.up.railway.app/)

## This project is further developed from project of safak and his youtube channel
[**safak** GitHub](https://github.com/safak/youtube/tree/mern-ecommerce-app) | 
[**Lama dev** Youtube](https://www.youtube.com/c/LamaDev)

## In **master** branch, I put **Admin-ECommerce**(Admin UI, ReactJS) and **Client-ECommerce**(Client UI, ReactJS) inside API repo (ExpressJS)

## Environment variables in .env file contain:
- For ExpressJS API :
  >
  > **MONGO_URL**         // URL to connect with MongoDB Cloud
  > 
  > **PORT**              // Port to run on localhost when developing
  > 
  > **PASS_SEC**          // secret string to encode Password
  > 
  > **JWT_SEC**           // secret string to create JSON WEB TOKEN
  > 
  > **STRIPE_KEY**        // secret key of Stripe payment method
  > 
  > **MOMO_SECRET_KEY**   // secret key of your MoMo business account to customer use MoMo payment method
  > 
  > **MOMO_ACCESS_KEY**   // access key of your MoMo business account
  > 
  > **MOMO_PARTNER_CODE** // partner code of your MoMo business account
  > 
  > **MY_MAIL**           // admin mail to send message or notification to user (I use gmail)
  > 
  > **MY_MAIL_PASSWORD**  // google account application password for MY_MAIL
  > 
  > **BASE_URL**          // in my case: https://figures-shop.up.railway.app 

- For ReactJS Client:
  >
  > **REACT_APP_STRIPE**            // Public key for Stripe payment method
  > 
  > **REACT_APP_MOMO_SECRET_KEY**   // Same as API .env
  > 
  > **REACT_APP_MOMO_ACCESS_KEY**   // Same as API .env
  > 
  > **REACT_APP_PASS_SEC**          // Same as API .env
  > 
  > **REACT_APP_GOOGLE_CLIENT_ID**  // ID of Google Oauth to authorization when logging with Google
  >
  > **REACT_APP_BASE_URL**          // Same as API .env

## Switching between developing and production mode
- Edit the BASE_URL value in **requestMethod.js** of client and admin directories
- Edit BASE_URL_API or BASE_URL
`var ipnUrl = BASE_URL_API +'/api/checkout/ipn/momo';`
in **checkout.js** and .env of api
- Comment or unset comment at NODE_ENV 
`process.env.NODE_ENV`
and IF statement block below that in **index.js** of api
- Just run `npm start` in API directory (main directory) for production mode\
But run `npm start` in all API, Client, Admin directories for developing mode
