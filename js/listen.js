// testing!

mapboxgl.accessToken = 'pk.eyJ1Ijoia3lsZXR1aHIiLCJhIjoiY20wd3dhM3I5MDZkejJvcTFzNGZmcWUzZSJ9.NHrVgr5CcWXjs2ksCfqE1w';
var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [-73.9752, 40.6914],
    zoom: 12
});

var markers = [];

// Fetch data from Formspree
$.ajax({
    url: 'https://formspree.io/api/0/forms/your_formspree_form_id/submissions', //TODO
    headers: {
        'Authorization': 'Bearer YOUR_FORMSPREE_API_KEY' //TODO
    },
    success: function(response) {
        response.submissions.forEach(function(submission, index) {
            addMarker(submission, index);
            addInfoItem(submission, index);
        });
    },
    error: function(err) {
        console.error('Error fetching data:', err);
    }
});

function addMarker(submission, index) {
    var el = document.createElement('div');
    el.className = 'marker';
    el.style.backgroundColor = 'rgba(255, 0, 0, 0.3)';
    el.style.width = '10px';
    el.style.height = '10px';
    el.style.borderRadius = '50%';

    var marker = new mapboxgl.Marker(el)
        .setLngLat([submission.longitude, submission.latitude])
        .addTo(map);

    markers.push({ marker: marker, index: index });
}

function addInfoItem(submission, index) {
    var infoItem = $('<div>')
        .addClass('info-item')
        .attr('data-index', index)
        .html(`
            <h3>${submission.name}</h3>
            <p><strong>Spot:</strong> ${submission['spot-name']}</p>
            <p><strong>Listens to:</strong> ${submission['listen-to']}</p>
        `)
        .appendTo('#info-section');

    infoItem.hover(
        function() {
            highlightMarker(index, true);
        },
        function() {
            highlightMarker(index, false);
        }
    );
}

function highlightMarker(index, highlight) {
    var marker = markers.find(m => m.index === index).marker;
    var el = marker.getElement();
    el.style.backgroundColor = highlight ? 'rgba(255, 0, 0, 0.8)' : 'rgba(255, 0, 0, 0.3)';
    el.style.width = highlight ? '15px' : '10px';
    el.style.height = highlight ? '15px' : '10px';
}