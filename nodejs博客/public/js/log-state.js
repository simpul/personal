window.onload = function () {
	layui.use(['element', 'form', 'layer', 'jquery'], function () {
		var element = layui.element,
			form = layui.form,
			$ = layui.$;
		$.ajax({
			type: "GET",
			url: "http://localhost:3000/log-state",
			timeout: 5000,
			success: function(data){
				$(".content h2").html(data.text);
				setTimeout(() => {
					location.href = data.url;
				}, 3000);
			}
		});	
	});
	
	//setTimeout(() => {
	//	location.href = "/register";
	//}, 3000);
	
}