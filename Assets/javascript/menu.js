	 // Collapse Navbar
  var navbarCollapse = function() {
    if ($(".header").offset().top > 20) {
      $(".header").addClass("navbar-shrink");
    } else {
		console.log($(".header").offset().top);
      $(".header").removeClass("navbar-shrink");
    }
  };
  // Collapse now if page is not at top
  navbarCollapse();
  // Collapse the navbar when page is scrolled
  $(window).scroll(navbarCollapse);
  
  
  
 
 
$('.js-mobile-menu').on('click', function() {
        $('.rwd-nav').addClass('nav-open');
    });
$('.nav-close').on('click', function() {
        $('.rwd-nav').removeClass('nav-open');
    });
	
/* 
 $(window).on('beforeunload', function() {
    $(window).scrollTop(0); 
	$(".perspective").scrollTop(0); 
});
  */
