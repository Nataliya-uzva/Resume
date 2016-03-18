$(document).ready(function() {

$('#accordion div').hide().prev().click(function(){
	$('#accordion div').not(this).slideUp();
	$(this).next().not(':visible').slideDown();
	console.log($(this));
});

});