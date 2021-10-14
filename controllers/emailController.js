const { CourierClient } = require('@trycourier/courier');

class emailController {
  async sendVerification(verifyURL,emailId) {
    // send email with URL to confirm registered user
    try {
      const courier = CourierClient({ authorizationToken: process.env.COURIER_AUTH});
        
      const { messageId } = await courier.send({
        eventId: process.env.COURIER_EVENT_ID,
        recipientId: process.env.COURIER_RECIPIENT_ID,
        profile: {
          email: `${emailId}`,
        },
        data: {
          verificationURL: `${verifyURL}`,
        },
        override: {
        },
      });
      // console.log(messageId);
    } catch (err) {
      console.log(err);
    }
  }

//   async sendPriceAlert() {
//   }
}

module.exports = new emailController();