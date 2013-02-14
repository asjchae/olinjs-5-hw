var FacebookUser = require('../models/facebookuser')
				, mongoose = require('mongoose');


exports.widget = function (req, res) {
	res.render('carousel', {title: "Carousel"});
}

exports.test = function(req, res) {
	req.facebook.api('/me', function(err, fbuser) {
		if (err) {
			return console.log("error", err);
		}

		FacebookUser.findOne({FBID:fbuser.id}).exec(function(err, user) {
			if (!user) {
				var newfbuser = new FacebookUser({FBID:fbuser.id});
				newfbuser.save(function(err) {
					if (err) {
						console.log("error", err);
					}
				});
			}
			req.session.user = user || new fbuser;
			
			req.facebook.api('/me?fields=friends.limit(12).fields(name,photos.limit(1).fields(source,name))', function(err, data) {
				res.render('carousel', {title: "Picture", frienddata: data.friends.data});
			});
		});
	});
}