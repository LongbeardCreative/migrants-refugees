jQuery(function() { //Run when DOM is loaded
    langSwitcher.init();
    wrapBoxes();
    stories();
});

function lbInit() { //Run when AJAX completes See bridge/js/ajax.min.js
    langSwitcher.update();
    wrapBoxes();
    stories();
}

//Add Language Switch Options via html-lang-attr and subfolders dynamically
// Two Methods init() and update()
langSwitcher = {
    init: function() {
        var raw = jQuery('body').attr('class'),
            regex = /.+(?:postid-|page-id-)(\d{1,}).+/g,
            pageId = raw.replace(regex, "$1"),
            path = window.location.protocol + "//" + window.location.host + "/",
            lang = jQuery('html').attr('lang'),
            arr = {
                "pt": "pt",
                "es": "es",
                "it-IT": "it",
                "fr": "fr",
                "en-US": "en"
            };

        jQuery('header .container_inner').append('<div class="lang_switcher"></div>');
        jQuery.each(arr, function(index, value) {
            var raw = jQuery('body').attr('class'),
                regex = /.+(?:postid-|page-id-)(\d{1,}).+/g,
                pageId = raw.replace(regex, "$1");
            if (index == lang) {
                jQuery('.lang_switcher').prepend('<a class="lb_active" href="javascript:void(0)">' + value + '</a>');
            } else {
                jQuery('.lang_switcher').prepend('<a href="' + path + value + '/index.php?p=' + pageId + '">' + value + '</a>');
            }
        });
    },
    update: function() {
        jQuery('.lang_switcher a').each(function() {
            var raw = jQuery('body').attr('class'),
                regex = /.+(?:postid-|page-id-)(\d{1,}).+/g,
                pageId = raw.replace(regex, "$1"),
                rawHREF = jQuery(this).attr('href'),
                regexHREF = /(http:\/\/socrates\.longbeardsrevenge\.com\/\w{2}\/index\.php\?p=)(\d+)/g,
                baseHREF = rawHREF.replace(regex, '$1');
            if (!jQuery(this).attr('href') == 'javascript:void(0)') {
                jQuery(this).attr('href', baseHREF + pageId);
            }
        });
    }
};

function wrapBoxes() {
    // Wrap Stories Articles in HREFs
    jQuery('.boxes_image').each(function() {
        var href = jQuery('a', this).attr('href');

        jQuery(this).closest('li').children('.latest_post').wrap('<a href="' + href + '"></a>');
    });
}
// Add Back Button to Single Blog Posts
function stories() {
    //Rearrange Related Posts Date element to be above the Title
    jQuery('.crp_date').each(function() {
        var loc = jQuery(this).parent().children('a').children('span');
        jQuery(this).insertBefore(loc);
    });
    jQuery(function() {
        jQuery('.filter:first-child').addClass('active');
    });
}
// Filter Active State
jQuery('.filter').click(function() {
    jQuery('.filter').removeClass('active');
    jQuery(this).addClass('active');
});

// Interpret URL Parameters
function getParameterByName(name, url) {
    if (!url) {
        url = window.location.href;
    }
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

jQuery(function() {
    if (getParameterByName('category').length && jQuery('body').hasClass('page-id-44')) {
        jQuery('html, body').animate({
            scrollTop: jQuery(window).height()
        }, 1000);
    }
});

jQuery('.lb_more_videos a').click(function(){
    var link = jQuery(this).attr('href');
    loadResource(link);
});

function catParam() {
    var category = getParameterByName('category');
    if (category == 'interviews' && jQuery('body').hasClass('page-id-44')) {
        jQuery('li[data-filter=".category-interviews"]').click();
    }
}
