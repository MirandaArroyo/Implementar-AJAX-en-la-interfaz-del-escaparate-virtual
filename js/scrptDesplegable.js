
$(document).ready(function() {
	$menu = $('#menu').find('ul').find('li');
        //.on("click", 
	$menu.hover(function() {
		$(this).children('ul').stop();
		$(this).children('ul').slideDown();
	}, function() {
		$(this).children('ul').stop();
		$(this).children('ul').slideUp();
	});
    
    
});
