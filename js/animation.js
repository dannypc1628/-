var userHP=100;
var enemyHP=200;
var userHPMax=100.00;
var enemyHPMax=20.00;
var userAttack=5;
var enemyAttack=10;
var skillAttack=10;
var width=$(window).width();
var height=$(window).height();
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
	$('#listBtn').hide();
	/*opening*/
	setTimeout(function(){
		$('#wrapMain').transition({opacity:1},450,
		function(){
			$('#user').transition({scale:0.5,x:width*(-25/100),y:height*(-10/100)}).transition({ rotateY: '180deg'});
			$('#enemy').transition({scale:0.5,x:width*(80/100),y:height*(-5/100)});
			$('.HP').transition({opacity:1},800);
			$('#listBtn').show();
		});
	},300);
	/*己方攻擊*/
	$('#attack').click(function(){
		
		userAtk();
		
		enemyHP=enemyHP-userAttack;
		setTimeout(function(){
			
			$('#enemyHPValue').css("left",function(i){return enemyHP*100/enemyHPMax+"%";});
			$('#enemyHPValue').css("width",function(i){return 100-(enemyHP*100/enemyHPMax)+"%";});
		},100);	
		if(enemyHP<=0){
			setTimeout(function(){
				win();
			},2000);	
		}else{
			userHP=userHP-enemyAttack;
			enemyAtk();
			setTimeout(function(){
				
			$('#userHPValue').css("left",function(i){return userHP*100/userHPMax+"%";});
			$('#userHPValue').css("width",function(i){return 100-(userHP*100/userHPMax)+"%";});
			},700);	
			if(userHP<=0){
				setTimeout(function(){
					lose();
				},2000);
			}
		}
	});



	$('#skill').click(function(){	
		userskl();
		enemyHP=enemyHP-skillAttack;
		setTimeout(function(){
			$('#enemyHPValue').css("left",function(i){return enemyHP*100/enemyHPMax+"%";});
			$('#enemyHPValue').css("width",function(i){return 100-(enemyHP*100/enemyHPMax)+"%";});
		},1000);
		if(enemyHP<=0){
			setTimeout(function(){
				win();
			},2000);
		}else{
			userHP=userHP-enemyAttack;
			setTimeout(function(){
				enemyAtk();
			},1000);
			setTimeout(function(){
			$('#userHPValue').css("left",function(i){return userHP*100/userHPMax+"%";});
			$('#userHPValue').css("width",function(i){return 100-(userHP*100/userHPMax)+"%";});
			},1600);
			if(userHP<=0){
				setTimeout(function(){
					lose();
				},2000);
			}
		}
			
	
	});
	//$('#test').click(enemyskl());

});

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

		closeOnConfirm: false 
	}, 
	function(){   
      	goToMap();
      	
    });
	
}
function lose(){
	$('#user').transition({scale:0});
	swal({
		title: "LOSE",  

		closeOnConfirm: false 
	}, 
	function(){   
      	goToMap();
    });

}
function setMonster(){
	$('#user').attr("src","img/monster"+localStorage.leader+".png");
	$('#enemy').attr("src","img/monster"+localStorage.oppositeMonster+".png");
	userHP=monsterList[localStorage.leader].monsterHP+localStorage.leaderLV*monsterList[localStorage.leader].HPCoe;
	enemyHP=monsterList[localStorage.oppositeMonster].monsterHP+localStorage.oppositeMonsterLV*monsterList[localStorage.oppositeMonster].HPCoe;;
	
	userHPMax=userHP;
	enemyHPMax=enemyHP;
	
	userAttack=monsterList[localStorage.leader].monsterAttack+localStorage.leaderLV*monsterList[localStorage.leader].AttackCoe;
	enemyAttack=monsterList[localStorage.oppositeMonster].monsterAttack+localStorage.oppositeMonsterLV*monsterList[localStorage.oppositeMonster].AttackCoe;;
	skillAttack=userAttack*1.5;
}
function userAtk(){
	$('#listBtn').hide(1,function(){
		$('#user').transition({x:width*(80/100),y:height*(-90/100)},100,'ease').transition({x:width*(-25/100),y:height*(-10/100)},500,'ease');
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
	$('#enemy').transition({x:width*(-30/100),y:height*(80/100), delay: 600},100,'ease').transition({x:width*(80/100),y:height*(-5/100)},500,'ease',function(){
		$('#listBtn').show(1);
	}).delay(600);
}
function enemyskl(){
	$('#Projectile').transition({x:width*(50/100),y:height*(-35/100),rotate:0},10,'ease').transition({opacity:1},100).transition({x:0,y:0,},1000,'easeInBack').transition({opacity:0,rotate:'-180deg'},10,function(){
		$('#listBtn').show(1);
	});
}



function skill1(site){
	$('#Projectile').attr('src','img/skill1.png');
	if(site==0){
		$('#listBtn').hide(1,function(){
			$('#Projectile').transition({x:width*(45/100),y:height*(-40/100)},100).transition({opacity:1},100).transition({opacity:0},1000).transition({x:0,y:0},100);
		});
	}else{

	}
}
function skill2(site){
	$('#Projectile').attr('src','img/skill2.png');
	if(site==0){
		$('#Projectile').transition({rotate: '-90deg'},100);
		$('#listBtn').hide(1,function(){
			$('#Projectile').transition({opacity:1},100).transition({x:width*(50/100),y:height*(30/100)},1000,'easeInBack').transition({opacity:0},100).transition({x:0,y:0},100);
		});
	}else{

	}
}
function skill3(site){
	$('#Projectile').attr('src','img/skill3.png');
	if(site==0){

	}else{

	}
}
function skill4(site){
	$('#Projectile').attr('src','img/skill4.png');
	if(site==0){
		$('#Projectile').transition({rotate: '-135deg'},100);
		$('#listBtn').hide(1,function(){
			$('#Projectile').transition({opacity:1},100).transition({x:width*(15/100),y:height*(40/100)},1000,'easeInBack').transition({opacity:0},100).transition({x:0,y:0},100);

		});
	}else{

	}
}
function skill5(site){
	$('#Projectile').attr('src','img/skill5.png');
	if(site==0){

		$('#listBtn').hide(1,function(){
			$('#Projectile').transition({opacity:1},100).transition({x:width*(50/100),y:height*(-35/100),rotate:'720deg'},1000,'easeInBack').transition({opacity:0},100).transition({x:0,y:0,rotate:0},100);
		});
	}else{

	}	
}
function skill6(site){
	$('#Projectile').attr('src','img/skill6.png');
	if(site==0){
		$('#Projectile').transition({rotate: '-180deg'},100);
		$('#listBtn').hide(1,function(){
			$('#Projectile').transition({opacity:1},100).transition({x:width*(-50/100),y:height*(35/100),rotate: '-180deg'},1000,'easeInBack').transition({opacity:0},100).transition({x:0,y:0,rotate: '-180deg'},100);
		});
	}else{
		$('#Projectile').transition({x:width*(50/100),y:height*(-35/100),rotate:0},10,'ease').transition({opacity:1},100).transition({x:0,y:0,},1000,'easeInBack').transition({opacity:0,rotate:'-180deg'},10,function(){
			$('#listBtn').show(1);
		});
	}
}
function skill7(site){
	$('#Projectile').attr('src','img/skill7.png');
	if (site==0) {
		$('#listBtn').hide(1,function(){
			$('#Projectile').transition({opacity:1},100).transition({x:width*(50/100),y:height*(-35/100)},1000,'easeInBack').transition({opacity:0},100).transition({x:0,y:0},100);
		});
	}else{

	}
}