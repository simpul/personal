window.onload = function(){
	layui.use(['element', 'form', 'jquery'], function () {
	var element = layui.element,
		form = layui.form,
		$ = layui.$;
	    $.ajax({
			type: "GET",
			url: "http://localhost:3000/islog",
			success: function(data){
				$(data.element).css("display", "block");
				$("#idname").html(data.nickname);
				$("#avatar").prop("src", data.avatar);
			}
		});
	});
}