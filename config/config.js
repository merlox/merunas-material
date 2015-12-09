var config = {};

config.dbUrl = process.env.DB_URL || 'mongodb://merlox:merlox@apollo.modulusmongo.net:27017/opu8Wihe';

config.twitter = {
  consumerKey: 'HaEMSO2ikvLGHPrRu1nnGrKuZ',
  consumerSecret: 'HpqPefzGLk0mqnRtV0JR5D2jo3HwNTo9hmJ1cwxKGvDYy6xX7u',
  callbackURL: 'http://localhost:8080/auth/twitter/callback'
};
config.facebook = {
  clientID: '437021553162621',
  clientSecret: 'c2c88d94fe206fefbae77316ad58b56e',
  callbackURL: 'http://localhost:8080/auth/facebook/callback'
};
config.google = {
  clientID: '1093128908224-a07n7b1vjmsch875vjv64pds3qk8eqep.apps.googleusercontent.com',
  clientSecret: 'X3C2MU2fozu-tLlDvE10DyND',
  callbackURL: 'http://localhost:8080/auth/google/callback'
};
config.paypal = {
  mode: 'sandbox', //sandbox or live
  client_id: 'Ab22S3wpI612MHAoTo10TKAw8RnsAGHf4rGJOfJ5wChxl2tJq0wD_e84StFPH2sY1unSDNI9z8kcwGOO',
  client_secret: 'EEciQE0wXdPWIZgtGA-h_fw4mPN_JnEKsdRu7GwpewZtXOINgZO4-NOknK47mpGz6dy6b29bl7tyU6NO'
};

module.exports = config;
