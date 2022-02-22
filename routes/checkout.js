const router = require("express").Router();
const stripe = require("stripe")(process.env.STRIPE_KEY);
const { v4: uuidv4 } = require("uuid");
const mongoose = require('mongoose')
const cryptoJs = require("crypto-js");

const {
  verifyToken,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const accessKey = process.env.MOMO_ACCESS_KEY;
const secretKey = process.env.MOMO_SECRET_KEY;
const BASE_URL = process.env.BASE_URL
// Uncomment this line and replace ipn url in momo method when developing
// const BASE_URL_API = "http://localhost:5000"; 

// Notice: Edit BASE_URL in .env, two lines here just for suggesting
// const BASE_URL = 'https://figures-shop.herokuapp.com'; //for production
// const BASE_URL = "http://localhost:3000"; //for developing

// use stripe api for payment handling
router.post("/stripe", verifyToken, (req, res) => {
  // console.log(req.body.amount);
  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount,
      currency: "vnd",
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        res.status(500).json(stripeErr);
      } else {
        res.status(200).json(stripeRes);
      }
    }
  );
});

// get request from momo to order handling
router.post("/ipn/momo", (req, res) => {
  console.log('received post request from momo');
  let rawSignature =
    "accessKey=" +
    accessKey +
    "&amount=" +
    req.body.amount +
    "&extraData=" +
    req.body.extraData +
    "&message=" +
    req.body.message +
    "&orderId=" +
    req.body.orderId +
    "&orderInfo=" +
    req.body.orderInfo +
    "&orderType=" +
    req.body.orderType +
    "&partnerCode=" +
    req.body.partnerCode +
    "&payType=" +
    req.body.payType +
    "&requestId=" +
    req.body.requestId +
    "&responseTime=" +
    req.body.responseTime+
    "&resultCode=" +
    req.body.resultCode+
    "&transId=" +
    req.body.transId;

    // let bodyDemo = {"partnerCode":"MOMOIOLD20190129"
    // ,"orderId":"01234567890123451633504872421"
    // ,"requestId":"01234567890123451633504872421"
    // ,"amount":1000
    // ,"orderInfo":"Test Thue 1234556"
    // ,"orderType":"momo_wallet"
    // ,"transId":2588659987
    // ,"resultCode":0
    // ,"message":"Giao dịch thành công."
    // ,"payType":"qr"
    // ,"responseTime":1633504902954
    // ,"extraData":"eyJyZXN1bHRfbmFtZXNwYWNlIjoidW1hcmtldCIsImVycm9yIjoiIiwic3RhdGUiOjZ9"
    // ,"signature":"90482b3881bdf863d5f61ace078921bbc6dbb58b2fded35261c71c9af3b1ce4f"}

    console.log('rawSignature:');
    console.log(rawSignature);

    let signature = cryptoJs.HmacSHA256(rawSignature, secretKey).toString();
    console.log('signature:');
    console.log(signature);

    if(req.body.signature !== signature){
      console.log('invalid request information');
    } 
    if(req.body.resultCode === 9000){
      console.log('successful authorization payment');
    }
    if(req.body.resultCode === 0){
      console.log('successful payment');
    } else {
      console.log('failed payment');
    }
    res.status(204)
})

// send request to momo api for payment handling
router.post("/momo", verifyToken, async (req, res) => {
  const amount = req.body.amount
  const address = JSON.stringify(req.body.address)

  var partnerCode = "MOMO0T1D20220107";
  var requestId = uuidv4();
  var orderId = new mongoose.Types.ObjectId();
  var orderInfo = "pay with MoMo";
  var redirectUrl = BASE_URL +"/resultMomo";
  var ipnUrl = BASE_URL +'/api/checkout/ipn/momo'; //  BASE_URL_API for develope, BASE_URL for production
  var requestType = "captureWallet";
  //pass empty value to extraData if your merchant does not have stores
  var extraData = cryptoJs.enc.Base64.stringify(
    cryptoJs.enc.Utf8.parse(address)
  ); 

  //before sign HMAC SHA256 with format
  //accessKey=$accessKey&amount=$amount&extraData=$extraData&ipnUrl=$ipnUrl&orderId=$orderId&orderInfo=$orderInfo&partnerCode=$partnerCode&redirectUrl=$redirectUrl&requestId=$requestId&requestType=$requestType
  let rawSignature =
    "accessKey=" +
    accessKey +
    "&amount=" +
    amount +
    "&extraData=" +
    extraData +
    "&ipnUrl=" +
    ipnUrl +
    "&orderId=" +
    orderId +
    "&orderInfo=" +
    orderInfo +
    "&partnerCode=" +
    partnerCode +
    "&redirectUrl=" +
    redirectUrl +
    "&requestId=" +
    requestId +
    "&requestType=" +
    requestType;
  //puts raw signature
  // console.log("--------------------RAW SIGNATURE----------------");
  // console.log(rawSignature);
  //signature
  let signature = cryptoJs.HmacSHA256(rawSignature, secretKey).toString();
  // var signature = crypto
  //   .createHmac("sha256", secretKey)
  //   .update(rawSignature)
  //   .digest("hex");
  // console.log("--------------------SIGNATURE----------------");
  // console.log(signature);

  //json object send to MoMo endpoint
  const requestBody = JSON.stringify({
    partnerCode,
    accessKey,
    requestId,
    amount,
    orderId,
    orderInfo,
    redirectUrl,
    ipnUrl,
    extraData,
    requestType,
    signature,
    lang: "vi",
  });
  //Create the HTTPS objects
  const https = require("https");
  const options = {
    hostname: "test-payment.momo.vn",
    port: 443,
    path: "/v2/gateway/api/create",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(requestBody),
    },
  };
  //Send the request and get the response
  const request = await https.request(options, (response) => {
    data = response;
    // console.log(`Status: ${response.statusCode}`);
    // console.log(`Headers: ${JSON.stringify(response.headers)}`);
    response.setEncoding("utf8");
    response.on("data", (body) => {
      // console.log("Body: ");
      // console.log(body);
      // console.log("payUrl: ");
      // console.log(JSON.parse(body).payUrl);
      res.status(response.statusCode).json(body);
    });
    response.on("end", () => {
      // console.log("No more data in response.");
    });
  });

  request.on("error", (e) => {
    // console.log(`problem with request: ${e.message}`);
  });
  // write data to request body
  // console.log("Sending....");
  request.write(requestBody);
  request.end();
  
});

module.exports = router;
