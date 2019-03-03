
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
		slajdCords = dataImages[0].coords;
		// W tablicy maps zapisujemy nowe instancje obiektu Map. 
		var map = new google.maps.Map(document.getElementById('map'), {
			// Podajemy opcje mapy, np. zoom i punkt wycentrowania mapy.
			zoom: 4,
			center: slajdCords
		});
		
		// Definiujemy marker jako nową instancję obiektu Marker.
		var marker = new google.maps.Marker({
			// I podajemy opcje tego markera, np. na której mapie ma być dodany oraz jakie są jego współrzędne. 
			position: slajdCords,
			map: map
		}); 
	}	
	 
})();  

flkty.on( 'change', function( index ) {
	slajdCords = dataImages[index].coords;
	map = new google.maps.Map(document.getElementById('map'), {
		// Podajemy opcje mapy, np. zoom i punkt wycentrowania mapy.
		zoom: 4,
		center: slajdCords
	});
	// Definiujemy marker jako nową instancję obiektu Marker.
	marker = new google.maps.Marker({
		// I podajemy opcje tego markera, np. na której mapie ma być dodany oraz jakie są jego współrzędne. 
		position: slajdCords,
		map: map
	});
});
