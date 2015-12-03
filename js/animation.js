var userHP=100;
var enemyHP=20;
var userHPMax=100.00;
var enemyHPMax=20.00;
var userAttack=5;
var enemyAttack=10;
var skillAttack=10;
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
$(document).ready(function(){
	setMonster();
	/*opening*/
	setTimeout(function(){
		$('#wrapMain').transition({opacity:1},450,
		function(){
			$('#user').transition({scale:0.5,x:-250,y:-300}).transition({ rotateY: '180deg'});
			$('#enemy').transition({scale:0.5,x:900,y:-70});
			$('.HP').transition({opacity:1},800);
			$('#Projectile').transition({rotate: '-180deg'},100);
		});
	});
	/*己方攻擊*/
	$('#attack').click(function(){
		$('#listBtn').hide(1,function(){
			$('#user').transition({x:600,y:-1200},100,'ease').transition({x:-250,y:-300},500,'ease',function(){
				enemyHP=enemyHP-userAttack;
				$('#enemyHPValue').css("left",function(i){return enemyHP*100/enemyHPMax+"%";});
				$('#enemyHPValue').css("width",function(i){return 100-(enemyHP*100/enemyHPMax)+"%";});
			
				if(enemyHP<=0){
					win();
				}else{
					userHP=userHP-enemyAttack;
				
					$('#enemy').transition({x:-300,y:1000, delay: 600},100,'ease').transition({x:900,y:-70},500,'ease',function(){
						$('#userHPValue').css("left",function(i){return userHP*100/userHPMax+"%";});
						$('#listBtn').show(1);
					});
				}
			});
		});
	});
	$('#skill').click(function(){
		$('#listBtn').hide(1,function(){
			$('#Projectile').transition({opacity:1},100).transition({x:-450,y:600,rotate: '-180deg'},1000,'easeInBack').transition({opacity:0},100).transition({x:0,y:0,rotate: '-180deg'},100,'ease',function(){
				enemyHP=enemyHP-skillAttack;
				$('#enemyHPValue').css("left",function(i){return enemyHP*100/enemyHPMax+"%";});
				$('#enemyHPValue').css("width",function(i){return 100-(enemyHP*100/enemyHPMax)+"%";});
				if(enemyHP<=0){
					win();
				}else{
					userHP=userHP-enemyAttack;
				
					$('#enemy').transition({x:-300,y:1000, delay: 600},100,'ease').transition({x:900,y:-70},500,'ease',function(){								
						$('#userHPValue').css("left",function(i){return userHP*100/userHPMax+"%";});
						$('#listBtn').show(1);
					});
				}
			});
		});
	});

});

function win(){
	var serverUrl = "http://andy-lin.info:20003/user/newMonster"; 
	$.ajax({
		
		type:"GET",
		url:serverUrl,
		data:"session="+localStorage.session+"&monsterID=1",

		dataType:"JSONP",
		jsonpCallback:"userdata",
		success:function(returnData){
					
		},
	});
	$('#enemy').transition({scale:0});
	swal({
		title: "Win",  

		closeOnConfirm: false 
	}, 
	function(){   
      	window.open('', '_self', ''); window.close();
    });
	
}
function setMonster(){
	$('#user').attr("src","img/monster"+localStorage.leader+".png");
	userHP=monsterList[localStorage.leader].monsterHP+localStorage.leaderLV*monsterList[localStorage.leader].HPCoe;
	enemyHP=80;
	userHPMax=monsterList[localStorage.leader].monsterHP+localStorage.leaderLV*monsterList[localStorage.leader].HPCoe;
	enemyHPMax=enemyHP;
	userAttack=monsterList[localStorage.leader].monsterAttack+localStorage.leaderLV*monsterList[localStorage.leader].AttackCoe;
	enemyAttack=10;
	skillAttack=userAttack*1.5;
}