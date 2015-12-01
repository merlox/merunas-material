var config = {};

config.dbUrl = 'mongodb://merlox:merlox@apollo.modulusmongo.net:27017/opu8Wihe';

config.twitter = {
  consumerKey: '2MB0L5m4QNIeoH7leBroJP7lW',
  consumerSecret: 'XpL9qgKazNcnTBaAEJHP43E2RxLzhTIYoMfpFnVQfMiteoPNRO',
  callbackUrl: 'http://localhost:8080/auth/twitter/callback'
}

config.facebook = {
  clientID: '437021553162621',
  clientSecret: 'c2c88d94fe206fefbae77316ad58b56e',
  callbackUrl: 'http://localhost:8080/auth/facebook/callback'
}

config.google = {
  clientID: '1070810634985-ce512kb3390v6eg5b9982c3i3rh790si.apps.googleusercontent.com',
  clientSecret: '-m-D2yJHBkKN4t57C8irkffU',
  callbackUrl: 'http://localhost:8080/auth/google/callback'
}

module.exports = config;
