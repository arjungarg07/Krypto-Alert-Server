const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/UserModel');
const emailController = require('./emailController');

const saltRounds = 10;

class authController {
  generateJwtToken(credentials, expiry) {
    const secretKey = process.env.PRIVATEKEY; 
    return new Promise((resolve,reject) => {
      jwt.sign(credentials,secretKey, { expiresIn: expiry }, (err, token) => {
        if (err) reject(err);
        resolve(token);
      });
    });
  }

  generateHash(credentials) {
    return new Promise((resolve,reject) => {
      bcrypt.genSalt(saltRounds, (err, salt) => {
        if (err) reject(err);
        bcrypt.hash(credentials, salt, (err, hash) => {
          if (err) reject(err);
          resolve(hash);
        });
      });  
    });  
  }

  verifyToken(req,res,next) {
    const bearerHeader = req.headers['authorization'];
    // check for token
    if (typeof bearerHeader !== 'undefined') {
      const bearerToken = bearerHeader.split(' ')[1];
      // set the token
      const secretKey = process.env.PRIVATEKEY; 
      jwt.verify(bearerToken,secretKey,(err,decoded) => {
        if (err) {
          console.log(err);
          return next();
        }
        const { userId, username } = decoded;
        console.log('verify',decoded);
        req.authData = { userId, username };
        next();
      });
    } else {
      res.status(403).json({status: 0, msg: 'Forbidden access'});
    }
  }

  async signUpUser(req,res) {
    try {
      const {firstName,lastName,username,password,emailId} = req.body;
      const pwdHash = await this.generateHash(password);
      const userData = new User({ firstName,lastName,username,pwdHash,emailId});
      await User.create(userData);
      const URL = await this.generateVerifyURL({username, emailId});
      await emailController.sendVerification(URL,emailId);
      res.send({
        status: 1,
        msg: 'User registered successfully'
      });
    } catch (err) {
      if (err.code === 11000) {
        res.status(400).json({status: 0, msg: 'Username or emailId already exists'});
        console.log(err);
        return;
      }
      console.log(err);
      res.status(500).json({status: 0,msg: 'Internal Server Error'});
    }
  }

  async login(req,res) {
    try {
      const {username,password} = req.body;

      const userData = await User.findOne({username});
      if (!userData) res.status(400).json({status: 1, msg: 'Username doesn\'t exist'});

      const { emailId, pwdHash, _id } = userData; 

      const match = await bcrypt.compare(password, pwdHash);
      if (!match) res.status(400).json({status: 1, msg: 'Unable to log in. Please ensure that your username and password are correct'});
      
      const credentials = { username, emailId, userId: _id};
      const token = await this.generateJwtToken(credentials,60 * 60);

      res.send({ success: 1,token});
    } catch (err) {
      console.log(err);
      res.status(500).json({status: 0, msg: 'Something went wrong'});
    }
  }

  async generateVerifyURL(creds) {
    const token = await this.generateJwtToken(creds, 60 * 60 * 24 * 2);
    return `localhost:8000/api/v1/signup/validate/?token=${token}`;
  }

  async verifyUser(req,res) {
    try {
      const { token } = req.query;
      const secretKey = process.env.PRIVATEKEY;
      jwt.verify(token,secretKey, async (err,decoded) => {
        if (err) {
          console.log(err);
          res.status(404).json({status: 0, msg: 'Token Expired'});
          return;
        }
        const { username } = decoded;
        await User.findOneAndUpdate({username},{isVerified: true});
        res.json({status: 1, msg: 'Successfully verified User'});
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({status: 0, msg: 'Something went wrong'});
    }
  }
}

module.exports = new authController();