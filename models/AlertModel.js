const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
  userId: {
    type: String,
  },
  coin: {
    type: String,
    required: true
  },
  triggerPrice: {
    type: String,
    required: true,
  },
  isDrop: {
    type: Boolean,
    required: true,
  },
  isSent: {
    type: Boolean,
    default: false
  },
  updated: {
    type: Date, 
    default: Date.now
  }
});
  
const Alert = mongoose.model('Alert', alertSchema);

module.exports = Alert;
