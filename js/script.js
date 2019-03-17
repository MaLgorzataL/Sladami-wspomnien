
// external js: flickity.pkgd.js
(function() { 
  //stworzenie zmiennej z kodem szablonów
  var templateList = document.getElementById('template-lista-slajdow').innerHTML;
 //po znalezieniu elementu z wstawiana wartoscia pobieramy jego zawartość za pomocą właściwości innerHTML
 // Następnie opcjonalnie możemy wykonać poniższą linię kodu, która sprawi że nasz szablon będzie działał szybciej.  

 Mustache.parse(templateList);

var listaSlajdow = '';	// Tworzymy zmienną, w której chcemy mieć kod HTML wszystkich slajdów. 
/* Pętla dla każdego elementu z listy:
	1. generuje kod HTML dla danego slajdu, oraz
  2. dodaje ten wygenrowany kod HTML do zmiennej listaSlajdow. */

for (var i = 0; i < dataImages.length; i++){
  listaSlajdow+= Mustache.render(templateList, dataImages[i]); // Wygenerowanie slajdu z tłem, dodanie tytułu i opisu
  }
  
 // Pozostaje nam dodać wygenerowany kod HTML na naszej stronie, na końcu diva z id="results".
	var results = document.getElementById('results');
	results.insertAdjacentHTML('beforeend', listaSlajdow);
	           
})();

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
  flkty.slides.forEach( function( slide, i ) {
  var x = ( slide.target + flkty.x );
  imgs[i].style[ transformProp ] = 'translateX(' + x  + 'px)';
  progress = Math.max( 0, Math.min( 1, progress ) );
  progressBar.style.width = progress * 100 + '%';
  });
});


var restart = document.querySelector('.button');
var map;
restart.addEventListener( 'click', function( event ) {
  flkty.select( '0', true, true );
});

(function(){ 
	
	// Definujemy funkcję initMap w zakresie globalnym (czyli jako właściwość obiektu window).
  window.initMap = function() {
    // Zapisujemy w zmiennej obiekt zawierający współrzędne geograficzne.
    
    map = new google.maps.Map(document.getElementById('map'), {
      // Podajemy opcje mapy, np. zoom i punkt wycentrowania mapy.
      zoom: 3,
      center: dataImages[0].coords
    });
    for (var i = 0; i < dataImages.length; i++) {
      var description = dataImages[i].description;
      // Dodajemy marker w centrum i pozostałe dookoła jako nowe instancje obiektu Marker.
      var marker = new google.maps.Marker({
        // I podajemy opcje tego markera, np. na której mapie ma być dodany oraz jakie są jego współrzędne. 
        position: dataImages[i].coords,
        map: map,
        title: description.innerText,
      });
      changeSlide(marker,i);
    }
  }        
})();

function changeSlide(marker, i) {
  // Zmiana slajdu po kliknieciu markera
  marker.addListener('click', function() {
    flkty.select(i);
    map.panTo(dataImages[i].coords);
    map.setZoom(7);
  });
};


flkty.on( 'change', function( index ) {

	//Najpierw wykorzystujemy metodę panTo w obiekcie map do przesunięcia współrzędnych mapy:
	map.panTo(dataImages[index].coords);
	// A następnie zmieniamy powiększenie mapy:
  map.setZoom(5);
  var anchors = document.querySelectorAll('a[href^="#"]');
  for(var i=0; i < anchors.length; i++) {
    anchors[i].addEventListener('click', function(event) {
  
      var href = event.target.getAttribute('href');
  
      var existSlide = document.querySelector('.carousel ' + href);
  
      if(existSlide) {
        event.preventDefault();
        var slides = flkty.cells;
        for(var j=0; j<slides.length; j++) {
          if(slides[j].element === existSlide) {
            flkty.select( j );
          }
        };
      }
    })
  }
});
