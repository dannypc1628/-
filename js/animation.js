
$(document).ready(function(){
	/*opening*/
	setTimeout(function(){
		$('#wrapMain').transition({opacity:1},450,
		function(){
			$('#user').transition({scale:0.5,x:-250,y:-300}).transition({ rotateY: '180deg'});
			$('#enemy').transition({scale:0.5,x:900,y:-70});
			$('.HP').transition({opacity:1},800);
		});
	});
	/*己方攻擊*/
	$('#attack').click(function(){
		$('#listBtn').hide(1,function(){
			$('#user').transition({x:600,y:-1200},100,'ease').transition({x:-200,y:-500},500,'ease',function(){
				$('#listBtn').show(1);
			});
		});
	});
	$('#skill').click(function(){
		$('#Projectile').transition({opacity:1},100).transition({x:450,y:-600,rotate: '-180deg'},1000,'easeInBack').transition({opacity:0},100).transition({x:-0,y:0,rotate: '-180deg'},1000,'ease');

	});

});