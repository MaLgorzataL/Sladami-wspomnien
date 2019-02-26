
// external js: flickity.pkgd.js

var carousel = document.querySelector('.carousel');
var flkty = new Flickity( carousel, {
  imagesLoaded: true,
  percentPosition: false,
  wrapAround:true,
  pageDots:false,
  autoPlay: true
});

var imgs = carousel.querySelectorAll('.carousel-cell img');
// get transform property
var docStyle = document.documentElement.style;
var transformProp = typeof docStyle.transform == 'string' ?
  'transform' : 'WebkitTransform';

var progressBar = document.querySelector('.progress-bar');

flkty.on( 'scroll', function(progress) {
  flkty.slides.forEach( function( slide, i ) {
    var img = imgs[i];
    var x = ( slide.target + flkty.x ) * -1/3;
    img.style[ transformProp ] = 'translateX(' + x  + 'px)';
    progress = Math.max( 0, Math.min( 1, progress ) );
    progressBar.style.width = progress * 100 + '%';
  });
});

var restart = document.querySelector('.button');

restart.addEventListener( 'click', function( event ) {
  flkty.select( '0', true, true );
});


