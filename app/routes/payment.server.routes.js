var paypalCtrl = require('../controllers/payment.server.controller.js');
module.exports = function(app){
  app.get('/payment/creditCard', paypalCtrl.paymentCreditCard);
  app.get('/payment/paypal', paypalCtrl.paymentPaypal);
  app.get('/payment/paypal/callback', paypalCtrl.paypalCallback);
  app.get('/payment/cancel', paypalCtrl.cancel);
  app.get('/api/paymentCallback', paypalCtrl.getPayedSession)
};
