$(document).ready(function(){

	Vue.component('artist-puff', {
		template: '\
		<div class="col-md-3 artist-puff">\
		<div class="artist-puff-header"><h2>{{ name }}</h2></div>\
		<div class="artist-puff-image">\
		<a :href="link"><img :src="image" width="150px" height="150px" class="img-circle"></a>\
		</div>\
		<div class="artist-puff-popularity">\
		<div class="artist-puff-popularity-header text-muted">\
		Popularity <i class="fa fa-line-chart">\
		</div>\
		<div class="progress">\
		<div class="progress-bar" role="progressbar" :aria-valuenow="popularity" aria-valuemin="0" aria-valuemax="100" :style="progressbar"><span>{{ popularity }}</span></div>\
		</div>\
		</div>\
		<div class="artist-puff-genres">\
		<div class="artist-puff-genres-header">\
		Genres <i class="fa fa-music"></i>\
		</div>\
		<ul>\
		<li class="text-muted" v-for="genre in genres">\
		{{ genre }}\
		</li>\
		</ul\
		</div>\
		</div>\
		</div>',

		props: [
		'name',
		'image',
		'link',
		'popularity',
		'genres'
		],

		computed:
		{
			progressbar: function(){
				
				return{ width: this.popularity+'%' };
			}
		},
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
			// Amount of search results
			showAmount: 10,
			showAmountOptions: [5, 10, 20, 50]
		},
		watch:
		{
			artistInput: function(artistInput){
				if(artistInput.length > 0){
					this.getData();
				}
			},
			showAmount: function(showAmount){
				if(this.artistInput.length > 0){
					this.getData();
				}
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
						limit: this.showAmount
					},
					success: function(data){
						console.log(data.artists);
						console.log(data.artists.items);

						// Isolated artist data
						var artistSearch = data.artists.items;

						// Clear the list
						spotifyData.artists = [];

						// For each search result, push it into the Vue app array
						$.each(artistSearch, function(index){

							var artist = artistSearch[index];

							// Variables for fetched data
							var artistName = artist.name;
							var playLink = artist.external_urls.spotify;
							var artistPopularity = artist.popularity;
							var artistGenresArray = artist.genres;

							// Truncate genre array
							artistGenresArray = artistGenresArray.slice(0,3);

							// Check if there are any genres
							if(artistGenresArray.length < 1){
								artistGenresArray = ["No genre available"];
							}

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
								popularity: artistPopularity,
								genres: artistGenresArray
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