
// Initialize and add the map
function initMap() {
   // The location of Uluru
   const uluru = { lat: 47.087284015437874, lng: 37.544009235631954 };
   // The map, centered at Uluru
   const map = new google.maps.Map(document.getElementById("map"), {
      zoom: 16,
      center: uluru,
      styles: [
         {
            "featureType": "administrative",
            "elementType": "labels.text.fill",
            "stylers": [
               {
                  "color": "#536e7f"
               }
            ]
         },
         {
            "featureType": "administrative",
            "elementType": "labels.text.stroke",
            "stylers": [
               {
                  "color": "#ffffff"
               }
            ]
         },
         {
            "featureType": "landscape",
            "elementType": "geometry.fill",
            "stylers": [
               {
                  "color": "#282828"
               }
            ]
         },
         {
            "featureType": "poi",
            "elementType": "geometry.fill",
            "stylers": [
               {
                  "color": "#424242"
               }
            ]
         },
         {
            "featureType": "poi",
            "elementType": "labels.text.fill",
            "stylers": [
               {
                  "color": "#424242"
               }
            ]
         },
         {
            "featureType": "poi",
            "elementType": "labels.text.stroke",
            "stylers": [
               {
                  "color": "#ffffff"
               }
            ]
         },
         {
            "featureType": "road",
            "elementType": "geometry.fill",
            "stylers": [
               {
                  "color": "#424242"
               }
            ]
         },
         {
            "featureType": "road",
            "elementType": "labels.text.fill",
            "stylers": [
               {
                  "color": "#424242"
               }
            ]
         },
         {
            "featureType": "road",
            "elementType": "labels.text.stroke",
            "stylers": [
               {
                  "color": "#ffffff"
               }
            ]
         },
         {
            "featureType": "water",
            "elementType": "geometry.fill",
            "stylers": [
               {
                  "color": "#536e7f"
               }
            ]
         }
      ]
   });
   // The marker, positioned at Uluru
   const marker = new google.maps.Marker({
      position: uluru,
      map: map,
      icon: 'CSa.png',
      title: 'Creative Digital Agencies'
   });
}

//= scripts.js