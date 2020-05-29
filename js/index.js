var map;
var markers = [];
var image= 'style/image/icons8-street-view-64.png';


var infoWindow;
function initMap() {
 
    var Athlone = {lat: 53.43333, lng: -7.95};
    map = new google.maps.Map(document.getElementById('map'), {
      center: Athlone,
      zoom: 50,
      mapTypeId: 'roadmap',
      
      
      styles: [
        {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
        {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
        {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
        {
          featureType: 'administrative.locality',
          elementType: 'labels.text.fill',
          stylers: [{color: '#d59563'}]
        },
        {
          featureType: 'poi',
          elementType: 'labels.text.fill',
          stylers: [{color: '#d59563'}]
        },
        {
          featureType: 'poi.park',
          elementType: 'geometry',
          stylers: [{color: '#263c3f'}]
        },
        {
          featureType: 'poi.park',
          elementType: 'labels.text.fill',
          stylers: [{color: '#6b9a76'}]
        },
        {
          featureType: 'road',
          elementType: 'geometry',
          stylers: [{color: '#38414e'}]
        },
        {
          featureType: 'road',
          elementType: 'geometry.stroke',
          stylers: [{color: '#212a37'}]
        },
        {
          featureType: 'road',
          elementType: 'labels.text.fill',
          stylers: [{color: '#9ca5b3'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry',
          stylers: [{color: '#746855'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'geometry.stroke',
          stylers: [{color: '#1f2835'}]
        },
        {
          featureType: 'road.highway',
          elementType: 'labels.text.fill',
          stylers: [{color: '#f3d19c'}]
        },
        {
          featureType: 'transit',
          elementType: 'geometry',
          stylers: [{color: '#2f3948'}]
        },
        {
          featureType: 'transit.station',
          elementType: 'labels.text.fill',
          stylers: [{color: '#d59563'}]
        },
        {
          featureType: 'water',
          elementType: 'geometry',
          stylers: [{color: '#17263c'}]
        },
        {
          featureType: 'water',
          elementType: 'labels.text.fill',
          stylers: [{color: '#515c6d'}]
        },
        {
          featureType: 'water',
          elementType: 'labels.text.stroke',
          stylers: [{color: '#17263c'}]
        }
      ]
    });
    

    infoWindow = new google.maps.InfoWindow();
   
    
    
    searchStores();
    google.maps.event.addListenerOnce(map, 'idle', function(){
      jQuery('.gm-style-iw').prev('div').remove();
  });
    
  }



  function searchStores(){
    var foundStores = [];
    var zipCode = document.getElementById('zipcode').value;
    
    if(zipCode){
        stores.forEach(function(store){
            var postal = store.address.postalCode.substring(0,5);
            if(postal == zipCode){
                foundStores.push(store);
            }
        });
    } else {
        foundStores = stores;
    }
    clearLocations();
    storeData(foundStores);
    dataMarker(foundStores);
    setOnClickListener();
}


function clearLocations() {
    infoWindow.close();
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    }
    markers.length = 0;
}


function setOnClickListener() {
    var storeElements = document.querySelectorAll('.store-container');
    console.log(storeElements);
    storeElements.forEach(function(elem, index){
      elem.addEventListener('click', function(){
          google.maps.event.trigger(markers[index], 'click');
      })
  });
}




  function storeData(stores)
  { var storeHDis = ""; 
    
    stores.forEach(function(store,index){
      var address = store.addressLines;
      var phone = store.phoneNumber; 
      storeHDis +=`
       
            <div class="store-container">
            <div>
                <img src="style/image/store-solid.svg"> <br>
                <div id="phone">${phone}</div>
            </div>
        
            <div id="address">${address[0]}<br> ${address[1]}</div>
       
        <div id="index">
        <div id="storenum"> ${index+1} </div>
            </div>
        </div>
        <hr>
       `
    });
    document.querySelector('#store-list').innerHTML=storeHDis;
  }
function dataMarker(stores)
{
  var bounds = new google.maps.LatLngBounds();
  stores.forEach(function(store){
    var latlng = new google.maps.LatLng(
      store.coordinates.latitude,
      store.coordinates.longitude
    ) ;
    var name = store.name;
    var address = store.addressLines[0];
    var opentill = store.openStatusText;
    var phone = store.phoneNumber;
    bounds.extend(latlng);

    createMarker(latlng, name, address , phone, opentill);
  
  });

  map.fitBounds(bounds);
}

  function createMarker(latlng, name, address, phone, opentill) {
    var html = `
    <div class="googleMapBox">
    <div><b> ${name} </b><br>
    ${opentill}<br></div>
    <hr>
    <div class="phaddress">
    
    <img src="style/image/phone-square-alt-solid.svg" >
    
    <div id="ph">${phone}</div>

    <img src="style/image/address-card-solid.svg" >
   
    <div id="add">${address}</div>
    </div>
    </div>
    
    `
    infoWindow = new google.maps.InfoWindow({
      content: html
     } );
    
    var marker = new google.maps.Marker({
      map: map,
      icon: image,
      position: latlng,
      animation:google.maps.Animation.BOUNCE
    });
    google.maps.event.addListener(marker, 'click', function() {
      infoWindow.setContent(html);
      infoWindow.open(map, marker);
    });
    markers.push(marker);
  }

  