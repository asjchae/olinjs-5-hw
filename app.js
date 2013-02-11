
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , express = require('express')
  , Facebook = require('facebook-node-sdk')
  , mongoose = require('mongoose');

var app = express();
var facebook = new Facebook({ appId: '108219792693237', secret: '3244b6e5a6c4d5ecc2ae9fbfd931be97'});

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('3244b6e5a6c4d5ecc2ae9fbfd931be97'));
  app.use(express.session());
  app.use(Facebook.middleware({appId: '108219792693237', secret: '3244b6e5a6c4d5ecc2ae9fbfd931be97'}));
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
  mongoose.connect(process.env.MONGOLAB_URI || 'localhost/fbusers');

});

app.configure('development', function(){
  app.use(express.errorHandler());
});

//app.get('/', routes.index);
app.get('/users', user.list);

/*
app.get('/', Facebook.loginRequired(), function (req, res) {
  req.facebook.api('/me/picture?redirect=false&type=large', function(err, data) {
    console.log("user", data);
    // res.writeHead(200, {'Content-Type': 'text/plain'});
    res.send(data);
  });
});
*/

app.get('/login', Facebook.loginRequired(), user.login);

app.get('/', facebookGetUser(), user.main);

app.post('/color', facebookGetUser(), user.color);

function facebookGetUser() {
  return function(req, res, next) {
    req.facebook.getUser(function(err, user) {
      console.log(user);
      if (!user || err){
        res.send("You need to log in");
      } else {
        req.user = user;
        next();
      }
    });
  }
}

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});