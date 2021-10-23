const alert = require("../models/alertModel");

class alertController {
  async countAlert(userId) {
    try {
      const data = await alert.find({userId,isSent: false}); 
      console.log(data);
      return data;
    } catch (err) {
      console.log(err);
    }
  }

  async deleteAlert(req,res) {
    try {
      const {coin,triggerPrice} = req.body;
      const authData = req.authData; 
      if (!authData) {
        res.status(404).json({status: 1, msg: 'Authentication Failed'});
        return;
      }
      const { userId } = authData;
      const data =  await alert.update({userId,coin,triggerPrice},{isSent: true});
      console.log(data);
      res.json({status: 1, msg: 'alert deleted Successfully'});
    } catch (err) {
      console.log(err);
      res.status(500).json({status: 0, msg: 'Internal Server Error'});
    }
  }
  
  async createAlert(req,res) {
    try {
      const {coin, triggerPrice, isDrop} = req.body; 
      if (!coin || !triggerPrice || !isDrop) {
        res.status(404).json({status: 1, msg: 'Provide all the alert details'});
        return;
      }
      const authData = req.authData; 
      if (!authData) {
        res.status(404).json({status: 1, msg: 'Authentication Failed'});
        return;
      }
      const { userId } = authData;
      const count = await this.countAlert(userId);
      if (count.length>=2) {
        res.status(200).json({status: 1, msg: 'Max alert Limit reached'});
        return;
      }
      const alertDetails = {userId, coin, triggerPrice, isDrop};
      await alert.create(alertDetails);
      res.json({status: 1, msg: 'alert set Successfully'});
    } catch (err) {
      console.log(err);
      res.status(500).json({status: 0, msg: 'Internal Server Error'});
    }
  }
}

module.exports = new alertController();