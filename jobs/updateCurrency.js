const CronJob = require('cron').CronJob;

const Data = require('../controllers/updateData');

module.exports = new CronJob('*/30 * * * *', (async() => {
  await Data.update();
}), null, false, 'America/Los_Angeles');