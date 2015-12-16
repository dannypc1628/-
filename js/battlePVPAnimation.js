var userHP=100;
var enemyHP=20;
var userHPMax=100.00;
var enemyHPMax=20.00;
var userAttack=5;
var enemyAttack=10;
var skillAttack=10;
var enemySkillAttack=10;
var width=$(window).width();
var height=$(window).height();
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
      	window.open('testMap.html', '_self', ''); window.close();
    });
	
}
function lose(){
	swal({
		title: "lose",  

		closeOnConfirm: false 
	}, 
	function(){   
      	window.open('testMap.html', '_self', ''); window.close();
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
		$('#user').transition({x:width*(80/100),y:height*(-90/100)},100,'ease')
		.transition({x:width*(-25/100),y:height*(-10/100)},500,'ease');
	});
}
function userskl(){
	$('#Projectile').transition({x:0,y:0,rotate:'0deg',scale:1},10)
	switch(localStorage.leader){
		case '1':
			skill1(0);
			break;
		case '2':
			skill2(0);
			break;
		case '3':
			skill3(0);
			break;
		case '4':
			skill4(0);
			break;
		case '5':
			skill5(0);
			break;
		case '6':
			skill6(0);		
			break;
		case '7':
			skill7(0);
			break;
		default:
			skill6(0);
			break;
	}
}
function enemyAtk(){
	$('#enemy').transition({x:width*(-30/100),y:height*(80/100), delay: 600},100,'ease')
	.transition({x:width*(80/100),y:height*(-5/100)},500,'ease',function(){
		$('#listBtn').show(1);
	})
}
function enemyskl(){
	$('#Projectile').transition({x:0,y:0,rotate:'0deg',scale:1},10)
	switch(localStorage.oppositeMonster){
		case '1':
			skill1(1);
			break;
		case '2':
			skill2(1);
			break;
		case '3':
			skill3(1);
			break;
		case '4':
			skill4(1);
			break;
		case '5':
			skill5(1);
			break;
		case '6':
			skill6(1);		
			break;
		case '7':
			skill7(1);
			break;
		default:
			skill6(1);
			break;
	}
}
function skill1(site){
	$('#Projectile').attr('src','img/skill1.png');
	if(site==0){
		$('#listBtn').hide(1,function(){
			$('#Projectile').transition({x:width*(45/100),y:height*(-40/100)},100)
			.transition({opacity:1},100).transition({opacity:0},1000)
			.transition({x:0,y:0},100);
		});
	}else{
		$('#Projectile').transition({opacity:1},100).transition({opacity:0},1000,function(){
			$('#listBtn').show();
		});
	}
}
function skill2(site){
	$('#Projectile').attr('src','img/skill2.png');
	if(site==0){
		$('#Projectile').transition({rotate: '-90deg'},10);
		$('#listBtn').hide(1,function(){
			$('#Projectile').transition({opacity:1},100)
			.transition({x:width*(50/100),y:height*(-35/100)},1000)
			.transition({opacity:0},100).transition({x:0,y:0},100);
		});
	}else{
		$('#Projectile').transition({rotate: '90deg'},10);
		$('#Projectile').transition({x:width*(50/100),y:height*(-30/100)},100)
		.transition({opacity:1},100).transition({x:0,y:0},1000)
		.transition({opacity:0},100,function(){
			$('#listBtn').show();
		});
	}
}
function skill3(site){
	$('#Projectile').attr('src','img/skill3.png');
	$('#Projectile').transition({scale:0.5},10)
	if(site==0){
		$('#listBtn').hide(1,function(){
			
			$('#Projectile').transition({opacity:1},100)
			.transition({x:width*(35/100),y:height*(-35/100),scale:1.5},1000,'snap')
			.transition({opacity:0},10).transition({x:0,y:0,scale:1},10);
		});
	}else{
		$('#Projectile').transition({x:width*(35/100),y:height*(-35/100)},10)
		.transition({opacity:1},100).transition({x:0,y:0,scale:1.5},1000,'snap')
		.transition({opacity:0},100,function(){
			$('#listBtn').show();
		});
	}
}
function skill4(site){
	$('#Projectile').attr('src','img/skill4.png');
	if(site==0){
		$('#Projectile').transition({rotate: '-135deg'},100);
		$('#listBtn').hide(1,function(){
			$('#Projectile').transition({opacity:1},100)
			.transition({x:width*(35/100),y:height*(-40/100)},1000,'easeInBack')
			.transition({opacity:0},100).transition({x:0,y:0},100);

		});
	}else{
		$('#Projectile').transition({rotate: '45deg'},10);
		$('#Projectile').transition({x:width*(35/100),y:height*(-40/100)},10)
		.transition({opacity:1},10)
		.transition({x:0,y:0},1000,'easeInBack')
		.transition({opacity:0},10,function(){
			$('#listBtn').show();
		});
	}
}
function skill5(site){
	$('#Projectile').attr('src','img/skill5.png');
	if(site==0){

		$('#listBtn').hide(1,function(){
			$('#Projectile').transition({opacity:1},100)
			.transition({x:width*(50/100),y:height*(-35/100),rotate:'540deg'},1000,'easeInBack')
			.transition({opacity:0},100).transition({x:0,y:0,rotate:0},100);
		});
	}else{
		$('#Projectile').transition({x:width*(50/100),y:height*(-35/100),rotate:0},10)
		.transition({opacity:1},10)
		.transition({x:0,y:0,rotate:'-540deg'},1000,'easeInBack')
		.transition({opacity:0},10,function(){
			$('#listBtn').show();
		});
	}	
}
function skill6(site){
	$('#Projectile').attr('src','img/skill6.png');
	if(site==0){
		$('#Projectile').transition({rotate: '-180deg'},10);
		$('#listBtn').hide(1,function(){
			$('#Projectile').transition({opacity:1},10)
			.transition({x:width*(50/100),y:height*(-35/100),rotate: '-180deg'},1000,'easeInBack')
			.transition({opacity:0},100).transition({x:0,y:0,rotate: '0deg'},10);
		});
	}else{
		$('#Projectile').transition({x:width*(50/100),y:height*(-35/100)},10)
		.transition({opacity:1},10).transition({x:0,y:0},1000,'easeInBack')
		.transition({opacity:0},10,function(){
			$('#listBtn').show();
		});
	}
}
function skill7(site){
	$('#Projectile').attr('src','img/skill7.png');
	if (site==0) {
		$('#listBtn').hide(1,function(){
			$('#Projectile').transition({opacity:1},10)
			.transition({x:width*(50/100),y:height*(-35/100)},1000,'easeInBack')
			.transition({opacity:0},10).transition({x:0,y:0},10);
		});
	}else{
		$('#Projectile').transition({x:width*(50/100),y:height*(-35/100)},10)
		.transition({opacity:1},10).transition({x:0,y:0},1000,'easeInBack')
		.transition({opacity:0},10,function(){
			$('#listBtn').show();
		});
	}
}