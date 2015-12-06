		//userdata({"userName": "123", "status": "201", "session": "Xt4nv78kCXcA8eMNFg9ICRahqs9suTJQ"});
		//在還沒有完全載入這個網頁時，先執行這段程式碼
		$(document).ready(function() {
			$("#loading").hide();
			$("#home").hide(); //隱藏首頁
			
			if(localStorage.loginCount>=1){//如果登入次數大於一就顯示使用者名稱
				loginForm.username.value=localStorage.userName;
				$("#login").hide();
			}
			else{//沒有的話就使用本地儲存，變數名稱loginCount
				localStorage.loginCount=0;
				$("#gamestart").hide();
			}

			if (localStorage.pageCount>=1){//如果登入次數大於等於一就加一
		  		localStorage.pageCount=Number(localStorage.pageCount) +1;
		  		
		  	}
			else{//你懂的
			 localStorage.pageCount=1;
			 }
			 //在#topBar顯示
			 $("#topBar").html("您第 "+ localStorage.pageCount + " 次來到這裡，您登入次數="+ localStorage.loginCount );
		});

		
		//清除本地儲存的所有資料
		function clearLocalStorage(){
			localStorage.clear();
 			parent.location.reload();
 			 document.getElementById("topBar").innerHTML="暫存資料已經清除";
		}

		//當使用者按了登入後所作的處理
		function check(){

			if(loginForm.username.value==""){
				swal("錯誤!","會員名稱不可以為空白","error");
			}
			else if (localStorage.loginCount>=1){//登入次數大於一就是老會員
		  		localStorage.loginCount=Number(localStorage.loginCount) +1;
		  		login();//執行登入
		  	}
			else{//否則就是新會員
				localStorage.loginCount=1;
			 	loginAddNewUser();//執行新增會員
			}
			
		}
		//userdata({"userName": "123", "status": "201", "session": "Xt4nv78kCXcA8eMNFg9ICRahqs9suTJQ"});
		//新增會員
		function loginAddNewUser(){
			var userName = loginForm.username.value;
			$("#loading").show();
			$.ajax({
				type:"GET",
				url:serverUrlFirstLoginAddNewUser,
				data:"username="+userName,
				dataType:"JSONP",
				jsonpCallback:"userdata",
				success:function(returnData){

					swal('歡迎加入!','新會員 '+returnData.user+' 您好', "success");
					$('#login').hide();
					$('#home').fadeIn(); 
					$("#loading").hide();
					//$('#view').fadeIn();
					$("#topBar").html("<b>Hello "+returnData.user+"</b>"); 
					localStorage.session=returnData.session;
					localStorage.userID=returnData.user_id;
					localStorage.userName=returnData.user; 
					localStorage.leader=1;
					localStorage.leaderLV=1;
					localStorage.oppositeMonster = 1;
					localStorage.oppositeMonsterLV = 1;
				},
			});
		}

		//登入
		function login(){
			var userName = loginForm.username.value;
			$("#loading").show();
			$.ajax({
				type:"GET",
				url:serverUrlLogin,
				data:"session="+localStorage.session,
				dataType:"JSONP",
				jsonpCallback:"loginstat",
				success:function(returnData){
					swal('登入成功!', '會員 '+localStorage.userName+' 您好', "success");
					$('#gamestart').hide();
					$("#loading").hide();
					$('#home').fadeIn(); 
					//$('#view').fadeIn();
					$("#topBar").html("<b>Hello "+localStorage.userName+" !</b>");
					localStorage.userID=returnData.uid; 
					localStorage.oppositeMonster = 1;
					localStorage.oppositeMonsterLV = 1;
				},
			});
		}

		function goToMap(){
			//$("#view").html("<iframe src=\"testMap.html\"></iframe>");
			window.open('testMap.html');		
		}

		function goToBox(){
			$("#view").html("<iframe src=\"box.html\"></iframe>");
					
		}

		function goToMonsterList(){
			$("#view").html("<iframe src=\"monster.html\"></iframe>");
					
		}

		function goToFriendList(){
			$("#view").html("<iframe src=\"friend.html\"></iframe>");
					
		}

