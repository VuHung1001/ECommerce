# Figures Shop

## Still under development!!!

## Live demo of shopping pages for clients on Heroku server
[Figures shop](https://figures-shop.herokuapp.com/)

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
  > **JWT_SEC**           // secret string to create J
  > 
  > **STRIPE_KEY**        // secret key of Stripe payment method
  > 
  > **MOMO_SECRET_KEY**   // secret key of MoMo payment method
  > 
  > **MOMO_ACCESS_KEY**   // access key of MoMo payment method
  > 
  > **MY_MAIL**           // admin mail to send message or notification to user (I use gmail)
  > 
  > **MY_MAIL_PASSWORD**  // google account application password for MY_MAIL
  > 
  > **BASE_URL**          // in my case: https://figures-shop.herokuapp.com 

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
