const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwtDecode = require("jwt-decode");

const User = require("../models/userModel");
const emailController = require("./emailController");

const saltRounds = 10;

class authController {
  generateJwtToken(credentials, expiry) {
    const secretKey = process.env.PRIVATEKEY;
    return new Promise((resolve, reject) => {
      jwt.sign(credentials, secretKey, { expiresIn: expiry }, (err, token) => {
        if (err) reject(err);
        resolve(token);
      });
    });
  }

  generateHash(credentials) {
    return new Promise((resolve, reject) => {
      bcrypt.genSalt(saltRounds, (err, salt) => {
        if (err) reject(err);
        bcrypt.hash(credentials, salt, (err, hash) => {
          if (err) reject(err);
          resolve(hash);
        });
      });
    });
  }

  verifyToken(req, res, next) {
    let token;
    console.log('token kaha hai', req.cookies.token);
    if (
      req.headers.authorization &&
      req.headers.authorization.split(' ')[0] === 'Bearer'
    ) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    } else {
      return res.status(401).json({
        status: 0,
        message: 'No token provided.',
      });
    }
    const secretKey = process.env.PRIVATEKEY;
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          status: 0,
          message: 'Failed to authenticate token.',
        });
      }
      const { userId, username } = decoded;
      req.authData = { userId, username };
      next();
    });
  }

  logout(req,res) {
    res.clearCookie('token');
    res.status(200).send({ status: 1, msg: 'Logged out successfully' });
  }

  async checkSession(req, res) {
    try {
      const token = req.cookies?.token;
      if (!token) {
        return res.status(200).json({
          status: 0,
          message: 'No token provided.',
        });
      }
      if(token){
        // check if cookie is expired 
        const secretKey = process.env.PRIVATEKEY;
        jwt.verify(token, secretKey, async (err, decoded) => {
          if (err) {
            return res.status(200).json({
              status: 0,
              message: 'Failed to authenticate token.',
            });
          }
          const { userId, username } = decoded;
          req.authData = { userId, username };
          res.status(200).json({ status: 1, data: { userId, username } });
        }
        );
      }
    } catch (err) {
      console.log(err);
    }
  }

  async signUpUser(req, res) {
    try {
      const { name, username, password, emailId } = req.body;
      // validate if any field is null
      if (!username || !password || !emailId) {
        res.status(200).send({ status: 2, msg: 'Provide all the credentials' });
        return;
      }
      console.log(req.body);
      const pwdHash = await this.generateHash(password);
      const userData = new User({ name, username, pwdHash, emailId });
      await User.create(userData);
      const URL = await this.generateVerifyURL({ username, emailId });
      await emailController.sendVerification(URL, emailId);
      res.status(200).send({
        status: 1,
        msg: 'user registered successfully',
      });
    } catch (err) {
      if (err.code === 11000) {
        res
          .status(200)
          .json({ status: 2, msg: 'Username or emailId already exists' });
        console.log(err);
        return;
      }
      console.log(err);
      res.status(500).json({ status: 0, msg: 'Internal Server Error' });
    }
  }

  async login(req, res) {
    try {
      console.log(req.body);
      const { username, password } = req.body;
      if (!username || !password) {
        res
          .status(200)
          .json({ status: 2, msg: 'Username and password required' });
        return;
      }
      const existingUser = await User.findOne({ username });
      console.log(existingUser);
      if (!existingUser) {
        res.status(200).json({ status: 2, msg: 'Username doesn\'t exist' });
        return;
      }

      const { emailId, pwdHash, _id } = existingUser;

      const match = await bcrypt.compare(password, pwdHash);
      if (!match) {
        res
          .status(200)
          .json({
            status: 2,
            msg: 'Unable to log in. Please ensure that your username and password are correct',
          });
        return;
      }

      const credentials = { username, emailId, userId: _id };
      const token = await this.generateJwtToken(credentials, 30); // 30 seconds
      const userData = jwtDecode(token);
      // set cookie
      res.cookie('token', token, {
        expires: new Date(Date.now() + 1000 * 60 * 60), // 1Hr
        httpOnly: true,
      });
      res.status(200).send({ status: 1, data: { token, userData } });
    } catch (err) {
      console.log(err);
      res.status(500).json({ status: 0, msg: 'Something went wrong' });
    }
  }

  async generateVerifyURL(creds) {
    const token = await this.generateJwtToken(creds, 60 * 60 * 24 * 2);
    return `https://kryptoalert.herokuapp.com/api/v1/signup/validate/?token=${token}`;
  }

  async verifyUser(req, res) {
    try {
      // get token from cookie headers
      const { token } = req.query;
      const secretKey = process.env.PRIVATEKEY;
      jwt.verify(token, secretKey, async (err, decoded) => {
        if (err) {
          console.log(err);
          res.status(404).json({ status: 0, msg: 'Token Expired' });
          return;
        }
        const { username } = decoded;
        await User.findOneAndUpdate({ username }, { isVerified: true });
        res.json({ status: 1, msg: 'Successfully verified user' });
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ status: 0, msg: 'Something went wrong' });
    }
  }
}

module.exports = new authController();
