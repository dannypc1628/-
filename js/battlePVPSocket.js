var socket = io.connect('http://localhost:20005');//連上Socket.io Server
socket.emit('joinPVPBattle',localStorage.oldSocketID,localStorage.userName,
        	localStorage.userID,localStorage.whoInvitedYou);

var onlineUser = [];
var oppositeID = "";
var roomInform = {};
var roomID = "";
var battleRoomName;

function attack(){
	socket.emit("attack",battleRoomName);
	$('#fightPanel').hide();
}
//

     

socket.on('battleRoomState',function(msg){
	console.log(msg);
	if(msg ==(localStorage.userName+" 進入房間")){
		console.log(msg);
		battleRoomName = localStorage.whoInvitedYou+"_";
		
	}
	if(msg == "雙方已經在房間裡，請使用隊長進行戰鬥，戰鬥即將開始"){
		console.log(msg);
		socket.emit("selectMonster",battleRoomName,mid,level,99);
	}

});

//開始戰鬥的處理
	socket.on('startFight',function(roomInformation){
		console.log("戰鬥處理");
		//判定敵我
		if (roomInformation["accepterID"] == socket.id){
			oppositeID = roomInformation["inviterID"]
		}
		else{
			oppositeID = roomInformation["accepterID"]
		}

		//顯示怪物詳細資訊
		ourMonster = roomInformation["monsters"][socket.id]
		$('#fightChat').append("我方使用"+ourMonster["name"]+"等級"+ourMonster["level"]+"\n")
		$('#fightChat').append("血量"+ourMonster["HP"]+"\n")
		$('#fightChat').append("攻擊力"+ourMonster["ATK"]+"\n")
		oppoMonster = roomInformation["monsters"][oppositeID]
		$('#fightChat').append("對方使用"+oppoMonster["name"]+"等級"+oppoMonster["level"]+"\n")
		$('#fightChat').append("血量"+oppoMonster["HP"]+"\n")
		$('#fightChat').append("攻擊力"+oppoMonster["ATK"]+"\n")
		if (roomInformation["truns"] == socket.id){
			$('#fightChat').append("你的回合\n")
			$('#fightPanel').show()
		}
		roomInform = roomInformation
	})
	//不合法的操作
	socket.on("illegalOperator",function(msg){
		alert(msg)
	})
	// 處理使用者選擇怪物成功
	socket.on("chooseMonsterSuccess",function(){
		console.log("成功收到選擇的怪物");

	})
	//處理對方攻擊廣播
	socket.on("attack",function(roomStatus,RealAtk){
		oppositeMonster = roomStatus["monsters"][oppositeID]
		myMonster = roomStatus["monsters"][socket.id]
		if (roomStatus["truns"] == socket.id){
			$('#fightChat').append('對手的'+oppositeMonster["name"]+'對你的'+myMonster["name"]+"造成了"+RealAtk+"傷害\n")
			$('#fightChat').append('你的回合')
			$('#fightPanel').show()
		}
		else{
			$('#fightChat').append('你的'+oppositeMonster["name"]+'對對手的'+myMonster["name"]+"造成了"+RealAtk+"傷害\n")
		}
	})
	// 處理使用者不接受戰鬥的情況
	socket.on('unaccept',function(){
		socket.emit('closeRoom',socket.id+"_")
		alert("使用者不接受戰鬥")
	})
	//處理勝負判定
	socket.on('justify',function(winner){
		//勝利
		if (socket.id == winner){
			alert("U win")
			$('#fightPanel').hide()
		}
		//失敗
		else{
			alert("U lose")
			$('#fightPanel').hide()
		}
		//戰鬥結束關閉房間
		socket.emit("closeRoom",roomID)
		oppositeID = ""
		roomID = ""
		roomInform = {}
	})
	socket.on("disconnect",function(socketID){
		$("#"+socketID).remove()
	})


