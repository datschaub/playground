$(document).ready(function(){

	$("#weatherBtn").click(function getWeather(){

		var station = document.getElementById('station');
		var station_id = station.options[station.selectedIndex].value;
		console.log(station_id);
		$.ajax({
			type: 'GET',
			url: "http://opendata-download-metobs.smhi.se/api/version/1.0/parameter/2.json",
			success: function(data) {

				$.each(data.station, function(key, value){
					if(value.name == station_id){
						station_id = value.id;
						console.log(station_id);
					}

				})

				$.ajax({
					type: 'GET',
					url: "http://opendata-download-metobs.smhi.se/api/version/1.0/parameter/2/station/"+station_id+"/period/latest-day/data.json",

					success: function(data) {
						var station = data.station.name;
						var period = data.period.summary;
						var temperature = data.value[0].value;
						var list = "";
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

							var warmest = 0;
							var warmestStation = "";

							$(".temperature").each(function(){
								if(parseFloat(this.innerHTML) > warmest){
									warmest = parseFloat(this.innerHTML);
								}
							})

							$(".warmestStation").text(warmest + " c");
							console.log("warmest station is: ", warmest);
							
						});

						$("#tempSpan").html(temperature+"c");
					}
				});
			}
		})



	});
});

