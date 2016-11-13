$(document).ready(function(){

	Vue.component('artist-puff', {
		template: '\
		<div class="col-md-4 artist-puff">\
			<h3>{{ name }}</h3>\
			<div class="artist-puff-image">\
				<img :src="image" width="100px" height="100px" class="img-circle">\
			</div>\
		</div>',
		props: ['name','image'],
	})

	// SPOTIFY VUE APP
	var spotify = new Vue({
		el: '#spotify',
		data: 
		{
			// Input search form
			artistInput: '',
			// Array of search results
			artists: [],
		},
		methods:
		{
			//Ajax request to get data
			getData: function(){
				// Define this for Vue App
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

						// Isolated artist data
						var artistSearch = data.artists.items;

						// Clear the list
						spotifyData.artists = [];

						// For each search result, push it into the Vue app array
						$.each(artistSearch, function(index){

							var artist = artistSearch[index];
							var artistName = artistSearch[index].name;

							// Check if artist has an image
							if(artist.images.length > 0){
								var artistImage = artistSearch[index].images[1].url;
							} else{
								artistImage = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/300px-No_image_available.svg.png";
							}

							spotifyData.artists.push({ name: artistName, image: artistImage });
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