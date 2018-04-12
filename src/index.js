
import adList from "./page/ad/adList";
import countT from "./page/count/count";
import wxconfig from "./page/config/wxconfig"; 

import left from "./page/main/leftTmp";
import top from "./page/main/headerTmp";
import getUserInfo from "./page/main/header";

$('.app').html(left() + top());
getUserInfo.init()
// left
  $(".panelTab").click(function(){
	if($(this).parent().find("ul").is(":hidden")){
	  $(this).parent().find("ul").slideDown();
	}else{
	  $(this).parent().find("ul").slideUp();
	}
  })

  var hashurl = hashUrl();
  changeTmp(hashurl);
  // history.pushState({},null,'main.html');//最开始的状态，采用replace直接替换

  //手动切换路由的时候
  $(".menuTab").click(function(){
   
	var dataUrl = $(this).attr("data-url");
	history.pushState({},null,'#'+dataUrl);//之后的状态，需要进行保存
	$(".app-main-content").remove();
	changeTmp(dataUrl);
  });

  //hash改变的时候
  window.addEventListener('hashchange',function(){
	var hashurl = hashUrl();
	changeTmp(hashurl);
  });


function changeTmp(dataUrl){
	$(".menuTab").css("color","#fff");
	switch(dataUrl)
	{
		case 'wxagent2config':
			wxconfig.init('2');
			$(".aside-wrap #wxconfig").parents('ul').show();
			$(".aside-wrap #wxconfig").css("color","#fdd105");
			break;

		case "wxconfig":
			// modfiy by dingo 为了测试弹窗 为1的时候弹窗失效
			wxconfig.init('1');
			$(".aside-wrap #wxconfig").parents('ul').show();
			$(".aside-wrap #wxconfig").css("color","#fdd105");
			break;

	  case "count":
		countT.init();
		$(".aside-wrap #count").parents('ul').show();
		$(".aside-wrap #count").css("color","#fdd105");
		break;
	  case "adList":
		adList.init();
		$(".aside-wrap #adList").parents('ul').show();
		$(".aside-wrap #adList").css("color","#fdd105");
		break;
	  case 'create':
		create.init();
		$(".aside-wrap #adList").parents('ul').show();
		$(".aside-wrap #adList").css("color","#fdd105");
		break;
	  case 'agent':
		agent.init();
		$(".aside-wrap #adList").parents('ul').show();
		$(".aside-wrap #adList").css("color","#fdd105");
		break;
	  case 'shop':
		shop.init();
		$(".aside-wrap #adList").parents('ul').show();
		$(".aside-wrap #adList").css("color","#fdd105");
		break;
	  case 'area':
		area.init();
		$(".aside-wrap #adList").parents('ul').show();
		$(".aside-wrap #adList").css("color","#fdd105");
		break
	  default:
		history.pushState({},null,'main.html');
	}
  }

  function hashUrl(){
	var windowHash= window.location.hash;
	var hashurl;

	if(windowHash.indexOf("?") == -1){
	  hashurl = windowHash.split("#")[1];
	}else{
	  hashurl = windowHash.substring(windowHash.indexOf("#") + 1,windowHash.indexOf("?"))
	}
	$(".app-main-content").remove();
	return hashurl;
  }


/* 10 */
// 引入左侧头部