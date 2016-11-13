$(document).ready(function(){

	Vue.component('artist-puff', {
		data: function()
		{
			progressbar:{
				return{width: this.popularity+'%' };
			}
			
		},
		template: '\
		<div class="col-md-4 artist-puff">\
			<h3>{{ name }}</h3>\
			<div class="artist-puff-image">\
				<a :href="link"><img :src="image" width="100px" height="100px" class="img-circle"></a>\
			</div>\
			<div class="artist-puff-popularity">\
				Popularity:\
				<div class="progress progress-striped">\
					<div class="progress-bar" role="progressbar" :aria-valuenow="popularity" aria-valuemin="0" aria-valuemax="100" v-bind:style="progressbar"></div>\
				</div>\
			</div>\
		</div>',

		props: [
		'name',
		'image',
		'link',
		'popularity'
		]
	});

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
		watch:
		{
			artistInput: function(artistInput){
				this.getData();
			}
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

							var artistName = artist.name;
							var playLink = artist.external_urls.spotify;
							var artistPopularity = artist.popularity;

							// Check if artist has an image
							if(artist.images.length > 0){
								var artistImage = artistSearch[index].images[1].url;
							} else{
								artistImage = "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/300px-No_image_available.svg.png";
							}

							spotifyData.artists.push(
								{ 
								name: artistName,
								image: artistImage, 
								link: playLink,
								popularity: artistPopularity
							});
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