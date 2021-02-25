function checkNavbarColor() {
    if($(window).scrollTop() > 0 || $(window).outerWidth() <= 992) {
        $(".navbar").css("background", "rgb(30,0,0)");
        $(".navbar").css("padding", "0.6em")
    } else {
        $(".navbar").css("background", "rgba(0,0,0,0)");
        $(".navbar").css("padding", "1em 0.6em")
    }
}
