function initMap() {
    var Athlone = {lat: 53.43333, lng: -7.95};
    map = new google.maps.Map(document.getElementById('map'), {
      center: Athlone,
      zoom: 11,
      mapTypeId: 'roadmap'
    });
   
    var marker = new google.maps.Marker({
        position : {lat: 53.43333, lng: -7.95},
        map:map
    });
    
      
  }
