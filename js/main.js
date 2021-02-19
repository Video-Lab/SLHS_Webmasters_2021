$(window).scroll(() => {
    if($(this).scrollTop() > $(".hero").outerHeight()/4 || $(this).outerWidth() <= 992) {
        $(".navbar").css("background", "rgb(17,17,64)");
    } else {
        $(".navbar").css("background", "rgba(0,0,0,0)");
    }
})