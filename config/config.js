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

module.exports = config;
