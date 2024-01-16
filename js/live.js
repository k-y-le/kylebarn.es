let sounds = [
    {
        "file": "1305_emails.mp3",
        "date": "august 25, 2023",
        "description": "writing some emails",
        "start": 1305
    },
    {
        "file": "1316_bathroom.mp3",
        "date": "august 24, 2023",
        "description": "going to the bathroom",
        "start": 1316
    },
    {
        "file": "1319_snacking.mp3",
        "date": "august 25, 2023",
        "description": "snacking on some plantain chips",
        "start": 1319
    },
    {
        "file": "1329_call.mp3",
        "date": "august 25, 2023",
        "description": "on a work call talking about glaciers",
        "start": 1329
    },
    {
        "file": "1357_dishes.mp3",
        "date": "august 24, 2023",
        "description": "doing the dishes",
        "start": 1357
    },
    {
        "file": "1407_internet.mp3",
        "date": "august 25, 2023",
        "description": "browsing the internet",
        "start": 1407
    },
];
$(document).click(function() {
    $("#landing-page").hide();
});
let currentDateTime = new Date();
let startTime = currentDateTime.getHours() + "" + currentDateTime.getMinutes();
let startTimeArr = sounds.map(({ start }) => start);

let startSound = sounds.find(o => o.start === closest(startTimeArr, startTime));
$("#description").text(startSound.description);
$("#date").text(startSound.date);

// check if it's time for the next sound

// find the nearest (lower than current number) time in list in order to start the correct sound
function closest(arr, start){

    var closest = Math.min.apply(null, arr); //Get the lowest number in arr in case it match nothing.

    for (var i = 0; i < arr.length; i++){ //Loop the array
        console.log(arr);
        if (arr[i] <= parseInt(start) && arr[i] > closest) {
            closest = arr[i]; //Check if it's lower than your number, but higher than your closest value
        } else {
            return closest;
        }
    }

    return closest; // return the value
}

function updateTime () { 
    currentDateTime = new Date();

    hours = ('0'+currentDateTime.getHours()).slice(-2);
    mins = ('0'+currentDateTime.getMinutes()).slice(-2);
    secs = ('0'+currentDateTime.getSeconds()).slice(-2);
  
    let formattedTime = hours + ":" + mins + ":" + secs;
  
    $('#time').html(formattedTime)
}
  
setInterval(updateTime, 1000);