(function ($) {  

// Get site name from <title> tag and remove page title element
var site_name = document.title.substr(document.title.indexOf("| ") + 1);
site_name = site_name.substr(site_name.indexOf("| ") + 1);
// Prepend site name to Ministers title
$('.view-grid2 .grid-site-name').prepend('<div>'+site_name+'</div>');

}(jQuery));