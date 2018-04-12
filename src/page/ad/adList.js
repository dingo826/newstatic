var requestUrl = 'http://api.adsys.treebear.cn';
var requestUrl = '';
let listApi = requestUrl + '/rest/ad/put/queryAdorders';
let exportApi = requestUrl + '/export/settleApplyExcel';

// 20180411 测试
import create from "./create";  // __webpack_require__(5)

import area from "./area";  //__webpack_require__(4);

import comPagebreak from '../../components/common/pagebreak';
comPagebreak();

import adListHtml from '../../page/ad/adListTmp'
let ADLIST = {
	init() {
		let mi = this;
		$('.app').append($(adListHtml()));
		this.request(15,1);
		this.search();
		this.exports();
		this.changePage();
		this.craeteAd();
		this.showArea();
		
	},
	page(pageTotal,pageSize,pageNo){
		let mi = this;
		if(pageSize){
			var pageSize = pageSize;
		}else{
			var pageSize = 15;
		}
		$(".tcdPageCode").createPage({
				pageCount:Math.ceil(pageTotal/pageSize), //总页数
				current: pageNo,
				backFn: function(p) {
					ADLIST.request(pageSize,p);
				}
		});
	},
	changePage() {
		let mi = this;
		$(".pageSize").change(function(){
			var rowNum = $(this).val();
			ADLIST.request(rowNum,1);
		});
	},
	craeteAd(){
		$(".craeteAd").click(function(){
			history.pushState({},null,'main.html#create?isNew=1');//之后的状态，需要进行保存
			$(".app-main-content").remove();
			create.init();
		})
	},
	createRalodPage(a) {
		//如果是查找的话或者重新选择分页的话
		$('.tcdPageCode').createRalodPage({
			pageCount: a, //总页数
			current: 1,
			backFn: function(p) {
				alert('a'+p);
			}
		});
	},
	formatDate(date) {
		let d = new Date(date),
		month = '' + (d.getMonth() + 1),
		day = '' + d.getDate(),
		year = d.getFullYear();
		if (month.length < 2) month = '0' + month;
		if (day.length < 2) day = '0' + day;
		return [year, month, day].join('-');
	},
	showArea(){
		$(document).off('click').on('click','.showArea',function(){
			history.pushState({},null,'main.html#area?adId='+$(this).attr('data-adId')+'&adType='+$(this).attr('data-type'));//之后的状态，需要进行保存
			$(".app-main-content").remove();
			area.init();
		});
	},
	switchAd(p){
		var enable = $(p).attr('data-enable');
		if(enable=='1'||enable==1){
			var infoTxt = '是否确认再次投放此广告？';
			var switchAdUrl = "/rest/ad/put/switchIportalAd";
		}else{
			if($(p).attr("data-adType")=="107"||$(p).attr("data-adType")==107){
				var infoTxt = '悬浮广告停用后不可恢复，请确认是否停用?';
				var switchAdUrl = "/rest/ad/put/switchJsAd";
			}else{
				var infoTxt = '是否确认停用此广告？';
				var switchAdUrl = "/rest/ad/put/switchIportalAd";
			}
		}
		var switchJsAd = new Object();
		switchJsAd.enable = $(p).attr("data-enable");
		switchJsAd.id = $(p).attr("data-adId");
		if(confirm(infoTxt)){
			$.ajax({
				type: 'get',
				url: switchAdUrl,
				dateType: 'json',
				data:switchJsAd,
				success(data) {
					if(data.code=="0002005"){
						var host = window.location.host;
						window.location.href="http://"+host+'/view/login.html';
						return;
					}
					if(data.success){
						ADLIST.request(15,1);
					}
				}
			});
		}
	},
	search() {
		let mi = this;
		$(".J-searchAdlist").click(function(){
			ADLIST.request(15,1);
		})
	},
	exports() {
		$(".J-export").click(function(){
			// $('.findCondition').attr('action', exportApi);
			// $('.findCondition').submit();
			// var params = $('.findCondition').serialize();
			// $.ajax({
			//   type: 'POST',
			//   url: exportApi,
			//   dateType: 'json',
			//   data: params,
			//   success(data) {
			//     console.log(data);
			//   }
			// });
			//mi.request(listApi, params, mi.success, mi._false);
		});
	},
	request(pageSize,pageNo) {
		let mi = this;
		var adListJson = new Object();
		adListJson.pageNo = pageNo;
		adListJson.pageSize = pageSize;
		
		if($(".adsname").val()){
			adListJson.name = $(".adsname").val();
		}
		if($(".ownerName").val()){
			adListJson.ownerName = $(".ownerName").val();
		}
		if($(".releaseUser").val()){
			adListJson.releaseUser = $(".releaseUser").val();
		}
		if($(".adTypeSelect").val()){
			adListJson.adType = $(".adTypeSelect").val();
		}
		if($(".status").val()){
			adListJson.status = $(".status").val();
		}
		if($(".rangeType").val()){
			adListJson.rangeType = $(".rangeType").val();
		}

		$.ajax({
			type: 'post',
			url: "/rest/ad/put/queryAdorders",
			contentType: "application/json",
			data: JSON.stringify(adListJson),
			// contentType: "json",
			// data: adListJson,
			success(data) {
				if(data.code=="0002005"){
					var host = window.location.host;
					window.location.href="http://"+host+'/view/login.html';
					return;
				}
				if (data.success) {
					var dataList = data.data;
					var html="";
					var txtBtn = "";
					var pageTotal = data.count;
					ADLIST.page(pageTotal,pageSize,pageNo);


					$.each(dataList, (i, item) => {
						switch (item.status) {
							case 1:
							case "1":
								var txstatus = '<span>投放中</span>';
								txtBtn = '<span class="view">预览</span><span class="copy">复制</span><span class="onSwitch" data-enable="0" data-adId="'+item.id+'" data-adType="'+item.adType+'">停用</span>';
								break;
							case 0:
							case "0":
								var txstatus = '<span>待投放</span>';
								txtBtn = '';
								break;
							case 2:
							case "2":
								var txstatus = '<span class="statusEnd">结束</span>';
								txtBtn = '<span class="view">预览</span><span class="copy">复制</span><span class="onSwitch" data-enable="1" data-adId="'+item.id+'">再次投放</span>';
								break;
							default:
								var txstatus = '';
								txtBtn='';
								break;
						}
						if(item.adType == "107" || item.adType== 107){
							var txtadType = '悬浮广告';
							if(item.status==2||item.status=="2"){
								var txtBtn = '<span class="stop">已停用</span>';
							}else{
								var txtBtn = '<span class="edit" data-adId="'+item.id+'" data-rangeType="'+item.rangeType+'">编辑</span><span class="onSwitch" data-enable="0" data-adId="'+item.id+'" data-adType="'+item.adType+'">停用</span>';
							}
						}else{
							if(item.status==2||item.status=="2"){
								var txtBtn = '<span class="putAgain" data-adId="'+item.id+'" data-rangeType="'+item.rangeType+'">再次投放</span>';
							}else{
								var txtBtn = '<span class="editAd" data-adId="'+item.id+'" data-rangeType="'+item.rangeType+'">编辑</span><span class="onSwitch" data-enable="0" data-adId="'+item.id+'" data-adType="'+item.adType+'">停用</span>';
							}
						}
						switch (item.adType) {
							case 100:
							case "100":
								var txtadType = '全屏背景图';
								break;
								var txtadType = '全屏背景图';
								break;
							case 101:
							case "101":
								var txtadType = '主页Banner';
								break;
							case 102:
							case "102":
								var txtadType = '弹屏广告';
								break;
							case 103:
							case "103":
								var txtadType = '功能区';
								break;
							case 104:
							case "104":
								var txtadType = '信息流区';
								break;
							case 105:
							case "105":
								var txtadType = '全屏轮播广告';
								break;
							case 106:
							case "106":
								var txtadType = '全屏自动跳转广告';
								break;
							case 107:
							case "107":
								var txtadType = '悬浮广告';
								break;
							default:
								var txtadType = '';
								break;
						}
						switch (item.rangeType) {
							case 1:
							case "1":
								var txtrangeType = '指定代理商';
								break;
							case 2:
							case "2":
								var txtrangeType = '指定店铺';
								break;
							case 3:
							case "3":
								var txtrangeType = '组合店铺';
								break;
							default:
								var txtrangeType = '';
								break;
						}
						var adList_ownerName = item.ownerName?item.ownerName:"";
						var adList_name = item.name?item.name:"";
						var adList_releaseUser= item.releaseUser?item.releaseUser:"";
						var adList_startTime = item.startTime?(item.startTime).split(' ')[0]:"";
						var adList_endTime = item.endTime?(item.endTime).split(' ')[0]:"";
						var adList_id = item.id?item.id:"";
						var adList_adType = item.adType?item.adType:"";
						html +=  `<tr>
							<td style="max-width: 200px;">${adList_ownerName}</td>
							<td style="max-width: 200px;">${adList_name}</td>
							<td>${adList_releaseUser}</td>
							<td>${txtadType}</td>
							<td>${txstatus}</td>

							<td>${adList_startTime}</td>
							<td>${adList_endTime}</td>
							<td class="showArea" data-adId='${adList_id}' data-type='${adList_adType}'>${txtrangeType}</td>
							<td>/</td>
							<td>/</td>
							<td>/</td>
							<td class='handle'>${txtBtn}</td>
						</tr>`;
					});
					$('.J-AdList').html(html);

					$(".shopTmpl").find("input[name='checkbox_router']:checked").length == $(".shopTmpl").find("input[name='checkbox_router']").length ?
					$('#shop_leftCheck').prop('checked', true) : $('#shop_leftCheck').prop('checked', false);

					$(".onSwitch").click(function(){
						ADLIST.switchAd(this);
					});
					$(".edit,.putAgain").click(function(){
						history.pushState({},null,'main.html#create?adId='+$(this).attr("data-adId")+'&rangeType='+$(this).attr('data-rangeType'));//之后的状态，需要进行保存
						$(".app-main-content").remove();
						create.init();
					});
					$(".editAd").click(function(){
						history.pushState({},null,'main.html#create?adId='+$(this).attr("data-adId")+'&rangeType='+$(this).attr('data-rangeType')+"&editAd=1");//之后的状态，需要进行保存
						$(".app-main-content").remove();
						create.init();
					});
				} else {
					alert(data.msg);
				}
			}
		});
	}
};


export default ADLIST;
