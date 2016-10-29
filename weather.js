$(document).ready(function(){

	$(".btnGetWeather").click(function getWeather(){

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

						$(".station").html(station);
						$(".period").html(period);
						$(".temperature").html(temperature);

						$("#tempSpan").html(temperature+"c");
					}
				});
			}
		})



	});
});

