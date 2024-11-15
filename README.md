# Figures Shop

## Still under development!!!

## Live demo of shopping pages for clients on Heroku server (Edited: now the site is deployed on railway server)
[Figures shop](https://figures-shop.up.railway.app/)

## In **master** branch, I put **Admin-ECommerce**(Admin UI, ReactJS) and **Client-ECommerce**(Client UI, ReactJS) inside API directory (ExpressJS)

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
  > **BASE_URL**          // in my case: https://figures-shop.up.railway.app for production and http://localhost:5000 for developing

- For ReactJS Client:
  >
  > **VITE_STRIPE**            // Public key for Stripe payment method
  > 
  > **VITE_MOMO_SECRET_KEY**   // Same as API .env
  > 
  > **VITE_MOMO_ACCESS_KEY**   // Same as API .env
  > 
  > **VITE_PASS_SEC**          // Same as API .env
  > 
  > **VITE_GOOGLE_CLIENT_ID**  // ID of Google Oauth to authorization when logging with Google
  >
  > **VITE_BASE_URL**          // Same as API .env

- For ReactJS Admin: (It is not necessary on the production server because the VITE_BASE_URL env variable already exists in the client env section)
  >
  > **VITE_BASE_URL**          // Same as API .env

## Switching between developing and production mode
- Edit the **VITE_BASE_URL** in both .env of Admin and Client and **BASE_URL** in .env of API (https://figures-shop.up.railway.app for production and http://localhost:5000 for developing)
- Just run `npm start` in API directory (main directory) for production mode\
But run `npm start` in all API, Client, Admin directories for developing mode
- Build code for production => see all build script commands in package.json
