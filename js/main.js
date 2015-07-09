$(document).ready(function() {
    $('#menu-icon').click(function() {
        $('.site-nav').toggleClass('is-visible');
        $('.site-nav a.button').toggleClass('small');
    })

    // media query change
    function WidthChange(mq) {
        if (mq.matches) {
            $('.site-nav').removeClass('is-visible');
        $('.site-nav a.button').addClass('small');
        }
    }

    if (matchMedia) {
        var medium_mq = window.matchMedia('(min-width: 640px)');
        medium_mq.addListener(WidthChange);
        WidthChange(medium_mq);
    }

    // Navigation Input
    $('#navInput').on('input', function(){
        var input = this.value.toLowerCase().trim();

        for (var i = 0; i < DIRECTORY.length; i++) {
            if (DIRECTORY[i].keywords.indexOf(input) >= 0) {
                $(this).parents('form').addClass('valid');
                setTimeout(function() {
                    if (DIRECTORY[i].type === 'external') {
                        window.open(DIRECTORY[i].url, '_blank');
                    } else {
                        window.location.href = DIRECTORY[i].url
                    }
                }, 250);
                break;
            } else {
                $(this).parents('form').removeClass('valid');
            }
        }
    });

    // Navigation Buttons use Navigation Input
    $('[data-nav]').click(function() {
        event.preventDefault();
        $(this).siblings('#navForm').addClass('valid');
        $('#navInput').val($(this).data('nav')).trigger('input');
    })
});
