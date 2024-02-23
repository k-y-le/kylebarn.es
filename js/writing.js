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
    // Find the parent element and change its background to black and text color to white
    $(this).css({
        "background-color": "#1d3557",
        "color": "#fefae0"
    });
    // Find all other parent elements and change their background to white and text color to black
    $(this).siblings().css({
        "background-color": "#fefae0",
        "color": "#1d3557"
    });
    // still allow hovering of each other element

    // Add hover effect to siblings
    $(this).siblings().hover(function() {
        $(this).css({
            "background-color": "#1d3557",
            "color": "#fefae0",
            "cursor": "pointer"
        });
    }, function() {
        $(this).css({
            "background-color": "#fefae0",
            "color": "#1d3557",
            "cursor": "default"
        });
    });

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