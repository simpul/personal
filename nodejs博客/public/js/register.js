window.onload = function () {
	layui.use(['element', 'form', 'layer', 'jquery'], function () {
		var element = layui.element,
			form = layui.form,
			$ = layui.$;

		//增添账号和密码的验证方法
		form.verify({
			account: [/^\w{5,10}$/, '账户名为长度为5-10位数字、英文和下划线的组合'],
			password: [/^\S{6,16}$/, '密码为长度为6-16的非空格字符组合']
		});
		//两次密码相同验证
		$("#re-password").blur(function () {
			if (this.value !== $("#reg-password").prop("value")) {
				this.value = "";
				$("#reg-password").prop("value", "");
				layer.msg("密码不一致，请重新填写！");
			}
		});
		//重复ID验证
		$("#nickname").blur(function(){  //当填写ID这一栏失去焦点的时候执行
			if(!this.value) return true; //如果id栏没填任何东西则不执行
			$.ajax({  //向后台发起一个ajax请求
				type: 'POST',
				url: "http://localhost:3000/repeat",   //路由为repeat
				data: {
					nickname: this.value  //把id值传给后台
				},
				timeout: 5000,  //设置timeout
				success: function(data){
					layer.msg(data.text);  //弹框提醒用户id是否可用
					data.clear && $("#nickname").prop("value", "");  //根据返回的clear决定是否清空id栏
				}
			});
		});
	});


}