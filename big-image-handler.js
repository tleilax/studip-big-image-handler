(function ($) {

$('img:not(.big-image-handled)').live('mouseenter', function () {
    var $that   = $(this),
        $parent = $that.parent(),
        src     = $that.attr('src'),
        width   = parseInt($that.width(), 10),
        height  = parseInt($that.height(), 10),
        img;

    if (width < 200
        || $that.is('[class^=avatar][class^=user]')
        || ($parent.is('a[href]') && $parent.attr('href') !== src)) {
        return;
    }

    img = new Image();
    img.onload = function () {
        if (img.width > width || img.height > height) {
            var offset = $that.offset(),
                info   = $('<div/>').hide(),
                text   = 'Dieses Bild wird verkleinert dargestellt.'.toLocaleString() + ' ';
            if (width >= 500) {
                text += '<nobr>' + 'Klicken Sie auf das Bild, um es in Originalgröße in einem neuen Fenster zu öffnen.'.toLocaleString() + '</nobr>';
            } else if (width >= 300) {
                text += '<nobr>' + 'Klicken für Originalgröße.'.toLocaleString() + '</nobr>';
            }

            info.addClass('big-image-info').html(text);

            $that.wrap('<div class="big-image-handler"/>').after(info).addClass('big-image-handled');
        }
    };
    img.src = src;
});

$('.big-image-handler').live('mouseenter', function () {
    $('div', this).stop(true, true).show('slide', {direction: 'up'});
}).live('mouseleave', function () {
    $('div', this).stop(true, true).hide('slide', {direction: 'up'});
}).live('click', function (event) {
    var src = $('img', this).attr('src');
    window.open(src);
    
    event.preventDefault();
});

}(jQuery));
