import agent from "./agentJs"; 
import shop from "./shopJs"; 
var getAdMaterialId;//物料Id
var getAdId;//广告id
var getOrderId;//订单编号
var releaseSum = "";//默认是不限次数投放
var status = "0";//广告状态
var adId;
var rangeType;
var pgeLoad;
var editAd;
var urlExpression = new RegExp("((http|https)://)(([a-zA-Z0-9\._-]+\.[a-zA-Z]{2,6})|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,4})*(/[a-zA-Z0-9\&%_\./-~-]*)?");
import Html from '../../page/ad/createTmp'
let CREAT = {
	init() {
		var that = this
		$('.app').append($(Html()));
		that.getQueryString();
		that.adChoise();
		that.addAgent();
		that.editAgent();
		that.addShop();
		that.editShop();
		that.addAppointShop();
		that.editAppointShop();
		that.J_submit();
		that.J_back();

		that.setDate();
		that.agentCheck();
		that.putNumSelect();
		that.regExp();
		that.AdHref();
		that.funcHref();
		that.jumpHref();
		that.imgsizeCheck();
		that.btnIsshowCheck();
		that.ImgFileUp();
	},
	getQueryString(){
		//pgeLoad= layer.load(1);
		var url=window.location.hash;
		// var isNew;
		var Request = new Object();
		if(url.indexOf("?")!=-1)
		{
		var str = url.substr(1);
		if(url.indexOf("&")!=-1){
			var splitStr =str.split("?")[1];
			var obj = splitStr.split("&");
			for(var i=0;i< obj.length;i++)
			{
				Request[obj[i].split("=")[0]]=(obj[i].split("=")[1]);
			}
		}
		else{
			var strs = str.split("?")[1];
			Request[strs.split("=")[0]]=(strs.split("=")[1]);
		}
		}
		if(Request["adId"]){
			adId = Request["adId"];
		}else{
			adId = '';
		}
		console.log(adId)
		rangeType = Request['rangeType'];
		editAd = Request['editAd'];
		CREAT.createPage(adId);
	},
	createPage(adId){
		var createPageJson = {"adId":adId};
		$.ajax({
			type:'get',
			url:"/rest/ad/put/createPage",
			dataType: 'json',
			data:createPageJson,
			success: function(data) {
				if(data.code=="0002005"){
					var host = window.location.host;
					window.location.href="http://"+host+'/view/login.html';
					return;
				}
				if(data.success){
					var getJson = data.data;
					getAdMaterialId = getJson.adMaterial.id;
					getAdId =  getJson.adOrder.id;
					getOrderId = getJson.adOrder.orderId;


					if(getJson.adMaterial && getJson.adOrder && adId!=""){
						//投放范围
						switch (rangeType) {
							case 1:
							case "1":
								$(".agentCheckPng").show();
								$(".appointShop").hide();
								$(".agent").show();
								break;
							case 2:
							case "2":
								$(".ShopCheckPng").show();
								var txtrangeType = '指定店铺';
								$(".appointShop").show();
								$(".agent").hide();
								break;
							case 3:
							case "3":
								$(".agentCheckPng").show();
								$(".ShopCheckPng").show();
								break;
						}
						//数据回填
						if(getJson.adMaterial.type=="107"||getJson.adMaterial.type==107){
							//如果是悬浮广告除了投放范围其他都不可修改
							$("#jsad").attr('checked',true);
							$("input[name='adradio']").not("#jsad").parent().remove();
							$(".adPutNum,.adPutSort").hide();
							$(".JsAd").find(".jsTxt").val(getJson.adMaterial.jsCode).attr("disabled","disabled");
							$(".adMaster").val(getJson.adOrder.ownerName).attr("disabled","disabled");
							$(".adName").val(getJson.adOrder.name).attr("disabled","disabled");
							$("#datetimeStart").val((getJson.adOrder.startTime).split(' ')[0]).attr("disabled","disabled");
							$("#datetimeEnd").val((getJson.adOrder.endTime).split(' ')[0]).attr("disabled","disabled");
						}else{
							//其他广告除了广告位和备注广告信息不允许修改，其余均可修改。
							if(getJson.adMaterial.type=="100"||getJson.adMaterial.type==100){
								//全屏背景图
								$("#fullbg").attr('checked',true);
								$("input[name='adradio']").not("#fullbg").parent().remove();
								$(".funllbgHref").val(getJson.adMaterial.imgLink).attr("disabled","disabled");
								$(".bgImg").append("<img src='"+getJson.adMaterial.url+"' data-imgType='"+getJson.adMaterial.format+"'>");
							}
							if(getJson.adMaterial.type=="101"||getJson.adMaterial.type==101){
								//主页Banner
								$("#banner").attr('checked',true);
								$("input[name='adradio']").not("#banner").parent().remove();
								$(".bannerHref").val(getJson.adMaterial.imgLink).attr("disabled","disabled");
								$(".BannerImg").append("<img src='"+getJson.adMaterial.url+"' data-imgType='"+getJson.adMaterial.format+"'>");
							}
							if(getJson.adMaterial.type=="102"||getJson.adMaterial.type==102){
								//弹屏广告
								$("#bombAd").attr('checked',true);
								$("input[name='adradio']").not("#bombAd").parent().remove();
								$(".bombAdHref").val(getJson.adMaterial.imgLink).attr("disabled","disabled");
								$(".bombAdImg").append("<img src='"+getJson.adMaterial.url+"' data-imgType='"+getJson.adMaterial.format+"'>");
							}
							if(getJson.adMaterial.type=="103"||getJson.adMaterial.type==103){
								//功能区
								$("#func").attr('checked',true);
								$("input[name='adradio']").not("#func").parent().remove();
								$(".funcHref").val(getJson.adMaterial.imgLink).attr("disabled","disabled");
								$(".funcImg").append("<img src='"+getJson.adMaterial.url+"' data-imgType='"+getJson.adMaterial.format+"'>");
							}
							if(getJson.adMaterial.type=="104"||getJson.adMaterial.type==104){
								//信息流区
								$("#info").attr('checked',true);
								$("input[name='adradio']").not("#info").parent().remove();
								$(".infoHref").val(getJson.adMaterial.imgLink).attr("disabled","disabled");
								$(".imgsize").find("input[value='"+JSON.parse(getJson.adMaterial.jsCode).imgStyle+"']").attr("checked",true);
								if(JSON.parse(getJson.adMaterial.jsCode).imgStyle == '1'){
									$(".infoImgsmall").append("<img src='"+getJson.adMaterial.url+"' data-imgType='"+getJson.adMaterial.format+"'>");
								}else{
									$(".infoImgbig").append("<img src='"+getJson.adMaterial.url+"' data-imgType='"+getJson.adMaterial.format+"'>");
								}
								$("#infoTitle").val(JSON.parse(getJson.adMaterial.jsCode).imgTitle);
								$("#Introduce").val(JSON.parse(getJson.adMaterial.jsCode).imgIntroduction);
								$("#infoAddress").val(JSON.parse(getJson.adMaterial.jsCode).address);
								$("#BtnTxt").val(JSON.parse(getJson.adMaterial.jsCode).buttonText);
								$(".isShowBtn").find("input[value='"+JSON.parse(getJson.adMaterial.jsCode).isButtonShow+"']").attr("checked",true);
							}
							if(getJson.adMaterial.type=="105"||getJson.adMaterial.type==105){
								//全屏轮播广告
								$("#fullAd").attr('checked',true);
								$("input[name='adradio']").not("#fullAd").parent().remove();
								$(".fullAdHref").val(getJson.adMaterial.imgLink).attr("disabled","disabled");
								$(".fullAdImg").append("<img src='"+getJson.adMaterial.url+"' data-imgType='"+getJson.adMaterial.format+"'>");
							}
							if(getJson.adMaterial.type=="106"||getJson.adMaterial.type==106){
								//全屏自动跳转广告
								$("#jumpAd").attr('checked',true);
								$("input[name='adradio']").not("#jumpAd").parent().remove();
								$(".jumpAdImgHref").val(getJson.adMaterial.imgLink).attr("disabled","disabled");
								$(".jumpHref").val(getJson.adMaterial.jumpUrl).attr("disabled","disabled");
								$(".jumpAdImg").append("<img src='"+getJson.adMaterial.url+"' data-imgType='"+getJson.adMaterial.format+"'>");
							}


							$(".selectfiles").attr("disabled","disabled");
							$(".btn-primary").css({'background':"#ccc",'border-color':"#999"});
							$(".btn-primary").mouseover(function () {
								$(this).css({'background':"#ccc",'border-color':"#999"});
							 })
							$(".adMaster").val(getJson.adOrder.ownerName).attr("disabled","disabled");
							$(".adName").val(getJson.adOrder.name).attr("disabled","disabled");
							$("#datetimeStart").val((getJson.adOrder.startTime).split(' ')[0]);
							$("#datetimeEnd").val((getJson.adOrder.endTime).split(' ')[0]);
							if(getJson.adOrder.releaseSum){
								$(".putNumSelect").val("2");
								$(".releaseSum").val(getJson.adOrder.releaseSum).show();
							}else{
								$(".putNumSelect");
							}
							$(".sortsSelect").val(getJson.adOrder.sort);

							if(editAd){
								$(".form_datetime").attr("disabled","disabled");
								$(".putNumSelect").attr("disabled","disabled");
								$(".releaseSum").attr("disabled","disabled");
								$(".sortsSelect").attr("disabled","disabled");
							}
						}
					}
				}else{
					alert(data.msg);
				}
				$(".sucaiTab li").hide();
				$(".ad_editMain[data-adtype='"+$("input[name='adradio']:checked").attr('value')+"']").show();
				layer.close(pgeLoad);
				$(".createTmpl").show();
			}
		});
	},
	setDate(){
		$(".form_datetime").datetimepicker({
				format: 'yyyy-mm-dd',
				minView:'month',
				language: 'cn',//显示中文
				startDate:new Date(),
				autoclose:true
		}).on('changeDate',function(ev){
				let ed = new Date($('#datetimeStart').val());
				let sd = new Date($('#datetimeEnd').val());

				if (ed > sd) {
					alert("结束日期不能小于开始日期");
					$(this).val('');
				}
		});
	},
	adChoise(){
		$("input[name='adradio']").click(function(){
			var adChoiseValue = $(this).attr('value');
			$(".sucaiTab li").hide();
			$(".ad_editMain[data-adtype='"+adChoiseValue+"']").show();
			if(adChoiseValue!='107'||adChoiseValue!=107){
				$(".adPutNum").show();
				$(".adPutSort").show();
			}else{
				$(".adPutNum").hide();
				$(".adPutSort").hide();
			}
		});
	},
	addAgent(){
		$(".addAgent").click(function(){
			history.pushState({},null,"main.html#agent?toAgent=1&adId="+getAdId+"&adType="+$("input[name='adradio']:checked").val());//最开始的状态，采用replace直接替换
			$(".createTmpl").hide();
			$(".agentTmpl").remove();
			$(".shopTmpl").remove();
			agent.init();
		});
	},
	editAgent(){
		$(".editAgent").click(function(){
			history.pushState({},null,'main.html#agent?toAgent=2&adId='+getAdId+"&adType="+$("input[name='adradio']:checked").val());//最开始的状态，采用replace直接替换
			$(".createTmpl").hide();
			$(".agentTmpl").remove();
			$(".shopTmpl").remove();
			agent.init();
		});
	},
	addShop(){
		$(".addShop").click(function(){
			history.pushState({},null,'main.html#shop?toShop=1&adId='+getAdId+"&adType="+$("input[name='adradio']:checked").val());
			$(".createTmpl").hide();
			$(".agentTmpl").remove();
			$(".shopTmpl").remove();
			shop.init();
		});
	},
	editShop(){
		$(".editShop").click(function(){
			history.pushState({},null,'main.html#shop?toShop=2&adId='+getAdId+"&adType="+$("input[name='adradio']:checked").val());
			$(".createTmpl").hide();
			$(".agentTmpl").remove();
			$(".shopTmpl").remove();
			shop.init();
		});
	},
	addAppointShop(){
		$(".appointAddShop").click(function(){
			history.pushState({},null,"main.html#shop?toShop=3&adId="+getAdId+"&adType="+$("input[name='adradio']:checked").val());//最开始的状态，采用replace直接替换
			$(".createTmpl").hide();
			$(".agentTmpl").remove();
			$(".shopTmpl").remove();
			shop.init();
		});
	},
	editAppointShop(){
		$(".appointEditShop").click(function(){
			history.pushState({},null,"main.html#shop?toShop=4&adId="+getAdId+"&adType="+$("input[name='adradio']:checked").val());//最开始的状态，采用replace直接替换
			$(".createTmpl").hide();
			$(".agentTmpl").remove();
			$(".shopTmpl").remove();
			shop.init();
		});
	},
	J_submit() {
		$(".J_submit").click(function(){
			switch($(".ad_editMain:visible").attr('data-adtype')){
				case 100:
				case '100':
					if($(".bgImg").find("img").length==0){
						CREAT.layerMsg("请先完善广告素材");
						return;
					}
					break;
				case 101:
				case '101':
					if($(".BannerImg").find("img").length==0){
						CREAT.layerMsg("请先完善广告素材");
						return;
					}
					break;
				case 102:
				case '102':
					if($(".bombAdImg").find("img").length==0){
						CREAT.layerMsg("请先完善广告素材");
						return;
					}
					break;
				case 103:
				case '103':
					if($(".funcImg").find("img").length==0){
						CREAT.layerMsg("请先完善广告素材");
						return;
					}
					$("#funcHref").blur();
					break;
				case 104:
				case '104':
					if($("input[name='imgsize']:checked").val()==1){
						if($(".infoImgsmall").find("img").length==0){
							CREAT.layerMsg("请先完善广告素材");
							return;
						}
					}
					if($("input[name='imgsize']:checked").val()==2){
						if($(".infoImgbig").find("img").length==0){
							CREAT.layerMsg("请先完善广告素材");
							return;
						}
					}
					$("#infoTitle").blur();

					$("#BtnTxt").blur();

					if($("input[name='infoisShow']:checked").val()=="1"){
						if($("#BtnTxt").val().length == 0){
							$("#BtnTxt").parent().find(".error").remove();
							$("#BtnTxt").parent().append('<label  generated="true" class="error" style="display: inline;">必填项</label>');
						}else{
							$("#BtnTxt").parent().find(".error").remove();
						}
					}else{
						$("#BtnTxt").parent().find(".error").remove();
					}

					$("#infoHref").blur();

					break;
				case 105:
				case '105':
					if($(".fullAdImg").find("img").length==0){
						CREAT.layerMsg("请先完善广告素材");
						return;
					}
					break;
				case 106:
				case '106':
					if($(".jumpAdImg").find("img").length==0){
						CREAT.layerMsg("请先完善广告素材");
						return;
					}
					$("#jumpHref").blur();
					break;
				case 107:
				case '107':
					if($(".jsTxt").val().length==0){
						CREAT.layerMsg("请先完善广告素材");
						return;
					}
					break;
			}

			if($(".ad_editMain:visible").find(".error").length>0){
				CREAT.layerMsg("信息有误");
				return;
			}

			if($(".adMaster").val().length<=0){
				CREAT.layerMsg("请填写广告主");
				return;
			}
			if($(".adName").val().length<=0){
				CREAT.layerMsg("请填写广告名称");
				return;
			}
			if($(".adName").val().length<=0){
				CREAT.layerMsg("请填写广告名称");
				return;
			}
			if($("#datetimeStart").val().length<=0 || $("#datetimeEnd").val().length<=0){
				CREAT.layerMsg("还未选择投放日期");
				return;
			}
			if($("#datetimeStart").val().length<=0 || $("#datetimeEnd").val().length<=0){
				CREAT.layerMsg("还未选择投放日期");
				return;
			}
			if($("input[name='adradio']:checked").val()!="107"||$("input[name='adradio']:checked").val()!=107){
				if($(".putNumSelect").val()==2){
					if($(".releaseSum").val().length<=0){
						CREAT.layerMsg("请填写投放次数");
						return;
					}
				}
				if($(".sortsSelect").val()==""){
					CREAT.layerMsg("请选择排序");
					return;
				}
			}
			var checkPngT = false;
			for(var i=0;i<$(".checkpng").length;i++){
				if($(".checkpng").eq(i).is(":visible")){
					checkPngT = true;
				}
			}
			if(!checkPngT){
				CREAT.layerMsg("请选择投放范围");
				return;
			}
			var y = new Date().getFullYear();
			var m = new Date().getMonth()+1>9?new Date().getMonth()+1:"0"+(new Date().getMonth()+1);
			var d = new Date().getDate()>9?new Date().getDate():"0"+new Date().getDate();
			var nowDate =y+"-"+m+"-"+d;
			var datetimeEnd=$("#datetimeEnd").val();
			var endDate=new Date(datetimeEnd.replace("-", "/").replace("-", "/"));
			var nowEndDate=new Date(nowDate.replace("-", "/").replace("-", "/"));
			if(endDate<nowEndDate){
				CREAT.layerMsg("投放已过期，请重新选择日期");
				return;
			}
			CREAT.require();
		});
	},
	require(){
		//投放规则
		let ownerName = $(".rule .adMaster").val();//广告主
		let name = $(".rule .adName").val();//广告名称
		let startTime = $("#datetimeStart").val();
		let endTime = $("#datetimeEnd").val();
		let sort = $(".sortsSelect").val();
		if($(".releaseSum").val().length>0 && !$(".releaseSum").is(':hidden')){
			releaseSum = $(".releaseSum").val();
		}
		//整合数据
		var adMaterial;
		switch($(".ad_editMain:visible").attr('data-adtype')){
			case 100:
			case '100':
				adMaterial = {
					"format":$(".bgImg").find("img").attr("data-imgType"),
					'id':getAdMaterialId,
					"size":"750*1334",
					"type":$("input[name='adradio']:checked").val(),
					"url":$('.bgImg').find("img").attr('src')
				};
				break;
			case 101:
			case '101':
				adMaterial = {
					"format":$(".BannerImg").find("img").attr("data-imgType"),
					'id':getAdMaterialId,
					'imgLink':$(".bannerHref").val(),
					"size":"750*230",
					"type":$("input[name='adradio']:checked").val(),
					"url":$('.BannerImg').find("img").attr('src')
				};
				break;
			case 102:
			case '102':
				adMaterial = {
					"format":$(".bombAdImg").find("img").attr("data-imgType"),
					'id':getAdMaterialId,
					'imgLink':$(".bombAdHref").val(),
					"size":"600*750",
					"type":$("input[name='adradio']:checked").val(),
					"url":$('.bombAdImg').find("img").attr('src')
				};
				break;
			case 103:
			case '103':
				adMaterial = {
					"format":$(".funcImg").find("img").attr("data-imgType"),
					'id':getAdMaterialId,
					'imgLink':$(".funcHref").val(),
					"size":"347*146",
					"type":$("input[name='adradio']:checked").val(),
					"url":$('.funcImg').find("img").attr('src')
				};
				break;
			case 104:
			case '104':
				var infoImgSize;
				var infoImgUrl;
				if($("input[name='imgsize']:checked").val()==1){
					infoImgSize = "96*96";
					infoImgUrl = $('.infoImgsmall').find("img").attr('src');
				}
				if($("input[name='imgsize']:checked").val()==2){
					infoImgSize = "690*230";
					infoImgUrl = $('.infoImgbig').find("img").attr('src');
				}
				adMaterial = {
					"format":$(".infoImg").find("img").attr("data-imgType"),
					'id':getAdMaterialId,
					'json':infoJson,
					'imgLink':$(".infoHref").val(),
					"size":infoImgSize,
					"type":$("input[name='adradio']:checked").val(),
					"url":infoImgUrl,
					"address":$("#infoAddress").val(),
					"btnShow":$('input[name="infoisShow"]:checked').val(),
					"btnText":$("#BtnTxt").val(),
					"introduction":$("#Introduce").val(),
					"title":$("#infoTitle").val()
				};
				break;
			case 105:
			case '105':
				adMaterial = {
					"format":$(".fullAdImg").find("img").attr("data-imgType"),
					'id':getAdMaterialId,
					'imgLink':$(".fullAdHref").val(),
					"size":"750*1334",
					"type":$("input[name='adradio']:checked").val(),
					"url":$('.fullAdImg').find("img").attr('src')
				};
				break;
			case 106:
			case '106':
				adMaterial = {
					"format":$(".jumpAdImg").find("img").attr("data-imgType"),
					'id':getAdMaterialId,
					'imgLink':$(".jumpAdImgHref").val(),
					"size":"750*1334",
					"type":$("input[name='adradio']:checked").val(),
					"url":$('.jumpAdImg').find("img").attr('src'),
					"jumpUrl":$("#jumpHref").val()
				};
				break;
			case 107:
			case '107':
				adMaterial = {
					'id':getAdMaterialId,
					"jsCode":$(".jsTxt").val(),
					"type":$("input[name='adradio']:checked").val(),
				};
				break;
		}
		var adOrder = {"description":"","endTime":endTime,"id":getAdId,'name':name,"orderId":getOrderId,'ownerName':ownerName,"releaseSum":releaseSum,"releaseUser":$(".username").text(),"sort":sort,"startTime":startTime,"status":status};
		var dataJson = {"adMaterial":adMaterial,"adOrder":adOrder};
		$.ajax({
			type:'post',
			url:"/rest/ad/put/save",
			contentType: "application/json",
			data: JSON.stringify(dataJson),
			success: function(data) {
				if(data.code=="0002005"){
					var host = window.location.host;
					window.location.href="http://"+host+'/view/login.html';
					return;
				}
				if(data.success){
					sessionStorage.removeItem("isNew");
					sessionStorage.removeItem("adId");
					var host = window.location.host;
					window.location.href="http://"+host+'/view/main.html#adList';
				}else{
					alert(data.msg);
				}
			}
		});
	},
	J_back(){
		$(".J_back").click(function(){
			var host = window.location.host;
			window.location.href="http://"+host+'/view/main.html#adList';
		});
	},
	agentCheck(){
		$(".putAreaLi #agentShop").click(function(){
			$('tr.appointShop').hide();
			$('tr.agent').show();
		});
		$(".putAreaLi #appointShop").click(function(){
			$('tr.appointShop').show();
			$('tr.agent').hide();
		});
	},
	putNumSelect(){
		$(".putNumSelect").click(function(){
			if($(this).val()==2){
				$(".releaseSum").show();
			}else{
				$(".releaseSum").hide();
			}
		});
	},
	regExp(){
		$(document).on({
			keyup: function() {
				var regExptime = /^[1-9]\d*$/;
				if (!regExptime.exec($(this).val())) {
					$(this).val("");
				}
			},
		},".releaseSum");
	},
	AdHref(){
		$(".AdHref").keyup(function(){
			$(this).parent().find(".error").remove();
			if(!urlExpression.test($(this).val())&&$(this).val().length!=0){
				$(this).parent().append('<label for="bannerHref1" generated="true" class="error" style="display: inline;">请输入合法的网址</label>');
			}
		});
	},
	ImgFileUp(){
		var imgTypeNum;
		var ImgLoad;
		if(window.location.host == "api.adsys.witown.cn"){
			//var uploadUrl = "http://kunlun.witown.cn/resource/upload.do";
			var uploadUrl = "http://kunlun.treebear.cn/resource/upload.do";
		}else{
			var uploadUrl = "http://test.kunlun.treebear.cn/resource/upload.do";
		}
		$('.selectfiles').fileupload({
				url: uploadUrl,
				dataType: 'json',
				disabled: false,
				autoUpload: true,
				acceptFileTypes: /(\.|\/)(jpe?g|png)$/i,
				maxNumberOfFiles : 1,
				add: function (e, data) {
					ImgLoad = layer.load(0, {shade: false});

					var localhostImg = data.fileInput[0].value;
					var imgName = data.originalFiles[0].name;
					var size = data.originalFiles[0].size/1024;
					var imgType = (data.files[0].type).split('/')[1] == 'jpeg'?"jpg":(data.files[0].type).spli('/')[1];
					if(imgType=="jpg"){
						imgTypeNum = 1;
					}else{
						imgTypeNum = 2;
					}
					if(size>200){
						CREAT.layerMsg("图片大小不能超过200KB");
						layer.close(ImgLoad);
						return;
					}
					data.submit()
						.success(function (result, textStatus, jqXHR) {
							var bgW,bgH;
							var img = new Image();
							img.src = result.imgUrl;
							img.onload = function(){
								bgW = img.width;
								bgH = img.height;
								switch ($(".ad_editMain:visible").attr('data-adtype')){
									case 100:
									case '100':
										if(bgW!=750||bgH!=1334){
											CREAT.layerMsg("图片尺寸不对");
											layer.close(ImgLoad);
											return;
										}else{
											layer.close(ImgLoad);
											$(".bgImg").empty();
											$(".bgImg").append("<img src='"+ result.imgUrl +"' data-imgType='"+imgTypeNum+"'>");
										}
										break;
									case 101:
									case '101':
										if(bgW!=750||bgH!=230){
											CREAT.layerMsg("图片尺寸不对");
											layer.close(ImgLoad);
											return;
										}else{
											layer.close(ImgLoad);
											$(".BannerImg").empty();
											$(".BannerImg").append("<img src='"+ result.imgUrl +"'  data-imgType='"+imgTypeNum+"'>");
										}
										break;
									case 102:
									case '102':
										if(bgW!=600||bgH!=750){
											CREAT.layerMsg("图片尺寸不对");
											layer.close(ImgLoad);
											return;
										}else{
											layer.close(ImgLoad);
											$(".bombAdImg").empty();
											$(".bombAdImg").append("<img src='"+ result.imgUrl +"'  data-imgType='"+imgTypeNum+"'>");
										}
										break;
									case 103:
									case '103':
										if(bgW!=347||bgH!=146){
											CREAT.layerMsg("图片尺寸不对");
											layer.close(ImgLoad);
											return;
										}else{
											layer.close(ImgLoad);
											$(".funcImg").empty();
											$(".funcImg").append("<img src='"+ result.imgUrl +"'  data-imgType='"+imgTypeNum+"'>");
										}
										break;
									case 104:
									case '104':
										if($("input[name='imgsize']:checked").val()=="1"){
											if(bgW!=96||bgH!=96){
												CREAT.layerMsg("图片尺寸不对");
												layer.close(ImgLoad);
												return;
											}else{
												layer.close(ImgLoad);
												$(".infoImgsmall").empty();
												$(".infoImgsmall").append("<img src='"+ result.imgUrl +"'  data-imgType='"+imgTypeNum+"'>");
											}
										}
										if($("input[name='imgsize']:checked").val()=="2"){
											if(bgW!=690||bgH!=230){
												CREAT.layerMsg("图片尺寸不对");
												layer.close(ImgLoad);
												return;
											}else{
												layer.close(ImgLoad);
												$(".infoImgbig").empty();
												$(".infoImgbig").append("<img src='"+ result.imgUrl +"'  data-imgType='"+imgTypeNum+"'>");
											}
										}
										break;
									case 105:
									case '105':
										if(bgW!=750||bgH!=1334){
											CREAT.layerMsg("图片尺寸不对");
											layer.close(ImgLoad);
											return;
										}else{
											layer.close(ImgLoad);
											$(".fullAdImg").empty();
											$(".fullAdImg").append("<img src='"+ result.imgUrl +"'  data-imgType='"+imgTypeNum+"'>");
										}
										break;
									case 106:
									case '106':
										if(bgW!=750||bgH!=1334){
											CREAT.layerMsg("图片尺寸不对");
											layer.close(ImgLoad);
											return;
										}else{
											layer.close(ImgLoad);
											$(".jumpAdImg").empty();
											$(".jumpAdImg").append("<img src='"+ result.imgUrl +"'  data-imgType='"+imgTypeNum+"'>");
										}
										break;
								}

						 }
						})
						.error(function (jqXHR, textStatus, errorThrown) {
							layer.close(ImgLoad);
							CREAT.layerMsg("上传出错了，稍后重试");
						})
				},
				done: function (e, data) {
					//完成后进行的操作
					layer.close(ImgLoad);
				}
		});
	},
	imgsizeCheck(){
		$("input[name='imgsize']").click(function(){
			if($("input[name='imgsize']:checked").val()=="1"){
					$(".infoImgbig").hide();
					$(".infoImgsmall").show();
			}
			if($("input[name='imgsize']:checked").val()=="2"){
				$(".infoImgbig").show();
				$(".infoImgsmall").hide();
			}
		});
	},
	btnIsshowCheck(){
		//标题
		$("#infoTitle").blur(function(){
			if($("#infoTitle").val().length==0){
				$("#infoTitle").parent().find(".error").remove();
				$("#infoTitle").parent().append('<label for="infoTitle" generated="true" class="error" style="display: inline;">必填项</label>');
			}else{
				$("#infoTitle").parent().find(".error").remove();
			}
		});
		//图片连接
		$("#infoHref").blur(function(){
			if($("#infoHref").val().length == 0){
				$("#infoHref").parent().find(".error").remove();
				$("#infoHref").parent().append('<label for="infoHref" generated="true" class="error" style="display: inline;">必填项</label>');
			}else{
				if($("#infoHref").parent().find(".error").length == 0){
					$("#infoHref").parent().find(".error").remove();
				}
			}
		});

		//按钮文字
		$("#BtnTxt").blur(function(){
			if($(this).val().length == 0 && $("input[name='infoisShow']:checked").val() == "1"){
				if($("#BtnTxt").val().length == 0){
					$("#BtnTxt").parent().find(".error").remove();
					$("#BtnTxt").parent().append('<label  generated="true" class="error" style="display: inline;">必填项</label>');
				}else{
					$("#BtnTxt").parent().find(".error").remove();
				}
			}else{
				$(this).parent().find(".error").remove();
			}
		});
		//是否显示按钮
		$("input[name='infoisShow']").click(function(){
			if($("input[name='infoisShow']:checked").val()=="1"){
				if($("#BtnTxt").val().length == 0){
					$("#BtnTxt").parent().find(".error").remove();
					$("#BtnTxt").parent().append('<label  generated="true" class="error" style="display: inline;">必填项</label>');
				}else{
					$("#BtnTxt").parent().find(".error").remove();
				}
			}else{
				$("#BtnTxt").parent().find(".error").remove();
			}
		});
	},
	funcHref(){
		$("#funcHref").blur(function(){
			if($("#funcHref").val().length == 0){
				$("#funcHref").parent().find(".error").remove();
				$("#funcHref").parent().append('<label  generated="true" class="error" style="display: inline;">必填项</label>');
			}else{
				$("#funcHref").parent().find(".error").remove();
			}
		});
	},
	jumpHref(){
		$("#jumpHref").blur(function(){
			if($("#jumpHref").val().length == 0){
				$("#jumpHref").parent().find(".error").remove();
				$("#jumpHref").parent().append('<label  generated="true" class="error" style="display: inline;">必填项</label>');
			}else{
				$("#jumpHref").parent().find(".error").remove();
			}
		});
	},
	layerMsg(msg){
		layer.open({
			type: "msg"
			,offset: 'rb' //具体配置参考：offset参数项
			,content: '<p style="text-align:center;padding:20px 80px">'+msg+'</p>'
			,shade: 0 //不显示遮罩
			,time: 2000
		});
	}
}


export default CREAT;
