

$(document).ready(function() {
	getMonsterList();

});


function getMonsterList(){

	$("#monsterTable").append("<tbody>");
	for(var i = 1 ;i<monsterList.length;i++){
		
		$("#monsterTable").append("<tr><td><img src='img/monster"+i+".png'  style='height: 100px; width: auto;'></td><td>"+monsterList[i].monsterID
			+"</td><td>"+monsterList[i].monsterName+"</td><td>"
			+monsterList[i].monsterHP+"</td><td>"+monsterList[i].monsterAttack+"</td></tr>");		
	}
	$("#monsterTable").append("</tbody>");

};

