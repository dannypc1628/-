$(document).ready(function() {
	getFriendList();

});

function getFriendList(){
			
			var serverUrl = "http://140.136.150.71:20003/api/getFriendList";
			//"http://140.136.150.71:20003/api/monster?user=1&lat=121.512386&lon=25.051269"; 
			//position.coords.latitude,position.coords.longitude
			$.ajax({
				type:"GET",
				url:serverUrl,
				data:"session="+localStorage.session,
				dataType:"JSONP",
				jsonpCallback:"friendList",
				success:function(returnData){
					if(returnData.status=="200"){
						
						$("#friendTable").append("<tbody>");
						for(var i = 0 ;i<monsterList.length;i++){
							
							$("#friendTable").append("	<tr><td>"+monsterList[i].monsterID
								+"</td><td>"+monsterList[i].monsterName+"</td><td>"
								+monsterList[i].monsterHP+"</td></tr>");		
						}
						$("#friendTable").append("</tbody>");
						
					}
					
					else{
						alert("失敗。 錯誤代碼 = "+returnData.status+" 錯誤訊息="+returnData.msg);
					}

				}
			});
		}

function check(){

			if(addFriendForm.username.value==""){
				alert("不可以空白");
			}
			
			else{
				addNewFriend(addFriendForm.username.value);//執行新增會員
			}
			
		}

function addNewFriend(newFriendUserID){
			
			var serverUrl = "http://140.136.150.71:20003/api/addFriend";
			//"http://140.136.150.71:20003/api/monster?user=1&lat=121.512386&lon=25.051269"; 
			//position.coords.latitude,position.coords.longitude
			$.ajax({
				type:"GET",
				url:serverUrl,
				data:"session="+localStorage.session+"&userID="+newFriendUserID,
				dataType:"JSONP",
				jsonpCallback:"addFriend",
				success:function(returnData){
					if(returnData.status=="207"){
						alert('新增 '+newFriendUserID+' 為好友 \n成功');
						
					}
					
					else{
						alert("失敗。 錯誤代碼 = "+returnData.status+" 錯誤訊息="+returnData.msg);
					}

				}
			});
		}