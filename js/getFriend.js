$(document).ready(function() {
	getFriendList();
	$('p').append(localStorage.userID);
});

function getFriendList(){
	$.ajax({
		type:"GET",
		url:serverUrlGetFriendList,
		data:"session="+localStorage.session,
		dataType:"JSONP",
		jsonpCallback:"friendList",
		success:function(returnData){
			
			var friendData = returnData.data;
			
				$("#friendTable").append("<tbody>");
				for(var i = 0 ;i<friendData.length;i++){
					
					$("#friendTable").append("	<tr><td>"+friendData[i]["username"]
						+"</td><td>"+friendData[i]["uid"]+"</td><td>"
						+friendData[i]["capital"]["name"]+"</td></tr>");		
				}
				$("#friendTable").append("</tbody>");
				
		}
	});
}

function checkFriend(){

	if(addFriendForm.username.value==""){
		alert("不可以空白");
	}
	
	else{
		addNewFriend(addFriendForm.username.value);//執行新增會員
	}
	
}

function addNewFriend(newFriendUserID){
//<<<<<<< HEAD
//=======
			
			//"http://140.136.150.71:20003/api/monster?user=1&lat=121.512386&lon=25.051269"; 
			//position.coords.latitude,position.coords.longitude
//>>>>>>> origin/gh-pages
			$.ajax({
				type:"GET",
				url:serverUrlAddNewFriend,
				data:"session="+localStorage.session+"&userID="+newFriendUserID,
				dataType:"JSONP",
				jsonpCallback:"addFriend",
				success:function(returnData){
					if(returnData.status=="207"){
						swal("新增成功!",'新增 '+newFriendUserID+' 為好友', "success");
						
					}
					
					else{
						swal("失敗。 錯誤代碼 = "+returnData.status+" 錯誤訊息="+returnData.msg,"error");
					}

				}
			});
		}