(function ($) { 

Drupal.behaviors.yourmodulename = {
    attach: function (context, settings) {
       $('.loader').hide();
    }
};

// Get Feature tile text colour
if($('.Feature .views-field-field-minister-header-txt-colour').length != 0) {
     var feature_tile_colour = $('.Feature .views-field-field-minister-header-txt-colour').html().trim();
}
if(feature_tile_colour) {
    $('.Feature').css('color','#'+feature_tile_colour);
    $('.Feature').find('a').css('color','#'+feature_tile_colour);
    $('.Feature').find('a').css('border-color','#'+feature_tile_colour);
} else {
   $('.Feature').css('color','#ffffff');
   $('.Feature').find('a').css('color','#ffffff');
   $('.Feature').find('a').css('border-color','#ffffff');
}

// Check Desktop / Mobile and set order of grid elements respectively
if($(window).width() < 469) {
   var fn = 0;
   $('.form-type-bef-checkbox:visible').each(function() {fn = fn + 1;})
   if(fn % 2 == 1) { //odd number
       $('#edit-channel-all').addClass('width100');
   } 
} else {
         $('#edit-channel-all').removeClass('width100');
}

// When window is resized check Desktop / Mobile and set order of grid elements respectively
$(window).resize(function() {
   if($( window ).width() < 469) {
      var fn = 0;
      $('.form-type-bef-checkbox:visible').each(function() {fn = fn + 1;})
      if(fn % 2 == 1) { //odd number
         $('#edit-channel-all').addClass('width100');
      } 
   } else {
        $('#edit-channel-all').removeClass('width100');
   }
});

}(jQuery));