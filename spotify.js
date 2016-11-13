$(document).ready(function(){

	// SPOTIFY VUE APP
	var spotify = new Vue({
		el: '#spotify',
		data: 
		{
			// Input search form
			artistInput: '',
			// Array of search results
			artist: [],
		},
		methods:
		{
			//Ajax request to get data
			getData: function(){
				var spotifyData = this;
				$.ajax({
					url: 'https://api.spotify.com/v1/search',
					type: 'GET',
					dataType: 'json',
					data:
					{
						q: this.artistInput,
						type: 'artist',
					},
					success: function(data){
						console.log(data.artists.items);

						var artist = data.artists.items;
						this.artist = [];

						$.each(artist, function(index){
							var artistName = artist[index].name;
							spotifyData.artist.push({ name: artistName })
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