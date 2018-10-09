(function ($) {   

// Add Home and RSS menu items to menu
$('.view-header-menu ul').prepend('<li class="menu__item is-leaf first leaf"><a href="/">Home</a></li>');
$('.view-header-menu ul').append('<li class="menu__item is-leaf last leaf"><a href="/rss" class="rss">RSS</a></li>');

$('.hamburger').click(function(){
     $('.view-header-menu .view-content, .view-header-menu .view-footer').slideToggle();
});

// Move crest for tablet portrait and mobile devices.
if($( window ).width() > 768) {
        $('.view-header-menu .view-content, .view-header-menu .view-footer').show();
} 
    
$( window ).resize(function() {
   if($( window ).width() > 768) {
           $('.view-header-menu .view-content, .view-header-menu .view-footer').show();
   } else {
           $('.view-header-menu .view-content, .view-header-menu .view-footer').hide();
   }
});

var alink = window.location.pathname; 
if(alink.indexOf('minister/') > -1) {
  alink = alink.substr(alink.indexOf('ministers/') + 11);
  $('.view-header-menu .'+alink).addClass('active');
}



}(jQuery));