
var google = google || {};

var app = (function () {

    var container = window.document.getElementById("map");
    var position = {
        lat: 0,
        lng: 0
    };
    var map;
    var marker;
    var styleMap = [
        {
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#ebe3cd"
      }
    ]
  },
        {
            "elementType": "labels.text",
            "stylers": [
                {
                    "saturation": 10
      },
                {
                    "lightness": 5
      },
                {
                    "weight": 1.5
      }
    ]
  },
        {
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#523735"
      }
    ]
  },
        {
            "elementType": "labels.text.stroke",
            "stylers": [
                {
                    "color": "#f5f1e6"
      }
    ]
  },
        {
            "featureType": "administrative",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#c9b2a6"
      }
    ]
  },
        {
            "featureType": "administrative.country",
            "stylers": [
                {
                    "visibility": "on"
      }
    ]
  },
        {
            "featureType": "administrative.land_parcel",
            "stylers": [
                {
                    "visibility": "off"
      }
    ]
  },
        {
            "featureType": "administrative.land_parcel",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#dcd2be"
      }
    ]
  },
        {
            "featureType": "administrative.land_parcel",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#ae9e90"
      }
    ]
  },
        {
            "featureType": "administrative.neighborhood",
            "stylers": [
                {
                    "visibility": "off"
      }
    ]
  },
        {
            "featureType": "landscape.natural",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#dfd2ae"
      }
    ]
  },
        {
            "featureType": "landscape.natural.landcover",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#f248bb"
      }
    ]
  },
        {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#dfd2ae"
      }
    ]
  },
        {
            "featureType": "poi",
            "elementType": "labels.text",
            "stylers": [
                {
                    "visibility": "off"
      }
    ]
  },
        {
            "featureType": "poi",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#93817c"
      }
    ]
  },
        {
            "featureType": "poi.business",
            "stylers": [
                {
                    "visibility": "off"
      }
    ]
  },
        {
            "featureType": "poi.medical",
            "elementType": "labels.text",
            "stylers": [
                {
                    "color": "#3efd47"
      }
    ]
  },
        {
            "featureType": "poi.park",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#a5b076"
      }
    ]
  },
        {
            "featureType": "poi.park",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#447530"
      }
    ]
  },
        {
            "featureType": "road",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#f5f1e6"
      }
    ]
  },
        {
            "featureType": "road",
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "off"
      }
    ]
  },
        {
            "featureType": "road",
            "elementType": "labels.icon",
            "stylers": [
                {
                    "visibility": "off"
      }
    ]
  },
        {
            "featureType": "road.arterial",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#fdfcf8"
      }
    ]
  },
        {
            "featureType": "road.arterial",
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "off"
      }
    ]
  },
        {
            "featureType": "road.highway",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#f8c967"
      }
    ]
  },
        {
            "featureType": "road.highway",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#e9bc62"
      }
    ]
  },
        {
            "featureType": "road.highway",
            "elementType": "labels",
            "stylers": [
                {
                    "visibility": "off"
      }
    ]
  },
        {
            "featureType": "road.highway.controlled_access",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#e98d58"
      }
    ]
  },
        {
            "featureType": "road.highway.controlled_access",
            "elementType": "geometry.stroke",
            "stylers": [
                {
                    "color": "#db8555"
      }
    ]
  },
        {
            "featureType": "road.local",
            "stylers": [
                {
                    "visibility": "off"
      }
    ]
  },
        {
            "featureType": "road.local",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#806b63"
      }
    ]
  },
        {
            "featureType": "transit",
            "stylers": [
                {
                    "visibility": "off"
      }
    ]
  },
        {
            "featureType": "transit.line",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#dfd2ae"
      }
    ]
  },
        {
            "featureType": "transit.line",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#8f7d77"
      }
    ]
  },
        {
            "featureType": "transit.line",
            "elementType": "labels.text.stroke",
            "stylers": [
                {
                    "color": "#ebe3cd"
      }
    ]
  },
        {
            "featureType": "transit.station",
            "elementType": "geometry",
            "stylers": [
                {
                    "color": "#dfd2ae"
      }
    ]
  },
        {
            "featureType": "water",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "color": "#b9d3c2"
      }
    ]
  },
        {
            "featureType": "water",
            "elementType": "labels.text",
            "stylers": [
                {
                    "visibility": "off"
      }
    ]
  },
        {
            "featureType": "water",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#92998d"
      }
    ]
  }
]
    
    var intervalTimer;



    function setPosition(lat, lng) {
        position.lat = lat;
        position.lng = lng;
    }

    function getMarker(title) {
        return new google.maps.Marker({
            position: position,
            map: map,
            title: title,
            icon: "./img/icon.png"

        });
    }


    function getMap() {

        return new google.maps.Map(
            container, {
                center: position,
                zoom: 15,
                maxZoom: 20,
                minZoom: 10,
                style: styleMap,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                disableDefaultUI: true,
                mapTypeControlOptions: {
                    mapTypeIds: [
                        google.maps.MapTypeId.ROADMAP,
                        "style"
                    ]
                    
                }
            }
        );
    }

    return {
        // Application Constructor
        initialize: function () {
            this.bindEvents();
       
        },


        bindEvents: function () {
            document.addEventListener('deviceready', this.onDeviceReady, false);
        },

        onDeviceReady: function () {

            window.navigator.geolocation.getCurrentPosition(

                function (e) {

                    
                        
                    setPosition(e.coords.latitude, e.coords.longitude);
                    map = getMap();
                    marker = getMarker("HERE");
                    map.panTO(position);
                    marker.setPosition(position);

                },

                function (e) {
                    alert("Erreur: " + e.toString());

                }


            );
        }

    };


})();

