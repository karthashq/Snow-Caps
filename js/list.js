//function to switch style of the map between dark and bright themes.
function switchTheme() {
   if (!dark) {
      dark = true;
      map.setOptions({
         styles: mapstyle2
      });
   } else {
      dark = false;
      map.setOptions({
         styles: mapstyle1
      });
   }
}
//function to reset the markers and position the map accordingly.
function resetPeaks() {
   for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(map);
   }
   getbounds();
}
//this function is called whenever a peak name is selected from the list
//or the corresponding marker is clicked.
function locateSelected(peakSelected) {
   //hide the side bar once the peak is clicked
   if ($('#sidebar').hasClass("active")) {
      togglesidebar();
   }
   //function to highlight the selected peak from list
   if (peakInfo.marker != peakSelected.marker) {
      peakInfo.close();
   }
   //set the  position of the peak selected as the map center
   //and zoom to the marker .
   map.setCenter(peakSelected.position);
   map.setZoom(9);
   for (var i = 0; i < snowCaps.peaks.length; i++) {
      //to remove animation for previously selected peak.
      snowCaps.peaks[i].marker.setAnimation(null);
   }
   peakSelected.marker.setAnimation(google.maps.Animation.BOUNCE);
   //map.setOptions({ mapTypeId:'hybrid'});
   //object to be passed to the google place search API.
   placeRequest = {
      location: peakSelected.position,
      radius: 5
   };
   //console.log(peakSelected.position);
   //call the function to get info from the wikipedia,google places and streetview APIs.
   InfofromWiki(peakSelected);
   placeSearch(placeRequest, peakSelected);
   StreetView(peakSelected);
   displayLocationElevation(peakSelected);
}
//this functions makes a request to obtain the wikipedia info on the selected Peak.
function InfofromWiki(location) {
   var wikiurl = "https://en.wikipedia.org/w/api.php?action=opensearch&search=" + location.name + "&format=json&callback=wikiCallback";
   var wikilinks = '';
   var wikilist = '';
   $.ajax(wikiurl, {
      dataType: "jsonp",
      jsonp: "callback",
      success: function(response) {
         console.log(response);
         wikilist = response[1][0];
         wikilinks = response[3][0];
         var wikiinfo = response[2][0];
         peakInfo.setContent('<h3>' + location.name + '</h3><p style="font-size:17px">' +
            wikiinfo + '(<a href=' + wikilinks + '>Click here</a> for more about this place in wiki.).</p><br>' +
            '<button type="button" class="btn  btn-modal" data-toggle="modal" data-target="#myModal">Experience It!</button>'
         );
         peakInfo.open(map, location.marker);
         //sets the modal name to that of the selected peak.
         modalTitle(location.name);
         modalWikiInfo('<p style="font-size:17px">' +
            wikiinfo + '(<a href=' + wikilinks + '>Click here</a> to read more from wiki.).</p>');
      },
      error: function(jqXHR) {
         //console.log(jqXHR);
         peakInfo.setContent("Something is wrong<br><strong>" + jqXHR.status + "</strong>:" + jqXHR.statusText);
         peakInfo.open(map, location.marker);
      }
   });
}
//this function first call the place search API and then from the place ID obtained it calls the place details API.
function placeSearch(request, peakSelected) {
   //function to call the place request everytime the infowindow is opened.
   var temp = peakSelected.marker.id;
   var service = new google.maps.places.PlacesService(map);
   service.nearbySearch(request, callback);

   function callback(results, status) {
      //console.log(results);
      //resets the value of the photos_array every time a peak is selected.
      snowCaps.peaks[temp].photos_array = [];
      if (status == google.maps.places.PlacesServiceStatus.OK) {
         //this loop is to request the place details of all the results obtained.
         for (var o = 0; o < results.length; o++) {
            DetailServices(service, results, o, peakSelected);
         }
      } else {
         carouselInner('<div class="item active">' +
            '<img class="carousel-img" src="icons/mountain-thumb.jpg" alt="mountain thumbnail" />' +
            '</div>' + 'sorry,No results were obtained form the google places API for ' +
            peakSelected.name + ':(<br>Status:<strong>' +
            status + '</strong>');
         imgBadge(snowCaps.peaks[temp].photos_array.length);
      }
   }
}
//created this function in order to avoid "Don't make functions within a loop. - jslint error"
function DetailServices(service, results, o, peakSelected) {
   var temp = peakSelected.marker.id;
   service.getDetails({
      placeId: results[o].place_id
   }, function(place, status) {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
         for (var p = 0; p < place.photos.length; p++) {
            snowCaps.peaks[temp].photos_array.push(place.photos[p].getUrl({
               'maxWidth': 500,
               'maxHeight': 500
            }));
         }
         //add the appropriate content to the modal.
         imgBadge(snowCaps.peaks[temp].photos_array.length);
         carouselInner('<div class="item active">' +
            '<img class="carousel-img" src="icons\\mountain-thumb.jpg" alt="mountain thumbnail" />' +
            '</div>');
         //this loop adds the images obtained from the place details API to the
         //modal carousel.
         for (var i = 0; i < snowCaps.peaks[temp].photos_array.length; i++) {
            var imagelink = snowCaps.peaks[temp].photos_array[i];
            carouselInner(carouselInner() + '<div class="item">' +
               '<img class="carousel-img" src=' + imagelink + ' alt="pic' + i + '"></div>');
         }
         carouselInner(carouselInner() + '<div class="carousel-caption"><h4>' + peakSelected.name + '</h4></div>');
      } else {
         alert("Something went wrong.No Place details obtained.<br>" + status);
      }
   });
}
//this function calls the google StreetViewService.
function StreetView(peakSelected) {
   var streetViewService = new google.maps.StreetViewService();
   var radius = 300;
   // In case the status is OK, which means the pano was found, compute the
   // position of the streetview image, then calculate the heading, then get a
   // panorama from that and set the options
   function getStreetView(data, status) {
      if (status == google.maps.StreetViewStatus.OK) {
         var nearStreetViewLocation = data.location.latLng;
         var heading = google.maps.geometry.spherical.computeHeading(
            nearStreetViewLocation, peakSelected.marker.position);
         pano("");
         var panoramaOptions = {
            position: nearStreetViewLocation,
            pov: {
               heading: heading,
               pitch: 30
            }
         };
         var panorama = new google.maps.StreetViewPanorama(
            document.getElementById('pano'), panoramaOptions);
      } else {
         pano('<div>No Street View Found at ' + peakSelected.marker.title +
            '</div><br>status:' + status);
      }
   }
   // Use streetview service to get the closest streetview image within
   // 50 meters of the markers position
   streetViewService.getPanoramaByLocation(peakSelected.position, radius, getStreetView);
}
//this function calls the ElevationService to get the
//elevation of the peaks.
function displayLocationElevation(peakSelected) {
   var elevator = new google.maps.ElevationService();
   // Initiate the location request
   elevator.getElevationForLocations({
      'locations': [peakSelected.marker.position]
   }, function(results, status) {
      var elev;
      if (status === 'OK') {
         // Retrieve the first result
         if (results[0]) {
            // Open the infowindow indicating the elevation at the clicked position.
            elev = results[0].elevation + 'm';
            modalPeakElevation("<strong>Elevation</strong>: " + elev);
         } else {
            modalPeakElevation('No results found');
         }
      } else {
         modalPeakElevation('Elevation service failed due to: ' + status);
      }
   });
}
// viewmodel
var ViewModel = function() {
   this.search = ko.observable("");
   this.place = ko.computed(function() {
      var peaklist = [];
      for (var i = 0; i < snowCaps.peaks.length; i++) {
         peaklist.push(snowCaps.peaks[i]);
      }
      return peaklist;
   });
   //this filters the total list and markers based upon user input
   this.peaklist = ko.computed(function() {
      var check = [];
      var i;
      for (i = 0; i < this.place().length; i++) {
         check.push(this.place()[i]);
      }
      if (this.search().length > 0) {
         var k = this.search();
         var result = [];
         for (i = 0; i < check.length; i++) {
            if (check[i].name.includes(this.search())) {
               result.push(check[i]);
               check[i].marker.setMap(map);
            } else {
               check[i].marker.setMap(null);
            }
         }
         return result;
      } else {
         for (i = 0; i < markers.length; i++) {
            markers[i].setMap(map);
         }
         return this.place();
      }
   }, this);
   this.modalTitle = ko.observable();
   this.modalWikiInfo = ko.observable();
   this.modalPeakElevation = ko.observable();
   this.imgBadge = ko.observable();
   this.pano = ko.observable();
   this.carouselInner = ko.observable('<div class="item active">' +
      '<img class="carousel-img" src="icons/mountain-thumb.jpg"' +
      'alt="mountain thumbnail" /></div>');
};
ko.applyBindings(ViewModel);