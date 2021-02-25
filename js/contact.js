$form = $("form")

$(".btn-submit").on("click", function(){
    $form.find("input, textarea, select").each(function(){
        $(this).val('');
    })

    $(".submitted").css("visibility", "visible");
    $(window).scrollTop($(window).height())
})