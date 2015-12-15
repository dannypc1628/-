var userHP=100;
var enemyHP=200;
var userHPMax=100.00;
var enemyHPMax=20.00;
var userAttack=5;
var enemyAttack=10;
var skillAttack=10;
var width=$(window).width();
var height=$(window).height();
$(document).ready(function(){
	document.getElementById('battleSound').play()
	setMonster();
	$('#listBtn').hide();
	/*opening*/
	setTimeout(function(){
		$('#wrapMain').transition({opacity:1},450,
		function(){
			$('#user').transition({scale:0.5,x:width*(-25/100),y:height*(-10/100)})
				.transition({ rotateY: '180deg'});
			$('#enemy').transition({scale:0.5,x:width*(80/100),y:height*(-5/100)});
			$('.HP').transition({opacity:1},800);
			$('#listBtn').show();
		});
	},300);
	/*己方攻擊*/
	$('#attack').click(function(){
		
		userAtk();
		socket.emit('userAtackOpposite',battleRoomName, 1);
		enemyHP=enemyHP-userAttack;
		setTimeout(function(){
			
			$('#enemyHPValue').css("left",function(i){return enemyHP*100/enemyHPMax+"%";});
			$('#enemyHPValue').css("width",function(i){return 100-(enemyHP*100/enemyHPMax)+"%";});
			
			if(enemyHP<=0){
				setTimeout(function(){
					win();
					socket.emit("battleIsFinish",battleRoomName);
				},2000);	
			}
		},100);
	});



	$('#skill').click(function(){	
		userskl();
		socket.emit('userAtackOpposite',battleRoomName, 2);
		enemyHP=enemyHP-skillAttack;
		setTimeout(function(){
			$('#enemyHPValue').css("left",function(i){return enemyHP*100/enemyHPMax+"%";});
			$('#enemyHPValue').css("width",function(i){return 100-(enemyHP*100/enemyHPMax)+"%";});
		
			if(enemyHP<=0){
				setTimeout(function(){
					win();
					socket.emit("battleIsFinish",battleRoomName);
				},2000);
			}
		},1000);
			
	
	});
	//$('#test').click(enemyskl());

});


function oppositeAtack(){

	userHP=userHP-enemyAttack;
	setTimeout(function(){
		enemyAtk();
		setTimeout(function(){
		
			$('#userHPValue').css("left",function(i){return userHP*100/userHPMax+"%";});
			$('#userHPValue').css("width",function(i){return 100-(userHP*100/userHPMax)+"%";});
	
			if(userHP<=0){
				setTimeout(function(){
					lose();
				},2000);
			}
		},700);	
	},500);

}


function oppositeSkill(){
				userHP=userHP-enemyAttack*1.5;
				setTimeout(function(){
					enemyskl();
				
				setTimeout(function(){
					$('#userHPValue').css("left",function(i){return userHP*100/userHPMax+"%";});
					$('#userHPValue').css("width",function(i){return 100-(userHP*100/userHPMax)+"%";});
					},600);
				
					if(userHP<=0){
						setTimeout(function(){
							lose();
						},2000);
					}
				},1000);
			}

function win(){

	$.ajax({
		
		type:"GET",
		url:serverUrlBattleWinGetNewMonster,
		data:"session="+localStorage.session+"&monsterID="+localStorage.oppositeMonster,
		dataType:"JSONP",
		jsonpCallback:"newMonster",
		success:function(returnData){
					
		},
	});
	$('#enemy').transition({scale:0});
	swal({
		title: "Win",  
		text:"<a class='myButton' href='testMap.html'>確定</a>",
		html:true,
		closeOnConfirm: false,
		showConfirmButton: false
	}, 
	function(){   
      	goToMap();
      	
    });
	
}
function lose(){
	$('#user').transition({scale:0});
	swal({
		title: "LOSE",  
		text:"<a class='myButton' href='testMap.html'>確定</a>",
		html:true,
		closeOnConfirm: false,
		showConfirmButton: false
	}, 
	function(){   
      	goToMap();
    });

}
function setMonster(){
	$('#user').attr("src","img/monster"+localStorage.leader+".png");
	$('#enemy').attr("src","img/monster"+localStorage.oppositeMonster+".png");
	userHP=monsterList[localStorage.leader].monsterHP
		+localStorage.leaderLV*monsterList[localStorage.leader].HPCoe;
	enemyHP=monsterList[localStorage.oppositeMonster].monsterHP
		+localStorage.oppositeMonsterLV*monsterList[localStorage.oppositeMonster].HPCoe;;
	
	userHPMax=userHP;
	enemyHPMax=enemyHP;
	
	userAttack=monsterList[localStorage.leader].monsterAttack
		+localStorage.leaderLV*monsterList[localStorage.leader].AttackCoe;
	enemyAttack=monsterList[localStorage.oppositeMonster].monsterAttack
		+localStorage.oppositeMonsterLV*monsterList[localStorage.oppositeMonster].AttackCoe;;
	skillAttack=userAttack*1.5;
}
function userAtk(){
	$('#listBtn').hide(1,function(){
		$('#user').transition({x:width*(80/100),y:height*(-90/100)},100,'ease')
		.transition({x:width*(-25/100),y:height*(-10/100)},500,'ease');
	});
}
function userskl(){
	
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
	}).delay(600);
}
function enemyskl(){
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
		$('#Projectile').transition({rotate: '-90deg'},100);
		$('#listBtn').hide(1,function(){
			$('#Projectile').transition({opacity:1},100)
			.transition({x:width*(50/100),y:height*(30/100)},1000)
			.transition({opacity:0},100).transition({x:0,y:0},100);
		});
	}else{
		$('#Projectile').transition({rotate: '90deg'},100);
		$('#Projectile').transition({x:width*(-50/100),y:height*(-30/100)},100)
		.transition({opacity:1},100).transition({x:0,y:0},1000)
		.transition({opacity:0},100,function(){
			$('#listBtn').show();
		});
	}
}
function skill3(site){
	$('#Projectile').attr('src','img/skill3.png');
	if(site==0){
		$('#listBtn').hide(1,function(){
			$('#Projectile').transition({scale:0.5},10)
			.transition({opacity:1},100)
			.transition({x:width*(25/100),y:height*(-25/100),scale:1.5},1000)
			.transition({opacity:0},100).transition({x:0,y:0},100);
		});
	}else{
		$('#Projectile').transition({x:width*(30/100),y:height*(-30/100),scale:0.5},10)
		.transition({opacity:1},100).transition({x:0,y:0,scale:1.5},1000)
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
			.transition({x:width*(15/100),y:height*(40/100)},1000,'easeInBack')
			.transition({opacity:0},100).transition({x:0,y:0},100);

		});
	}else{
		$('#Projectile').transition({rotate: '45deg'},10);
		$('#Projectile').transition({x:width*(-15/100),y:height*(-40/100)},10)
		.transition({opacity:1},10)
		.transition({x:0,y:0},700,'easeInBack')
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
			.transition({x:width*(50/100),y:height*(-35/100),rotate:'720deg'},1000,'easeInBack')
			.transition({opacity:0},100).transition({x:0,y:0,rotate:0},100);
		});
	}else{
		$('#Projectile').transition({x:width*(50/100),y:height*(-35/100),rotate:0},10)
		.transition({opacity:1},10)
		.transition({x:0,y:0,rotate:'-720deg'},700,'easeInBack')
		.transition({opacity:0},10,function(){
			$('#listBtn').show();
		});
	}	
}
function skill6(site){
	$('#Projectile').attr('src','img/skill6.png');
	if(site==0){
		$('#Projectile').transition({rotate: '-180deg'},100);
		$('#listBtn').hide(1,function(){
			$('#Projectile').transition({opacity:1},100)
			.transition({x:width*(-50/100),y:height*(35/100),rotate: '-180deg'},1000,'easeInBack')
			.transition({opacity:0},100).transition({x:0,y:0,rotate: '-180deg'},100);
		});
	}else{
		$('#Projectile').transition({x:width*(50/100),y:height*(-35/100)})
		.transition({opacity:1},100).transition({x:0,y:0})
		.transition({opacity:0},100,function(){
			$('#listBtn').show();
		});
	}
}
function skill7(site){
	$('#Projectile').attr('src','img/skill7.png');
	if (site==0) {
		$('#listBtn').hide(1,function(){
			$('#Projectile').transition({opacity:1},100)
			.transition({x:width*(50/100),y:height*(-35/100)},1000,'easeInBack')
			.transition({opacity:0},100).transition({x:0,y:0},100);
		});
	}else{
		$('#Projectile').transition({x:width*(50/100),y:height*(-35/100)})
		.transition({opacity:1},100).transition({x:0,y:0})
		.transition({opacity:0},100,function(){
			$('#listBtn').show();
		});
	}
}