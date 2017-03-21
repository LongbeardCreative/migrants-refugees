jQuery(function customJS(){ //Run when DOM is loaded
var $ = jQuery,
    raw = $('body').attr('class'),
    regex = /.+(?:postid-|page-id-)(\d{1,}).+/g,
    pageId = raw.replace(regex, "$1");

$(function langSwitcher() {
    var path = window.location.protocol + "//" + window.location.host + "/",
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

// Wrap Stories Articles in HREFs
$('.boxes_image').each(function(){
	var href = $('a', this).attr('href');

	$(this).closest('li').children('.latest_post').wrap('<a href="' + href + '"></a>');
});

// Add Back Button to Single Blog Posts
$(function(){
    var backButton = '<a class="lb_back_button" href="/stories/" target="_self">Back</a>';

    $('.single_top_part_inner .grid_section .section_inner').prepend(backButton);
})

});
