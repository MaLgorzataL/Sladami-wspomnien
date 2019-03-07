
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

		// W tablicy maps zapisujemy nowe instancje obiektu Map, wycentrowane dla slajdu i
			var	map = new google.maps.Map(document.getElementById('map'), {
			// Podajemy opcje mapy, np. zoom i punkt wycentrowania mapy.
				zoom: 4,
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
	var	map = new google.maps.Map(document.getElementById('map'), {
		// Podajemy opcje mapy, np. zoom i punkt wycentrowania mapy.
			zoom: 3,
			center: dataImages[index].coords
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
});
