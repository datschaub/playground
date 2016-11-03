$(document).ready(function(){

	$("#getCommits").click(function(){

		$.ajax({
			type: 'GET',
			dataType: 'json',
			url: 'https://api.github.com/repos/datschaub/playground/events',
			success: function(data){
				console.log(data);
			},
			error: function(e){
				console.log('Exception: ' + e)
			}
		});

	});

});