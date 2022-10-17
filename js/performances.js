var date = new Date();
var isNight = (date.getHours() > 20 || date.getHours() < 8);

$("#performance-list a").click(function(){
    $("#performance-list a").css("color", "");
    $("#performance-textbox div").hide();
    $("#d-" + this.id.slice(2)).show();
    if (isNight) {
        $(this).css("color", "white");
    } else {
        $(this).css("color", "black");
    }
})

// change image and colors of the general site at nighttime
if (isNight){
    // switch the lamp images
    $("#lamp").attr("src", "img/lamp_on.png"); 
    $("#lamp").addClass("lamp-on").removeClass("lamp-off");
    // change everything else
    $("body").css({"background-color": "black",
                    "color": "white"});
    $("#performance-list a").hover(function(){
        $(this).css("color", "white");
    }, function(){
        if ($("#d-" + this.id.slice(2)).is(":visible")) {
            $(this).css("color", "white");
        } else {
            $(this).css("color", "");
        }
    })
}

// change image and colors of the general site when lamp is clicked on
$("#lamp").click(function(){
    if($(this).hasClass("lamp-on")) {
        isNight = false;
        $("#t-" + $("#performance-textbox div:visible")[0].id.slice(2)).css("color", "black");
        // switch the lamp images
        $(this).attr("src", "img/lamp_off.PNG"); 
        $(this).addClass("lamp-off").removeClass("lamp-on");
        // change everything else
        $("body").css({"background-color": "white",
                        "color": "black"});
        $("#performance-list a").hover(function(){
            $(this).css("color", "black");
        }, function(){
            if ($("#d-" + this.id.slice(2)).is(":visible")) {
                $(this).css("color", "black");
            } else {
                $(this).css("color", "");
            }
        })    } else {
        isNight = true;
        $("#t-" + $("#performance-textbox div:visible")[0].id.slice(2)).css("color", "white");
        // switch the lamp images
        $(this).attr("src", "img/lamp_on.png"); 
        $(this).addClass("lamp-on").removeClass("lamp-off");
        // change everything else
        $("body").css({"background-color": "black",
                        "color": "white"});
        $("#performance-list a").hover(function(){
            $(this).css("color", "white");
        }, function(){
            if ($("#d-" + this.id.slice(2)).is(":visible")) {
                $(this).css("color", "white");
            } else {
                $(this).css("color", "");
            }
        })
    }
})

// set a random performance as active each time
var performances = $("#performance-list a");
var randPerf = $(performances[Math.floor(Math.random()*performances.length)]);
console.log(randPerf[0]);
$("#performance-list a").css("color", "");
$("#performance-textbox div").hide();
$("#d-" + randPerf[0].id.slice(2)).show();
if (isNight) {
    $(randPerf[0]).css("color", "white");
} else {
    $(randPerf[0]).css("color", "black");
}
