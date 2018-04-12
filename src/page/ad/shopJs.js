
"use strict";
import comPagebreak from '../../components/common/pagebreak';
import Html from '../../page/ad/shopTmp'
comPagebreak();
var belongAgent="";
var areaCode = "";
var bizType = "";
var isControl = '';
var isKa = '';
var merchantName;
var isShopFist = true;
var toShop;//是添加店铺还是编辑店铺\
var adId;
var isNew;
var shopListUrl;
var createAdType;

  let SHOP = {
    init() {
      
      $('.app').append($(Html()));

      let mi = this;
      this.getQueryString();
      this.changePage();
      this.backBefore();
      this.adTypeOne();
      this.province();
      this.checkbox_router();
      this.leftCheckAll();
      this.onSearch();
      this.saveShopList();
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
      toShop = Request["toShop"];
      createAdType = Request["adType"];
      if(toShop==2||toShop=="2"||toShop==4||toShop=="4"){
        if(toShop==2||toShop=="2"){
          $(".toshopTitle").html("编辑例外店铺");
          $(".toshopTabName").html("删除例外店铺");
        }else{
          $(".toshopTitle").html("编辑店铺");
          $(".toshopTabName").html("删除店铺");
        }
        $(".shopTmp .deleteShop").show();
        $(".shopTmp .saveShop").hide();
        isNew = 2;
      }else{
        if(toShop==1||toShop=="1"){
          $(".toshopTitle").html("例外店铺选择");
          $(".toshopTabName").html("添加例外店铺");
        }else{
          $(".toshopTitle").html("店铺选择");
          $(".toshopTabName").html("添加店铺");
        }
        $(".shopTmp .deleteShop").hide();
        $(".shopTmp .saveShop").show();
        isNew = 1;
      }

      if(toShop==1||toShop=="1"||toShop==2||toShop=="2"){
        shopListUrl = "/rest/ad/put/getPutAgentMerchants";
      }else{
        shopListUrl = "/rest/ad/put/getAvailableMerchantList";
      }
      belongAgent="";
      areaCode = "";
      bizType = "";
      isControl = '';
      isKa = '';
      merchantName = '';
      adId = Request["adId"];
      SHOP.getPutShopMerchants(15,1);
    },
    page(pageTotal,rowNum,pageNo){
      if(rowNum){
        var rowNum = rowNum;
      }else{
        var rowNum = 15;
      }
      $(".shop_tcdPageCode").createPage({
          pageCount:Math.ceil(pageTotal/rowNum), //总页数
          current: pageNo,
          backFn: function(p) {
            SHOP.getPutShopMerchants(rowNum,p);
          }
      });
    },
    changePage() {
      $(".shop_pageSize").change(function(){
  			var rowNum = $(this).val();
        SHOP.getPutShopMerchants(rowNum,1);
  		});
    },
    getPutShopMerchants(rowNum,pageNo){
      var shopListJson = new Object();
      shopListJson.adId = adId;
      shopListJson.agentName = $(".shopTmp_agent").val();
      shopListJson.merchantName =$("#shopTmp_shopName").val();
      shopListJson.isControl = $(".shop_isControl").val();
      shopListJson.isKa = $(".shop_isKA").val();
      shopListJson.isNew = isNew;
      shopListJson.pageNo = pageNo;
      shopListJson.pageSize = rowNum;
      if($("#province").val()){
        shopListJson.areaCode = $("#province").val();
      }
      if($("#city").val()){
        shopListJson.areaCode = $("#city").val();
      }
      if($("#county").val()){
        shopListJson.areaCode = $("#county").val();
      }
      if($(".adType1").val()){
        shopListJson.bizType = $(".adType1").val();
      }
      if($(".adType2").val()){
        shopListJson.bizType = $(".adType2").val();
      }


      if(toShop==3||toShop=="3"||toShop==4||toShop=="4"){
        shopListJson.adType = createAdType;
      }
      $.ajax({
        type:'get',
        url:shopListUrl,
        dataType: 'json',
        data:shopListJson,
        success: function(data) {
          if(data.code=="0002005"){
            var host = window.location.host;
            window.location.href="http://"+host+'/view/login.html';
            return;
          }
          if(data.success){
            var merchantlist = data.merchantlist;
            var pageTotal = data.total;
            SHOP.page(pageTotal,rowNum,pageNo);
            $("#dataLoading").show();
            var merchantlist_l_html = '';
            for(var i=0;i<merchantlist.length;i++){
              if(merchantlist[i].isKa==1||merchantlist[i].isKa=="1"){
                var isKa = "是"
              }else{
                var isKa = "否"
              }

              if(merchantlist[i].isControl==1||merchantlist[i].isControl=="1"){
                var isControl = "是"
              }else{
                var isControl = '否'
              }

              //跟右边对比判断是否要打勾
              var trs = $('#addShoplist_r tr');
              var selectMids = [];
              if(trs.length > 0) {
                trs.each(function(i, item) {
                  selectMids.push($(item).attr('attr-adId'));
                });
              }

              var inputCheck='<input type="checkbox" id="'+merchantlist[i].merchantId+'" name="checkbox_router" />';
              for(var j=0;j<selectMids.length;j++){
                if(merchantlist[i].merchantId==selectMids[j]){
                  var inputCheck ='<input type="checkbox" id="'+merchantlist[i].merchantId+'" name="checkbox_router" checked="checked"/>';
                  break;
                }
              }


              merchantlist_l_html+='<tr>\
                <td>'+inputCheck+'</td>\
                <td class="c-td-2" title="'+merchantlist[i].merchantName+'">'+merchantlist[i].merchantName+'</td>\
                <td class="c-td-2" title="'+merchantlist[i].agentName+'">'+merchantlist[i].agentName+'</td>\
                <td class="c-td-1" title="'+merchantlist[i].areaValue+'">'+merchantlist[i].areaValue+'</td>\
                <td class="c-td-1" title="'+merchantlist[i].bizValue+'">'+merchantlist[i].bizValue+'</td>\
                <td class="c-td-1">'+isKa+'</td>\
                <td class="c-td-1">'+isControl+'</td>\
              </tr>'
            }
            $(".J-shopList").html(merchantlist_l_html);

            //是否全选
            $(".shopTmpl").find("input[name='checkbox_router']:checked").length == $(".shopTmpl").find("input[name='checkbox_router']").length ?
            $('#shop_leftCheck').prop('checked', true) : $('#shop_leftCheck').prop('checked', false);
            $("#dataLoading").hide();
          }else{
            $("#dataLoading").hide();
            alert(data.msg);
          }
        }
      });
    },
    checkbox_router(){
      $(".J-shopList").on("click","input[name='checkbox_router']", function(){
          var trs = $('#addShoplist_r tr');
          var selectMids = [];
          if(trs.length > 0) {
            trs.each(function(i, item) {
              selectMids.push($(item).attr('attr-adId'));
            });
          }
          if(!$(this).is(':checked')) {
            if(confirm("取消勾选此店铺?")) {
              $('#addShoplist_r').find('tr[attr-adId=' + $(this).attr('id')+']').remove();
            } else {
              $(this).prop("checked", true);
            }
          }else {
              var jCheckAllBrother = $(this).parent().nextAll();
              var merchantName_r = $(jCheckAllBrother[0]).html();
              var belongAgent_r = $(jCheckAllBrother[1]).html();
              var area_r = $(jCheckAllBrother[2]).html();
              var bizType_r = $(jCheckAllBrother[3]).html();
              var isKa_r = $(jCheckAllBrother[4]).html();
              var isControl_r = $(jCheckAllBrother[5]).html();
              if(selectMids.length >= 500) {
                SHOP.showTips('您选择的店铺总数已达到500上限，请保存！');
                $(this).prop("checked", false);
                return false;
              }
              if(selectMids.indexOf($(this).attr('id')) == -1) {
                $('#addShoplist_r').prepend('<tr attr-adId='+$(this).attr('id')+'><td class="c-td-2" title="'+merchantName_r+'">' + merchantName_r + '</td><td class="c-td-2" title="'+belongAgent_r+'">' + belongAgent_r + '</td><td class="c-td-1" title="'+area_r+'">' + area_r + '</td><td class="c-td-1" title="'+bizType_r+'">'+bizType_r+'</td><td class="c-td-1">'+isKa_r+'</td><td class="c-td-1">'+isControl_r+'</td></tr>');
              }
          }
          $(".J-shopList").find("input[name='checkbox_router']:checked").length == $(".J-shopList").find("input[name='checkbox_router']").length ?
          $('#shop_leftCheck').prop('checked', true) : $('#shop_leftCheck').prop('checked', false);
      });
    },
    leftCheckAll(){
      $("#shop_leftCheck").on("click",function(){
        var trs = $('#addShoplist_r tr');
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
          SHOP.showTips(msg);
          return false;
        }

        if ($(this).is(':checked')) {
            $("input[name='checkbox_router']").each(function (index) {
                if (!$(this).is(":checked")) {
                    $(this).prop("checked", true);
                    var jCheckAllBrother = $(this).parent().nextAll();
                    var merchantName_r = $(jCheckAllBrother[0]).html();
                    var belongAgent_r = $(jCheckAllBrother[1]).html();
                    var area_r = $(jCheckAllBrother[2]).html();
                    var bizType_r = $(jCheckAllBrother[3]).html();
                    var isKa_r = $(jCheckAllBrother[4]).html();
                    var isControl_r = $(jCheckAllBrother[5]).html();
                    if(selectMids.indexOf($(this).attr('id')) == -1) {
                      $('#addShoplist_r').prepend('<tr attr-adId='+$(this).attr('id')+'><td class="c-td-2" title="'+merchantName_r+'">' + merchantName_r + '</td><td class="c-td-2" title="'+belongAgent_r+'">' + belongAgent_r + '</td><td class="c-td-1" title="'+area_r+'">' + area_r + '</td><td class="c-td-1" title="'+bizType_r+'">'+bizType_r+'</td><td class="c-td-1">'+isKa_r+'</td><td class="c-td-1">'+isControl_r+'</td></tr>');
                    }
                }
            });
        } else {
             if(confirm("取消勾选此店铺?")) {
               $("input[name='checkbox_router']").each(function (index) {
                   $(this).prop("checked", false);
                   $('#addShoplist_r').find('tr[attr-adId=' + $(this).attr('id')+']').remove();
               });
             } else {
               $(this).prop("checked", true);
             }
        }
      });
    },
    onSearch(){
      $(".shop_searchBtn").click(function(){
        SHOP.getPutShopMerchants(15,1);
      });
    },
    saveShopList(){
      $(".shopTmp .save").click(function(){
        if(toShop==1||toShop=="1"||toShop==3||toShop=="3"){
          var isSave = 1;
        }else{
          var isSave = 2;
        }
        var trs = $('#addShoplist_r tr');
        var merchantIds ='';
        if(trs.length > 0) {
          trs.each(function(i, item) {
            merchantIds += $(item).attr('attr-adId') + '^';
          });
        }
        if(!merchantIds.length){
          alert("请至少选择一家");
          return;
        }
        if(toShop==1||toShop=="1"||toShop==2||toShop=="2"){
          var saveOrDeletesUrl = "/rest/ad/put/saveOrDeleteExpectiveMerchants";
        }else{
          var saveOrDeletesUrl = "/rest/ad/put/saveOrDeletePutMerchants";
        }
        $.ajax({
          type:'post',
          url:saveOrDeletesUrl,
          dataType: 'json',
          data:{"adId":adId,'merchantIds':merchantIds.substring(0,merchantIds.length-1),"isSave":isSave,"adType":createAdType},
          success: function(data) {
            if(data.code=="0002005"){
              var host = window.location.host;
              window.location.href="http://"+host+'/view/login.html';
              return;
            }
            if(data.success){
              $('#loading').show();
              if(toShop==3||toShop=="3"||toShop==4||toShop=="4"){
                if(data.count==0||data.count=='0'){
                  $(".ShopCheckPng").hide();
                }else{
                  $(".ShopCheckPng").show();
                }
              }else{
                if(data.count==0||data.count=='0'){
                  $(".agentCheckPng").hide();
                }else{
                  $(".agentCheckPng").show();
                }
              }
              $('#loading').hide();
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
      $(".shopTmpl .backBefore").click(function(){
        history.pushState({},null,'main.html#create?isNew=1');//之后的状态，需要进行保存
        $(".app-main-content").hide();
        $(".createTmpl").show();
      });
    },
    adTypeOne(){
      $.ajax({
        type:'get',
        url:"/rest/ad/basedata/getAgentBaseData",
        dataType: 'json',
        data:{"pid":0,"category":"biztype"},
        success: function(data) {
          if(data.code=="0002005"){
            var host = window.location.host;
            window.location.href="http://"+host+'/view/login.html';
            return;
          }
          if(data.success){
            var baseDataList = data.data;
            var adTypeOne = '<option value="" selected="selected">--请选择--</option>';
            for(var i=0;i<baseDataList.length;i++){
              adTypeOne += '<option value="'+ baseDataList[i].realValue +'">'+ baseDataList[i].showValue +'</option>'
            }
            $(".adType1").html(adTypeOne);
          }
        }
      });
      $(".adType1").change(function(){
        var pid = $(this).val();
        SHOP.adTypeTwo(pid);
      });
    },
    adTypeTwo(pid){
      $.ajax({
        type:'get',
        url:"/rest/ad/basedata/getAgentBaseData",
        dataType: 'json',
        data:{"pid":pid,"category":"biztype"},
        success: function(data) {
          if(data.code=="0002005"){
            var host = window.location.host;
            window.location.href="http://"+host+'/view/login.html';
            return;
          }
          if(data.success){
            var baseDataList = data.data;
            var adTypeTwo = '<option value="" selected="selected">--请选择--</option>';
            for(var i=0;i<baseDataList.length;i++){
              adTypeTwo += '<option value="'+ baseDataList[i].realValue +'">'+ baseDataList[i].showValue +'</option>'
            }
            $(".adType2").html(adTypeTwo);
          }
        }
      });
    },
    province(){
      $.ajax({
        type:'get',
        url:"/rest/ad/basedata/getAgentBaseData",
        dataType: 'json',
        data:{"pid":0,"category":"map"},
        success: function(data) {
          if(data.code=="0002005"){
            var host = window.location.host;
            window.location.href="http://"+host+'/view/login.html';
            return;
          }
          if(data.success){
            var baseDataList = data.data;
            var province = '<option value="" selected="selected">--请选择--</option>';
            for(var i=0;i<baseDataList.length;i++){
               province += '<option value="'+ baseDataList[i].realValue +'">'+ baseDataList[i].showValue +'</option>'
            }
            $("#province").html(province);
          }
        }
      });

      $("#province").change(function(){
        var pid = $(this).val();
        SHOP.city(pid);
        $("#county").html('<option value="" selected="selected">--请选择--</option>');
      })
    },
    city(pid){
      $.ajax({
        type:'get',
        url:"/rest/ad/basedata/getAgentBaseData",
        dataType: 'json',
        data:{"pid":pid,"category":"map"},
        success: function(data) {
          if(data.code=="0002005"){
            var host = window.location.host;
            window.location.href="http://"+host+'/view/login.html';
            return;
          }
          if(data.success){
            var baseDataList = data.data;
            var city = '<option value="" selected="selected">--请选择--</option>';
            for(var i=0;i<baseDataList.length;i++){
               city += '<option value="'+ baseDataList[i].realValue +'">'+ baseDataList[i].showValue +'</option>'
            }
            $("#city").html(city);
          }
        }
      });

      $("#city").change(function(){
        var pid = $(this).val();
        SHOP.county(pid);
      })
    },
    county(pid){
      $.ajax({
        type:'get',
        url:"/rest/ad/basedata/getAgentBaseData",
        dataType: 'json',
        data:{"pid":pid,"category":"map"},
        success: function(data) {
          if(data.code=="0002005"){
            var host = window.location.host;
            window.location.href="http://"+host+'/view/login.html';
            return;
          }
          if(data.success){
            var baseDataList = data.data;
            var county = '<option value="" selected="selected">--请选择--</option>';
            for(var i=0;i<baseDataList.length;i++){
               county += '<option value="'+ baseDataList[i].realValue +'">'+ baseDataList[i].showValue +'</option>'
            }
            $("#county").html(county);
          }
        }
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
export default SHOP;