var title = "<span id='maintitle'><i>new rituals for living well</i></span>";
var author = "<a class='author' href='/'>kyle barnes</a>"

let md = window.markdownit({html: true});

var width;

$("document").ready(function(){
    width = $(window).width();
    displayText();
    
    if (width < 768) {
        var titleInfoMobileHeight = $("#title-info-mobile").outerHeight();
        $("#right").css("height", `calc(100vh - ${titleInfoMobileHeight}px)`);
    }
});



$("#handle").draggable({
    grid: [50, 50],
    axis: "x",
    containment: "#container",
    zIndex: 100,
    drag: function(event, ui){
        ui.position.left = Math.min(Math.max( 50, ui.position.left ), width - 100);
        let x = ui.position.left + 12.5;

        $("#left").css("width", x);
    }
});

function displayText(){
    $("#title").html(title + "<br>by " + author);
    $("#title-mobile").html(title + "<br>by " + author);


    // get the most recent writing - the first letter-title element in the html
    let date = $(".letter-row").first().attr("data-date");
    // set the spotlight title and date to the most recent writing
    $("#spotlight-title").text($(".letter-row").first().find(".letter-title").text()); 
    $("#spotlight-date").text($(".letter-row").first().find(".letter-date").text());       

    $(".letter-row").first().addClass("active-letter");
    
    $.ajax({
        url: `writing/${date}.md`,
        datatype: "html",
        success: function(markdown){
            let html = md.render(markdown);
            $(`#right`).html(html);
        }
    });
}

// for each element of class letter-title, make it so that on click it loads the writing markdown file that is included in the data-date attribute
$(".letter-row").click(function(){

    // close mobile letters darkened background
    $("#dark-background-mobile").addClass("mobile-none");    
    // change parent element coloring to be highlighted
    $(this).addClass("active-letter");
    // Remove the class from all sibling elements
    $(this).siblings().removeClass("active-letter");

    let date = $(this).attr("data-date");
    let title = $(this).find(".letter-title").text();
    let letterDate = $(this).find(".letter-date").text();

    $("#spotlight-title").text(title);
    $("#spotlight-date").text(letterDate);

    $.ajax({
        url: `writing/${date}.md`,
        datatype: "html",
        success: function(markdown){
            let html = md.render(markdown);
            $(`#right`).html(html);
        }
    });
});

    $('#signup-form').submit(function(event) {
        event.preventDefault();
        var form = $(this);
        var formData = new FormData(form[0]);
        $.ajax({
            url: form.attr('action'),
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function(data) {
                alert('you have been subscribed :) i promise not to spam u');
                form[0].reset(); // Reset the form
            },
        error: function(error) {
            console.error('Error:', error);
        }
    });
});

$(".signup-link").click(function() {
    event.stopPropagation();
    $("#signup-modal").css("display", "block");
    $("#dark-background").css("display", "block");
});

var letterMoreClicked = false;

$(document).click(function(event) {
    // Check if the modal is open and the click is outside of the modal
    if ($("#signup-modal").css("display") !== "none" && !$(event.target).closest("#signup-modal").length) {
        $("#signup-modal").css("display", "none");
        $("#dark-background").css("display", "none");}
    // check if the letters-index has class mobile-none and if not, if the click is outside the letters-index
    if ($("#letters-index").css("display") !== "none" && !$(event.target).closest("#letters-index").length && !$(event.target).closest(".letter-more").length) {
        $("#dark-background-mobile").addClass("mobile-none");
        $("#letters-index").addClass("mobile-none");
    }
});

$(window).resize(function() {
    if ($(window).width() < 768) {
        var titleInfoMobileHeight = $("#title-info-mobile").outerHeight();
        $("#right").css("height", `calc(100vh - ${titleInfoMobileHeight}px)`);
    } else {
        $("#right").css("height", "auto");
    }
}).trigger('resize');

$(".letter-more").click(function() {
    $("#letters-index").removeClass("mobile-none");
    $("#dark-background-mobile").removeClass("mobile-none");
});

$("#letters-index").click(function() {
    if ($(window).width() < 768) {
        $("#letters-index").addClass("mobile-none");
    }
});





