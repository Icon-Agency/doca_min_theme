!function(t){if(Drupal.behaviors.yourmodulename={attach:function(e,i){t(".loader").hide()}},t(window).width()<469){var e=0;t(".form-type-bef-checkbox:visible").each(function(){e+=1}),e%2==1&&t("#filter .views-widget .form-type-bef-checkbox").first().addClass("width100")}else t("#filter .views-widget .form-type-bef-checkbox").first().removeClass("width100");t(window).resize(function(){if(t(window).width()<469){var e=0;t(".form-type-bef-checkbox:visible").each(function(){e+=1}),e%2==1&&t("#filter .views-widget .form-type-bef-checkbox").first().addClass("width100")}else t("#filter .views-widget .form-type-bef-checkbox").first().removeClass("width100")})}(jQuery);