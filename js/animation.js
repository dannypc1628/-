var userHP=100;
var enemyHP=20;
var userHPMax=100.00;
var enemyHPMax=20.00;
var userAttack=5;
var enemyAttack=5;
var skillAttack=10;
$(document).ready(function(){
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
				if(enemyHP<=0){
					
				}else{
					userHP=userHP-enemyAttack;
				}
				$('#enemy').transition({x:-300,y:1000},100,'ease').transition({x:900,y:-70},500,'ease',function(){
					$('#userHPValue').css("left",function(i){return userHP*100/userHPMax+"%";});
					$('#listBtn').show(1);
				});

			});
		});
	});
	$('#skill').click(function(){
		$('#listBtn').hide(1,function(){
			$('#Projectile').transition({opacity:1},100).transition({x:-450,y:600,rotate: '-180deg'},1000,'easeInBack').transition({opacity:0},100).transition({x:0,y:0,rotate: '-180deg'},100,'ease',function(){
				enemyHP=enemyHP-skillAttack;
				$('#enemyHPValue').css("left",function(i){return enemyHP*100/enemyHPMax+"%";});
				if(enemyHP<=0){
					
				}else{
					userHP=userHP-enemyAttack;
				}
				$('#enemy').transition({x:-300,y:1000},100,'ease').transition({x:900,y:-70},500,'ease',function(){								
					$('#userHPValue').css("left",function(i){return userHP*100/userHPMax+"%";});
					$('#listBtn').show(1);
				});
			});
		});
	});
});
