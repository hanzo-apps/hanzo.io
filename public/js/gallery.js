$(function() {
  var controlsHTML = '<div class="gallery-controls"><div class="gallery-counter"></div><div class="gallery-before button">&lt</div><div class="gallery-after button">&gt</div></div>';
  var itemHTML = '<div class="gallery-item"></div>';

  $('body').width('100vw').css('overflow-x', 'hidden');
  var $galleries =  $('.gallery')
  $galleries.each(function() {
    var $gallery = $(this);
    var $blocks = $gallery.children('section, .block');
    var blockIndex = 0;
    var blockTotal = $blocks.length;

    $gallery.append($(controlsHTML));

    $gallery.width(blockTotal * 100 + 'vw');
    $blocks.css('float', 'left')

    var $controls = $gallery.find('.gallery-controls');
    var $before = $gallery.find('.gallery-before');
    var $after = $gallery.find('.gallery-after');
    var $counter = $gallery.find('.gallery-counter');

    for (var i = 0; i < blockTotal; i++) {
      $counter.append($(itemHTML));
    }

    var $items = $counter.children('.gallery-item');

    var updateFn = function() {
      $gallery.css('left', '-' + (100 * blockIndex) + '%');
      $controls.css('transform', 'translateX(' + (100 * blockIndex) + '%)');
      $before.css('opacity', 1);
      $after.css('opacity', 1);
      if (blockIndex <= 0) {
        $before.css('opacity', 0);
      }
      if (blockIndex >= blockTotal - 1) {
        $after.css('opacity', 0);
      }
      $items.removeClass('active');
      $($items[blockIndex]).addClass('active');
    };

    var autoplayId = null;

    var leftFn = function(e) {
      if (e) {
        clearInterval(autoplayId);
      }

      if (blockIndex > 0) {
        blockIndex--;
      }

      updateFn();
    };

    var rightFn = function(e) {
      if (e) {
        clearInterval(autoplayId);
      }

      if (blockIndex < blockTotal - 1) {
        blockIndex++;
      }

      updateFn();
    }

    var autoplayMillis = $gallery.attr('data-autoplay');
    if (autoplayMillis) {
      autoplayId = setInterval(function(){
        blockIndex = (blockIndex + 1) % blockTotal;

        updateFn();
      }, parseInt(autoplayMillis, 10));
    }

    for (var i = 0; i < blockTotal; i++) {
      (function(i) {
        $($items[i]).on('click', function(){
          clearInterval(autoplayId);
          blockIndex = i;
          updateFn();
        });
      })(i)
    }

    $before.on('click', leftFn);
    $after.on('click', rightFn);

    $gallery.on('swipeLeft', leftFn);
    $gallery.on('swipeRight', rightFn);

    updateFn();
  })
});
