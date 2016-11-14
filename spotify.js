$(document).ready(function(){

	Vue.component('artist-puff', {
		template: '\
		<div class="col-md-3 artist-puff">\
		<div class="artist-puff-header"><h3>{{ name }}</h3></div>\
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
		</div>',

		props: [
		'name',
		'image',
		'link',
		'popularity'
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
			showAmountOptions: [5, 10, 20, 50, 100]
		},
		watch:
		{
			artistInput: function(artistInput){
				if(artistInput.length > 0){
					this.getData();
				}
			},
			showAmount: function(showAmount){
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