
var initialLocation;

var browserSupportFlag =  new Boolean();
var monsterList = [];
var otherUserList = new Array()
var map;


var tempLat = 0;
var tempLon =0;

function initialize() {
  document.getElementById('townSound').play()
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
    zoom: 16,
    disableDefaultUI:true,
    disableDoubleClickZoom: true,
    scrollwheel: false,
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
                                       position.coords.longitude,
                                       gps_options);
      if(gpsRunTime>0)//清除舊的使用者位置
        userPositionMarker.setMap(null);

      gpsRunTime++;
      console.log("gpsRunTime="+gpsRunTime);
      userPositionMarker = new google.maps.Marker({
        map: map,
        position: pos,
        label: '我',
        title: 'Location found using HTML5.'
      });
      if(position.coords.latitude!=tempLat && position.coords.longitude!=tempLon){
      //拿怪物資料
       getMonster(position.coords.latitude,position.coords.longitude);
       //送出socket使用者更新後的座標
       socket.emit('location',localStorage.userName,position.coords.latitude,position.coords.longitude);
      tempLat = position.coords.latitude;
      tempLon = position.coords.longitude;
      }

      map.setCenter(pos);

    }, function() {
      handleNoGeolocation(true);
    }, gps_options = {
      frequency: 10000,
      enableHighAccuracy: false, 
      maximumAge        : 9000, //間隔時間(毫秒) 
      timeout           : 17000
    }

    );
  } else {
    // Browser doesn't support Geolocation
    handleNoGeolocation(false);
  }


}


function getMonster(userlat,userlon){
      
      var serverUrl = "http://andy-lin.info:20003/api/monster";
      //"http://140.136.150.71:20003/api/monster?user=1&lat=121.512386&lon=25.051269"; 
      //position.coords.latitude,position.coords.longitude
      $.ajax({
        type:"GET",
        url:serverUrl,
        data:"user="+localStorage.session+"&lat="+userlat+"&lon="+userlon,
        dataType:"JSONP",
        jsonpCallback:"mPosition",
        success:function(returnData){
          if(returnData.status=="205"){
            var monsterData = returnData.data;
            monsterList =[];  
            var monsterListTemp=[];
            for (var i = 0; i<monsterData.length; i++) {
              monsterListTemp=[];
              monsterListTemp.push(monsterData[i]["name"]);
              monsterListTemp.push(monsterData[i]["mid"]);
              monsterListTemp.push(monsterData[i]["level"]);
              monsterListTemp.push(monsterData[i]["lat"]);
              monsterListTemp.push(monsterData[i]["lon"]);

              monsterListTemp.push(i);
              monsterList.push(monsterListTemp);
            }

            
            $("#topBar").html("<b>發現附近的怪物 </b>");
             for (var i = 0; i < monsterList.length; i++) {
              monsterLocationData = monsterList[i];
                    setMonsterMarkers(map,monsterLocationData);     
                  }     
          }
          else if(returnData.status=="404"){
            $("#topBar").html("<b>這附近未發現怪物</b>");
          }
          else{
            $("#topBar").html("<b>失敗。 錯誤代碼 = "+returnData.status+" 錯誤訊息="+returnData.msg+" </b>");
          }

        }
      });
}


function setMonsterMarkers(map,monsterLocationData){
    
    var myLatLng = new google.maps.LatLng(monsterLocationData[3], monsterLocationData[4]);
    
    var image = {
      url: 'img/monster'+monsterLocationData[1]+'.png',
      // This marker is 20 pixels wide by 32 pixels tall.
      size: new google.maps.Size(589,568),
      scaledSize: new google.maps.Size(117,113),
      // The origin for this image is 0,0.
      origin: new google.maps.Point(0,0),
      // The anchor for this image is the base of the flagpole at 0,32.
      anchor: new google.maps.Point(50, 50)
    };

    var infowindow =new google.maps.InfoWindow({
      content:"<p>怪物名稱："+monsterLocationData[0]+"</p><p>怪物等級："+monsterLocationData[2]+"</p><input type =\"button\" onclick=\"gotoBattle("+monsterLocationData[1]+","+monsterLocationData[2]+")\" value=\"進入戰鬥\">",
      position:myLatLng
    });

    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        icon: image,
        anchorPoint:new google.maps.Point(0,0),
        title: monsterLocationData[0]
        
    });

    google.maps.event.addListener(marker, 'click' , function(){
      infowindow.open(map,marker);
    });
}



//進入戰鬥畫面
function gotoBattle(oppositeMonster,oppositeMonsterLV){
  localStorage.oppositeMonster = oppositeMonster;
  localStorage.oppositeMonsterLV = oppositeMonsterLV;
  window.open('battle.html','_self');
}
/*多個標記的範例資料
var monsterListTest = [
  ['Bondi Beach', 25.06079047579, 121.53120506931, 4],
  ['Coogee Beach', 25.6079579272, 121.20506931151, 5],
  ['Cronulla Beach', 25.060799272, 121.120506931151, 3],
  ['Manly Beach', 25.06079049272, 121.4120531151, 2],
  ['Maroubra Beach',25.0607904757272, 121.312050693151, 1]
]; 
*/


var otherUserMarker;
function setOtherUserMark(map,otherUserList,time){
  
  if(time>0)
    otherUserMarker.setMap(null);
  
  console.log("time="+time)
  for(var i = 0;i<otherUserList.length;i++){

    var otherUserData = otherUserList[i];
    var otherUserName = "'"+otherUserData[0]+"'";
    var otherLocation = new google.maps.LatLng(otherUserData[1]+0.0001, otherUserData[2]+0.0001);
    var infowindow =new google.maps.InfoWindow({
      content:"<p>玩家名稱："+otherUserData[0]+"</p><br><input type =\"button\" onclick=\"inviteBattle("+otherUserName+")\" value=\"要求對戰\"></input>",
      position:otherLocation
    });

    console.log("其他人marker  i="+i+" otherUserData="+otherUserData); 
    otherUserMarker = new google.maps.Marker({
    position: otherLocation,
    label: '其',
    map: map
    });

  }
  google.maps.event.addListener(otherUserMarker, 'click' , function(){
      infowindow.open(map,otherUserMarker);
    });
  
}



//我方送出對戰邀請
function inviteBattle(otherUserName){
  console.log("inviteBattle "+otherUserName);
  for( var i = 0 ;i < onlineUser.length;i++){
    console.log("inviteBattle  i="+i+" otherUserName="+otherUserName+" onlineUserName="+onlineUser[i]["username"]);
    var thisUserName = onlineUser[i]["username"];
    if(thisUserName == otherUserName){
      console.log("otherUserName == thisUserName");
      socketPVP.emit('invited',onlineUser[i]["socketID"],localStorage.leader,localStorage.leaderLV);
      console.log("socketPVP.emit(invited)"+onlineUser[i]["socketID"]);
      //自己是被自己邀請
      localStorage.whoInvitedYou = localStorage.oldSocketID; 
    }
  }
}




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
  setMonsterMarkers(map,monsterList);
  var infowindow = new google.maps.InfoWindow(options);
  map.setCenter(options.position);
}

google.maps.event.addDomListener(window, 'load', initialize);