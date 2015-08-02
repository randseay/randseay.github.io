$(document).ready(function(){
    // Show Navigation on Scroll
    var logoOffset = $('.hero .logo').height();

    $(window).scroll(function(){
        var currentScroll = $(this).scrollTop();

        if (currentScroll > logoOffset) {
                $('.site-header').removeClass('hidden');
        } else {
                $('.site-header').addClass('hidden');
        }
    })
});