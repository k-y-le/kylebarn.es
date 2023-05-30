// when link is clicked -> change text from visible to invisible or vice versa
$(".main-text").on('click', function(event){
    event.stopPropagation();
    event.stopImmediatePropagation();
    $("#subtext-" + this.id[this.id.length - 1]).toggle();
});
// change the background color each time gif goes through iteration
var bgColors = ["#FA9A44", "#2F9571", "#F6394D", "#FAC526", "#3981B6"];
var i = 0;
var intervalId = window.setInterval(function(){
    $("body").css("background-color", bgColors[i]);
    i < 4 ? i++ : i=0;
  }, 9600);