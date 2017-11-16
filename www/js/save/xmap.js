var google = google || {};


var app = (function () {

    var valx;
    var valy;
    var test = window.document.getElementById('test');
    var ul = window.document.getElementById('ul');
    var AltiMax = 0;
    var newElmet;
    var coordonnesMax;
    var marker;
    var myLatLng = {
        lat: -25.363,
        lng: 131.044
    };

    
/*    function marker() {
          return marker = new google.maps.Marker({
            position: myLatLng,
            map: this.map,
            title: 'Hello'
        });
    }*/



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

        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 12,
            center: path[0],
            mapTypeId: 'terrain',
           // marker: marker()
        });

        // Create an ElevationService.
        var elevator = new google.maps.ElevationService;

        // Draw the path, using the Visualization API and the Elevation service.
        displayPathElevation(path, elevator, map);
    }

    function displayPathElevation(path, elevator, map) {
        // Display a polyline of the elevation path.
        new google.maps.Polyline({
            path: path,
            strokeColor: '#0000CC',
            strokeOpacity: 0.4,
            map: map
        });

        // Create a PathElevationRequest object using this array.
        // Ask for 256 samples along that path.
        // Initiate the path request.
        elevator.getElevationAlongPath({
            'path': path,
            'samples': 256
        }, plotElevation);

        plotElevation(elevator);

    }

    // Takes an array of ElevationResult objects, draws the path on the map
    // and plots the elevation profile on a Visualization API ColumnChart.
    function plotElevation(elevations) {

        // function plotElevation(elevations, status) {

        var chartDiv = document.getElementById('elevation_chart');


        for (var i = 0; i < elevations.length; i++) {


            if (elevations[i].elevation > AltiMax) {
                AltiMax = elevations[i].elevation;
                coordonnesMax = elevations[i].location;
            }

        }

        chartDiv.innerHTML = "Altitude max : " + AltiMax + "<br/>Position de l'altitude max :" + coordonnesMax;

        displayPositionAtliMAx(AltiMax, coordonnesMax);


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
                map.panTO(position);
                marker.setPosition(position);

            },

            function (e) {
                alert("Erreur: " + e.toString());

            }
        )
    }




    var container = window.document.getElementById("map");
    var position = {
        lat: 0,
        lng: 0
    };
    var map;
    var marker;
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

                    /*setPosition(e.coords.latitude, e.coords.longitude);
                    map = getMap();
                    marker = getMarker("HERE");
                    map.panTO(position);
                    marker.setPosition(position);*/




                    initMap(e.coords.latitude, e.coords.longitude);


                },

                function (e) {
                    alert("Erreur: " + e.toString());

                }


            );


        }

    };


})();
