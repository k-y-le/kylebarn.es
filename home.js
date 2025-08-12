$( function() {
  $(".home-click").draggable();
} );

$(".home-click").hover(function(e){
  e.stopPropagation();
  $("#home-text").attr("src", "img/text_" + this.id + ".png"); 
}, function(){
  $("#home-text").attr("src", "img/text_kyle.png"); 
})

$(".home-click").click(function(e){
  e.stopPropagation();
  $("#home-text").attr("src", "img/text_" + this.id + ".png");
  $(".info-box").hide();
  $(".more-info-" + this.id).show();
  addOverlay(); // Add overlay after showing popup
})

$(".mobile-click").click(function(e){
  e.stopPropagation();
  $(".info-box").hide();
  $(".more-info-" + this.id).show();
  addOverlay(); // Add overlay after showing popup
})

$('.info-link').click(function() {
  const imageId = $(this).data('image');
  $('#' + imageId).toggleClass('show');
});

// Hide info-box when clicking outside of it
$(document).click(function(event) {
  if (!$(event.target).closest('.info-box').length) {
    $('.info-box').hide();
  }
});

// Prevent info-box from hiding when clicking inside it
$('.info-box').click(function(event) {
  event.stopPropagation();
});

// Add overlay function
function addOverlay() {
  // Remove any existing overlays first
  $('.popup-overlay-dynamic').remove();
  
  // Create overlay element
  const $overlay = $('<div>', {
    class: 'popup-overlay-dynamic',
    css: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(0, 0, 0, 0.01)', // Nearly transparent
      zIndex: 2, // Below your popup but above everything else
      cursor: 'pointer'
    }
  });

  // Add click handler to close popup and remove overlay
  $overlay.on('click', function() {
    $('.info-box').hide(); // Close all info boxes
    $(this).remove(); // Remove the overlay
  });

  // Add to body
  $('body').append($overlay);
}