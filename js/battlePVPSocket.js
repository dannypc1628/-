var socket = io.connect('http://localhost:20005');//連上Socket.io Server
socket.emit('joinPVPBattle',localStorage.oldSocketID,localStorage.userName,
        	localStorage.userID,localStorage.whoInvitedYou);

var onlineUser = [];
var oppositeID = "";
var roomInform = {};
var roomID = "";
var battleRoomName;

     

socket.on('battleRoomState',function(msg){
	console.log(msg);
	if(msg ==(localStorage.userName+" 進入房間")){
		console.log(msg);
		battleRoomName = localStorage.whoInvitedYou+"_";
		
	}
	if(msg == "雙方已經在房間裡，請使用隊長進行戰鬥，戰鬥即將開始"){
		console.log(msg);
		
	}

});

	//不合法的操作
	socket.on("illegalOperator",function(msg){
		alert(msg)
	})
	// 處理使用者選擇怪物成功
	socket.on("chooseMonsterSuccess",function(){
		console.log("成功收到選擇的怪物");

	})
	//處理對方攻擊廣播
	socket.on("oppositeAtack",function(msg){
		console.log(socket.id+"使用招式 "+msg);
		if(msg==1)
			oppositeAtack();
		if(msg==2)
			oppositeAtackUsingSkill();
	});

	// 處理使用者不接受戰鬥的情況
	socket.on('unaccept',function(){
		socket.emit('closeRoom',socket.id+"_")
		alert("使用者不接受戰鬥")
	})

	socket.on("disconnect",function(socketID){
		$("#"+socketID).remove()
	})


