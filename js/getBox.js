$(document).ready(function() {
	getMyBox();

	
});
function setLeader(monsterID,monsterLevel){
	
	alert(monsterID);

	localStorage.leader=monsterID;
	localStorage.leaderLV=monsterLevel;
}

function getMyBox(){
			
	var serverUrl = "http://140.136.150.71:20003/api/getBox";
			//"http://140.136.150.71:20003/api/monster?user=1&lat=121.512386&lon=25.051269"; 
			//position.coords.latitude,position.coords.longitude
	$.ajax({
		type:"GET",
		url:serverUrl,
		data:"session="+localStorage.session,
		dataType:"JSONP",
		jsonpCallback:"getBox",
		success:function(returnData){
			var monsterList=returnData.data;

			$("#boxTable").append("<tbody>");
				for(var i = 0 ;i<monsterList.length;i++){
							
					$("#boxTable").append("	<tr class=\"pet\" onclick=\"setLeader("+monsterList[i]["mid"]+","+monsterList[i]["level"]+")\" ><td>"+monsterList[i]["mid"]
						+"</td><td>"+monsterList[i]["name"]+"</td><td>"
						+monsterList[i]["level"]+"</td><td>"
						+monsterList[i]["bid"]+"</td></tr>");		
				}
				$("#boxTable").append("</tbody>");
						

		}
	});
}