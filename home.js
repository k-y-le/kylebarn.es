
$(".home-click").hover(function(e){
    e.stopPropagation();
    $("#home-text").attr("src", "img/text_" + this.id + ".png"); 
}, function(){
    $("#home-text").attr("src", "img/text_kyle.png"); 
})

$(".home-click").click(function(e){
    e.stopPropagation();
    $("#home-text").attr("src", "img/text_" + this.id + ".png");
    $(".info-box").hide();
    $(".more-info-" + this.id).show();
})
$("body").click(function(){
    $('.info-box').hide();
})