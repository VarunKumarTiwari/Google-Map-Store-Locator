var map;
var markers = [];
var image= 'style/image/icons8-street-view-64.png';
var A;
var B;
var Athlone;
var Dublin;
var googleThem = 0;
var dark=[
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
];
var light = [
  {elementType: 'geometry', stylers: [{color: '#ebe3cd'}]},
  {elementType: 'labels.text.fill', stylers: [{color: '#523735'}]},
  {elementType: 'labels.text.stroke', stylers: [{color: '#f5f1e6'}]},
  {
    featureType: 'administrative',
    elementType: 'geometry.stroke',
    stylers: [{color: '#c9b2a6'}]
  },
  {
    featureType: 'administrative.land_parcel',
    elementType: 'geometry.stroke',
    stylers: [{color: '#dcd2be'}]
  },
  {
    featureType: 'administrative.land_parcel',
    elementType: 'labels.text.fill',
    stylers: [{color: '#ae9e90'}]
  },
  {
    featureType: 'landscape.natural',
    elementType: 'geometry',
    stylers: [{color: '#dfd2ae'}]
  },
  {
    featureType: 'poi',
    elementType: 'geometry',
    stylers: [{color: '#dfd2ae'}]
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{color: '#93817c'}]
  },
  {
    featureType: 'poi.park',
    elementType: 'geometry.fill',
    stylers: [{color: '#a5b076'}]
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [{color: '#447530'}]
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{color: '#f5f1e6'}]
  },
  {
    featureType: 'road.arterial',
    elementType: 'geometry',
    stylers: [{color: '#fdfcf8'}]
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{color: '#f8c967'}]
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{color: '#e9bc62'}]
  },
  {
    featureType: 'road.highway.controlled_access',
    elementType: 'geometry',
    stylers: [{color: '#e98d58'}]
  },
  {
    featureType: 'road.highway.controlled_access',
    elementType: 'geometry.stroke',
    stylers: [{color: '#db8555'}]
  },
  {
    featureType: 'road.local',
    elementType: 'labels.text.fill',
    stylers: [{color: '#806b63'}]
  },
  {
    featureType: 'transit.line',
    elementType: 'geometry',
    stylers: [{color: '#dfd2ae'}]
  },
  {
    featureType: 'transit.line',
    elementType: 'labels.text.fill',
    stylers: [{color: '#8f7d77'}]
  },
  {
    featureType: 'transit.line',
    elementType: 'labels.text.stroke',
    stylers: [{color: '#ebe3cd'}]
  },
  {
    featureType: 'transit.station',
    elementType: 'geometry',
    stylers: [{color: '#dfd2ae'}]
  },
  {
    featureType: 'water',
    elementType: 'geometry.fill',
    stylers: [{color: '#b9d3c2'}]
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{color: '#92998d'}]
  }
];

var infoWindow;
function initMap() {

    var Athlone = {lat: 34.040151, lng: -118.330501};
    var theam;
    if(googleThem==0)
    {
      theam = dark;
    }
    else{
      theam = light;
    }
    map = new google.maps.Map(document.getElementById('map'), {
     center : Athlone,
      zoom: 9,
      mapTypeId: 'roadmap',
      styles:theam
  
    });
    

    infoWindow = new google.maps.InfoWindow();
   
    A = new google.maps.DirectionsRenderer({
      map: map
    });

    
    
    searchStores();
   
    
  }



  function searchStores(){
    var foundCounty = [];
    var space = " ";
    var County = document.getElementById('zipcode').value;

    
    if(County){
      County = County.charAt(0).toUpperCase() + County.slice(1);
      County = space.concat(County);
      var count=0;
        stores.forEach(function(store){
            var storeCo = store.store_Co;
            console.log(County);
            if(storeCo == County){
              count++;
              foundCounty.push(store);
            }
        });
if(count==0)
{
  foundCounty = stores;
  window.alert("Papa Jhon's may not exist in the searched County");
}
    } else {
      foundCounty = stores;
    }
    clearLocations();
    storeData(foundCounty);
    dataMarker(foundCounty);
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
    
    storeElements.forEach(function(elem, index){
      elem.addEventListener('click', function(){
          google.maps.event.trigger(markers[index], 'click');
      })
  });
}




  function storeData(stores)
  { var storeHDis = ""; 
    
    stores.forEach(function(store,index){
      var address = store.store_address;
      var phone = store.store_telephone; 
      var Co = store.store_Co;
      storeHDis +=`
       
            <div class="store-container">
            <div>
                <img src="style/image/store-solid.svg"> <br>
                <div id="phone">${phone}</div>
            </div>
        
            <div id="address">${address}${Co}</div>
       
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
      store.store_latitude,
      store.store_longitude
    ) ;
    var lat = store.store_latitude;
    var link = store.store_link;
    var lng =  store.store_longitude;
    var name = store.location;
    var address = store.store_address;
    var opentill = store.store_opening_hours;
    var phone = store.store_telephone;
    var Co = store.store_Co;
    bounds.extend(latlng);

    createMarker(latlng,lat , lng, name, address , phone, opentill, link, Co);
  
  });

  map.fitBounds(bounds);
}

  function createMarker(latlng, lat, lng, name, address, phone, opentill, link, Co) {
    
    var html = `
    <div class="googleMapBox">
    <div><b> ${name} </b><br>Open till 
    ${opentill} PM today<br></div>
    <hr>
    <div class="phaddress">
    
    <img src="style/image/phone-square-alt-solid.svg" >
    
    <div id="ph">${phone}</div>

    <img src="style/image/address-card-solid.svg" >
   
    <div id="add" onclick="addressLatLng(${lat},${lng})" >
    <a >${address}${Co}
    </a>
    </div>
  
    </div>
    <div class="button"><a href="${link}">Open Store</a></div>
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

  function addressLatLng(lat ,lng)
     {
       

       
      B = new google.maps.DirectionsService();


        Athlone = new google.maps.LatLng(53.4239, -7.9407);
         Dublin = new google.maps.LatLng(lat, lng);
       
       
      
        A.setMap(map);
        var  request = {
            origin:Athlone,
            destination:Dublin,
            travelMode : 'DRIVING'
        };

        B.route(request,function(result,status){
            if(status=="OK")
            {
                A.setDirections(result);
            }
        });
     }

     function OnChangeCheckbox (checkbox) {
    if (checkbox.checked) {
        trans()
        document.documentElement.setAttribute('data-theme', 'light')
        googleThem = 1;
        
        initMap()
    }
    else {
        trans()
        document.documentElement.setAttribute('data-theme', 'dark')
        googleThem = 0;
        initMap()
    }
}



let trans = () => {
    document.documentElement.classList.add('transition');
    window.setTimeout(() => {
        document.documentElement.classList.remove('transition')
    }, 1000)
}