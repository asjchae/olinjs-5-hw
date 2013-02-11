var FacebookUser = require('../models/facebookuser')
				, mongoose = require('mongoose');
/*
 * GET users listing.
 */

exports.list = function(req, res){
  res.send("respond with a resource");
};

exports.main = function(req, res) {
	req.facebook.api('/me', function(err, fbuser) {
		if (err) {
			return console.log("error", err);
		}

		FacebookUser.findOne({FBID:fbuser.id}).exec(function(err, user) {
			if (!user) {
				var newfbuser = new FacebookUser ({FBID:fbuser.id, background:'#FFFFFF'});
				newfbuser.save(function (err) {
					if (err) {
						console.log("error", err);
					}
				});
			}
			req.session.user = user || newfbuser;
			req.facebook.api('/me/picture?redirect=false&type=large', function(err, data) {
				res.render('homepage', {title: "Homepage", picture: data.data.url, background: user.color})
			});
		});
	});
};


exports.login = function(req, res) {
	res.redirect('/')
	// Put stuff here for Mongo DB of user stuff.
}

exports.color = function(req, res) {
	FacebookUser.findOne({FBID: req.user}).exec(function (err, user) {
		if (err) {
			console.log("Could not find user", err);
		} else {
			FacebookUser.background = req.body.Color;
			user.save(function (err) {
				if (err) {
					console.log("Problem saving color", err);
				} else {
					res.redirect('/')
				}
			});

		}
	});
}