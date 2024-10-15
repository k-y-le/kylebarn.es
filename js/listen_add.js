
mapboxgl.accessToken = 'pk.eyJ1Ijoia3lsZXR1aHIiLCJhIjoiY20wd3dhM3I5MDZkejJvcTFzNGZmcWUzZSJ9.NHrVgr5CcWXjs2ksCfqE1w';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-73.9752, 40.6914],
    zoom: 12
});

var marker = new mapboxgl.Marker({
    draggable: true
});

map.on('click', function(e) {
    marker.setLngLat(e.lngLat).addTo(map);
    $('#latitude').val(e.lngLat.lat);
    $('#longitude').val(e.lngLat.lng);
});

marker.on('dragend', function() {
    var lngLat = marker.getLngLat();
    $('#latitude').val(lngLat.lat);
    $('#longitude').val(lngLat.lng);
});

$('#location-form').submit(function(e) {
    e.preventDefault();
    $.ajax({
        url: $(this).attr('action'),
        method: 'POST',
        data: $(this).serialize(),
        dataType: 'json',
        success: function(response) {
            alert('Form submitted successfully!');
            window.location.href = 'visualization.html';
        },
        error: function(err) {
            alert('An error occurred. Please try again.');
        }
    });
});