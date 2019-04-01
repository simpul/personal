window.onload = function () {
    layui.use(['element', 'form', 'jquery', 'laypage'], async function () {
        var element = layui.element,
            form = layui.form,
            $ = layui.$,
            laypage = layui.laypage;

        $.ajax({
            type: "GET",
            url: "http://localhost:3000/islog",
            success: function (data) {
                $(data.element).css("display", "block");
                $("#idname").html(data.nickname);
                $("#avatar").prop("src", data.avatar);
            }
        });

        await $.ajax({
            type: "GET",
            url: "http://localhost:3000/chat-query",
            success: function (data) {
                $("#pages").data("max", data.maxNum);
                // data.maxNum data.artList
                data.artList.forEach(function(v, i, arr){
                    document.getElementById("chat-content").innerHTML += `<li class="pr">
                    <img src=${v.author.avatar} class="va-m">
                    <div class="i-b va-m">
                        <a href="/article/${v._id}"><h2>${v.title}</h2></a> 
                        <span>作者：${v.author.nickname}</span>
                        <span>发表于${new Date(v.createTime).toLocaleString()}</span>
                    </div>
                    <div class="pa"><i class="layui-icon layui-icon-reply-fill"></i><span>${v.commentNum}</span></div>
                    <hr class="layui-bg-gray">
                </li>`;
                });
            }
        });

        //渲染一个分页器
        laypage.render({
            elem: 'pages',
            count: $("#pages").data("max"),
            limit: 10,
            groups: 2,
            theme: '#393D49',
            layout: ['prev', 'page', 'next'],
            curr: location.pathname.replace("/chat/", ""),
            jump(obj, f) {
                $("#pages a").each((i, v) => {
                    let pageValue = `/chat/${$(v).data("page")}`;
                    v.href = pageValue;
                });
            }
        });
        //补充分页器不能实现的功能
        $(".layui-disabled").removeAttr("href");

    });
}