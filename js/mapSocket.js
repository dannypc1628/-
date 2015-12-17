var time = 0;

var onlineUser = [];
var oppositeID = "";
var roomInform = {};
var roomID = "";



var socket = io.connect(serverUrlMapSocket);//連上Socket.io Server
     
    socket.emit("joingame",localStorage.userName,localStorage.userID);
    console.log("送出joingame");
    localStorage.oldSocketID = socket.id;
    console.log("我的socket id = "+localStorage.oldSocketID);
  


      //接收其他人座標 
      
      socket.on('location',function(otherUserSocketID,otherUserName,otherUserLat,otherUserLon){
        
        //$("#socketBar").html("<b>成功收到資料 "+otherUserSocketID+" </b>");
        
        //如果收到的資料不是自己發出的
        //var data = returnData;
        console.log("玩家socketID = "+otherUserSocketID+" 名稱 = "+otherUserName);
        console.log("座標 = "+otherUserLat+","+otherUserLon);
        //var data = JSON.parse(returnData);
        if(otherUserName==localStorage.userName){
               console.log("收到自己發的廣播");
               }
        else{
          console.log("這是其他玩家 名稱="+otherUserName);
          
          //如果其他人資料表是空的
          if(otherUserList.length == 0){
            Temp=[];
            Temp.push(otherUserName);
            Temp.push(otherUserLat);
            Temp.push(otherUserLon);
            //push到資料表裡
            otherUserList.push(Temp);
            console.log("TempPush進去"+Temp+"length==0 otherUserList="+otherUserList);    
          }

          //如果不是空的
          else{
            //尋找這個人是否在資料表裡
            var inTheList = 0;
            console.log("otherUserList的長度="+otherUserList.length);
            for(var i = 0; i<otherUserList.length ;i++){
              console.log("迴圈中  otherUserList的長度="+otherUserList.length);
              //如果在，就更改座標
              console.log("i = "+i+ "otherUserList[i]="+otherUserList[i]);
              var otherUserData = otherUserList[i];
              if(otherUserData[0] == otherUserName){
                otherUserData[1] = otherUserLat;
                otherUserData[2] = otherUserLon;
                console.log("原本已經在資料表裡"+otherUserData[0]+ "otherUserList="+otherUserList);  
                inTheList = 1;
                break;
              }
            }
            //如果不在裡面
            if(inTheList == 0){
              //送出我的位置
              socket.emit('location',localStorage.userName,localStorage.oldLat,localStorage.oldLon);
              //push到資料表裡
              Temp=[];
              Temp.push(otherUserName);
              Temp.push(otherUserLat);
              Temp.push(otherUserLon);
              //push到資料表裡
              otherUserList.push(Temp);
              console.log("不在資料表裡 已經加入 otherUserList="+otherUserList);
            }
          }
                    
            setOtherUserMark(map,otherUserList,time);
            time++;

        }
        
      });

function findUserUsingSocket(condition,method){
method = method || "uid"
resultIndex = -1
for(var i = 0;i<onlineUser.length;i++){
  if (onlineUser[i][method] == condition)
    resultIndex = i
}
return resultIndex
}


/*
      收到活著的訊息,單純收下來
      */
      socket.on('alive',function(uid,userName,socketID){
        onlineUser.push({"uid":uid,"username":userName,"socketID":socketID})
        console.log("收到在線上的使用者：" + userName);
      });
      /*
      新使用者,接受新使用者的SocketID,並且跟他說我活著
      */
      socket.on('newUser',function(uid,userName,socketID){
        console.log("上線");
        if(uid==localStorage.userID){
          localStorage.oldSocketID = socketID;
          console.log("我的socket ID ="+localStorage.oldSocketID);
        }
        else{
          onlineUser.push({"uid":uid,"username":userName,"socketID":socketID})
          //向新使用者發送在線廣播
          socket.emit('alive',socketID,localStorage.userID,localStorage.userName)
          console.log("剛上線的使用者：" + userName +" 已經送出我還在線上");
        }
      });
      //收到邀請戰鬥
      socket.on('invited',function(host,oppositeMonster,oppositeMonsterLV){
        //辨識是誰邀請的戰鬥
        console.log("收到邀請");
        hostData = findUserUsingSocket(host,"socketID")
        //找的到使用者才處理
        if (hostData >= 0){
          hostData = onlineUser[hostData]
          console.log("這是 "+hostData["username"]+" 的邀請");
          //確認的彈出視窗
          //accept = confirm("玩家名稱："+hostData["username"]+" 請求跟您決鬥")
          swal({
            title:'玩家名稱:'+hostData["username"]+ '請求跟您決鬥', 
            
            showCancelButton: true,
          },function(isConfirm){   
            if (isConfirm) {
              //傳送接受戰鬥給Server
              socket.emit('accept',host,localStorage.leader,localStorage.leaderLV);
              localStorage.oppositeMonster = oppositeMonster;
              localStorage.oppositeMonsterLV = oppositeMonsterLV;
              localStorage.whoInvitedYou = host;
              console.log("我接受戰鬥 "+localStorage.whoInvitedYou+" 的戰鬥邀請");
              swal.close();
            }
            else{
              //傳送不接受戰鬥給Server
              socket.emit('unaccept',host)
              console.log("我不接受戰鬥");
              swal.close();
            }

          });
          // if (accept){
          //   //傳送接受戰鬥給Server
          //   socket.emit('accept',host,localStorage.leader,localStorage.leaderLV);
          //   localStorage.oppositeMonster = oppositeMonster;
          //   localStorage.oppositeMonsterLV = oppositeMonsterLV;
          //   localStorage.whoInvitedYou = host;
          //   console.log("我接受戰鬥 "+localStorage.whoInvitedYou+" 的戰鬥邀請");
          // }
          // else{
          //   //傳送不接受戰鬥給Server
          //   socket.emit('unaccept',host)
          //   console.log("我不接受戰鬥");
          // }
        }
      });
      //雙方接受戰鬥，準備進入battlePVP.html
      socket.on('goToBattleRoom',function(msg1,msg2,msg3){
        if(msg1){
          localStorage.oppositeMonster = msg2;
          localStorage.oppositeMonsterLV = msg3;
        }

        console.log("按此進入戰鬥了");
        accept=confirm("按此進入戰鬥");
        if(accept){
          window.open('battlePVP.html',"_self");
        }
        // swal({
        //     title:'按此進入戰鬥了', 
            
        //     showCancelButton: false,
        //   },function(){   
            
        //       window.open('battlePVP.html',"_self");
            

        //   });
      });
