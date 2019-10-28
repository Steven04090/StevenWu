//動畫條件
var checkanimation = false;
var ua = window.navigator.userAgent;
ms_ie = /MSIE|Trident/.test(ua);

// ready 物件
//位移 scrolltop判斷
jQuery(document).ready(function($){
    //fade in
    $('body').css('display', 'none');
    $('body').fadeIn(1000);

    //Smooth scrolling
    var scrollLink = $('.scroll');
    scrollLink.click(function(e) {
    e.preventDefault();
    $('.rwd-nav').removeClass('nav-open');
    $('.js-mobile-menu').removeClass('closed');
    $('body,html').animate({
      scrollTop: $(this.hash).offset().top
    }, 1000 );
  });
  
  // Active link switching
  $(window).scroll(function() {
    var scrollbarLocation = $(this).scrollTop();
    
    scrollLink.each(function() {
      
      var sectionOffset = $(this.hash).offset().top - 20;
      
      if ( sectionOffset <= scrollbarLocation ) {
        $(this).parent().addClass('active');
        $(this).parent().siblings().removeClass('active');
      }
    })
    
  })

    //IE額外處理 for IE11
    if ( ms_ie ) {$("html,body").animate({scrollTop: 0}, 1000);}
    //其餘偵測scrolltop
    if ($(window).scrollTop() == 0) {
        $('.perspective,.ai-backgroud-img').addClass("ad");
        $(".perspective").addClass("top1");
        $('.section1,.perspective').removeClass("is-perspective is-perspective-open");
        $(".ai-backgroud-img").removeClass("starstop");
	} else {
    $('.section1,.perspective').addClass("is-perspective is-perspective-open");
    $(".myphoto").addClass("photo-on");
	}
});

//滑鼠 menu
 $('.js-mobile-menu').on('click', function() {
    $('.rwd-nav').toggleClass('nav-open');
    $('.js-mobile-menu').toggleClass('closed');
});


//freezer物件點擊後，addClass
$('.js-freezer').on('click', function() {
    $('.perspective,.ai-backgroud-img').addClass("ad");
    disableScroll();
    if($(this).parents('.csstransitions').length > 0 ) {checkanimation = true;}
    $(".perspective").removeClass("top105 top103 top1");
    $('.section1,.perspective').addClass("is-perspective is-perspective-open");
    console.log('start1');
    $(".block-element").addClass("enter");
    //等到動畫結束再執行
    $('.ai-backgroud-img').one('webkitAnimationEnd oanimationend oAnimationEnd msAnimationEnd animationend', function(){
        //animation is over
        $(".myphoto").addClass("photo-on");
        $(".ai-backgroud-img").addClass("starstop");
        
        setTimeout(function(){
            
            checkanimation = false;
            console.log('end1');
            enableScroll();
        }, 1000); 
       
    });  
});

//添加 滾輪事件
if (document.addEventListener) {
    document.addEventListener("mousewheel", MouseWheelHandler(), false);
    document.addEventListener("DOMMouseScroll", MouseWheelHandler(), false);
} else {
    sq.attachEvent("onmousewheel", MouseWheelHandler());
}
//滾輪事件
function MouseWheelHandler() {
    return function (e) {
        // cross-browser wheel delta
        var e = window.event || e;
        var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
        //會有BUG 動畫結束後還是0
        if ($(window).scrollTop() == 0) {
            console.log($(window).scrollTop());
            $('.perspective,.ai-backgroud-img').addClass("ad");
            
            //scrolling down
            if (delta < 0 && !checkanimation) {
                //再用class區別
                if( $(".perspective").hasClass("top1") ){
                        $(".perspective").removeClass("top1");
                        $(".perspective").addClass("top103");
                    return;
                }
                else if( $(".perspective").hasClass("top103") ){
                    $(".perspective").removeClass("top103");
                        $(".perspective").addClass("top105");
                    return;
                }
                else if( $(".perspective").hasClass("top105") ){
                    disableScroll();
                    if($(this).parents('.csstransitions').length > 0 ) {checkanimation = true;}
                    $(".perspective").removeClass("top105");
                    $('.section1,.perspective').addClass("is-perspective is-perspective-open");
                    console.log('start1');
                    $(".block-element").addClass("enter");
                    //等到動畫結束再執行
                    $('.ai-backgroud-img').one('webkitAnimationEnd oanimationend oAnimationEnd msAnimationEnd animationend', function(){
                        //animation is over
                        $(".myphoto").addClass("photo-on");
                        $(".ai-backgroud-img").addClass("starstop");
                        setTimeout(function(){
                            
                            checkanimation = false;
                            console.log('end1');
                            enableScroll();
                        }, 1000); 
                       
                    });        
                    return false;
                }
                else{
                    return false;
                }
            }
            //scrolling up
            else if( !checkanimation && delta > 0 && $(".perspective").hasClass("is-perspective")){
                console.log('start2');
                disableScroll();
                if($(this).parents('.csstransitions').length > 0 ) {checkanimation = true;}
                $(".ai-backgroud-img").removeClass("starstop");
                $('.section1,.perspective').removeClass("is-perspective is-perspective-open");
                $(".ai-backgroud-img").addClass("aimovein");
                $(".myphoto").removeClass("photo-on");
                //等到動畫結束再執行 在往下動畫沒結束時往上滾　會有bug
                $('.ai-backgroud-img').one('webkitAnimationEnd oanimationend oAnimationEnd msAnimationEnd animationend', function(){
                    //animation is over
                    setTimeout(function(){
                        checkanimation = false;
                        $(".perspective").addClass("top1");
                        console.log('end2');
                        enableScroll();
                    }, 1000);
                
                });
            }
            return false;
        } else{
            return false;
        }
    }
}
//防止滾動
// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
var keys = {37: 1, 38: 1, 39: 1, 40: 1};

function preventDefault(e) {
  e = e || window.event;
  if (e.preventDefault)
      e.preventDefault();
  e.returnValue = false;  
}

function preventDefaultForScrollKeys(e) {
    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
}

function disableScroll() {
  if (window.addEventListener) // older FF
      window.addEventListener('DOMMouseScroll', preventDefault, false);
  window.onwheel = preventDefault; // modern standard
  window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
  window.ontouchmove  = preventDefault; // mobile
  document.onkeydown  = preventDefaultForScrollKeys;
}

function enableScroll() {
    if (window.removeEventListener)
        window.removeEventListener('DOMMouseScroll', preventDefault, false);
    window.onmousewheel = document.onmousewheel = null; 
    window.onwheel = null; 
    window.ontouchmove = null;  
    document.onkeydown = null;  
}



