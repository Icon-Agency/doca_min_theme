(function ($, Drupal, window, document, undefined) {
// To understand behaviors, see https://drupal.org/node/756722#behaviors
  Drupal.behaviors.my_custom_behavior = {
    attach: function (context, settings) {

      $(window).load(function () {

        // Check to see if any filters are selected and set a flag
        var checkboxes = 0;
        $('.form-type-bef-checkbox').each(function () {
          if ($(this).children('input:checkbox:checked').length > 0) {
            checkboxes = 1;
          }
        });

        // If filter checkboxes checked on page load force an ajax update to
        // filter results
        if (checkboxes == 1) {
          $('.loader').show();
          $('#edit-submit-media-tiles').click();
        }
      });

      // Get Ministers Header Colours
      $('.view-grid2 .grid-item.grid').each(function () {
        if ($(this).hasClass('Minister')) {
          grid_pos = $(this).attr('class').split(' ')[1];
          header_text_color = $(this).find('.views-field-field-minister-header-txt-colour').text();
          header_border_color = $(this).find('.views-field-field-palette-hex').text();
          $(this).prepend('<div class="bt"></div>');

          // Append colour styles to view header
          $(this).css('color', '#' + header_text_color);
          $(this).find('h2').css('color', '#' + header_text_color);
          $(this).find('a').css('color', '#' + header_text_color);
          $(this).find('.bt').css('background-color', '#' + header_border_color);
        }
        if ($(this).hasClass('Feature')) {
          var feature_block_id = $(this).closest('.block').attr('id');
          // Check Desktop / Mobile and set order of grid elements respectively
          if ($(window).width() < 769) {
            $('#' + feature_block_id + ' .view-content .grid').hide();
            $('#block-views-grid2-block-feature-mobile').show();
            $('#block-views-grid2-block-feature-mobile .grid-item').show();
          }
          // When window is resized check Desktop / Mobile and set order of
          // grid elements respectively
          $(window).resize(function () {
            if ($(window).width() < 769) {
              $('#' + feature_block_id + ' .view-content .grid').hide();
              $('#block-views-grid2-block-feature-mobile').show();
              $('#block-views-grid2-block-feature-mobile .grid-item').show();
            }
            else {
              $('#' + feature_block_id + ' .view-content .grid').show();
              $('#block-views-grid2-block-feature-mobile').hide();
              $('#block-views-grid2-block-feature-mobile .grid-item').hide();
            }
          });

          //$('.view-media-tiles .Feature').detach();

        }
      });

      // Move crest for tablet portrait and mobile devices.
      if ($(window).width() < 769) {

        $('#logo').insertBefore($('.region-navigation'));
      }

      $(window).resize(function () {
        if ($(window).width() < 769) {
          $('#logo').insertBefore($('.region-navigation'));
        }
        else {
          $('#logo').prependTo($('.header__inner'));
        }
      });

      // Jump to search results
      var page_url = window.location.href;
      if (page_url.indexOf('/search/media') > -1 && page_url.indexOf('#filter') == -1) {
        page_url += '#filter';
        window.location.href = page_url;
      }

      //Override required form '(mandatory)' output.
      $('.form-required').each(function () {
        $(this).html('*');
      });
      //Add aria-required to required form elements
      $('.form-required').each(function () {
        $(this).parent().siblings().attr('aria-required', 'true');
      });

      // Grid/Palette description move to sit under label
      $('.field-name-field-grid-position .description').prependTo('#edit-field-grid-position-und');

      // if Social item hide title link
      $('.view-media-tiles .view-content .views-row').each(function () {
        if ($(this).hasClass('Twitter') || $(this).hasClass('Facebook') || $(this).hasClass('YouTube') || $(this).hasClass('Instagram')) {
          // Check to see if the Title is the same as the Body
          titleTxt = $(this).find('.views-field-title').text().substring(0, 20);
          bodyTxt = $(this).find('.views-field-body').text().substring(0, 20);
          // If they are not the same show the title.
          if (titleTxt != bodyTxt) {
            $(this).find('.views-field-title').html($(this).find('.views-field-title').text());
            $(this).find('.views-field-title').css('display', 'inline-block');
          }
        }
      });

      // if Youtube tile change title link to be YouTube URL
      //$('.view-media-tiles .view-content .views-row').each(function() {
      //if($(this).hasClass('YouTube')) {
      //youtube_link = $(this).find('.views-field-title').text();
      //$(this).find('.views-field-title').find('a').attr('href',youtube_link);
      //}
      //});

      // If Fearture tile remove title link
      feature_header = $('.view-media-tiles .Feature .views-field-title a').text();
      $('.view-media-tiles .Feature .views-field-title').html(feature_header);

      // Detach media tile body image and place at top of tile
      $('.views-field-field-image').each(function () {
        image_html = $(this).find('img').attr('src');
        image_alt = $(this).find('img').attr('alt');
        if (typeof image_alt === 'undefined') {
          image_alt = ""
        }
        ;
        image_title = $(this).find('img').attr('title');
        if (typeof image_title === 'undefined') {
          image_title = ""
        }
        else {
          image_title = ' title="' + image_title + '" '
        }
        ;
        if (image_html) {
          $(this).parent().prepend('<img typeof="foaf:Image" alt="' + image_alt + '"' + image_title + 'src="' + image_html + '">');
        }
        $(this).detach();
      });

      // Detach and move loader to views-exposed-form
      if ($('#filter .loader').length > 0) {
        $('#filter .loader').appendTo('.views-exposed-form');
      }

      // Detach and move filter to own area
      if ($('.view-media-tiles .view-filters').length > 0 || $('.view-search-media .view-filters').length > 0) {
        $('#filter .view-filters').remove();
        $('.view-media-tiles .view-filters').appendTo('#filter');
        $('.view-search-media .view-filters').appendTo('#filter');
      }

      // Move List/Tile icons to sit next to Filter options
      $('.list-tile').prependTo('#filter .view-filters');

      if ($('.view-media-tiles').length) {
        $('#filter').prependTo('.view-media-tiles');
      }
      else {
        $('#filter').prependTo('.view-search-media');
      }

      // If not already added, append 'ALL' filter option
      if (!$('.form-item-edit-channel-all').length) {
        $('#edit-channel-wrapper .bef-checkboxes').prepend('<a id="edit-channel-all" class="form-item form-type-bef-checkbox form-item-edit-channel-all"><label class="option" for="edit-channel-all">All</label></a>');
      }
      // When 'ALL' filter is selected reload page
      var setclick = 0;
      $('#edit-channel-all').click(function (e) {
        e.preventDefault();
        //var pathname = window.location.pathname + '?channel=all';
        //window.location.href = pathname;
        $('.loader').show();
        $('.form-type-bef-checkbox').each(function () {
          $(this).children('input:checkbox:checked').removeAttr('checked');
        });
        $('#edit-submit-media-tiles').click();
        return false;
      });

      $('.bef-checkboxes input:checkbox').focus(function () {
        $(this).parent().addClass('highlight-hf');
      });
      $('.bef-checkboxes input:checkbox').focusout(function () {
        $(this).parent().removeClass('highlight-hf');
      });

      // Check to see if any filter checkboxes are selected, if not highlight
      // 'All'
      if ($(".bef-checkboxes input:checkbox:checked").length > 0) {
        $('.form-item-edit-channel-all').removeClass('highlight');
      }
      else {
        $('.form-item-edit-channel-all').addClass('highlight');
      }

      $('.show-share').click(function (e) {
        e.preventDefault();
        $(this).parents('.views-field-created').siblings('.views-field-nothing').show();
        $(this).parents('.views-field-created').hide();
      });
      $('.hide-share').click(function (e) {
        e.preventDefault();
        $(this).parents('.views-field-nothing').hide();
        $(this).parents('.views-field-nothing').siblings('.views-field-created').show();
      });

      // When a filter option is selected show loader
      $('.form-type-bef-checkbox input').change(function () {
        $('.loader').show();
      });
      $('#edit-year-filter-value-year').change(function () {
        $('.loader').show();
      });

      // Hide/Show channel filter options based on content available
      // Hide all filter options except 'All'
      $('#edit-channel-wrapper .bef-checkboxes .form-item').hide();
      $('#edit-channel-wrapper .bef-checkboxes .form-item').first().show();

      // Turn active channel filter options back on
      $('.view-active-channels .active-channel').each(function () {
        channel_id = $(this).text().trim();
        $('#edit-channel-wrapper .bef-checkboxes ' + channel_id).css('display', 'inline-block')
      });

      // Add social link to ministers tile footer
      // Views - Minister Social Channels. For each channel get URL to wrap
      // tile footer with link to ministers social site.
      $('.view-minister-social-channels .social-link').each(function () {
        minister_social_channel = $(this).attr('id');
        social_channel = $(this).attr('data');
        social_channel_url = $(this).text();
        $('.view-media-tiles .views-row.' + minister_social_channel).each(function () {
          $(this).children('.views-field-field-minister-first-name').html($(this).children('.views-field-field-minister-first-name').text());
          $(this).children('.views-field-field-minister-first-name').wrapInner('<a href="' + social_channel_url + '" class="' + social_channel + '"></a>');
        });
      });

      // We have to repeat a bunch of calls when scrolling.
      $(document).ready(function () {

        var $grid = $('.view-media-tiles.view-display-id-page_grid .view-content');
        $grid.imagesLoaded(function () {

          // with Masonry & jQuery
          // init Masonry
          $grid = $('.view-media-tiles.view-display-id-page_grid .view-content').masonry({
            itemSelector: '.view-media-tiles.view-display-id-page_grid .view-content .views-row',
          });

          // get Masonry instance
          var msnry = $grid.data('masonry');
          $grid.data('infiniteScroll', null);

          // init Infinite Scroll if more than one page on content
          if ($('.pager-next a').length) {
            $grid.infiniteScroll({
              path: '.pager-next a',
              append: '.view-media-tiles .view-content .views-row',
              outlayer: msnry,
              status: '.page-load-status',
              animate: true,
              history: false,
            });
          }

        });

        $grid.on('append.infiniteScroll', function (event, response, path, items) {

          // if Social item hide title link
          $('.view-media-tiles .view-content .views-row').each(function () {
            if ($(this).hasClass('Twitter') || $(this).hasClass('Facebook') || $(this).hasClass('YouTube') || $(this).hasClass('Instagram')) {
              // Check to see if the Title is the same as the Body
              titleTxt = $(this).find('.views-field-title').text().substring(0, 20);
              bodyTxt = $(this).find('.views-field-body').text().substring(0, 20);
              // If they are not the same show the title.
              if (titleTxt != bodyTxt) {
                $(this).find('.views-field-title').html($(this).find('.views-field-title').text());
                $(this).find('.views-field-title').css('display', 'inline-block');
              }
            }
          });

          // if Youtube tile change title link to be YouTube URL
          //$('.view-media-tiles .view-content .views-row').each(function() {
          //if($(this).hasClass('YouTube')) {
          //youtube_link = $(this).find('.views-field-title').text();
          //$(this).find('.views-field-title').find('a').attr('href',youtube_link);
          // } });

          // Detach media tile body image and place at top of tile
          $('.views-field-field-image').each(function () {
            image_html = $(this).find('img').attr('src');
            image_alt = $(this).find('img').attr('alt');
            if (typeof image_alt === 'undefined') {
              image_alt = "";
            }

            image_title = $(this).find('img').attr('title');
            if (typeof image_title === 'undefined') {
              image_title = "";
            }
            else {
              image_title = ' title="' + image_title + '" ';
            }

            if (image_html) {
              $(this).parent().prepend('<img typeof="foaf:Image" alt="' + image_alt + '"' + image_title + 'src="' + image_html + '">');
            }
            $(this).detach();
          });

          //var $grid = $('.view-media-tiles .view-content').masonry({
          //itemSelector: '.view-media-tiles > .view-content .views-row',
          //});

          var $grid = $('.view-media-tiles.view-display-id-page_grid .view-content').masonry({
            itemSelector: '.view-media-tiles.view-display-id-page_grid .view-content .views-row',
          });

          // Override Anchor behaviour
          $('.show-share').click(function (e) {
            e.preventDefault();
            $(this).parents('.views-field-created').siblings('.views-field-nothing').show();
          });
          $('.hide-share').click(function (e) {
            e.preventDefault();
            $(this).parents('.views-field-nothing').hide();
          });

          // Add social link to ministers tile footer
          // Views - Minister Social Channels. For each channel get URL to wrap
          // tile footer with link to ministers social site.
          $('.view-minister-social-channels .social-link').each(function () {
            minister_social_channel = $(this).attr('id');
            social_channel = $(this).attr('data');
            social_channel_url = $(this).text();
            $('.view-media-tiles .views-row.' + minister_social_channel).each(function () {
              $(this).children('.views-field-field-minister-first-name').html($(this).children('.views-field-field-minister-first-name').text());
              $(this).children('.views-field-field-minister-first-name').wrapInner('<a href="' + social_channel_url + '" class="' + social_channel + '"></a>');
            })
          });

          build_palette_blocks();
        });

        build_palette_blocks();
      });

      // LIST View page
      $('.views-row').each(function () {
        if (!$(this).children('.views-field-field-image').children('img').length) {
          $(this).children('.views-field-title').css('width', '100%');
          $(this).children('.views-field-body').css('width', '100%');
        }
      });

      // Add 'All' option 'Year' to the List page Year dropdown
      if ($('#edit-year-filter-value-year option:last-child').text() == '-Year') {
        $('#edit-year-filter-value-year option:last-child').text('All');
        $('#edit-year-filter-value-year option:last-child').insertBefore('#edit-year-filter-value-year option:first-child');
      }

      // Hide back to top when at the top of the page
      $(window).on("scroll", function () {
        var scrollPos = $(window).scrollTop();
        if (scrollPos <= 0) {
          $("#back-to-top").fadeOut();
          $("#footer").fadeOut();
        }
        else {
          $("#back-to-top").fadeIn();
          $("#footer").fadeIn();
        }
      });
    }
  };

  function build_palette_blocks(){
    // Build Palette Blocks
    $('.palette-div').each(function () {
      palette_id = $(this).attr('id');
      palette_color = $(this).attr('data-palette');
      palette_text = $(this).attr('data-text');

      $( '.view-media-tiles .' + palette_id + ' .views-field-field-minister-first-name').css({
        'background-color': '#' + palette_color,
        'color': '#' + palette_text
      });

      $('.view-media-tiles .' + palette_id + ' .views-field-field-minister-first-name a').css({
        'color': '#' + palette_text
      });
    });
  }

})(jQuery, Drupal, this, this.document);
