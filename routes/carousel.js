var FacebookUser = require('../models/facebookuser')
				, mongoose = require('mongoose');


exports.widget = function(req, res) {
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
			
			req.facebook.api('/me?fields=friends.limit(40).fields(name,photos.limit(1).fields(source,name))', function(err, data) {
				res.render('carousel', {title: "Pictures", frienddata: data.friends.data});
			});
		});
	});
}

exports.comment = function(req, res) {
	console.log(req.body);
	console.log(req.body.comment);
	console.log(req.body.photoid);

	req.facebook.api('/'+req.body.photoid+'/comments','post',{message:req.body.comment}, function(err, response) {
		if (err) {
			console.log("error", err);
			res.send(err);
		} else {
			res.send(err);
		}

	});
}