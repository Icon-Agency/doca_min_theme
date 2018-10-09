(function ($) {   

String.prototype.replaceAll = function(str1, str2, ignore) {
  return this.replace(new RegExp(str1.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|\<\>\-\&])/g,"\\$&"),(ignore?"gi":"g")),(typeof(str2)=="string")?str2.replace(/\$/g,"$$$$"):str2);
} 
var qs = document.location.search.substring(1);
qs = qs.substr(qs.indexOf('combine=') + 8);
if (qs.indexOf('&') >= 0) {
    qs = qs.substr(0, qs.indexOf('&')); 
}
qs = qs.replaceAll('+', ' ');
qs = qs.replaceAll('%20', ' ');

$('.search_results').append(' for <strong>'+qs+'</strong>');
$('.view-empty .combine').append(' for <strong>'+qs+'</strong>');

}(jQuery));