var monsterList = [
	{monsterID:0, monsterName:"莫來管" , monsterHP:1,monsterAttack:0,HPCoe:0,AttackCoe:0},
	{monsterID:1, monsterName:"小白喵" , monsterHP:20,monsterAttack:20,HPCoe:2,AttackCoe:2},
	{monsterID:2, monsterName:"小狐狸" , monsterHP:30,monsterAttack:20,HPCoe:6,AttackCoe:1},
	{monsterID:3, monsterName:"狗"     , monsterHP:20,monsterAttack:30,HPCoe:1,AttackCoe:5},
	{monsterID:4, monsterName:"小水喵" , monsterHP:28,monsterAttack:24,HPCoe:3,AttackCoe:2},
	{monsterID:5, monsterName:"木手喵" , monsterHP:27,monsterAttack:27,HPCoe:1,AttackCoe:4},
	{monsterID:6, monsterName:"火苗喵" , monsterHP:24,monsterAttack:28,HPCoe:2,AttackCoe:3},
	{monsterID:7, monsterName:"皮卡喵" , monsterHP:30,monsterAttack:26,HPCoe:4,AttackCoe:4}
];
$(document).ready(function() {
	getMyBox();

	
});
function setLeader(monsterID,monsterLevel){
	
	swal({   
		title: "設成隊長?",   
		showCancelButton: true,   
		imageUrl: "img/monster"+monsterID+".png", 
		confirmButtonText: "更換",
		cancelButtonText: "取消",
	},
	function(isconfirm){
		if (isconfirm) {
			localStorage.leader=monsterID;
			localStorage.leaderLV=monsterLevel;
		}
	});
}

function getMyBox(){
			
	var serverUrl = "http://andy-lin.info:20003/api/getBox";
			//"http://andy-lin.info:20003/api/monster?user=1&lat=121.512386&lon=25.051269"; 
			//position.coords.latitude,position.coords.longitude
	$.ajax({
		type:"GET",
		url:serverUrl,
		data:"session="+localStorage.session,
		dataType:"JSONP",
		jsonpCallback:"getBox",
		success:function(returnData){
			var bagList=returnData.data;
			
			$("#boxTable").append("<tbody>");
				for(var i = 0 ;i<bagList.length;i++){
					var monsHp=monsterList[bagList[i].mid].monsterHP+bagList[i].level*monsterList[bagList[i].mid].HPCoe;	
					var monsAttack=monsterList[bagList[i].mid].monsterAttack+bagList[i].level*monsterList[bagList[i].mid].AttackCoe;	
					$("#boxTable").append("	<tr class=\"pet\" onclick=\"setLeader("+bagList[i]["mid"]+","+bagList[i]["level"]+")\" ><td>"+"<img src='img/monster"+bagList[i].mid+".png'  style='height: 100px; width: auto;'>"
						+"</td><td>"+bagList[i]["name"]+"</td><td>"
						+bagList[i]["level"]+"</td><td>"
						+monsHp+"</td><td>"+monsAttack+"</td></tr>");		
				}
				$("#boxTable").append("</tbody>");
						

		}
	});
}