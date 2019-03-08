
// external js: flickity.pkgd.js

var carousel = document.querySelector('.carousel');
var flkty = new Flickity( carousel, {
  imagesLoaded: true,
  percentPosition: false,
  wrapAround:true,
  pageDots:false,
  autoPlay: true,
  hash: true
});

var imgs = carousel.querySelectorAll('.carousel-cell img');
// get transform property
var docStyle = document.documentElement.style;
var transformProp = typeof docStyle.transform == 'string' ?
  'transform' : 'WebkitTransform';

var progressBar = document.querySelector('.progress-bar');

flkty.on( 'scroll', function( progress ) {
  progress = Math.max( 0, Math.min( 1, progress ) );
  progressBar.style.width = progress * 100 + '%';
});

var restart = document.querySelector('.button');

restart.addEventListener( 'click', function( event ) {
  flkty.select( '0', true, true );
});

(function(){ 
	
	// Definujemy funkcję initMap w zakresie globalnym (czyli jako właściwość obiektu window).
  	window.initMap = function() {
			// Zapisujemy w zmiennej obiekt zawierający współrzędne geograficzne.
			var infos = document.getElementById('infos'); 
			var markerS = [];	//  Tablice pozycji wszystkich markerów

		var	map = new google.maps.Map(document.getElementById('map'), {
			// Podajemy opcje mapy, np. zoom i punkt wycentrowania mapy.
			zoom: 3,
			center: dataImages[0].coords
		});
		for (var i = 0; i < dataImages.length; i++) {
		// Dodajemy marker w centrum i pozostałe dookoła jako nowe instancje obiektu Marker.
			marker = new google.maps.Marker({
			// I podajemy opcje tego markera, np. na której mapie ma być dodany oraz jakie są jego współrzędne. 
			position: dataImages[i].coords,
			map: map
		}); 
		marker.addListener('click', function(){
			// Wewnątrz funcji wpisujemy kod, który ma się wykonać po kliknięciu markera. W tym przykładzie wyświetlimy tekst na stronie. 
			infos.innerHTML = dataImages[i].description;
		});
	}
	}	
	 
})();  

flkty.on( 'change', function( index ) {
		 //Center map
		 //Najpierw wykorzystujemy metodę panTo w obiekcie map do przesunięcia współrzędnych mapy:
		var	map = new google.maps.Map(document.getElementById('map'), {
			// Podajemy opcje mapy, np. zoom i punkt wycentrowania mapy.
				zoom: 7,
				center: dataImages[index].coords
		});
		map.panTo(dataImages[index].coords);
	
		// A następnie zmieniamy powiększenie mapy:
		map.setZoom(10);
		/*Center smoothly
		var smoothPanAndZoom = function(map, zoom, coords){
			// Trochę obliczeń, aby wyliczyć odpowiedni zoom do którego ma oddalić się mapa na początku animacji.
			var jumpZoom = zoom - Math.abs(map.getZoom() - zoom);
			jumpZoom = Math.min(jumpZoom, zoom -1);
			jumpZoom = Math.max(jumpZoom, 3);
	
			// Zaczynamy od oddalenia mapy do wyliczonego powiększenia. 
			smoothZoom(map, jumpZoom, function(){
				// Następnie przesuwamy mapę do żądanych współrzędnych.
				smoothPan(map, coords, function(){
					// Na końcu powiększamy mapę do żądanego powiększenia. 
					smoothZoom(map, zoom); 
				});
			});
		};
		
		var smoothZoom = function(map, zoom, callback) {
			var startingZoom = map.getZoom();
			var steps = Math.abs(startingZoom - zoom);
			
			// Jeśli steps == 0, czyli startingZoom == zoom
			if(!steps) {
				// Jeśli podano trzeci argument
				if(callback) {
					// Wywołaj funkcję podaną jako trzeci argument.
					callback();
				}
				// Zakończ działanie funkcji
				return;
			}
	
			// Trochę matematyki, dzięki której otrzymamy -1 lub 1, w zależności od tego czy startingZoom jest mniejszy od zoom
			var stepChange = - (startingZoom - zoom) / steps;
	
			var i = 0;
			// Wywołujemy setInterval, który będzie wykonywał funkcję co X milisekund (X podany jako drugi argument, w naszym przypadku 80)
			var timer = window.setInterval(function(){
				// Jeśli wykonano odpowiednią liczbę kroków
				if(++i >= steps) {
					// Wyczyść timer, czyli przestań wykonywać funkcję podaną w powyższm setInterval
					window.clearInterval(timer);
					// Jeśli podano trzeci argument
					if(callback) {
						// Wykonaj funkcję podaną jako trzeci argument
						callback();
					}
				}
				// Skorzystaj z metody setZoom obiektu map, aby zmienić powiększenie na zaokrąglony wynik poniższego obliczenia
				map.setZoom(Math.round(startingZoom + stepChange * i));
			}, 80);
		};
	
		// Poniższa funkcja działa bardzo podobnie do smoothZoom. Spróbuj samodzielnie ją przeanalizować. 
		var smoothPan = function(map, coords, callback) {
			var mapCenter = map.getCenter();
			coords = new google.maps.LatLng(coords);
	
			var steps = 12;
			var panStep = {lat: (coords.lat() - mapCenter.lat()) / steps, lng: (coords.lng() - mapCenter.lng()) / steps};
	
			var i = 0;
			var timer = window.setInterval(function(){
				if(++i >= steps) {
					window.clearInterval(timer);
					if(callback) callback();
				}
				map.panTo({lat: mapCenter.lat() + panStep.lat * i, lng: mapCenter.lng() + panStep.lng * i});
			}, 1000/30);
		}; 
		
	})();  
	
		document.getElementById('center-smooth').addEventListener('click', function(event){
			event.preventDefault();
			smoothPanAndZoom(map, 7, dataImages[index].coords);
		});
	}	*/
	
	for (var i = 0; i < dataImages.length; i++) {
		// Dodajemy marker w centrum i pozostałe dookoła jako nowe instancje obiektu Marker.
			marker = new google.maps.Marker({
			// I podajemy opcje tego markera, np. na której mapie ma być dodany oraz jakie są jego współrzędne. 
			position: dataImages[i].coords,
			map: map
		});
		var infos = document.getElementById('infos'); 
		marker.addListener('click', function(){
			// Wewnątrz funcji wpisujemy kod, który ma się wykonać po kliknięciu markera. W tym przykładzie wyświetlimy tekst na stronie. 
			infos.innerHTML = dataImages[i].description;
		});
	}
});
