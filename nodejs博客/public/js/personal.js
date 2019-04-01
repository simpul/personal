window.onload = function(){
    layui.use(['element', 'jquery', 'upload'], function () {
        var element = layui.element,
            $ = layui.$,
            upload = layui.upload;
        $("#nav a").click(function(){
            switch($(this).data("url")){
                case "article":
                    $("#content").html("目前只实现了头像上传功能，其他功能施工中。。。");
                    break;
                case "comment":
                    $("#content").html("目前只实现了头像上传功能，其他功能施工中。。。");
                    break;
                case "avatar":
                    $("#content").html(`<button type="button" class="layui-btn" id="upload">
                    <i class="layui-icon">&#xe67c;</i>上传图片
                </button>
                <span>图片大小不大于160k</span>`);
                    var uploadAvatar = upload.render({
                        elem: '#upload',
                        url: '/upload',
                        size: 120,
                        done(res){
                            layer.alert(res.msg);
                            console.log(res);
                        },
                        error(err){
                            layer.alert(err.msg);
                            console.log(err);
                        }
                    });
                    break;
                case "manager":
                    $("#content").html("目前只实现了头像上传功能，其他功能施工中。。。");
                    break;
                default:
                    $("#content").html("目前只实现了头像上传功能，其他功能施工中。。。");
                    console.log("bug");
            }
        });
    });

    
}