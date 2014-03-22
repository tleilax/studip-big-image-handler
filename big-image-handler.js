(function ($) {

$(document).on('mouseenter', 'img:not(.big-image-handled)', function () {
    var $that   = $(this),
        $parent = $that.parent(),
        src     = $that.attr('src'),
        width   = parseInt($that.width(), 10),
        height  = parseInt($that.height(), 10),
        img;

    if ($that.is('[class*=avatar][class*=user]')
        || ($parent.is('a[href]') && $parent.attr('href') !== src)
        || $that.attr('src').match(STUDIP.ASSETS_URL + 'images/icons/'))
    {
        // Prevent any further handling
        $(this).addClass('big-image-handled'); 
        return;
    }

    img = new Image();
    img.onload = function () {
        if (img.width > width * window.devicePixelRatio || img.height > height * window.devicePixelRatio) {
            var offset = $that.offset(),
                info   = $('<div/>').hide(),
                text   = 'Dieses Bild wird verkleinert dargestellt.'.toLocaleString() + ' ';
            if (width >= 500) {
                text += '<nobr>' + 'Klicken Sie auf das Bild, um es in Originalgröße zu öffnen.'.toLocaleString() + '</nobr>';
            } else if (width >= 300) {
                text += '<nobr>' + 'Klicken für Originalgröße.'.toLocaleString() + '</nobr>';
            } else if (width < 100) {
                text = $('<img>').attr('title', text).attr('src', STUDIP.ASSETS_URL + 'images/icons/16/white/visibility-invisible.png');
            }

            info.addClass('big-image-info').html(text);

            $that.wrap('<div class="big-image-handler"/>').after(info).addClass('big-image-handled');
        }
    };
    img.src = src;
});

$(document).on('mouseenter', '.big-image-handler', function () {
    $('div', this).stop(true, true).show('slide', {direction: 'up'});
}).on('mouseleave', '.big-image-handler', function () {
    $('div', this).stop(true, true).hide('slide', {direction: 'up'});
}).on('click', '.big-image-handler', function (event) {
    // Open as full screen lightbox
    var src     = $('img', this).attr('src'),
        img     = $('<img class="big-image-handled">'),
        close   = $('<div class="big-image-close">'),
        overlay = $('<div class="big-image-overlay">'),
        offset;

    img.load(function () {
        offset = img.position();
        close.css({
            left: offset.left + img.width() - 18,
            top: offset.top + 2
        }).insertAfter(img);
    });
    img.attr('src', src);

    overlay.append(img).appendTo('body').click(function () {
        $(document).off('keypress.big-image');
        $(this).remove();
    });
    
    $(document).on('keypress.big-image', function (event) {
        if (event.key === 'Esc') {
            overlay.click();
        }
    });

    event.preventDefault();
});

}(jQuery));
