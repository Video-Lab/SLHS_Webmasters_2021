var threshold = 100;
var offset = 150;
function checkNavbarColor() {
    if($(window).scrollTop() > 0 || $(window).outerWidth() <= 992) {
        $(".navbar").css("background", "rgb(17,17,64)");
        $(".navbar").css("padding", "0.6em")
    } else {
        $(".navbar").css("background", "rgba(0,0,0,0)");
        $(".navbar").css("padding", "1em 0.6em")
    }
}

function dividerWidthScroll(threshold, offset) {
    $(".divider").each(function(){
        var p = Math.max(0, Math.min(1, 1-($(".divider").offset().top+offset-($(window).height()+$(window).scrollTop()))/threshold));
        $(this).css("transform", "scaleX(" + p + ")");
        
    });

}

$(window).scroll(() => {
    checkNavbarColor();
    dividerWidthScroll(threshold, offset);
});
$(window).resize(checkNavbarColor);
