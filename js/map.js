


var initialLocation;
var taipei = new google.maps.LatLng(25.06079047579272, 121.53120506931151);

var browserSupportFlag =  new Boolean();
var beaches = [];
var map;

function initialize() {

  // Create an array of styles.
  var styles = [
    {
      stylers: [
        { hue: "#00ffe6" },
        { saturation: -80 },
        {gamma:0.2}
      ]
    },
    {
      featureType:"road",
      elementType:"geometry.stroke",
      stylers:[
        {lightness:70}
      ]
    },
    {
      featureType: "road",
      elementType: "geometry.fill",
      stylers: [
      
        { visibility: "off" }
      ]
    },
    
    {
      featureType: "all",
      elementType: "labels",

      stylers: [
        { visibility: "off" }
      ]
    }
  ];

  // Create a new StyledMapType object, passing it the array of styles,
  // as well as the name to be displayed on the map type control.
  var styledMap = new google.maps.StyledMapType(styles,
    {name: "Styled Map"});

  // Create a map object, and include the MapTypeId to add
  // to the map type control.
  var mapOptions = {
    zoom: 20,
    mapTypeControlOptions: {
      mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
    }
  };

   map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);
   map.mapTypes.set('map_style', styledMap);
  map.setMapTypeId('map_style');

  //計算GPS定位次數
  var gpsRunTime = 0;
  // Try HTML5 geolocation
  var userPositionMarker;
  if(navigator.geolocation) {
  	//即時定位navigator.geolocation.watchPosition(geo_success, geo_error, geo_options);
    navigator.geolocation.watchPosition(function(position) {
      var pos = new google.maps.LatLng(position.coords.latitude,
                                       position.coords.longitude);
      if(gpsRunTime>0)//清除舊的使用者位置
      	userPositionMarker.setMap(null);

      gpsRunTime++;

      userPositionMarker = new google.maps.Marker({
        map: map,
        position: pos,
        title: 'Location found using HTML5.'
      });
      
      //拿怪物資料
      getMonster(position.coords.latitude,position.coords.longitude);
      map.setCenter(pos);
      setMonsterMarkers(map,beaches);
    }, function() {
      handleNoGeolocation(true);
    }, gps_options = {
    	//enableHighAccuracy: true, 
  		maximumAge        : 4000 //間隔時間(毫秒) 
  		//timeout           : 27000
    }

    );
  } else {
    // Browser doesn't support Geolocation
    handleNoGeolocation(false);
  }



}

		function getMonster(userlat,userlon){
			var userId = localStorage.userId;
			var serverUrl = "http://140.136.150.71:20003/api/monster";
			//"http://140.136.150.71:20003/api/monster?user=1&lat=121.512386&lon=25.051269"; 
			//position.coords.latitude,position.coords.longitude
			$.ajax({
				type:"GET",
				url:serverUrl,
				data:"user="+localStorage.userId+"&lat="+userlat+"&lon="+userlon,
				dataType:"JSONP",
				jsonpCallback:"mPosition",
				success:function(returnData){
					if(returnData.status=="205"){
						var monsterData = returnData.data;
						beaches =[];	
						var beachesTemp=[];
						for (var i = 0; i<monsterData.length; i++) {
							beachesTemp=[];
							beachesTemp.push(monsterData[i]["name"]);
							beachesTemp.push(monsterData[i]["lat"]);
							beachesTemp.push(monsterData[i]["lon"]);
							beachesTemp.push(i);
							beaches.push(beachesTemp);
						}

						/* 做成字串處理......，用Array才對
						for(var i = 0 ; i<monsterDataLength ;i++){
							if(i>0){
								beaches = beaches +"," ;
							}
							beaches = beaches+"['"+monsterData[i]["name"]+"', "+monsterData[i]["lon"]+", "+monsterData[i]["lat"]+", "+i+"]";
						}
						beaches = beaches +" ]";
						*/
						$("#topBar").html("<b>成功收到資料 "+beaches+" </b>");
						
					}
					else if(returnData.status=="404"){
						$("#topBar").html("<b>收到的訊息是：這附近沒有怪物</b>");
					}
					else{
						$("#topBar").html("<b>失敗。 錯誤代碼 = "+returnData.status+" 錯誤訊息="+returnData.msg+" </b>");
					}

				}
			});
		}

function setMonsterMarkers(map,locations){

    var image = {
    url: 'img/monster05.png',
    // This marker is 20 pixels wide by 32 pixels tall.
    size: new google.maps.Size(589,568),
    scaledSize: new google.maps.Size(117,113),
    // The origin for this image is 0,0.
    origin: new google.maps.Point(0,0),
    // The anchor for this image is the base of the flagpole at 0,32.
    anchor: new google.maps.Point(50, 50)
  };

    for (var i = 0; i < locations.length; i++) {
    var beach = locations[i];
    var myLatLng = new google.maps.LatLng(beach[1], beach[2]);
    

    var infowindow =new google.maps.InfoWindow({
    	content:"<p>怪物名稱"+beach[0]+"</p>",
    	position:myLatLng
    });

    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        icon: image,
        anchorPoint:new google.maps.Point(0,0),
        title: beach[0],
        zIndex: beach[3]
    });

    google.maps.event.addListener(marker, 'click' , function(){
    	infowindow.open(map,marker);
    });


  }

}
/*
var beachesTest = [
  ['Bondi Beach', 25.06079047579, 121.53120506931, 4],
  ['Coogee Beach', 25.6079579272, 121.20506931151, 5],
  ['Cronulla Beach', 25.060799272, 121.120506931151, 3],
  ['Manly Beach', 25.06079049272, 121.4120531151, 2],
  ['Maroubra Beach',25.0607904757272, 121.312050693151, 1]
]; 
*/

function handleNoGeolocation(errorFlag) {
  if (errorFlag) {
    var content = 'Error: The Geolocation service failed.';
  } else {
    var content = 'Error: Your browser doesn\'t support geolocation.';
  }

  var options = {
    map: map,
    position: new google.maps.LatLng(25.06079047579272, 121.53120506931151),
    content: content
  };
  getMonster(25.06079047579272, 121.53120506931151);
  var infowindow = new google.maps.InfoWindow(options);
  map.setCenter(options.position);
}

google.maps.event.addDomListener(window, 'load', initialize);
/*
    center: new google.maps.LatLng(lat,lon),//經度緯度
    mapTypeControlOptions: {
      mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
    }
  };
  var map = new google.maps.Map(document.getElementById('map-canvas'),
    mapOptions);

  //Associate the styled map with the MapTypeId and set it to display.
  map.mapTypes.set('map_style', styledMap);
  map.setMapTypeId('map_style');
}
google.maps.event.addDomListener(window, 'load', initialize);
*/