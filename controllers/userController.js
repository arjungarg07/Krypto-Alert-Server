const User = require('../models/UserModel');
const Alert = require('../models/AlertModel');

class userController {
  async data(req,res) {
    try {
      const authData = req.authData;
      if (!authData) return res.status(404).json({status: 1, msg: 'Authentication Failed'});
      const { userId } = authData;
      const userDetails = await User.findOne({_id: userId});
      const alertDetails = await Alert.find({userId,isSent: false});
      console.log(alertDetails);
      const results = {userDetails, alertDetails};
      if (!userDetails) {res.status(404).send({status: 1, msg: 'User Details not found'}); return; }
      
      res.status(200).json({status: 1, msg: 'User details fetched successfully', results });
    } catch (err) {
      console.log(err);
      res.status(500).json({status: 0, msg: 'Internal Server Error'});
    }
  }
}

module.exports = new userController();