// when link is clicked -> change text from visible to invisible or vice versa
console.log("testing js file loaded");
$(".main-text").on('click', function(event){
    event.stopPropagation();
    event.stopImmediatePropagation();
    $("#subtext-" + this.id[this.id.length - 1]).toggle();
});
// change the background color each time gif goes through iteration