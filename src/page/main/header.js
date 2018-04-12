
var header = {
	init: function(){
		$.ajax({
			type: 'get',
			url: "/rest/admin/getUserInfo",
			dateType: 'json',
			success(data) {
				
				if(data.success){
					$(".username").text(data.username);
				}
			}
		});

		$(".logout").click(function(){
			$.ajax({
				type: 'get',
				url: "/rest/admin/logout",
				dateType: 'json',
				success(data) {
					if(data.code=="0002005"){
						var host = window.location.host;
						window.location.href="http://"+host+'/view/login.html';
						return;
					}
					if(data.success){
						var host = window.location.host;
						var hrefUrl = "http://"+host+'/view/login.html';
						window.location.href = hrefUrl;
					}else{
						alert(data.msg);
					}
				}
			});
		});
	}
}
export default header;