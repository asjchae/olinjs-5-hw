
/*
 * GET users listing.
 */

exports.list = function(req, res){
  res.send("respond with a resource");
};

exports.main = function(req, res) {
	req.facebook.getUser(function(err, user) {
		if (!user || err) {
			res.render('routeLogin', {title: "Log In!"});
		} else {
			req.user = user;
		}
	})

	req.facebook.api('/me'), function(err, data) {
		console.log(data);
	}
	res.send("stop");
}