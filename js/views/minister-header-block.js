(function ($) {  

// Get site name for <title> tag and remove page title element
var site_name = document.title.substr(document.title.indexOf("| ") + 1);
// Prepend site name to Ministers title
$('.view-minister-header-block .views-field-title').prepend('<div>'+site_name+'</div>');
$('body').append('<div class="printable"></div>');

// Get Ministers Header Colours
header_text_color = $('.views-field-field-minister-header-txt-colour-1 .field-content').text();
header_border_color = $('.views-field-field-palette-hex .field-content').text();

$('.view-minister-header-block .view-header').append('<style></style>');
$('.view-minister-header-block .view-header style').append('.view-minister-header-block {color: #'+header_text_color+'}');
$('.view-minister-header-block .view-header style').append('.view-minister-header-block h2 {color: #'+header_text_color+'}');
$('.view-minister-header-block .view-header style').append('.view-minister-header-block a {color: #'+header_text_color+'}');
$('.view-minister-header-block .view-header style').append('.view-minister-header-block .views-field-field-minister-photo {border-top: 8px solid #'+header_border_color+'}');

$('.toggle-modal').click(function() {
  modal_content = '.' + $(this).attr('data');
  $(this).siblings('.modal-bg').show();
  $(modal_content).slideToggle().toggleClass('active');
  $('.modal-close').focus();
})
$('.modal-close').click(function() {
  $(this).parent().slideToggle().toggleClass('active');  
  $('.modal-bg').hide();
})
$('.modal-bg').click(function() {
  $('.modal-content.active').slideToggle().toggleClass('active');  
  $('.modal-bg').hide();
})

// Add 'Print this page' to output
$('.print-link').each(function() {
  $(this).html('<a href="#" target="_self" title="Print" class="print">Print this page</a>');
});

// Move modal to top of view
$('.modal-content').each(function() {
  $(this).prependTo('.view-minister-header-block');
});

$('.print').click(function(){
   //get the modal box content and load it into the printable div
   var modal_id = $(this).parents('.modal-content').attr('id');
   var modal_content = $('#'+modal_id).html();
   $('.printable').html(modal_content);
   //fire the print method
   window.print();
});

}(jQuery));