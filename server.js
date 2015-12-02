var express = require('express'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  path = require('path'),
  config = require('./config/config.js'),
  passport = require('passport'),
  expressSession = require('express-session'),
  app = express();
global.rootPath = path.resolve(__dirname);
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(expressSession({secret: 'merlox cat', resave: true, saveUninitialized: false}));
mongoose.connect(config.dbUrl);
var port = process.env.PORT || 8080;

require('./app/routes/routes.server.routes.js')(app, express);

app.listen(port);
console.log('Listening server on 8080');
