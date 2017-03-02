jQuery(function(){ //Run when DOM is loaded
var $ = jQuery;

$(function langSwitcher() {
    var raw = $('body').attr('class'),
        regex = /.+(?:postid-|page-id-)(\d{1,}).+/g,
        pageId = raw.replace(regex, "$1"),
        path = window.location.protocol + "//" + window.location.host + "/",
        lang = $('html').attr('lang'),
        arr = { "pt": "pt", "es": "es", "it-IT": "it", "fr": "fr", "en-US": "en" }

    console.log("RegEx Page ID: " + pageId);

    $('header .container_inner').append('<div class="lang_switcher"></div>');

    $.each(arr, function( index, value ) {
        if ( index == lang ) {
            $('.lang_switcher').prepend('<a class="lb_active" href="javascript:void(0)">' + value + '</a>');
        } else {
            $('.lang_switcher').prepend('<a href="' + path + value + '/index.php?p=' + pageId + '">' + value + '</a>');
        }
    });

});

});
