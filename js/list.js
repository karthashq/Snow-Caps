//'use strict';
//the list of the highest peaks in Asia
var peaks_list={
	"peaks": [{
		"name": "Lhotse",
		"position": {
			"lat": 27.9626373,
			"lng": 86.93361499999992
		}
	}, {
		"name": "Kangchenjunga",
		"position": {
			"lat": 27.7024914,
			"lng": 88.14753500000006
		}
	}, {
		"name": "Mt Everest",
		"position": {
			"lat": 27.98785,
			"lng": 86.92502609999997
		}
	}, {
		"name": "Gyachung Kang",
		"position": {
			"lat": 28.098056,
			"lng": 86.74222199999997
		}
	}, {
		"name": "Annapurna",
		"position": {
			"lat": 28.596111,
			"lng": 83.82027800000003
		}
	}, {
		"name": "Nanga Parbat",
		"position": {
			"lat": 35.2375038,
			"lng": 74.58914460000005
		}
	}, {
		"name": "Manaslu",
		"position": {
			"lat": 28.5497107,
			"lng": 84.55967680000003
		}
	}, {
		"name": "Cho Oyu",
		"position": {
			"lat": 28.0972891,
			"lng": 86.65847499999995
		}
	}, {
		"name": "K2 Glacier",
		"position": {
			"lat": 35.8187277,
			"lng": 76.51371070000005
		}
	}, {
		"name": "Dhaulagiri I",
		"position": {
			"lat": 28.6966666,
			"lng": 83.49416659999997
		}
	}, {
		"name": "Makalu",
		"position": {
			"lat": 27.8860217,
			"lng": 87.09118910000007
		}
	},{
	"name": "Chomo Lonzo",
	"position": {
		"lat": 27.9308333,
		"lng": 87.10833330000003
	}
}, {
	"name": "Batura Sar",
	"position": {
		"lat": 36.51,
		"lng": 74.52333329999999
	}
}, {
	"name": "Kanjut Sar I",
	"position": {
		"lat": 36.2058333,
		"lng": 75.41666659999999
	}
}, {
	"name": "Saltoro Kangri",
	"position": {
		"lat": 35.3995801,
		"lng": 76.8462968
	}
}, {
	"name": "Namcha Barwa",
	"position": {
		"lat": 29.6316666,
		"lng": 95.05499989999998
	}
}, {
	"name": "Tirich Mir",
	"position": {
		"lat": 36.255,
		"lng": 71.84083329999999
	}
}, {
	"name": "Kamet",
	"position": {
		"lat": 30.9198246,
		"lng": 79.59028239999998
	}
}, {
	"name": "Dhaulagiri II",
	"position": {
		"lat": 28.7633333,
		"lng": 83.3883333
	}
}, {
	"name": "Rakaposhi",
	"position": {
		"lat": 36.1433269,
		"lng": 74.48985679999998
	}
}, {
	"name": "Kumbhakarna",
	"position": {
		"lat": 27.6816666,
		"lng": 88.04416659999993
	}
},{
	"name": "Gyachung Kang",
	"position": {
		"lat": 28.098056,
		"lng": 86.74222199999997
	}
}, {
	"name": "Chogolisa",
	"position": {
		"lat": 35.6133333,
		"lng": 76.57500000000005
	}
}, {
	"name": "Gasherbrum I, Kashgar",
	"position": {
		"lat": 35.7192731,
		"lng": 76.7105636
	}
}, {
	"name": "Gasherbrum III",
	"position": {
		"lat": 35.7602778,
		"lng": 76.64555559999997
	}
}, {
	"name": "Dhaulagiri",
	"position": {
		"lat": 28.6984652,
		"lng": 83.48734960000002
	}
}, {
	"name": "Naimona'nyi",
	"position": {
		"lat": 30.4,
		"lng": 81.29999999999995
	}
}, {
	"name": "Broad Peak",
	"position": {
		"lat": 35.8107486,
		"lng": 76.5680122
	}
}, {
	"name": "Xixiabangma Peak",
	"position": {
		"lat": 28.3525,
		"lng": 85.77916660000005
	}
}, {
	"name": "Saser Kangri",
	"position": {
		"lat": 34.8672222,
		"lng": 77.7511111
	}
}, {
	"name": "Gasherbrum II",
	"position": {
		"lat": 35.7575,
		"lng": 76.65416660000005
	}
},{
	"name": "Gasherbrum III",
	"position": {
		"lat": 35.7602778,
		"lng": 76.64555559999997
	}
}, {
	"name": "Masherbrum",
	"position": {
		"lat": 35.6420154,
		"lng": 76.30620180000005
	}
}, {
	"name": "Nuptse",
	"position": {
		"lat": 27.9672192,
		"lng": 86.88553909999996
	}
}, {
	"name": "Annapurna II",
	"position": {
		"lat": 28.535,
		"lng": 84.12249989999998
	}
}, {
	"name": "Disteghil Sar",
	"position": {
		"lat": 36.3258333,
		"lng": 75.18833330000007
	}
}, {
	"name": "Himalchuli",
	"position": {
		"lat": 28.4366666,
		"lng": 84.63999999999999
	}
}, {
	"name": "Gasherbrum IV",
	"position": {
		"lat": 35.7602778,
		"lng": 76.61694439999997
	}
}, {
	"name": "Kunyang Chhish",
	"position": {
		"lat": 36.2049642,
		"lng": 75.20652960000007
	}
}]
};

 ko.applyBindings(peaks_list);


 //function to switch theme of the map
 function switchTheme(){
 if(!dark){
   dark=true;
 mapstyle=[{"featureType":"all","elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#000000"},{"lightness":40}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#000000"},{"lightness":16}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":17},{"weight":1.2}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":20}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":21}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#000000"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#000000"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":16}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":19}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#000000"},{"lightness":17}]}];
 map.setOptions({styles: mapstyle});
 }else{
   dark=false;
   mapstyle=[{"featureType":"administrative","elementType":"all","stylers":[{"saturation":"-100"}]},{"featureType":"administrative.province","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"landscape","elementType":"all","stylers":[{"saturation":-100},{"lightness":65},{"visibility":"on"}]},{"featureType":"poi","elementType":"all","stylers":[{"saturation":-100},{"lightness":"50"},{"visibility":"simplified"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":"-100"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"all","stylers":[{"lightness":"30"}]},{"featureType":"road.local","elementType":"all","stylers":[{"lightness":"40"}]},{"featureType":"transit","elementType":"all","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"water","elementType":"geometry","stylers":[{"hue":"#ffff00"},{"lightness":-25},{"saturation":-97}]},{"featureType":"water","elementType":"labels","stylers":[{"lightness":-25},{"saturation":-100}]}];
   map.setOptions({styles: mapstyle});
 }
 }

//function to reset the markers and position the map accordingly.
function resetPeaks(){
  for (var i = 0; i < markers.length; i++) {
markers[i].setMap(map);
  }
  getbounds();
}
//function to highlight the selected peak from list
function locateSelected(peakSelected){
	console.log(peakSelected);
      map.setCenter(peakSelected.position);
      map.setZoom(9);
      for(var i=0;i<peaks_list.peaks.length;i++){
        //to remove animation for previously selected peak.
        peaks_list.peaks[i].marker.setAnimation(null);
      }
      peakSelected.marker.setAnimation(google.maps.Animation.BOUNCE);
      //map.setOptions({ mapTypeId:'hybrid'});
placeRequest={
	location:peakSelected.position,
	radius:30
};
placeSearch(placeRequest,peakSelected);
}
//function to call the place request everytime the infowindow is opened.
function placeSearch(request,peakSelected){
	service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, callback);
function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
		//console.log(results);
	service.getDetails({
		placeId: results[0].place_id
	}, function(place, status) {
		if (status === google.maps.places.PlacesServiceStatus.OK) {
			for(var i=0;i<place.photos.length;i++){
			photos_array[i]=place.photos[i].getUrl({'maxWidth': 300, 'maxHeight': 300});
		}
		var img='<img src='+photos_array[4]+' alt="image">'
		var peakInfo = new google.maps.InfoWindow({
			Content:'<h1>'+peakSelected.name+'</h1><hr>'+img
		});
		peakInfo.open(map, peakSelected.marker);
	}else{
			console.log(status);
		}
});
}else{
	console.log(status);
	var peakInfo = new google.maps.InfoWindow({
		Content:'sorry,No results were obtained form the google places API :(<br><strong>'+status+'</strong>'
	});
	peakInfo.open(map, peakSelected.marker);
}
}
}
