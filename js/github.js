$(document).ready(function(){

	$("#getCommits").click(function(){

		$.ajax({
			type: 'GET',
			dataType: 'json',
			url: 'https://api.github.com/repos/datschaub/playground/events',
			success: function(data){

				$.each(data, function(index){

					console.log(data[index].payload.commits);
				})
					
				
			},
			error: function(e){
				console.log('Exception: ' + e)
			}
		});

	});

});