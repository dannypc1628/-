var userHP=100;
var enemyHP=20;
var userHPMax=100.00;
var enemyHPMax=20.00;
var userAttack=5;
var enemyAttack=10;
var skillAttack=10;
var enemySkillAttack=10;

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
		socket.emit('userAtackOpposite',battleRoomName, 1);
		userAtack();
	});



	$('#skill').click(function(){	
		socket.emit('userAtackOpposite',battleRoomName, 2);
		userAtackUsingSkill();
	});

});


function userAtack(){
		userAtk();
		enemyHP=enemyHP-userAttack;
		$('#enemyHPValue').css("left",function(i){return enemyHP*100/enemyHPMax+"%";});
		$('#enemyHPValue').css("width",function(i){return 100-(enemyHP*100/enemyHPMax)+"%";});
			
		if(enemyHP<=0){
			win();
			socket.emit("battleIsFinish",battleRoomName);
		}
	}

function userAtackUsingSkill(){
		userskl();
		enemyHP=enemyHP-skillAttack;
		$('#enemyHPValue').css("left",function(i){return enemyHP*100/enemyHPMax+"%";});
		$('#enemyHPValue').css("width",function(i){return 100-(enemyHP*100/enemyHPMax)+"%";});
		if(enemyHP<=0){
			win();
			socket.emit("battleIsFinish",battleRoomName);
		}
}


function oppositeAtack(){
		enemyAtk();
		userHP=userHP-enemyAttack;
		$('#userHPValue').css("left",function(i){return userHP*100/userHPMax+"%";});
		$('#userHPValue').css("width",function(i){return 100-(userHP*100/userHPMax)+"%";});
			
		if(userHP<=0){
			lose();
		}
	}

function oppositeAtackUsingSkill(){
		enemyskl();
		userHP=userHP-enemySkillAttack;
		$('#userHPValue').css("left",function(i){return userHP*100/userHPMax+"%";});
		$('#userHPValue').css("width",function(i){return 100-(userHP*100/userHPMax)+"%";});
			
		if(userHP<=0){
			lose();
		}
}

		

function win(){
	 
	// $.ajax({
		
	// 	type:"GET",
	// 	url:serverUrlBattlePVPWin,
	// 	data:"session="+localStorage.session+"&monsterID=1",
	// 	dataType:"JSONP",
	// 	jsonpCallback:"userdata",
	// 	success:function(returnData){
					
	// 	},
	// });
	$('#enemy').transition({scale:0});
	swal({
		title: "Win",  

		closeOnConfirm: false 
	}, 
	function(){   
      	window.open('', '_self', ''); window.close();
    });
	
}
function lose(){
	swal({
		title: "lose",  

		closeOnConfirm: false 
	}, 
	function(){   
      	window.open('', '_self', ''); window.close();
    });


}

function setMonster(){
	$('#user').attr("src","img/monster"+localStorage.leader+".png");
	userHP=monsterList[localStorage.leader].monsterHP+localStorage.leaderLV*monsterList[localStorage.leader].HPCoe;
	enemyHP=monsterList[localStorage.oppositeMonster].monsterHP+localStorage.oppositeMonsterLV*monsterList[localStorage.oppositeMonster].HPCoe;;
	userHPMax=monsterList[localStorage.leader].monsterHP+localStorage.leaderLV*monsterList[localStorage.leader].HPCoe;
	enemyHPMax=enemyHP;
	userAttack=monsterList[localStorage.leader].monsterAttack+localStorage.leaderLV*monsterList[localStorage.leader].AttackCoe;
	enemyAttack=monsterList[localStorage.oppositeMonster].monsterAttack+localStorage.oppositeMonsterLV*monsterList[localStorage.oppositeMonster].AttackCoe;;
	skillAttack=userAttack*1.5;
	enemySkillAttack=enemyAttack*1.5;
}
function userAtk(){
	$('#listBtn').hide(1,function(){
		$('#user').transition({x:600,y:-1200},100,'ease').transition({x:-250,y:-300},500,'ease');
	});
}
function userskl(){
	$('#listBtn').hide(1,function(){
		$('#Projectile').transition({opacity:1},100).transition({x:-450,y:600,rotate: '-180deg'},1000,'easeInBack').transition({opacity:0},100).transition({x:0,y:0,rotate: '-180deg'},100,'ease');
	});
}
function enemyAtk(){
	$('#enemy').transition({x:-300,y:1000, delay: 600},100,'ease').transition({x:900,y:-70},500,'ease',function(){
		$('#listBtn').show(1);
	});
}
function enemyskl(){
	$('#listBtn').show(1);	
}