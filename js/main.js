'use strict';
var map;
var markers=[];
var polygon=null;
var dark=false;
var placeRequest={};
var photos_array=[];
//Map style taken from snappy Maps (name:Subtle Grayscale	by Paulo Avila)
var mapstyle = [{"featureType":"administrative","elementType":"all","stylers":[{"saturation":"-100"}]},{"featureType":"administrative.province","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"landscape","elementType":"all","stylers":[{"saturation":-100},{"lightness":65},{"visibility":"on"}]},{"featureType":"poi","elementType":"all","stylers":[{"saturation":-100},{"lightness":"50"},{"visibility":"simplified"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":"-100"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"all","stylers":[{"lightness":"30"}]},{"featureType":"road.local","elementType":"all","stylers":[{"lightness":"40"}]},{"featureType":"transit","elementType":"all","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"water","elementType":"geometry","stylers":[{"hue":"#ffff00"},{"lightness":-25},{"saturation":-97}]},{"featureType":"water","elementType":"labels","stylers":[{"lightness":-25},{"saturation":-100}]}];


function initMap() {
//creating the map using google Maps API
map=new google.maps.Map(document.getElementById('snowmap'),{
 center:{lat:13.030923, lng:80.209050},
 styles:mapstyle,
 zoom:3,
 mapTypeId:'terrain'
});
//call function to add marker to the peaks
addmarkerforpeaks();
//function to duplicate markers to peaks_list object
duplicatemarkers();
getbounds();
// Initialize the drawing manager.
var drawingManager = new google.maps.drawing.DrawingManager({
  drawingMode: google.maps.drawing.OverlayType.POLYGON,
  drawingControl: true,
  drawingControlOptions: {
    position: google.maps.ControlPosition.TOP_LEFT,
    drawingModes: [
      google.maps.drawing.OverlayType.POLYGON
    ]
  }
});
$('.drawing').click(function() {toggleDrawing(drawingManager);});//change to function using Knockout
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
function addmarkerforpeaks(){
for (var i = 0; i < peaks_list.peaks.length; i++) {
  // Get the position from the location array.
  var position = peaks_list.peaks[i].position;
  var title = peaks_list.peaks[i].name;
  //console.log(title,position);
  // Create a marker per location, and put into markers array.
   var marker = new google.maps.Marker({
    position: position,
    title: title,
    map:map,
    icon: 'https://www.distancebetween.us/assets/img/apple-icon-60x60.png',
    animation: google.maps.Animation.DROP,
  });
  // Push the marker to our array of markers.
  markers.push(marker);
}
}
function getbounds(){
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
  var markerswithinpoly=[];
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
  for (var i = 0; i < markerswithinpoly.length; i++) {
    bounds.extend(markerswithinpoly[i].position);
  }
  map.fitBounds(bounds);
}

// This function will loop through the listings and hide them all.
function hidePeaks() {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
}

function duplicatemarkers(){
  for(var i=0;i<markers.length;i++){
    peaks_list.peaks[i].marker=markers[i];
    peaks_list.peaks[i].marker.id=i;
    peaks_list.peaks[i].marker.addListener('click',function(){
      addlistenertoMarkers(this.id);
    });
    }
  }

function addlistenertoMarkers(k){
for(var i=0;i<peaks_list.peaks.length;i++){
  if(peaks_list.peaks[i].marker.id==k){
    locateSelected(peaks_list.peaks[i]);
  }
}
}
