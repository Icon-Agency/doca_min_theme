!function(e){e(".view-header-menu ul").prepend('<li class="menu__item is-leaf first leaf"><a href="/">Home</a></li>'),e(".view-header-menu ul").append('<li class="menu__item is-leaf last leaf"><a href="/rss" class="rss">RSS</a></li>'),e(".hamburger").click(function(){e(".view-header-menu .view-content, .view-header-menu .view-footer").slideToggle()}),768<e(window).width()&&e(".view-header-menu .view-content, .view-header-menu .view-footer").show(),e(window).resize(function(){768<e(window).width()?e(".view-header-menu .view-content, .view-header-menu .view-footer").show():e(".view-header-menu .view-content, .view-header-menu .view-footer").hide()});var i=window.location.pathname;-1<i.indexOf("minister/")&&(i=i.substr(i.indexOf("ministers/")+11),e(".view-header-menu ."+i).addClass("active"))}(jQuery);