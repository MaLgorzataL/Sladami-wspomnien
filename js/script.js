
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

flkty.on( 'scroll', function(progress) {
  flkty.slides.forEach( function( slide, i ) {
    var x = ( slide.target + flkty.x );
    imgs[i].style[ transformProp ] = 'translateX(' + x  + 'px)';
    progress = Math.max( 0, Math.min( 1, progress ) );
    progressBar.style.width = progress * 100 + '%';
  });
});

var restart = document.querySelector('.button');

restart.addEventListener( 'click', function( event ) {
  flkty.select( '0', true, true );
});




