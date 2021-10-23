const User = require("../models/userModel");
const Alert = require("../models/alertModel");

class userController {
  async data(req,res) {
    try {
      const authData = req.authData;
      if (!authData) return res.status(404).json({status: 1, msg: 'Unauthenticated'});
      const { userId } = authData;
      const unfilteredData = await User.findOne({_id: userId});
      // eslint-disable-next-line no-unused-vars
      const {_id, pwdHash, __v, ...userDetails} = unfilteredData._doc;
      console.log(userDetails);
      const alertDetails = await Alert.find({userId,isSent: false});
      console.log(alertDetails);
      const results = {userDetails, alertDetails};
      if (!userDetails) {res.status(404).send({status: 1, msg: 'User Details not found'}); return; }
      
      res.status(200).json({status: 1, msg: 'User details fetched successfully', data: results });
    } catch (err) {
      console.log(err);
      res.status(500).json({status: 0, msg: 'Internal Server Error'});
    }
  }
}

module.exports = new userController();