const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/UserModel');

const saltRounds = 10;

class authController {
  generateJwtToken(credentials) {
    const secretKey = process.env.PRIVATEKEY; 
    return new Promise((resolve,reject) => {
      jwt.sign(credentials,secretKey, { expiresIn: 60 * 15 }, (err, token) => {
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
      res.token = bearerToken;
      next();
    } else {
      res.status(403).send({status: 0, msg: 'Forbidden access'});
    }
  }

  async signUpUser(req,res) {
    try {
      const {firstName,lastName,username,password,emailId} = req.body;
      const pwdHash = await this.generateHash(password);
      const userData = {firstName,lastName,username,pwdHash,emailId};
      await User.create(userData);
      res.send({
        status: 1,
        msg: 'User registered successfully'
      });
    } catch (err) {
      let msg;
      if (err.code === 11000) msg = 'Username or EmailId already exists';
      console.log(err);
      res.send({status: 0,msg});
    }
  }

  async login(req,res) {
    try {
      const {username,password} = req.body;

      const userData = await User.findOne({username});
      if (!userData) res.send({status: 1, msg: 'Username doesn\'t exist'});

      const { emailId, pwdHash } = userData; 

      const match = await bcrypt.compare(password, pwdHash);
      if (!match) res.send({status: 1, msg: 'Entered password is wrong'});
      
      const credentials = { username, emailId};
      const token = await this.generateJwtToken(credentials);

      res.send({ success: 1,token });
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = new authController();