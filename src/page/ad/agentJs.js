import comPagebreak from '../../components/common/pagebreak';
comPagebreak();
var agentName;
var channelManagerId;
var customerType;
var isControl = '';
var isKa = '';
var isChange = false;
var isfirst = true;
var toAgent;//是添加代理商还是编辑代理商
var adId;
var isNew;
var addAgentFirst;
var createAdType;
import Html from '../../page/ad/agentTmp'

  let AGENT = {
	init() {
	  $('.app').append($(Html()));
	  let mi = this;
	  this.getQueryString();
	  this.getAvailableAgentList(15,1);
	  this.getAgentChannelNames();
	  this.backBefore();
	  this.checkbox_router();
	  this.leftCheckAll();
	  this.onSearch();
	  this.saveAgentList();
	  this.rightCheck();
	  this.changePage();
	},
	getQueryString(){
	  var url=window.location.hash;
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
	  toAgent = Request["toAgent"];
	  createAdType = Request["adType"];
	  addAgentFirst = Request["addAgentFirst"];

	  if(toAgent==2||toAgent=="2"){
		$(".toAgentTitle").html("编辑代理商");
		$(".toAgentTabName").html("删除代理商");
		$(".agentTmp .deleteAgent").show();
		$(".agentTmp .saveAgent").hide();
	  }else{
		$(".toAgentTitle").html("代理商选择");
		$(".toAgentTabName").html("添加代理商");
		$(".agentTmp .deleteAgent").hide();
		$(".agentTmp .saveAgent").show();
	  }
	  agentName = '';
	  channelManagerId = '';
	  customerType = '';
	  isControl = '';
	  isKa = '';
	  adId = Request["adId"];
	  isNew = toAgent;
	},
	page(pageTotal,rowNum,pageNo){
	  if(rowNum){
		var rowNum = rowNum;
	  }else{
		var rowNum = 15;
	  }
	  $(".agent_tcdPageCode").createPage({
		  pageCount:Math.ceil(pageTotal/rowNum), //总页数
		  current: pageNo,
		  backFn: function(p) {
			AGENT.getAvailableAgentList(rowNum,p);
		  }
	  });
	},
	changePage() {
	  $(".agent_pageSize").change(function(){
			var rowNum = $(this).val();
		AGENT.getAvailableAgentList(rowNum,1);
		});
	},
	getAvailableAgentList(rowNum,pageNo){
	  var AgentListJson = {"adId":adId,"adType":createAdType,'agentName':$("#agentTmp_agentName").val(),"channelManagerId":$(".agentTmpl .magerName").val(),"customerType":$(".agentTmp_role").val(),"isControl":$(".agentTmpl .isControl").val(),"isKa":$(".agentTmpl .isKA").val(),"isNew":isNew,"pageNo":pageNo,"pageSize":rowNum}
	  if(!$(".agentTmpl .magerName").val()){
		delete AgentListJson.channelManagerId;
	  }

	  $.ajax({
		type:'get',
		url:"/rest/ad/put/getAvailableAgentList",
		dataType: 'json',
		data:AgentListJson,
		success: function(data) {
		  if(data.code=="0002005"){
			var host = window.location.host;
			window.location.href="http://"+host+'/view/login.html';
			return;
		  }
		  if(data.success){
			var agentList = data.agentList;
			var pageTotal = data.total;

			AGENT.page(pageTotal,rowNum,pageNo);
			$("#dataLoading").show();

			var agentList_l_html = '';
			for(var i=0;i<agentList.length;i++){
			  if(agentList[i].isKa==1||agentList[i].isKa=="1"){
				var isKa = "是"
			  }else{
				var isKa = "否"
			  }

			  if(agentList[i].isControl==1||agentList[i].isControl=="1"){
				var isControl = "是"
			  }else{
				var isControl = '否'
			  }
			  switch(agentList[i].customerType)
			  {
				case "agent":
				  var agentCustomerType = "代理商";
				  break;
				case "strategy":
				  var agentCustomerType = "战略";
				  break;
				case 'business':
				  var agentCustomerType = "城市商圈";
				  break;
				case 'agentCustomerType':
				  var agentNametxt = "自注册";
				  break;
				default:
				  var agentCustomerType = "";
			  }
			  //跟右边对比判断是否要打勾
			  var trs = $('#addMerchant tr');
			  var selectMids = [];
			  if(trs.length > 0) {
				trs.each(function(i, item) {
				  selectMids.push($(item).attr('attr-adId'));
				});
			  }

			  var inputCheck='<input type="checkbox" id="'+agentList[i].agentId+'" name="checkbox_router"/>';
			  for(var j=0;j<selectMids.length;j++){
				if(agentList[i].agentId==selectMids[j]){
				  var inputCheck ='<input type="checkbox" id="'+agentList[i].agentId+'" name="checkbox_router" checked="checked"/>';
				  break;
				}
			  }

			  agentList_l_html+='<tr>\
				<td>'+inputCheck+'</td>\
				<td class="c-td-2" title="'+agentList[i].agentName+'">'+agentList[i].agentName+'</td>\
				<td class="c-td-2">'+agentCustomerType+'</td>\
				<td class="c-td-1">'+isKa+'</td>\
				<td class="c-td-1">'+isControl+'</td>\
				<td class="c-td-1" title="'+agentList[i].channelManager+'">'+agentList[i].channelManager+'</td>\
			  </tr>'
			}
			$(".J-reslist").html(agentList_l_html);
			//是否全选
			$(".agentTmp").find("input[name='checkbox_router']:checked").length == $(".agentTmp").find("input[name='checkbox_router']").length ?
			$('#leftCheck').prop('checked', true) : $('#leftCheck').prop('checked', false);
			$("#dataLoading").hide();
		  }else{
			$("#dataLoading").hide();
			alert(data.msg);
		  }
		}
	  });
	},
	getAgentChannelNames(){
	  $.ajax({
		type:'get',
		url:"/rest/ad/basedata/getAgentChannelNames",
		dataType: 'json',
		success: function(data) {
		  if(data.code=="0002005"){
			var host = window.location.host;
			window.location.href="http://"+host+'/view/login.html';
			return;
		  }
		  if(data.success){
			var channelNameList = data.data;
			var _magerNameOption = '<option value="" selected="selected">全部</option>';
			for(var i=0;i<channelNameList.length;i++){
			  _magerNameOption += '<option value="'+ channelNameList[i].id +'">'+ channelNameList[i].nickname +'</option>'
			}
			$(".magerName").html(_magerNameOption);
		  }
		}
	  });
	},
	checkbox_router(){
	  $(".agentTmp").on("click","input[name='checkbox_router']", function(){
		  var trs = $('#addMerchant tr');
		  var selectMids = [];
		  if(trs.length > 0) {
			trs.each(function(i, item) {
			  selectMids.push($(item).attr('attr-adId'));
			});
		  }
		  if(!$(this).is(':checked')) {
			if(confirm("取消勾选删除此代理商?")) {
			  $('#addMerchant').find('tr[attr-adId=' + $(this).attr('id')+']').remove();
			} else {
			  $(this).prop("checked", true);
			}
		  }else {
			  var jCheckAllBrother = $(this).parent().nextAll();
			  var agentName_r = $(jCheckAllBrother[0]).html();
			  var customerType_r = $(jCheckAllBrother[1]).html();
			  var isKa_r = $(jCheckAllBrother[2]).html();
			  var isControl_r = $(jCheckAllBrother[3]).html();
			  var channelManager_r = $(jCheckAllBrother[4]).html();
			  if(selectMids.length >= 500) {
				AGENT.showTips('您选择的店铺总数已达到500上限，请保存！');
				$(this).prop("checked", false);
				return false;
			  }
			  if(selectMids.indexOf($(this).attr('id')) == -1) {
				$('#addMerchant').prepend('<tr attr-adId='+$(this).attr('id')+'><td class="c-td-2" title="'+agentName_r+'">' + agentName_r + '</td><td class="c-td-2">' + customerType_r + '</td><td class="c-td-1">' + isKa_r + '</td><td class="c-td-1">'+isControl_r+'</td><td class="c-td-1" title="'+channelManager_r+'">'+channelManager_r+'</td></tr>');
			  }
		  }
		  $(".agentTmp").find("input[name='checkbox_router']:checked").length == $(".agentTmp").find("input[name='checkbox_router']").length ?
		  $('#leftCheck').prop('checked', true) : $('#leftCheck').prop('checked', false);
	  });
	},
	leftCheckAll(){
	  $(".agentTmp").on("click","#leftCheck", function(){
		var trs = $('#addMerchant tr');
		var selectMids = [];
		if(trs.length > 0) {
		  trs.each(function(i, item) {
			selectMids.push($(item).attr('attr-adId'));
		  });
		}
		var num = 0;
		if ($(this).is(':checked')) {
		  $("input[name='checkbox_router']").each(function (index, item) {
			if (!$(item).is(":checked")) {
			  num +=1;
			}
		  });
		}
		if(selectMids.length + num > 500) {
		  var selected = trs.length;
		  var unselected = 500 - selected;
		  var msg = '您已选' + selected + '条，还可选' + unselected + '条，单次提交不超过500上限';
		  AGENT.showTips(msg);
		  return false;
		}

		if ($(this).is(':checked')) {
			$("input[name='checkbox_router']").each(function (index) {
				if (!$(this).is(":checked")) {
					$(this).prop("checked", true);
					var jCheckAllBrother = $(this).parent().nextAll();
					var agentName_r = $(jCheckAllBrother[0]).html();
					var customerType_r = $(jCheckAllBrother[1]).html();
					var isKa_r = $(jCheckAllBrother[2]).html();
					var isControl_r = $(jCheckAllBrother[3]).html();
					var channelManager_r = $(jCheckAllBrother[4]).html();
					if(selectMids.indexOf($(this).attr('id')) == -1) {
					  $('#addMerchant').prepend('<tr attr-adId='+$(this).attr('id')+'><td class="c-td-2" title="'+agentName_r+'">' + agentName_r + '</td><td class="c-td-2">' + customerType_r + '</td><td class="c-td-1">' + isKa_r + '</td><td class="c-td-1">'+isControl_r+'</td><td class="c-td-1" title="'+channelManager_r+'">'+channelManager_r+'</td></tr>');
					}
				}
			});
		} else {
			 if(confirm("取消勾选此店铺?")) {
			   $("input[name='checkbox_router']").each(function (index) {
				   $(this).prop("checked", false);
				   $('#addMerchant').find('tr[attr-adId=' + $(this).attr('id')+']').remove();
			   });
			 } else {
			   $(this).prop("checked", true);
			 }
		}
	  });
	},
	rightCheck(){
	  $(".agentTmpl").on("click","#rightCheck", function(){
		if ($(this).is(':checked')) {
		  $("#addMerchant").find("input").prop("checked", true);
		}else{
		  $("#addMerchant").find("input").prop("checked", false);
		}
	  });
	},
	onSearch(){
	  $(".sousuoBtn").click(function(){
		AGENT.getAvailableAgentList(15,1);
	  });
	},
	saveAgentList(){
	  $(".save").click(function(){
		if(toAgent==1||toAgent=="1"){
		  var isSave = 1;
		}else{
		  var isSave = 2;
		}
		var trs = $('#addMerchant tr');
		var agentIds ='';
		if(trs.length > 0) {
		  trs.each(function(i, item) {
			agentIds += $(item).attr('attr-adId') + '^';
		  });
		}
		if(!agentIds.length){
		  alert("请至少选择一家");
		  return;
		}
		$.ajax({
		  type:'post',
		  url:"/rest/ad/put/saveOrDeleteAgents",
		  dataType: 'json',
		  data:{"adId":adId,'agentIds':agentIds.substring(0,agentIds.length-1),"isSave":isSave,"adType":createAdType},
		  success: function(data) {
			if(data.code=="0002005"){
			  var host = window.location.host;
			  window.location.href="http://"+host+'/view/login.html';
			  return;
			}
			if(data.success){
			  $("#loading").show();
			  if(data.count==0||data.count=='0'){
				$(".agentCheckPng").hide();
			  }else{
				$(".agentCheckPng").show();
			  }
			  $("#loading").hide();
			  history.pushState({},null,'main.html#create?isNew=1');//之后的状态，需要进行保存
			  $(".app-main-content").hide();
			  $(".createTmpl").show();
			}else{
			  alert(data.msg);
			  $('#loading').hide();
			}
		  }
		});
	  });
	},
	backBefore(){
	  $(".agentTmpl .backBefore").click(function(){
		history.pushState({},null,'main.html#create?isNew=1');//之后的状态，需要进行保存
		$(".app-main-content").hide();
		$(".createTmpl").show();
	  });
	},
	showTips(msg){
	  $(".tipmsg").html(msg)
	  $(".tipmsg").show(3, function(){
		setTimeout(function() {
		  $(".tipmsg").hide();
		}, 3000);
	  });
	}
  };

export default AGENT;