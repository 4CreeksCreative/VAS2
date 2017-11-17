$("#contactFormCustom").submit(function(e){
	if (validateFields($("#contactFormCustom")) !== 1) return
	else e.preventDefault();
});
$('input, textarea').keyup(function(){
	$(this).removeClass('error')
})
