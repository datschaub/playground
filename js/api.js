window.onload = function () {

	const Books = 
	{ 
		template: '<div>Books here!</div>'
	}

	const People = 
	{ 
		data: function(){
			return{
				dataInput: '',
				people: []
			}
		},

		methods:
		{
			postItem: function(){

				var options = 
				{
					body: this.dataInput,
				}

				this.$http.post('/jsonDb.json', {body: this.dataInput}).then((response) => {

					response.status;

					response.statusText;

					this.people = response.body;

				}, (response) => {
					//error callback
				})

			},

			getAllItems: function(){
				
				this.$http.get('/jsonDb.json').then((response) => {

					console.log(response.body);
					this.people = response.body;

				}, (response) => {

					console.log("Exception: ", response)

				});
			}
		},

		template: '\
			<div>\
				<div class="input-group col-md-4 col-md-offset-4">\
	    			<span class="input-group-addon"><i class="glyphicon glyphicon-user"></i></span>\
	    			<input v-model="dataInput" id="email" type="text" class="form-control" name="email" placeholder="Person">\
	  			</div>\
	  			<p>\
	  				<button class="btn btn-success" @click="getAllItems()">Show items</button>\
	  			</p>\
	  			<p>\
	  				<transition name="fade">\
	  					<button v-show="dataInput" @click="postItem()" class="btn btn-primary animated">Add item</button>\
	  				</transition>\
	  			</p>\
				<table class="table table-striped table-hover">\
					<thead>\
						<th>ID</th>\
						<th>First Name</th>\
						<th>Options</th>\
					</thead>\
					<tr v-for="person in people">\
						<td>\
							{{ person.id }}\
						</td>\
						<td>\
							{{ person.first_name }}\
						</td>\
						<td>\
							<button class="btn btn-primary">Edit</button>\
							<button class="btn btn-danger">Delete</button>\
						</td>\
					</tr>\
				</table>\
			</div>',
	}

	const routes = 
	[
		{ path: '/people', component: People },
		{ path: '/books', component: Books }
	]

	const router = new VueRouter({
		routes
	})

	var rest = new Vue({

		router,

		el: '#rest',

		http:
		{
			root: '',
		},

		data:
		{
			title: 'RESTful :)',
		}
		
	}).$mount('#rest');
}