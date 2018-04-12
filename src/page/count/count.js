import comPagebreak from '../../components/common/pagebreak';
comPagebreak();
import html20 from './countTmp';
/*var requestUrl = 'http://api.adsys.treebear.cn';*/
var requestUrl = '';
let listApi = requestUrl + '/rest/wechat/attractFans/get/settleApplyList';
let exportApi = requestUrl + '/export/settleApplyExcel';

	let Count = {
		init() {
			let mi = this;
			
			$('.app').append($(html20()));
			this.request(listApi, {pageNo:1, pageSize:15,status:1}, mi.render, mi._false);
			this.search();
			this.changePage();
			this.exports();
			this.getTime();
			this.uploadFile();
		},
		_false(data) {
			alert(data.msg)
		},
		uploadFile() {
			$('#fileupload').fileupload({
				url: '/rest/wechat/attractFans/import/settleApplyExcel',
				dataType: 'json',
				method:'post',
				disabled: false,
				autoUpload: true,
				acceptFileTypes: /(\.|\/)(csv|xls|xlsx)$/i,
				add: function(e, data) {
					var acceptFileTypes = /(\.|\/)(csv|xls|xlsx)$/;
					console.log(data);
					console.log(acceptFileTypes, data.originalFiles[0]['name']);
					if(data.originalFiles[0]['type'].length && !acceptFileTypes.test(data.originalFiles[0]['name'])) {
							layer.alert('上传文件格式错误！');
							return false;
					}
					/*.success(function (result, textStatus, jqXHR) {
						let arr = result.dealResult.failedApplyNoList;
						let ids = arr.length > 0 ? arr.join(',') : '';

						let tmpl = `<div class="tipsCon">
							<div class="titl">本次共批量处理单号${result.dealResult.totalDeal}笔，成功${result.dealResult.totalSucceed}笔，失败${result.dealResult.totalFailed}笔</div>
							<div class="falseslist">
								失败订单号：${ids}
							</div>
						</div>`;
						layer.open({
							type: 1,
							title: '批量处理结果统计',
							area:['420px', '260px'],
							shadeClose: true,
							content: tmpl,
							btn:['确定'],
							yes: function(){
								location.reload();
							}
						});
						//console.log(result, textStatus, jqXHR);
					});*/
				},
				done: function (e, data) {
					console.log(data);
				}
			});
		},
		getTime() {
			$('.date').datetimepicker({
				language: 'cn',//显示中文
				format: 'yyyy-mm-dd',//显示格式
				minView: 'month',//设置只显示到月份
				initialDate: new Date(),//初始化当前日期
				autoclose: true,//选中自动关闭
				todayBtn: true//显示今日按钮
			});
		},
		page(pageTotal,rowNum,pageNo){
			let mi = this;
			if(rowNum){
				var rowNum = rowNum;
			}else{
				var rowNum = 15;
			}
			$(".count_tcdPageCode").createPage({
					pageCount:pageTotal, //总页数
					current: pageNo,
					backFn: function(p) {
						Count.request(listApi, {pageNo:p, pageSize:rowNum}, mi.render, mi._false);
					}
			});
		},
		changePage() {
			let mi = this;
			$(".count_pageSize").change(function(){
				var rowNum = $(this).val();
				Count.request(listApi, {pageNo:1, pageSize:rowNum}, mi.render, mi._false);
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
		render(data, mi,rowNum,pageNo) {

			let html = '';
			$('.J-countList').html('');
			// $('.J_PageBar').html('');
			if(data.data){
				$.each(data.data, (i, item) => {
					let fp = item.hasInvoice == 1 ? '有': '无';
					let txstatus  = '';
					let payBank = '/';
					if(item.payBank){
						payBank = item.payBank;
					}
					let applyTime = !!item.applyTime ? mi.formatDate(Number(item.applyTime)) : '-';
					let completeTime = !!item.completeTime ? mi.formatDate(Number(item.completeTime)) : '-';
					switch (item.status) {
						case 1:
						case "1":
							txstatus = '已提交';
							break;
						case 2:
						case "2":
							txstatus = '已结算';
							break;
					}
					html +=  `<tr>
						<td>${item.applyNo}</td>
						<td class='toolen' title='${item.payAccount}'>${item.payAccount}</td>
						<td class='toolen' title='${payBank}'>${payBank}</td>
						<td>${item.payName}</td>
						<td>${item.payAmountYuan}</td>
						<td>${item.paidAmountYuan}</td>

						<td>${fp}</td>
						<td>${item.applyName}</td>
						<td>${txstatus}</td>
						<td>${applyTime}</td>
						<td>${completeTime}</td>
					</tr>`;
				});
				
				$('.J-countList').html(html);
			}
			Count.page(data.total,rowNum,pageNo);
		},
		search() {
			let mi = this;
			$(".J-search").click(function(){
				var params = $('.findCondition').serialize();
				let pageNo = '?pageNo=1&pageSize=10';
				mi.request(listApi + pageNo, params, mi.render, mi._false);
			});
		},
		exports() {
			$(".J-export").click(function(){
				$('.findCondition').attr('action', exportApi);
				$('.findCondition').submit();
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
				//mi.request(listApi, params, mi.render, mi._false);
			});
		},
		request(url, params, sucesscallback, falsecallback) {
			let mi = this;
			$.ajax({
				type: 'GET',
				url: url,
				dateType: 'json',
				contentType: 'application/json',
				data: params,
				success(data) {
					if(data.code=="0002005"){
						var host = window.location.host;
						window.location.href="http://"+host+'/view/login.html';
						return;
					}
					if (data.success) {
						
						sucesscallback(data, mi,params.pageSize,params.pageNo);
					} else {
						falsecallback(data)
					}
				}
			});
		}
	};

export default Count;