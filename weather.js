$(document).ready(function(){

	var vue1 = new Vue({
		el: '#vue1',
		data:
		{
			message: 'This is Vue'
		}
	});

	var vue2 = new Vue({
		el: '#vue2',
		data:
		{
			message: 'This is also Vue',
			items: 
			[
				
			],
		},
		methods:
		{
			addItem: function(){
				this.items.push({text: 'New item!'});
			}
		}
	});

	var vue3 = new Vue({
		el: '#vue3',
		data:
		{
			message: 'Add stuff to a list',
			input: '',
			items: 
			[
				
			],
		},
		methods:
		{
			addItem: function(){
				this.items.push({text: this.input});
			}
		}
	});

	// Event handler for clicking the search weather button
	$("#weatherBtn").click(function getWeather(event){
		event.preventDefault();

		$('.searchResponse').text(' ');

		var station = document.getElementById('stationInput');
		var station_id = station.value;
		console.log(station_id);
		$.ajax({
			type: 'GET',
			dataType: 'json',
			url: "http://opendata-download-metobs.smhi.se/api/version/1.0/parameter/2.json",
			success: function(data) {

				$.each(data.station, function(key, value){
					if(value.name == station_id){
						station_id = value.id;
						console.log(station_id);
					}

				});

				$.ajax({
					type: 'GET',
					url: "http://opendata-download-metobs.smhi.se/api/version/1.0/parameter/2/station/"+station_id+"/period/latest-day/data.json",

					success: function(data) {
						var station = data.station.name;
						var period = data.period.summary;
						var temperature = data.value[0].value;	
						console.log("Temperatur senaste dygnet i ", station, temperature);

						// APPEND NEW ROW
						$("#weatherTable").each(function(){

							// Build table row
							var td = "<tr>";

							td += '<td class="station col-md-4">' + station + "</td>";
							td += '<td class="period col-md-4">' + period + "</td>";
							td += '<td class="temperature col-md-4">' + temperature + "</td>";

							td += "</tr>";
							
							// Check if table is empty or not
							if($('tbody tr', this).length > 0){

								// Look for incoming station (to avoid duplicates)
								var stationExists = $('#weatherTable tr > td:contains('+ station + ')');

								// If station already exists in table
								if(stationExists.length > 0){

									// Add warning label
									addLabelToWeatherSearch("warning");
								} else{

									// Append row
									$('tbody', this).append(td);

									clearAlert();
								}
								
							} else{
								// Append row
								$('tbody', this).append(td);

								clearAlert();
							}
							
						});

						var warmest = 0;
						var coldest = Number.MAX_SAFE_INTEGER;
						var warmestStation, coldestStation = "";

						// Set puffs
						$(".temperature").each(function(){

							// Warmest
							if(parseFloat(this.innerHTML) > warmest){
								warmest = parseFloat(this.innerHTML);
							}

							// Coldest
							if(parseFloat(this.innerHTML) < coldest){
								coldest = parseFloat(this.innerHTML);
							}

						});

						$(".warmestStation").text(warmest + " c");
						$(".coldestStation").text(coldest + " c");

						$("#tempSpan").html(temperature+"c");
					},
					error: function(exception){

						// Error message
						addLabelToWeatherSearch("danger");
						console.log('exception call #2: '+ exception);
					}
				});
			},
			error: function(exception){
				console.log('exception call #1: '+ exception);
			}
		})

		// Function that makes it easier to add an alert message
		function addLabelToWeatherSearch(alertType){
		
		$('.searchResponse').fadeIn(500, function(){
			$('.searchResponse').show();
		});

		var classToRemove;
		
		// "Switch" statement for warning/error message
		if(alertType === "warning"){
			classToRemove = "danger";
			$('.searchResponse').html('<strong>' + station.value + '</strong> finns redan ');
		} else {
			classToRemove = "warning";
			$('.searchResponse').html('Kunde inte hitta <strong> ' + station.value + ' </strong>');
		} 

		$('.searchResponse').addClass('alert-' + alertType).removeClass('alert-' + classToRemove);
		
		$('.searchResponse').append('<button type="submit" id="closeAlert" class="btn btn-warning btn-xs close"><span class="glyphicon glyphicon-remove"></span></button>');
		closeAlert();
	}
	});

	// Function for the close button on alerts
	function closeAlert(){
		$(".alert .close").on("click", function closeAlert(e){
			$(this).fadeOut(500, function(){
				$(this).parent().hide();
				$('.searchResponse').removeClass('alert-danger');
				$('.searchResponse').removeClass('alert-warning');
			});
		})
	}

	function clearAlert(){

		// Clear alert
		$('.searchResponse').fadeOut(500, function(){
			$('.searchResponse').hide();
			$('.searchResponse').removeClass('alert-danger');
			$('.searchResponse').removeClass('alert-warning');
		});
	}

});

