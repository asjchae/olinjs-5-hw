$(document).ready(function(){
	var bgcolor = $('#usercolor').val();
	if (bgcolor){
		$('body').css('background-color', bgcolor);
		$('a').css('color', bgcolor);
	}
	$('#colorpick').submit(function () {
		var color = $('#colorname').val();
		$('body').css('background-color', color);
		$('a').css('color', color);
		if (color){		
			$.post("/color", { "color": color },
				function(data){
		            if (!data.err){
						$('#color').val('');
					}
		        }, 'json');
		}
		return false;
	});
});
