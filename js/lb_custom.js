jQuery(function() { //Run when DOM is loaded
    langSwitcher.init();
    wrapBoxes();
    backButton();
});

function lbInit() { //Run when AJAX completes See bridge/js/ajax.min.js
    langSwitcher.update();
    wrapBoxes();
    backButton();
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
function backButton() {
    var path = window.location.protocol + '//' + window.location.host,
        backButton = '<a class="lb_back_button" href="' + path + '/stories/" target="_self">Back</a>';
    jQuery(backButton).insertBefore('.crp_related');
    //Rearrange Related Posts Date element to be above the Title
    jQuery('.crp_date').each(function() {
        var loc = jQuery(this).parent().children('a').children('span');
        jQuery(this).insertBefore(loc);
    });
}
// Call Bridge's AJAX loadResource function on backButton.click
jQuery('.lb_back_button').click(function(e) {
    loadResource('http://socrates.longbeardsrevenge.com/stories');
    e.preventDefault();
});

/*
 * YOUTUBE IFRAME LOADER
 */
var prev = jQuery('a[href="#lb_prev"]'),
    next = jQuery('a[href="#lb_next"]'),
    videoWrapper = jQuery('#lb_video'),
    vidArr = [];

jQuery('#lb_video_list li').each(function() {
    var vidVal = jQuery(this).text();
    vidArr.push(vidVal);
});

var videoCount = vidArr.length - 1;

//click Next button
next.click(function(e) {
    //Get current video number
    var currVideo = videoWrapper.data('num');
    //if is not last video
    if (currVideo < videoCount) {
        switchVideo(currVideo + 1);
    } else if (currVideo == videoCount) {
        switchVideo(0);
    }
    e.preventDefault();
});

//click Prev button
prev.click(function(e) {
    //Get current video number
    var currVideo = videoWrapper.data('num');
    if (currVideo > 0) {
        switchVideo(currVideo - 1);
    } else {
        switchVideo(videoCount);
    }
    e.preventDefault();
});

function switchVideo(a) {
    //move to new video
    videoWrapper.data('num', a);
    //Set src of iframe to new video
    var newSrc = "//youtube.com/embed/" + vidArr[a] + "?feature=oembed&color=white&disablekb=1&rel=0&showinfo=0";
    jQuery('#lb_video').attr('src', newSrc);
}

jQuery('.lb_pageable_links a').click(function(e){
    var target = jQuery(this).attr('href');

    jQuery('.vc_tta-panel').removeClass('vc_active').fadeOut(300);
    jQuery(target).addClass('vc_active').fadeIn(300);
    e.preventDefault();
});


jQuery('#lb_video').ready(function() {
    jQuery('#lb_loading').css('display', 'none');
});
jQuery('#lb_video').load(function() {
    jQuery('#lb_loading').css('display', 'block');
});


// Filter Active State
jQuery(function(){ jQuery('.filter:first-child').addClass('active');});
jQuery('.filter').click(function(){
    jQuery('.filter').removeClass('active');
    jQuery(this).addClass('active');
});
