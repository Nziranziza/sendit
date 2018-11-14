function initMap() {
    // The location of kigali
    var uluru = {lat: -1.9706, lng: 30.1044};
    // The map, centered at Uluru
    var map = new google.maps.Map(document.getElementById('map'), {zoom: 10, center: uluru});
   // The marker, positioned at Uluru
    var marker = new google.maps.Marker({position: uluru, map: map});
    }