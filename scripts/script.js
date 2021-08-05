function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
    center: {
      lat: 32.073582,
      lng: 34.788052
    },
    zoom: 15,
    mapTypeId: 'hybrid',
  });
}

initMap();