// Modal helpers
$(document).keydown(function(e) {
     if (e.keyCode == 27) { // escape key maps to keycode `27`
        $('#helpTrigger').attr('checked', false);
        $('#navInput').focus();
    }
});

// Main
$(document).ready(function() {
    $('#menu-icon').click(function() {
        $('#menu-icon li svg').attr('class', function(index, attr) {
            return attr == 'is-active' ? null : 'is-active';
        });
        $('.site-nav').toggleClass('is-visible');
        $('html, body').attr('class', function(index, attr) {
            return $('.site-nav').hasClass('is-visible') ? 'lock-position' : null;
            if ($('.site-nav').hasClass('is-visible')) {
            }
        });
        if ($('.site-nav a.button').hasClass('small')) {
            $('.site-nav a.button').removeClass('small');
        } else {
            setTimeout(function() {
                $('.site-nav a.button').addClass('small');
            }, 250);
        }
    });

    // Modal helpers
    $('#helpModal .modal-close').on('click', function() {
        $('#navInput').focus();
    });

    // media query change
    function WidthChange(mq) {
        if (mq.matches) {
            $('#menu-icon li svg').attr('class', function(index, attr) {
                return null;
            });
            $('.site-nav').removeClass('is-visible');
            $('html, body').removeClass('lock-position');
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
                    if (DIRECTORY[i].name === 'help') {
                        $('#helpTrigger').prop('checked', true);
                    } else if (DIRECTORY[i].type === 'external') {
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

    // Navigation Help Modal Definitions
    var helpList = '<div class="column one-whole small-one-third large-one-fourth">';

    for (var i = 0; i < DIRECTORY.length; i++) {
        if ((i % 4) == 0) {
            helpList += '</div><!-- /.column -->';
            helpList += '<div class="column one-whole small-one-third large-one-fourth">';
        }

        helpList += '<dt>' + DIRECTORY[i].name + ' (' + DIRECTORY[i].type + ')</dt>';

        for (var x = 0; x < DIRECTORY[i].keywords.length; x++) {
            helpList += '<dd>' + DIRECTORY[i].keywords[x] + '</dd>';
        }
    }

    helpList += '</div><!-- /.column -->'

    $('#helpList').html(helpList);
});
