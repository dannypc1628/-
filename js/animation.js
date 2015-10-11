
$(document).ready(function(){
	/*opening*/
	setTimeout(function(){
		$('#wrapMain').transition({opacity:1},450,
		function(){
			$('#user').transition({scale:0.5,x:-200,y:-70}).transition({ rotateY: '180deg'});
			$('#enemy').transition({scale:0.5,x:+650,y:-70});
		});
	});

	$('#user').click(function(){
		$(this).transition({x:500,y:-1000},100,'ease').transition({x:-200,y:-70},700,'ease').transition({perspective: '300px',rotateY: '+=360deg'});
	});

});