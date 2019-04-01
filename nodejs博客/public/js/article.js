window.onload = function(){
	layui.use(['element', 'form', 'jquery'], async function () {
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
        
        await $.ajax({  //获取文章内容信息
            type: "GET",
            url: "http://localhost:3000/article-content",
            success: function(data){
				//data.title  data.author.nickname data.createTime data.content
				
				$("#article").data("artid", data._id);
				$("#article h2").html(data.title);
				$("#article span:first-child").html(`作者： ${data.author.nickname}`);
				$("#article span:nth-child(2)").html(`发表于： ${new Date(data.createTime).toLocaleString()}`);
				switch (data.tips){
					case "web":
						$("#article span:last-child").html("分类：前端技术");
						break;
					case "photo":
						$("#article span:last-child").html("分类：生活点滴");
						break;
					case "write":
						$("#article span:last-child").html("分类：阅读随笔");
						break;
					case "chat":
						$("#article span:last-child").html("分类：畅所欲言");
						break;
					default:
						$("#article span:last-child").html("???");
				}
				$("#article article").html(data.content);
            }
		});
		
		$.post("/comment-display", {id: $("#article").data("artid")}, data => {  //获取评论信息
			if(!data.length){
				$("#comment ul").html(
					`<li class="ta-c fs-20 c-777">
						赶快来抢沙发呀ε=ε=ε=(~￣▽￣)~
					</li>`
				);
			}else{
				data.forEach((v, i, arr) => {
					$("#comment ul").get(0).innerHTML += `<li class="mg-t20">
					<img src=${v.author.avatar} class="va-m">
					<div class="i-b va-m">
						<h3>${v.author.nickname}</h3>
						<span class="fs-12 c-777">${new Date(v.createTime).toLocaleString()}</span>
					</div>
					<div class="mg-t10">
						${v.content}
					</div>
					<hr class="layui-bg-gray">
				</li>`;
				});
			}
		});

		form.on('submit(comment)', () => {  //发表评论
			const content = $("#comment textarea").prop("value"),
			artid = $("#article").data("artid");
			if(content.trim().length === 0){
				layer.alert("评论不能为空噢");
				return false;
			}
			$.post("/comment", {content, artid}, data => {
				layer.msg(data.msg);
				if(data.status) setTimeout(() => {
					window.location.reload();
				}, 1000);
			});
			return false;
		});
	});
}