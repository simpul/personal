window.onload = function(){
	layui.use(['element', 'form', 'jquery', 'layedit', 'layer'], function () {
        var element = layui.element,
            form = layui.form,
            $ = layui.$,
            layedit = layui.layedit,
            layer = layui.layer;

        //插入图片接口
        layedit.set({  
            uploadImage: {
                url: '',
                type: ''
            }
        });
        var cont = layedit.build("content");  //激活富文本编辑器
        
        //请求账号信息数据
        $.ajax({
        	type: "GET",
        	url: "http://localhost:3000/islog",
        	success: function(data){
        		$(data.element).css("display", "block");
                $("#idname").html(data.nickname);
                $("#avatar").prop("src", data.avatar);
        	}
        });
        //监听表单提交事件
        form.on('submit(*)', function(res){
            const { tips, title } = res.field;
            if(layedit.getText(cont).trim().length === 0){
                layer.alert("文本内容不能为空！");
                return false;
            }
            const data = {
                tips,
                title,
                content: layedit.getContent(cont)
            };
            $.post("/publish", data, (msg) => {
                if(msg.status){
                    $("button").attr("disabled", "disabled");  //阻止用户多次提交
                    layer.msg('发表成功o(*￣▽￣*)', (res) => {
                        location.href = "/";
                    });
                }else{
                    layer.alert(`发表失败T T ${msg.msg}`);
                }
            });
            return false;
        });
	});
}