$(document).ready(function(){

	$("#weatherBtn").click(function getWeather(event){
		event.preventDefault();

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
							var td = "<tr>";

							td += '<td class="station col-md-4">' + station + "</td>";
							td += '<td class="period col-md-4">' + period + "</td>";
							td += '<td class="temperature col-md-4">' + temperature + "</td>";

							td += "</tr>";
							
							if($('tbody', this).length > 0){
								$('tbody', this).prepend(td);
							} else{
								$(this).prepend(td);
							}

							



						});

						var warmest = 0;
						var coldest = Number.MAX_SAFE_INTEGER;
						var warmestStation, coldestStation = "";
						
						// Set warmest
						$(".temperature").each(function(){
							if(parseFloat(this.innerHTML) > warmest){
								warmest = parseFloat(this.innerHTML);
							}
							

							if(parseFloat(this.innerHTML) < coldest){
								coldest = parseFloat(this.innerHTML);
							}


						});

						$(".warmestStation").text(warmest + " c");
						$(".coldestStation").text(coldest + " c");

						$("#tempSpan").html(temperature+"c");
					},
					error: function(exception){
						console.log('exception call #2: '+exception);
					}
				});
			},
			error: function(exception){
				console.log('exception call #1: '+exception);
			}
		})



	});
});

