(function ($) {   

Drupal.behaviors.yourmodulename = {
    attach: function (context, settings) {
       $('.loader').hide();
    }
};

// Check Desktop / Mobile and set order of grid elements respectively
if($(window).width() < 469) {
   var fn = 0;
   $('.form-type-bef-checkbox:visible').each(function() {fn = fn + 1;})
   if(fn % 2 == 1) { //odd number
       $('#filter .views-widget .form-type-bef-checkbox').first().addClass('width100');
   } 
} else {
         $('#filter .views-widget .form-type-bef-checkbox').first().removeClass('width100');
}

// When window is resized check Desktop / Mobile and set order of grid elements respectively
$(window).resize(function() {
   if($( window ).width() < 469) {
      var fn = 0;
      $('.form-type-bef-checkbox:visible').each(function() {fn = fn + 1;})
      if(fn % 2 == 1) { //odd number
         $('#filter .views-widget .form-type-bef-checkbox').first().addClass('width100');
      } 
   } else {
         $('#filter .views-widget .form-type-bef-checkbox').first().removeClass('width100');
   }
});

}(jQuery));