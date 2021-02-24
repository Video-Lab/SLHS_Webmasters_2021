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
        var p = Math.max(0, Math.min(1, 1-($(this).offset().top+offset-($(window).height()+$(window).scrollTop()))/threshold));
        $(this).css("transform", "scaleX(" + p + ")");
        
    });

}

function getSVGItems($svg) {
    return [...$svg.find("path"), ...$svg.find("circle")]
}
function setSVGDrawArray() {
    $("svg").each(function(){
        var items = getSVGItems($(this));
        for(var i = 0; i < items.length; i++) {
            var len = items[i].getTotalLength();
            items[i].style['stroke-dasharray'] = len;
            if(items[i].style['stroke'] === "") items[i].style['stroke'] = "rgb(49,113,207)";
            if(items[i].style['stroke-width'] === "") items[i].style['stroke-width'] = "5px";
            if(items[i].style['fill'] === "") items[i].style['fill'] = 'rgba(0,0,0,0)';
        }
    })   
}

function drawSVG(threshold, offset) {
    $("svg").each(function(){
        var items = getSVGItems($(this));
        for(var i = 0; i < items.length; i++) {
            var len = items[i].getTotalLength();
            var p = Math.max(0, Math.min(1, ($(this).offset().top+offset-($(window).height()+$(window).scrollTop()))/threshold));
            items[i].style['stroke-dashoffset'] = len*p;
        }
    })
}

setSVGDrawArray();
$(window).scroll(() => {
    checkNavbarColor();
    dividerWidthScroll(threshold, offset);
    drawSVG(threshold, offset);
});
$(window).resize(checkNavbarColor);
