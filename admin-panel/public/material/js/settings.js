$(document).ready(function() {
  $().ready(function() {
      $sidebar = $('.sidebar');

      $sidebar_img_container = $sidebar.find('.sidebar-background');

      $full_page = $('.full-page');

      $sidebar_responsive = $('body > .navbar-collapse');

      window_width = $(window).width();

      fixed_plugin_open = $('.sidebar .sidebar-wrapper .nav li.active a p').html();
    
      /* if (window_width > 767 && fixed_plugin_open == 'Dashboard') {
          if ($('.fixed-plugin .dropdown').hasClass('show-dropdown')) {
              $('.fixed-plugin .dropdown').addClass('open');
          }
      } */

      $('.fixed-plugin a').click(function(event) {
          if ($(this).hasClass('switch-trigger')) {
              if (event.stopPropagation) {
              event.stopPropagation();
              } else if (window.event) {
              window.event.cancelBubble = true;
              }
          }
      });

      $('.fixed-plugin .active-color span').click(function() {
          $full_page_background = $('.full-page-background');

          $(this).siblings().removeClass('active');
          $(this).addClass('active');

          var new_color = $(this).data('color');

          if ($sidebar.length != 0) {
              $sidebar.attr('data-color', new_color);
          }

          if ($full_page.length != 0) {
              $full_page.attr('filter-color', new_color);
          }

          if ($sidebar_responsive.length != 0) {
              $sidebar_responsive.attr('data-color', new_color);
          }
      });

      $('.fixed-plugin .background-color .badge').click(function() {
          $(this).siblings().removeClass('active');
          $(this).addClass('active');

          var new_color = $(this).data('background-color');

          if ($sidebar.length != 0) {
              $sidebar.attr('data-background-color', new_color);
          }
      });

      $('.fixed-plugin .img-holder').click(function() {
          $full_page_background = $('.full-page-background');

          $(this).parent('li').siblings().removeClass('active');
          $(this).parent('li').addClass('active');

          var new_image = $(this).find("img").attr('src');

          if ($sidebar_img_container.length != 0 && $('.switch-sidebar-image input:checked').length != 0) {
              $sidebar_img_container.fadeOut('fast', function() {
                  $sidebar_img_container.css('background-image', 'url("' + new_image + '")');
                  $sidebar_img_container.fadeIn('fast');
              });
          }

          if ($full_page_background.length != 0 && $('.switch-sidebar-image input:checked').length != 0) {
              var new_image_full_page = $('.fixed-plugin li.active .img-holder').find('img').data('src');

              $full_page_background.fadeOut('fast', function() {
                  $full_page_background.css('background-image', 'url("' + new_image_full_page + '")');
                  $full_page_background.fadeIn('fast');
              });
          }

          if ($('.switch-sidebar-image input:checked').length == 0) {
              var new_image = $('.fixed-plugin li.active .img-holder').find("img").attr('src');
              var new_image_full_page = $('.fixed-plugin li.active .img-holder').find('img').data('src');

              $sidebar_img_container.css('background-image', 'url("' + new_image + '")');
              $full_page_background.css('background-image', 'url("' + new_image_full_page + '")');
          }

          if ($sidebar_responsive.length != 0) {
              $sidebar_responsive.css('background-image', 'url("' + new_image + '")');
          }
      });

      $('.switch-sidebar-image input').change(function() {
          $full_page_background = $('.full-page-background');

          $input = $(this);

          if ($input.is(':checked')) {
              if ($sidebar_img_container.length != 0) {
              $sidebar_img_container.fadeIn('fast');
              $sidebar.attr('data-image', '#');
              }

              if ($full_page_background.length != 0) {
              $full_page_background.fadeIn('fast');
              $full_page.attr('data-image', '#');
              }

              background_image = true;
          } else {
              if ($sidebar_img_container.length != 0) {
                  $sidebar.removeAttr('data-image');
                  $sidebar_img_container.fadeOut('fast');
              }

              if ($full_page_background.length != 0) {
                  $full_page.removeAttr('data-image', '#');
                  $full_page_background.fadeOut('fast');
              }

              background_image = false;
          }
      });

      $('.switch-sidebar-mini input').change(function() {
          $body = $('body');

          $input = $(this);

          if (md.misc.sidebar_mini_active == true) {
              $('body').removeClass('sidebar-mini');
              md.misc.sidebar_mini_active = false;

              $('.sidebar .sidebar-wrapper, .main-panel').perfectScrollbar();

          } else {

              $('.sidebar .sidebar-wrapper, .main-panel').perfectScrollbar('destroy');

              setTimeout(function() {
              $('body').addClass('sidebar-mini');

              md.misc.sidebar_mini_active = true;
              }, 300);
          }

          // we simulate the window Resize so the charts will get updated in realtime.
          var simulateWindowResize = setInterval(function() {
              window.dispatchEvent(new Event('resize'));
          }, 180);

          // we stop the simulation of Window Resize after the animations are completed
          setTimeout(function() {
              clearInterval(simulateWindowResize);
          }, 1000);

      });
  });
});

$(document).ready(function() {
  md.checkFullPageBackgroundImage();
  setTimeout(function() {
      // after 1000 ms we add the class animated to the login/register card
      $('.card').removeClass('card-hidden');
  }, 700);
});


const filterUrl = (url) => {
    if (!url) return false;
    var ytRegExp = /\/\/(?:(?:www|m)\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w|-]{11})(?:(?:[\?&]t=)(\S+))?$/;
    var ytRegExpForStart = /^(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?$/;
    var ytMatch = url.match(ytRegExp);
    var igRegExp = /(?:www\.|\/\/)instagram\.com\/p\/(.[a-zA-Z0-9_-]*)/;
    var igMatch = url.match(igRegExp);
    var vRegExp = /\/\/vine\.co\/v\/([a-zA-Z0-9]+)/;
    var vMatch = url.match(vRegExp);
    var vimRegExp = /\/\/(player\.)?vimeo\.com\/([a-z]*\/)*(\d+)[?]?.*/;
    var vimMatch = url.match(vimRegExp);
    var dmRegExp = /.+dailymotion.com\/(video|hub)\/([^_]+)[^#]*(#video=([^_&]+))?/;
    var dmMatch = url.match(dmRegExp);
    var youkuRegExp = /\/\/v\.youku\.com\/v_show\/id_(\w+)=*\.html/;
    var youkuMatch = url.match(youkuRegExp);
    var qqRegExp = /\/\/v\.qq\.com.*?vid=(.+)/;
    var qqMatch = url.match(qqRegExp);
    var qqRegExp2 = /\/\/v\.qq\.com\/x?\/?(page|cover).*?\/([^\/]+)\.html\??.*/;
    var qqMatch2 = url.match(qqRegExp2);
    var mp4RegExp = /^.+.(mp4|m4v)$/;
    var mp4Match = url.match(mp4RegExp);
    var oggRegExp = /^.+.(ogg|ogv)$/;
    var oggMatch = url.match(oggRegExp);
    var webmRegExp = /^.+.(webm)$/;
    var webmMatch = url.match(webmRegExp);
    var fbRegExp = /(?:www\.|\/\/)facebook\.com\/([^\/]+)\/videos\/([0-9]+)/;
    var fbMatch = url.match(fbRegExp);

    var video_url;

    if (ytMatch && ytMatch[1].length === 11) {
        var youtubeId = ytMatch[1];
        var start = 0;

        if (typeof ytMatch[2] !== 'undefined') {
        var ytMatchForStart = ytMatch[2].match(ytRegExpForStart);

        if (ytMatchForStart) {
            for (var n = [3600, 60, 1], i = 0, r = n.length; i < r; i++) {
            start += typeof ytMatchForStart[i + 1] !== 'undefined' ? n[i] * parseInt(ytMatchForStart[i + 1], 10) : 0;
            }
        }
        }
        video_url = `https://www.youtube.com/embed/${youtubeId}${start > 0 ? '?start=' + start : ''}`;
    } else if (igMatch && igMatch[0].length) {
        video_url = `https://instagram.com/p/${igMatch[1]}/embed/`;
    } else if (vMatch && vMatch[0].length) {
        video_url = `${vMatch[0]}/embed/simple`;
    } else if (vimMatch && vimMatch[3].length) {
        video_url = `//player.vimeo.com/video/${vimMatch[3]}`;
    } else if (dmMatch && dmMatch[2].length) {
        video_url = `https://www.dailymotion.com/embed/video/${dmMatch[2]}`;
    } else if (youkuMatch && youkuMatch[1].length) {
        video_url = `https://player.youku.com/embed/${youkuMatch[1]}`;
    } else if (qqMatch && qqMatch[1].length || qqMatch2 && qqMatch2[2].length) {
        var vid = qqMatch && qqMatch[1].length ? qqMatch[1] : qqMatch2[2];
        video_url = `https://v.qq.com/txp/iframe/player.html?vid=${vid}&amp;auto=0`;
    } else if (mp4Match || oggMatch || webmMatch) {
        video_url = url;
    } else if (fbMatch && fbMatch[0].length) {
        video_url = `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(fbMatch[0])}&show_text=0&width=560`;
    } else {
        // this is not a known video link. Now what, Cat? Now what?
        return false;
    }
    return video_url;
}
