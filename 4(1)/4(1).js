"use strict";

(function($) {
    $(function(){
        $(".tabs_container > div:not('.active')").hide();
        $('.tabs li.tab').click(function(event) {
            console.log();
           if(!$(this).hasClass('active')) {
              $('.tabs li.active').removeClass('active');
              $(this).addClass('active');
              $('.tab_content').removeClass('active').hide();
              var elemId = $(this).children('a').attr('href');
              $(elemId).addClass('active').show();
           }
        });
    });
})(jQuery);