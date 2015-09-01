		//userdata({"userName": "123", "status": "201", "session": "Xt4nv78kCXcA8eMNFg9ICRahqs9suTJQ"});
		//在還沒有完全載入這個網頁時，先執行這段程式碼
		$(document).ready(function() {
			$("#home").hide(); //隱藏首頁
			
			if(localStorage.loginCount>=1){//如果登入次數大於一就顯示使用者名稱
				loginForm.username.value=localStorage.userName;
			}
			else{//沒有的話就使用本地儲存，變數名稱loginCount
				localStorage.loginCount=0;
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
 
 			 document.getElementById("topBar").innerHTML="暫存資料已經清除";
		}

		//當使用者按了登入後所作的處理
		function check(){

			if(loginForm.username.value==""){
				alert("不可以空白");
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
			var serverUrl = "http://140.136.150.71:20003/user/add"; 
			
			$.ajax({
				type:"GET",
				url:serverUrl,
				data:"username="+userName,
				dataType:"JSONP",
				jsonpCallback:"userdata",
				success:function(returnData){
					alert('新會員 '+returnData.userName+' 您好');
					$('#login').hide();
					$('#home').fadeIn(); 
					//$('#view').fadeIn();
					$("#topBar").html("<b>Hello "+returnData.userName+"</b>"); 
					localStorage.session=returnData.session;
					localStorage.userName=returnData.userName; 
				},
			});
		}

		//登入
		function login(){
			var userName = loginForm.username.value;
			var serverUrl = "http://140.136.150.71:20003/user/login"; 
			
			$.ajax({
				type:"GET",
				url:serverUrl,
				data:"session="+localStorage.session,
				dataType:"JSONP",
				jsonpCallback:"loginstat",
				success:function(returnData){
					alert('登入成功\n會員 '+localStorage.userName+' 您好');
					$('#login').hide();
					$('#home').fadeIn(); 
					//$('#view').fadeIn();
					$("#topBar").html("<b>Hello "+localStorage.userName+" !</b>");
					localStorage.userId=returnData.uid; 
				},
			});
		}

		function goToMap(){
			$("#view").html("<iframe src=\"testMap.html\"></iframe>");
					
		}

		function goToBag(){
			$("#view").html("<b>背包功能未完成</b>");
					
		}

		function goToMonsterList(){
			$("#view").html("<div><b>圖鑑功能未完成</b></div>");
					
		}

		function goToFriendList(){
			$("#view").html("<div><table border=\"1\"><tr><th>好友名稱</th><th>可用寵物</th></tr><tr><td>無</td><td>無</td></tr><tr><td>無</td><td>無</td></tr></table></div>");
					
		}

