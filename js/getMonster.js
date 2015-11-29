var monsterList = [
					{monsterID:1, monsterName:"小白喵" , monsterHP:20,monsterAttack:20,HPCoe:2,AttackCoe:2},
					{monsterID:2, monsterName:"小狐狸" , monsterHP:30,monsterAttack:20,HPCoe:6,AttackCoe:1},
					{monsterID:3, monsterName:"狗"     , monsterHP:20,monsterAttack:30,HPCoe:1,AttackCoe:5},
					{monsterID:4, monsterName:"小水喵" , monsterHP:28,monsterAttack:24,HPCoe:3,AttackCoe:2},
					{monsterID:5, monsterName:"木手喵" , monsterHP:27,monsterAttack:27,HPCoe:1,AttackCoe:4},
					{monsterID:6, monsterName:"火苗喵" , monsterHP:24,monsterAttack:28,HPCoe:2,AttackCoe:3},
					{monsterID:7, monsterName:"皮卡喵" , monsterHP:30,monsterAttack:26,HPCoe:4,AttackCoe:4}
					];

$(document).ready(function() {
	getMonsterList();

});


function getMonsterList(){
	//var tableRowLengthNumber = document.getElementById("monsterTable").rows.length;
	//var newTr = document.getElementById("monsterTable").insertRow(tableRowLengthNumber);
	//var temp;
	$("#monsterTable").append("<tbody>");
	for(var i = 0 ;i<monsterList.length;i++){
		
		$("#monsterTable").append("<tr><td><img src='img/monster"+(i+1)+".png'  style='height: 100px; width: auto;'></td><td>"+monsterList[i].monsterID
			+"</td><td>"+monsterList[i].monsterName+"</td><td>"
			+monsterList[i].monsterHP+"</td><td>"+monsterList[i].monsterAttack+"</td></tr>");		
	}
	$("#monsterTable").append("</tbody>");

};



/*function addNewMonsterInBox(monsterID){
			
			var serverUrl = "http://140.136.150.71:20003/api/addMonsterInBox";
			//"http://140.136.150.71:20003/api/monster?user=1&lat=121.512386&lon=25.051269"; 
			//position.coords.latitude,position.coords.longitude
			$.ajax({
				type:"GET",
				url:serverUrl,
				data:"session="+localStorage.session+"&monsterID="+monsterID,
				dataType:"JSONP",
				jsonpCallback:"newMonster",
				success:function(returnData){
					if(returnData.status=="200"){
						alert('新增 '+newFriendName+' 為好友 \n 成功');
						
					}
					
					else{
						alert("失敗。 錯誤代碼 = "+returnData.status+" 錯誤訊息="+returnData.msg);
					}

				}
			});
		}
		*/
