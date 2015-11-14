var monsterList = [
					{monsterID:1, monsterName:"hh" , monsterHP:10},
					{monsterID:2, monsterName:"aaa" , monsterHP:15},
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
		
		$("#monsterTable").append("	<tr><td>"+monsterList[i].monsterID
			+"</td><td>"+monsterList[i].monsterName+"</td><td>"
			+monsterList[i].monsterHP+"</td></tr>");		
	}
	$("#monsterTable").append("</tbody>");

};



function addNewMonsterInBox(monsterID){
			
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