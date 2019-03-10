
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
var	map, infos;


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
	  infos = document.getElementById('infos'); 
    map = new google.maps.Map(document.getElementById('map'), {
      // Podajemy opcje mapy, np. zoom i punkt wycentrowania mapy.
      zoom: 3,
      center: dataImages[0].coords
    });
  }        
})();


flkty.on( 'change', function( index ) {
  var clicked = 0;
	//Najpierw wykorzystujemy metodę panTo w obiekcie map do przesunięcia współrzędnych mapy:
	map.panTo(dataImages[index].coords);
	// A następnie zmieniamy powiększenie mapy:
  map.setZoom(10);
    for (var i = 0; i < dataImages.length; i++) {
      // Dodajemy marker w centrum i pozostałe dookoła jako nowe instancje obiektu Marker.
      var marker = new google.maps.Marker({
        // I podajemy opcje tego markera, np. na której mapie ma być dodany oraz jakie są jego współrzędne. 
        position: dataImages[i].coords,
        map: map
      });
      marker.id = i;
		  marker.addListener('click', function(){
			  // Wewnątrz funcji wpisujemy kod, który ma się wykonać po kliknięciu markera. W tym przykładzie wyświetlimy tekst na stronie. 
        
      });
  //infos.innerHTML = dataImages[clicked].title;
  }	
});
