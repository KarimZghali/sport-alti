var google = google || {};


var app = (function () {

    var valx;
    var valy;
    var test = window.document.getElementById('test');
    var ul = window.document.getElementById('ul');
    var altiMax = 0;
    var newElmet;
    var coordonnesMax;
    var marker;
    //var myLatlng = new google.maps.LatLng(-25.363882,131.044922);
    var index;
    var longitude;
    var latitude;
    var position = {};
    var map;




    function initMap(lat, lng, marker) {

      
        var path = [
            {
                lat: lat,
                lng: lng
            },
            {
                lat: lat,
                lng: lng + 0.03
            },
            {
                lat: lat,
                lng: lng - 0.03
            },
            {
                lat: lat - 0.03,
                lng: lng
            },
            {
                lat: lat,
                lng: lng + 0.03
            },
            {
                lat: lat + 0.03,
                lng: lng
            },
            {
                lat: lat,
                lng: lng - 0.03
            },
            {
                lat: lat - 0.03,
                lng: lng
            },
            {
                lat: lat + 0.03,
                lng: lng
            }];
        
//        var map = new google.maps.Map(document.getElementById('map'), {
//            zoom: 0,
//            center: path[0],
//            mapTypeId: 'terrain',
//        });


        var elevator = new google.maps.ElevationService;

      
        displayPathElevation(path, elevator);
    }

    function displayPathElevation(path, elevator) {
        // Affichage des trajectoirs .
        new google.maps.Polyline({
            path: path,
            strokeColor: '#0000CC',
            strokeOpacity: 0.4,
            map: map
        });

        elevator.getElevationAlongPath({
            'path': path,
            'samples': 256
        }, plotElevation);

        plotElevation(elevator, map);

    }


    function plotElevation(elevations) {

        coordonnesMax = position;

        var chartDiv = document.getElementById('elevation_chart');
        

        for (var i = 0; i < elevations.length; i++) {

            if (elevations[i].elevation > altiMax) {
                
                altiMax = elevations[i].elevation;
                //coordonnesMax = elevations[i].location;
                coordonnesMax = elevations[i].location;
                /*index = coordonnesMax.indexOf(",");
                latitude = coordonnesMax.slice(7, index);
                longitude = coordonnesMax.slice((index+7), (coordonnesMax.length-1));*/
            }

        }
        
alert(JSON.stringify(coordonnesMax));
        
        
/*        coordonnesMax = coordonnesMax.replace('"', '');
        coordonnesMax = coordonnesMax.replace('"', '');
        coordonnesMax = coordonnesMax.replace('"', '');
        coordonnesMax = coordonnesMax.replace('"', '');
        coordonnesMax = coordonnesMax.replace('{lat:', '');
        coordonnesMax = coordonnesMax.replace('lng:', '');
        coordonnesMax = coordonnesMax.replace('}', '');*/
        
        
        

        chartDiv.innerHTML = "Altitude max : " + altiMax + "<br/>Position de l'altitude max :<br/>" + coordonnesMax.lat();
        
    /*    
        var longitudeF = parseFloat(longitude);
        var latitudeF = parseFloat(latitude);*/


//        alert(JSON.stringify(position));
       addMarker( {
           lat: coordonnesMax.lat(),
           lng: coordonnesMax.lng()


           }, 
           "foo"
        );
//        alert("?");
//        
//        addMarker(
//            {
//                lat: 4.4,
//                lng: 44.4
//            },
//            map
//        );
        
       // displayPositionAtliMAx(altiMax, coordonnesMax);


    }
    
    function addMarker(coordonnesMax) {

   // myLatlng = new google.maps.LatLng(10,10); 

    var marker = new google.maps.Marker({
    position: position, 
        //coordonnesMax,// {lat: 45.65669, lng: 5.220479999999952}, //myLatlng, //{lat: latitude, lng: longitude}
    map: map

  });
        
    }

    /*   function displayPositionAtliMAx(AltiMax, coordonnes) {
          

      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: coordonnes
      });

      var marker = new google.maps.Marker({
        position: coordonnes,
        map: map,
        title: 'Hello World!'
      });
          
           
       }*/




    test.onclick = function (position) {
        window.navigator.geolocation.getCurrentPosition(
            function (e) {

                alert('Debut localisation');
                setPosition(e.coords.latitude, e.coords.longitude);
                map = getMap();
                marker = getMarker("HERE");
                map.panTo(position);
                marker.setPosition(position);

            },

            function (e) {
                alert("Erreur: " + e.toString());

            }
        )
    }




    var container = window.document.getElementById("map");



    function setPosition(lat, lng) {

        position.lat = lat;
        position.lng = lng;
    }

    function getMarker(position, title) {
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
                zoom: 12,
                radius: 1500,
                strokeColor: '#FF0000',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: '#FF0000',
                fillOpacity: 0.35,
                editable: true,

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
                    marker = getMarker(position, "HERE");
                    map.panTo(position);
                    marker.setPosition(position);

                    initMap(e.coords.latitude, e.coords.longitude);
                },

                function (e) {
                    alert("Erreur: " + e.toString());

                }
            );
        }
    };
})();
