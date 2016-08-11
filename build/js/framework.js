$(function(){
  // Modals
  $('.modal').on('scroll touchmove mousewheel', function(e){
    e.preventDefault();
    e.stopPropagation();
    return false;
  });

  $('.modal-close').on('click', function(e){
    var $modal = $(this).closest('.modal');
    $modal.addClass('hidden');
  })

  $('.next-section').on('click', function(e){
    var $section = $($(this).parents('section, .block').last());
    var $nextSection = $($section).next();

    if ($nextSection.length !== 0) {
      var offset = ($(window).height() - $nextSection.height()) /2;

      $("html, body").animate({ scrollTop: $nextSection.offset().top - offset }, 500);
    }

    e.preventDefault();
    e.stopPropagation();
    return false;
  })

  $('.button.call-to-action').on('click', function(e){
    var $nextSection = $('#call-to-action');

    if ($nextSection.length !== 0) {
      var offset = ($(window).height() - $nextSection.height()) /2;

      $("html, body").animate({ scrollTop: $nextSection.offset().top - offset }, 1000);
    }

    e.preventDefault();
    e.stopPropagation();
    return false;
  })
});

$(window).load(function(){
  $('.loader').fadeTo(1000, 0, function() {
    $(this).hide();
    $('body').css('overflow', '');
  });

  /* remove JQuery Mobile Loader thing */
  $('.ui-loader').remove();
})

