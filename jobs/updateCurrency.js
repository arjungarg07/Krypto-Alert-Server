const CronJob = require('cron').CronJob;

const currencyController = require('../controllers/currencyController');

module.exports = new CronJob('* * * * *', (async() => {
  await currencyController.update();
}), null, false, 'America/Los_Angeles');