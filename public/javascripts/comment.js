$(document).ready(function() {
	$('.commenting').submit(function() {
		var comment = $('#commentbox').val();
		var photoid = $('#photoid').val();
		$.post("/comment", {comment: comment, photoid: photoid}, function(err) {
			console.log(err);
		}, "json");
		return false;
	});
});