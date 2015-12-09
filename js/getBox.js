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
var bagList;
$(document).ready(function() {
	getMyBox();

	
});
function setList(monsterID,monsterLevel,bid){
	
	swal({
		title:"",
		imageUrl: "img/monster"+monsterID+".png", 
		showCancelButton: true,  
		showConfirmButton:false,
		closeOnConfirm:false,
		text:"<a class='myButton' onclick='eatMonster("+monsterID+","+bid+")'>合成</a>"+
		"<a class='myButton' onclick='releaseMonster("+monsterID+","+bid+")'>放生</a>"+
		"<a class='myButton' onclick='setLeader("+monsterID+","+monsterLevel+","+bid+")'>設為隊長</a>",
		html:true, 
		cancelButtonText: "取消",
	},function(){
		
	});
}
//{"name": "\u5c0f\u767d\u55b5", "level": 1, "attribute": 1, "bid": 244, "mid": 1, "capital": true}
//andy-lin.info:20003/api/eatMonster?session=使用者id&eatedMonster=被吃的怪物的BID&eatMonster=吃掉的怪物的bid
function eatMonster(monsterID,eatBid){
	swal.close();
	$(".pet").hide();
	//選要吃哪隻(列表)
	$("#boxTable").append("<tbody>");
	for(var i = 0 ;i<bagList.length;i++){
		var monsHp=monsterList[bagList[i].mid].monsterHP+bagList[i].level*monsterList[bagList[i].mid].HPCoe;	
		var monsAttack=monsterList[bagList[i].mid].monsterAttack+bagList[i].level*monsterList[bagList[i].mid].AttackCoe;	
		if(bagList[i].bid==eatBid||bagList[i].capital==true){
			i++;
		}

		$("#boxTable").append(
			"<tr class='pet' onclick='sentToServer("+eatBid+","+bagList[i].bid+")'><td>"+
			"<img src='img/monster"+bagList[i].mid+".png'  style='height: 100px; width: auto;'>"
			+"</td><td>"+bagList[i]["name"]+"</td><td>"
			+bagList[i]["level"]+"</td><td>"
			+monsHp+"</td><td>"+monsAttack+"</td></tr>");		
	

	}
	$("#boxTable").append("</tbody>");



}

function sentToServer(eatBid,eatedBid){
	//送合成訊息給server
	$.ajax({
				type:"GET",
				url:serverUrlEatMonster,
				data:"session="+localStorage.session+"&eatedMonster="+eatedBid+"&eatMonster="+eatBid,
				dataType:"JSONP",
				jsonpCallback:"combineMonster",
				success:function(returnData){
					swal("合成成功","success");
					swal({   
						title: "合成成功",   
						type:"success",  
						confirmButtonText: "確定",
						closeOnConfirm:true
					},
					function(isconfirm){
						window.location.reload();
					});
				},
			});
}
var bugRelease=true;
function releaseMonster(monsterID,bid){
	
	if(bugRelease===true){
	swal({   
		title: "確認放生?",   
		showCancelButton: true,   
		imageUrl: "img/monster"+monsterID+".png", 
		confirmButtonText: "確定",
		cancelButtonText: "取消",
		closeOnConfirm:true
	},
	function(isconfirm){
		//andy-lin.info:20003/api/api/api/releaseMonster?session=使用者id&bid=BJ4
		
		if (isconfirm) {
			
			$.ajax({
				type:"GET",
				url:serverUrlReleaseMonster,
				data:"session="+localStorage.session+"&bid="+bid,
				dataType:"JSONP",
				jsonpCallback:"releaseMonster",
				success:function(returnData){
					window.location.reload();
					
				},
			});
			
		}
	});
	bugRelease=false;
	
	}

}
function setLeader(monsterID,monsterLevel,bid){
		
	swal({   
		title: "設成隊長?",   
		showCancelButton: true,   
		imageUrl: "img/monster"+monsterID+".png", 
		confirmButtonText: "更換",
		cancelButtonText: "取消",
		closeOnConfirm:true
	},
	function(isconfirm){
		//andy-lin.info:20003/api/api/setCapital?session=使用者id&bid=BJ4

		if (isconfirm) {
			localStorage.leader=monsterID;
			localStorage.leaderLV=monsterLevel;
			$.ajax({
				type:"GET",
				url:serverUrlSetLeader,
				data:"session="+localStorage.session+"&bid="+bid,
				dataType:"JSONP",
				jsonpCallback:"setCapital",
				success:function(returnData){
					window.location.reload();
					
				},
			});
		}
	});
}

function getMyBox(){
	$.ajax({
		type:"GET",
		url:serverUrlGetMyBox,
		data:"session="+localStorage.session,
		dataType:"JSONP",
		jsonpCallback:"getBox",
		success:function(returnData){
			bagList=returnData.data;
			
			$("#boxTable").append("<tbody>");
				for(var i = 0 ;i<bagList.length;i++){
					var monsHp=monsterList[bagList[i].mid].monsterHP+bagList[i].level*monsterList[bagList[i].mid].HPCoe;	
					var monsAttack=monsterList[bagList[i].mid].monsterAttack+bagList[i].level*monsterList[bagList[i].mid].AttackCoe;	
					$("#boxTable").append("	<tr class='pet' onclick='setList("+bagList[i]["mid"]+","+bagList[i]["level"]+","+bagList[i]["bid"]+")' ><td>"+"<img src='img/monster"+bagList[i].mid+".png'  style='height: 100px; width: auto;'>"
						+"</td><td>"+bagList[i]["name"]+"</td><td>"
						+bagList[i]["level"]+"</td><td>"
						+monsHp+"</td><td>"+monsAttack+"</td></tr>");		
				}
				$("#boxTable").append("</tbody>");
						

		}
	});
}