
$("#name").keydown(function () {

    let str = $(this).val();


    var el = $('.animacion').removeClass('animacion').addClass('paused');


    if (str.length < 20) {
        document.getElementById('cara').style.left = (0 + str.length) + "px";
        document.getElementById('cara').style.top = 25 + "px";
        document.getElementById('ojoIzq').style.left = 5 + (2 * str.length) + "px";
        document.getElementById('irisIzq').style.left = 5 + (0.2 * str.length) + "px";
        document.getElementById('irisIzq').style.top = 18 + "px";
        document.getElementById('brilloIzq').style.left = 5 + (0.2 * str.length) + "px";
        document.getElementById('brilloIzq').style.top = 20 + "px";
        document.getElementById('ojoDch').style.left = 45 + (2 * str.length) + "px";
        document.getElementById('brilloDch').style.top = 20 + "px";
        document.getElementById('irisDch').style.top = 18 + "px";
        document.getElementById('brilloIzq').style.left = 5 + (0.2 * str.length) + "px";
    }

   

});



$("#password").focus(function () {
    var el = $('.animacion').removeClass('animacion').addClass('paused');

    document.getElementById('cara').style.left = 2 + "px";
    document.getElementById('cara').style.top = -30 + "px";
    document.getElementById('ojoIzq').style.left = 25 + "px";
    document.getElementById('ojoIzq').style.top = 25 + "px";
    document.getElementById('irisIzq').style.left = 15 + "%";
    document.getElementById('irisIzq').style.top = 2 + "%";
    document.getElementById('brilloIzq').style.left = 15 + "%";
    document.getElementById('brilloIzq').style.top = 5 + "%";
    document.getElementById('ojoDch').style.left = 65 + "px";
    document.getElementById('ojoDch').style.top = 25 + "px";
    document.getElementById('irisDch').style.left = 15 + "%";
    document.getElementById('irisDch').style.top = 2 + "%";
    document.getElementById('brilloDch').style.left = 15 + "%";
    document.getElementById('brilloDch').style.top = 5 + "%";

});

$("#password, #name").focusout(function () {

    document.getElementById('cara').style.left = 0 + "px";
    document.getElementById('cara').style.top = 0 + "px";
    document.getElementById('ojoIzq').style.left = 25 + "px";
    document.getElementById('ojoIzq').style.top = 30 + "px";
    document.getElementById('irisIzq').style.left = 5 + "px";
    document.getElementById('irisIzq').style.top = 40 + "%";
    document.getElementById('brilloIzq').style.left = 5 + "px";
    document.getElementById('brilloIzq').style.top = 42 + "%";

    document.getElementById('ojoDch').style.left = 65 + "px";
    document.getElementById('ojoDch').style.top = 30 + "px";
    document.getElementById('irisDch').style.left = 5 + "px";
    document.getElementById('irisDch').style.top = 40 + "%";
    document.getElementById('brilloDch').style.left = 5 + "px";
    document.getElementById('brilloDch').style.top = 42 + "%";


    $('.paused').removeClass('paused').addClass('animacion');

});



