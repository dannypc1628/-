$(document).ready(function() {
	getBox();

});

function getBox(){
			
			var serverUrl = "http://140.136.150.71:20003/api/getBox";
			//"http://140.136.150.71:20003/api/monster?user=1&lat=121.512386&lon=25.051269"; 
			//position.coords.latitude,position.coords.longitude
			$.ajax({
				type:"GET",
				url:serverUrl,
				data:"session="+localStorage.session,
				dataType:"JSONP",
				jsonpCallback:"fr",
				success:function(returnData){
					if(returnData.status=="200"){
						var monsterList=returnData.data;
						$("#boxTable").append("<tbody>");
						for(var i = 0 ;i<monsterList.length;i++){
							
							$("#boxTable").append("	<tr><td>"+monsterList[i]["mid"]
								+"</td><td>"+monsterList[i]["name"]+"</td><td>"
								+monsterList[i]["bid"]+"</td></tr>");		
						}
						$("#boxTable").append("</tbody>");
						
					}
					
					else{
						alert("失敗。 錯誤代碼 = "+returnData.status+" 錯誤訊息="+returnData.msg);
					}

				}
			});
		}
