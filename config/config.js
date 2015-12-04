var config = {};

config.dbUrl = process.env.DB_URL || 'mongodb://merlox:merlox@apollo.modulusmongo.net:27017/opu8Wihe';

config.twitter = {
  consumerKey: '2MB0L5m4QNIeoH7leBroJP7lW',
  consumerSecret: 'XpL9qgKazNcnTBaAEJHP43E2RxLzhTIYoMfpFnVQfMiteoPNRO',
  callbackURL: 'http://127.0.0.1:8080/auth/twitter/callback',
  accessKey: '372742883-YiD1bi93GDV2Y5i3vbyleISWbcI7d0bgrhSs17vv',
  accessSecret: 'goMAvvjjFHQ0DVPmGMB4NN38LkvBdZECKQr2RbcVJW2CP'
};
config.facebook = {
  clientID: '437021553162621',
  clientSecret: 'c2c88d94fe206fefbae77316ad58b56e',
  callbackURL: 'http://localhost:8080/auth/facebook/callback'
};
config.google = {
  clientID: '789410314493-gjm8h99iasechullst5ieqv475qiihgd.apps.googleusercontent.com0',
  clientSecret: 'w2i9uG3wjoGXqMwH9A_aovdo',
  callbackURL: 'http://localhost:8080/auth/google/callack'
};

module.exports = config;
