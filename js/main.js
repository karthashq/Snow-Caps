// TODO: Add carousel for images in infowindow
// TODO: make it responsive for mobile
// TODO: use a API to display weather
// TODO: use places API to show trekking routes around a peak.
var map;
var markers = [];
var polygon = null;
var dark = false;
var placeRequest = {};
var photos_array = [];
var peakInfo;
var drawingManager;

function initMap() {
   //creating the map using google Maps API
   map = new google.maps.Map(document.getElementById('snowmap'), {
      center: {
         lat: 13.030923,
         lng: 80.209050
      },
      styles: mapstyle1,
      zoom: 3,
      mapTypeId: 'terrain',
      mapTypeControl: false
   });
   peakInfo = new google.maps.InfoWindow();
   //call function to add marker to the peaks
   addmarkerforpeaks();
   //function to duplicate markers to snowCaps object
   duplicatemarkers();
   getbounds();
   // Initialize the drawing manager.
   drawingManager = new google.maps.drawing.DrawingManager({
      drawingMode: google.maps.drawing.OverlayType.POLYGON,
      drawingControl: true,
      drawingControlOptions: {
         position: google.maps.ControlPosition.TOP_LEFT,
         drawingModes: [
            google.maps.drawing.OverlayType.POLYGON
         ]
      }
   });
   // Add an event listener so that the polygon is captured,  call the
   // searchWithinPolygon function. This will show the markers in the polygon
   // and hide any outside of it.
   drawingManager.addListener('overlaycomplete', function(event) {
      // First, check if there is an existing polygon.
      // If there is, get rid of it and remove the markers
      if (polygon) {
         polygon.setMap(null);
         hidePeaks(markers);
      }
      // Switching the drawing mode to the HAND (i.e., no longer drawing).
      drawingManager.setDrawingMode(null);
      // Creating a new editable polygon from the overlay.
      polygon = event.overlay;
      polygon.setEditable(true);
      // Searching within the polygon.
      searchWithinPolygon();
      // Make sure the search is re-done if the poly is changed.
      polygon.getPath().addListener('set_at', searchWithinPolygon);
      polygon.getPath().addListener('insert_at', searchWithinPolygon);
   });
}
// The following group uses the location array to create an array of markers on initialize.
function addmarkerforpeaks() {
   for (var i = 0; i < snowCaps.peaks.length; i++) {
      // Get the position from the location array.
      var position = snowCaps.peaks[i].position;
      var title = snowCaps.peaks[i].name;
      //console.log(title,position);
      // Create a marker per location, and put into markers array.
      var marker = new google.maps.Marker({
         position: position,
         title: title,
         map: map,
         icon: 'https://www.distancebetween.us/assets/img/apple-icon-60x60.png',
         animation: google.maps.Animation.DROP,
      });
      // Push the marker to our array of markers.
      markers.push(marker);
   }
}

function getbounds() {
   var bounds = new google.maps.LatLngBounds();
   // Extend the boundaries of the map for each marker and display the marker
   for (var i = 0; i < markers.length; i++) {
      bounds.extend(markers[i].position);
   }
   map.fitBounds(bounds);
}
// This shows and hides (respectively) the drawing options.
function toggleDrawing(drawingManager) {
   if (drawingManager.map) {
      drawingManager.setMap(null);
      // In case the user drew anything, get rid of the polygon
      if (polygon !== null) {
         polygon.setMap(null);
      }
   } else {
      drawingManager.setMap(map);
   }
}
// This function hides all markers outside the polygon,
// and shows only the ones within it. This is so that the
// user can specify an exact area of search.
function searchWithinPolygon() {
   var markerswithinpoly = [];
   for (var i = 0; i < markers.length; i++) {
      if (google.maps.geometry.poly.containsLocation(markers[i].position, polygon)) {
         markerswithinpoly.push(markers[i]);
         markers[i].setMap(map);
      } else {
         markers[i].setMap(null);
      }
   }
   // Extend the boundaries of the map for each marker within the polygon
   var bounds = new google.maps.LatLngBounds();
   for (var l = 0; l < markerswithinpoly.length; l++) {
      bounds.extend(markerswithinpoly[l].position);
   }
   map.fitBounds(bounds);
}
// This function will loop through the listings and hide them all.
function hidePeaks() {
   for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
   }
}
//this function creates a copy of all the markers to the snowCaps oject.
function duplicatemarkers() {
   var tempmarker;
   for (var i = 0; i < markers.length; i++) {
      snowCaps.peaks[i].marker = markers[i];
      snowCaps.peaks[i].marker.id = i;
      tempmarker = snowCaps.peaks[i].marker;
      listenertoMarker(tempmarker);
   }
   //created this function in order to avoid "Don't make functions within a loop. - jslint error"
   function listenertoMarker(tempmarker) {
      tempmarker.addListener('click', function() {
         addlistenertoMarkers(this.id);
      });
   }
}
//this function adds event listener to the markers.
function addlistenertoMarkers(k) {
   for (var i = 0; i < snowCaps.peaks.length; i++) {
      if (snowCaps.peaks[i].marker.id == k) {
         locateSelected(snowCaps.peaks[i]);
      }
   }
}
//to toggle the sidebar on clicking the hamburger icon
function togglesidebar() {
   $('#sidebar').toggleClass('active');
}