var fieldOfView = 110;
var distance = 270;
var height = 90;
var angle = -5;
var stiffness = 0.45;
var swivel = 4.30;
var transition = 1.20;

$(function () {

    $("#slider").slider({
        value: fieldOfView,
        min: 60,
        max: 110,
        step: 1,
        slide: function (event, ui) {
            $("#fieldOfViewTxt").val(ui.value + '°');

        }
    });
    $("#fieldOfViewTxt").val($("#slider").slider("value") + '°');


    $("#slider2").slider({
        value: distance,
        min: 100,
        max: 400,
        step: 10,
        slide: function (event, ui) {
            $("#distanceTxt").val(ui.value + '.00');

        }
    });
    $("#distanceTxt").val($("#slider2").slider("value") + '.00');


    $("#slider3").slider({
        value: height,
        min: 40,
        max: 200,
        step: 10,
        slide: function (event, ui) {
            $("#heightTxt").val(ui.value + '.00');

        }
    });
    $("#heightTxt").val($("#slider3").slider("value") + '.00');


    $("#slider4").slider({
        value: angle,
        min: -15,
        max: 0,
        step: 1,
        slide: function (event, ui) {
            $("#angleTxt").val(ui.value + '.00');

        }
    });
    $("#angleTxt").val($("#slider4").slider("value") + '.00');

    $("#slider5").slider({
        value: stiffness,
        min: 0,
        max: 1,
        step: 0.05,
        slide: function (event, ui) {
            $("#stiffnessTxt").val((Math.round(ui.value * 100) / 100).toFixed(2));

        }
    });
    $("#stiffnessTxt").val($("#slider5").slider("value"));

    $("#slider6").slider({
        value: swivel,
        min: 1,
        max: 10,
        step: 0.10,
        slide: function (event, ui) {
            $("#swivelTxt").val((Math.round(ui.value * 100) / 100).toFixed(2));

        }
    });
    $("#swivelTxt").val($("#slider6").slider("value").toFixed(2));

    $("#slider7").slider({
        value: transition,
        min: 1,
        max: 2,
        step: 0.10,
        slide: function (event, ui) {
            $("#transitionTxt").val((Math.round(ui.value * 100) / 100).toFixed(2));

        }
    });
    $("#transitionTxt").val($("#slider7").slider("value").toFixed(2));

});


function resetBool(name) {
    $(name).val('Off');
}

function reset(slider, name, extension, value) {
    $(name).val(value + extension);
    $(slider).slider("value", value);

}

$(document).on('click', '#clear', function () {
    reset("#slider", "#fieldOfViewTxt", "°", fieldOfView);
    reset("#slider2", "#distanceTxt", ".00", distance);
    reset("#slider3", "#heightTxt", ".00", height);
    reset("#slider4", "#angleTxt", ".00", angle);
    reset("#slider5", "#stiffnessTxt", "", stiffness);
    reset("#slider6", "#swivelTxt", "0", swivel);
    reset("#slider7", "#transitionTxt", "0", transition);

    resetBool("#cameraShake");
    resetBool("#invertSwivel");

    $('#difference').text('0 % Difference');
    $('#difficulty').text('Easy');
    $('#difficulty').css("color", "green");
});

$(document).on('click', '#generate', function () {

    set("#slider", "#fieldOfViewTxt", '°', 1, false);
    set("#slider2", "#distanceTxt", '', 10, true);
    set("#slider3", "#heightTxt", '', 10, true);
    set("#slider4", "#angleTxt", '', 1, true);
    set("#slider5", "#stiffnessTxt", '', 0.05, true);
    set("#slider6", "#swivelTxt", '', 0.10, true);
    set("#slider7", "#transitionTxt", '', 0.10, true);

    setBool("#cameraShake");
    setBool("#invertSwivel");

    setDifference();

});

$(document).on('click', '#cameraShake', function () {

    var value = $('#cameraShake').val();
    if (value == 'Off')
        $('#cameraShake').val('On');
    else
        $('#cameraShake').val('Off');
});

$(document).on('click', '#invertSwivel', function () {

    var value = $('#invertSwivel').val();
    if (value == 'Off')
        $('#invertSwivel').val('On');
    else
        $('#invertSwivel').val('Off');
});

function getDifference(name, mySetting) {
    var num = $(name).slider("value");
    return calcDifference(num, mySetting);
}

function setDifference() {

    var range = [
        getDifference("#slider", fieldOfView),
        getDifference("#slider2", distance),
        getDifference("#slider3", height),
        getDifference("#slider4", angle),
        getDifference("#slider5", stiffness),
        getDifference("#slider6", swivel),
        getDifference("#slider7", transition),
    ];

    var num = Math.round(((range.reduce((a, b) => a + b, 0) / range.length)).toFixed(2));

    $('#difference').text(num + ' % Difference');

    if (num < 33.3) {
        $('#difficulty').text('Easy');
        $('#difficulty').css("color", "green");
    } else if (num >= 33.3 && num < 66.6) {
        $('#difficulty').text('Medium');
        $('#difficulty').css("color", "yellow");
    } else if (num >= 66.6) {
        $('#difficulty').text('Hard');
        $('#difficulty').css("color", "red");
    }

}

function calcDifference(changed, original) {
    var diff = Math.abs((changed - original));
    var average = ((changed + original) / 2);

    var num = (diff / average * 100);
    return Math.round(Math.abs(num));
}

function setBool(name) {
    var value = Math.round(Math.random())
    if (value == 1)
        $(name).val('On');
    else
        $(name).val('Off');
}

function set(name, label, extension, increment, decimal) {
    var min = $(name).slider("option", "min") - $(name).slider("option", "step");
    var max = $(name).slider("option", "max") + $(name).slider("option", "step");
    var num = rand(min, max, increment, decimal)

    $(label).val(num + '' + extension);
    $(name).slider("value", num);
}

function rand(min, max, step, decimal) {
    var delta,
        range,
        rand;
    if (arguments.length < 2) {
        max = min;
        min = 0;
    }
    if (!step) {
        step = 1;
    }
    delta = max - min;
    range = delta / step;
    rand = Math.random();
    rand *= range;
    rand = Math.floor(rand);
    rand *= step;
    rand += min;

    if (decimal)
        return (rand).toFixed(2);

    return rand;

}

