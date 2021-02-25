var baseAnimationTime = 1000;

function checkNavbarColor() {
    if($(window).scrollTop() > 0 || $(window).outerWidth() <= 992) {
        $(".navbar").css("background", "rgb(17,17,64)");
        $(".navbar").css("box-shadow", "0 2px 5px 1px rgba(0,0,0,0.5)")
        $(".navbar").css("padding", "0.6em")
    } else {
        $(".navbar").css("background", "rgba(0,0,0,0)");
        $(".navbar").css("box-shadow", "none")
        $(".navbar").css("padding", "1em 0.6em")
    }
}

function dividerWidthScroll() {
    $(".divider").each(function(){
        if($(window).scrollTop()+$(window).height() >= $(this).offset().top) {
            $(this).animate({
                'width': '30%'
            }, baseAnimationTime);
        }
        // var p = getScrollPercentage($(this), threshold, offset, 1)//Math.max(0, Math.min(1, 1-($(this).offset().top+offset-($(window).height()+$(window).scrollTop()))/threshold));
        // $(this).css("transform", "scaleX(" + p + ")");
        
    });

}

function getSVGItems($svg) {
    return [...$svg.find("path"), ...$svg.find("circle"), ...$svg.find("rect")]
}

function getScrollPercentage($elem, threshold, offset, factor) {
    return Math.max(0, Math.min(1, 1-($elem.offset().top+offset-(($(window).height()+$(window).scrollTop())))/(threshold)));
}

function setSVGDrawArray($target=null) {
    if($target === null) $target = $("svg")
    $target.each(function(){
        var items = getSVGItems($(this));
        for(var i = 0; i < items.length; i++) {
            var len = items[i].getTotalLength();
            items[i].style['stroke-dasharray'] = len;
            items[i].style['stroke-dashoffset'] = len;
            if(items[i].style['stroke'] === "") items[i].style['stroke'] = "rgb(49,113,207)";
            if(items[i].style['stroke-width'] === "") items[i].style['stroke-width'] = "5px";
            if(items[i].style['fill'] === "") items[i].style['fill'] = 'rgba(0,0,0,0)';
        }
    })   
}

function drawSVG() {
    // $("svg").each(function(){
    //     var items = getSVGItems($(this));
    //     for(var i = 0; i < items.length; i++) {
    //         var len = items[i].getTotalLength();
    //         var p = 1-getScrollPercentage($(this), threshold, offset, 2);
    //         console.log(p);
    //         items[i].style['stroke-dashoffset'] = len*p;
    //     }
    // })
    
    
    $("svg").each(function(){
    if($(window).scrollTop()+$(window).height() >= $(this).offset().top) {
        var items = getSVGItems($(this));
        for(var i = 0; i < items.length; i++) {
            $(items[i]).animate({
                'stroke-dashoffset': 0
            }, baseAnimationTime)
        }
    }
    })
}


setSVGDrawArray();
checkNavbarColor();
$(window).scroll(() => {
    checkNavbarColor();
    dividerWidthScroll();
    drawSVG();
});

$("#process-carousel").on('slide.bs.carousel', function() {

    
    var $target = $("#process-carousel").children().children("div")
    $target.each(function() {
        setSVGDrawArray($(this).find("svg"))
        $(this).find("svg").each(function() {
            var $pathTarget = $(this).find("path")
            for(var i = 0; i < $pathTarget.length; i++) {
                $pathTarget.get(i).style['stroke-dashoffset'] = $pathTarget.get(i).getTotalLength();
                $($pathTarget.get(i)).clearQueue();
                $($pathTarget.get(i)).animate({
                    'stroke-dashoffset': 0
                }, baseAnimationTime*2)
            }            
        })
    })

})

$(window).resize(checkNavbarColor);
