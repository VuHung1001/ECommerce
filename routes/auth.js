const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");// hash password
const jwt = require("jsonwebtoken"); //json web token for verify user
const {
  verifyToken,
} = require("./verifyToken");

//CHECK LOGGED IN
router.get('/authorize', verifyToken, async (req, res) => {
  res.status(202).send('Logged in')
})

//CHECK USERNAME EXISTS
router.get('/checkUsername/:username', async (req, res) => {
  // const user = await User.findOne({
  //   $or: [
  //     { username: req.params.username },
  //     { email: req.query.email }
  //   ]
  // });
  // if( user.username === req.params.username ) return res.status(202).send("Username already exists"); 
  // else if( user.email === req.query.email ) return res.status(409).send("Email already exists");
  // else return res.status(200).send('OK')    
  const user = await User.findOne(
    {
      username: req.params.username
    }
  );
  if( user ) return res.status(202).send("Username already exists"); 
  else return res.status(200).send('OK') 
})

//REGISTER
router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt( 
      req.body.password,
      process.env.PASS_SEC
    ).toString(),
    loginByGoogle: req.body?.loginByGoogle ? req.body.loginByGoogle : false,
    img: req.body?.img 
        ? req.body.img 
        : 'https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif',
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN
router.post('/login', async (req, res) => {
  if(req.body.password){
    try{
        const user = await User.findOne(
            {
                username: req.body.username
            }
        );

        if(!user ) return res.status(401).json("Wrong User Name");

        // hashed user password was found from db
        const hashedPassword = CryptoJS.AES.decrypt(
          user.password,
          process.env.PASS_SEC
        );
          
        // original password was found from db
        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8)+'';

        // password was inputted for login
        const inputPassword = req.body.password+'';

        if(originalPassword !== inputPassword)
            return res.status(401).json("Wrong Password");

        // create new jwt
        const accessToken = jwt.sign(
          {
              id: user._id,
              isAdmin: user.isAdmin,
          },
          process.env.JWT_SEC,
          {expiresIn:"1d"}
        );
  
        const { password, ...others } = user._doc;  
        res.status(200).json({...others, accessToken});
    }catch(err){
        return res.status(500).json(err);
    }
  }
});

module.exports = router;
