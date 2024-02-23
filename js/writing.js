var title = "<span id='maintitle'><i>new rituals for living well</i></span>";
var author = "<a class='author' href='/'>kyle barnes</a>"

let md = window.markdownit({html: true});

var width;

$("document").ready(function(){
    width = $(window).width();
    displayText();
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

    // get the most recent writing - the first letter-title element in the html
    let date = $(".letter-row").first().attr("data-date");
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
    
    // change parent element coloring to be highlighted
    $(this).addClass("active-letter");
    // Remove the class from all sibling elements
    $(this).siblings().removeClass("active-letter");

    // still allow hovering of each other element

    // Add hover effect to siblings
    // $(this).siblings().hover(function() {
    //     $(this).css({
    //         "background-color": "#1d3557",
    //         "color": "#fefae0",
    //         "cursor": "pointer"
    //     });
    // }, function() {
    //     $(this).css({
    //         "background-color": "#fefae0",
    //         "color": "#1d3557",
    //         "cursor": "default"
    //     });
    // });

    let date = $(this).attr("data-date");
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

$(document).click(function(event) {
    // Check if the modal is open and the click is outside of the modal
    if ($("#signup-modal").css("display") !== "none" && !$(event.target).closest("#signup-modal").length) {
        $("#signup-modal").css("display", "none");
        $("#dark-background").css("display", "none");}
});
 

