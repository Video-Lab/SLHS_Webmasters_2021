var email = "email@example.com"
var password = "passwordgoeshere"
var animTime = 75;
var delay = 500;
var loginFilled = false;

function fillLogin() {
    loginFilled = true;
    $("input[type='email']").val("");
    $("input[type='password']").val("");
    email.split("").forEach((char,i) => {
        setTimeout(function(){$("input[type='email']").val($("input[type='email']").val()+char)},(i+1)*animTime);
    });
    password.split("").forEach((char,i) => {
        setTimeout(function(){$("input[type='password']").val($("input[type='password']").val()+char)},(i+1)*animTime+delay);
    });
}

function login() {
    $(".login-container").css("min-height", "0px");
    $(".login-container").animate({
        "height": "0",
        "opacity": 0
    }, 1000, function(){$(".login-container").css("display", "hidden")})

    $(".demo-container").css("display", "block");
    $(".demo-container").animate({
        "height": "100%",
        "opacity": 1
    }, 1000)
    
    $(".demo-container").css("height", "max-content");

}

$(window).scroll(() => {
    if(!loginFilled && $(window).scrollTop()+$(window).height() >= $(".login-container").offset().top) {
        fillLogin();
    }
})