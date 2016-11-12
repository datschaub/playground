$(document).ready(function(){

	$("#getCommits").click(function(){

		$.ajax({
			type: 'GET',
			dataType: 'json',
			url: 'https://api.spotify.com/v1/artists/4KXp3xtaz1wWXnu5u34eVX',
			success: function(data){

				$.each(data, function(index){

					console.log(data);
				})

				
			},
			error: function(e){
				console.log('Exception: ' + e)
			}
		});

	});

	var spotify = new Vue({
		el: '#spotify',
		data: 
		{
			artistInput: '',
			artist: [],
		},
		methods:
		{
			getData: function(){
				var self = this;
				$.ajax({
					url: 'https://api.spotify.com/v1/search',
					type: 'GET',
					dataType: 'json',
					data:
					{
						q: self.artistInput,
						type: 'artist',
					},
					success: function(data){
						console.log(data.artists.items);

						var artist = data.artists.items;

						$.each(artist, function(index){
							var artistName = artist[index].name;
							self.artist.push({ name: artistName })
						})

					},
					error: function(e){
						console.log("Exception: ", e)
					}
				})
			}
		}
	});

});


//artists/4KXp3xtaz1wWXnu5u34eVX