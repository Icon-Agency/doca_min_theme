!function(a){if(Drupal.behaviors.yourmodulename={attach:function(e,i){a(".loader").hide()}},0!=a(".Feature .views-field-field-minister-header-txt-colour").length)var e=a(".Feature .views-field-field-minister-header-txt-colour").html().trim();if(e?(a(".Feature").css("color","#"+e),a(".Feature").find("a").css("color","#"+e),a(".Feature").find("a").css("border-color","#"+e)):(a(".Feature").css("color","#ffffff"),a(".Feature").find("a").css("color","#ffffff"),a(".Feature").find("a").css("border-color","#ffffff")),a(window).width()<469){var i=0;a(".form-type-bef-checkbox:visible").each(function(){i+=1}),i%2==1&&a("#edit-channel-all").addClass("width100")}else a("#edit-channel-all").removeClass("width100");a(window).resize(function(){if(a(window).width()<469){var e=0;a(".form-type-bef-checkbox:visible").each(function(){e+=1}),e%2==1&&a("#edit-channel-all").addClass("width100")}else a("#edit-channel-all").removeClass("width100")})}(jQuery);