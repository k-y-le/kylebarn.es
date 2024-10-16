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

    // Function to get query parameters
    function getUrlParameter(sParam) {
        var sPageURL = window.location.search.substring(1),
            sURLVariables = sPageURL.split('&'),
            sParameterName;
            
        for (var i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
            }
        }
        return false;
    }

    // Get the 'date' query parameter from the URL
    var newsletterDate = getUrlParameter('date');

    if (newsletterDate) {
        // Find the div with the matching data-date attribute
        var $newsletterDiv = $('.letter-row[data-date="' + newsletterDate + '"]');
        
        if ($newsletterDiv.length) {
            // Simulate loading the corresponding newsletter markdown
            loadSpecificNewsletter(newsletterDate);
        }
    }

    // Click event to update the URL and load the newsletter
    $('.letter-row').on('click', function () {
        var date = $(this).data('date');
        // Update the URL to include the date parameter
        history.pushState(null, null, '?date=' + date);
        loadNewsletter(date);
    });
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

function loadSpecificNewsletter(date) {
    let $element = $(`.letter-row[data-date="${date}"]`);
    if ($element.length) {
        loadNewsletterContent($element);
    } else {
        console.error("Newsletter not found for date:", date);
    }
}

// for each element of class letter-title, make it so that on click it loads the writing markdown file that is included in the data-date attribute
function loadNewsletterContent(element) {
    // close mobile letters darkened background
    $("#dark-background-mobile").addClass("mobile-none");

    // change parent element coloring to be highlighted
    $(element).addClass("active-letter");

    // Remove the class from all sibling elements
    $(element).siblings().removeClass("active-letter");

    // Get necessary data from the clicked element
    let date = $(element).attr("data-date");
    let title = $(element).find(".letter-title").text();
    let letterDate = $(element).find(".letter-date").text();

    // Update the spotlight with the title and date
    $("#spotlight-title").text(title);
    $("#spotlight-date").text(letterDate);

    // Fetch the markdown content and render it into HTML
    $.ajax({
        url: `writing/${date}.md`,
        datatype: "html",
        success: function(markdown){
            let html = md.render(markdown); // Assuming `md.render` is the markdown renderer
            $(`#right`).html(html); // Inject rendered HTML into #right
        }
    });
}

// Apply the function to each letter row on click
$(".letter-row").click(function() {
    loadNewsletterContent(this);
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





