var express = require('express'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  path = require('path'),
  config = require('./config/config.js'),
  expressSession = require('express-session'),
  MongoStore = require('connect-mongo')(expressSession),
  app = express();
global.rootPath = path.resolve(__dirname);
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(expressSession({
  secret: 'merlox cat',
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({
    url: config.dbUrl
  }),
  cookie: {secure: false, maxAge: 31104000000}
}));
mongoose.connect(config.dbUrl);
var port = process.env.PORT || 8080;

require('./app/routes/routes.server.routes.js')(app, express);

app.listen(port);
console.log('Listening server on 8080');
