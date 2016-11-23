window.onload = function () {

	var rest = new Vue({

		el: '#rest',

		data:
		{
			title: 'RESTful :)',
			dataInput: '',
			people: []
		},

		methods:
		{
			postItem: function(){

			},

			getItem: function(){
				
				this.$http.get('jsonDb.json').then((response) => {

					console.log(response);
					return response;

				}, (response) => {

					console.log("Exception: ", response)

				});
			}
		}
	})

}

	
