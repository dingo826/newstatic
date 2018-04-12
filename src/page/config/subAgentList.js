// 30
import comPagebreak from '../../components/common/pagebreak';
import laytpl from '../../components/common/laytpl';
import html37 from './addAgentTmp';
import html38 from './addSubAgentTmp';
import html39 from './incomeTmp';
import html40 from './agentListTmp';
import html41 from './subAgentListTmp';


comPagebreak();

var requestUrl = '';
var subAgent = new Object();
subAgent.currentPage = 1;
subAgent.pageSize = 15;
subAgent.flag = 0;




let  SubAgentList = {
        init(flag) {
         
            subAgent.flag = flag;

            if(flag == 1){
                //加载一级代理商列表内容
                this.loadAgentData(15, 1, 0, 1);

                //打开一级代理商页面：添加一级代理商
                this.popUpAddAgentPage();

                this.openConfigAgentInfoPage();
                this.openConfig2AgentInfoPage();

                this.configAgentProfile();
                
            }

            if(flag == 2){
                this.loadAgentData(15, 1, subAgent.aid, 2);
                //添加二级代理商弹出页面
                this.popUpAddAgent2Page();


            }
            this.changePage(flag);
            this.searchAgentList(flag);


        },

        //加载一级代理商列表内容
        loadAgentData: function (pagesize, pageno, pAgentId, flag, agentName) {
            subAgent.pageSize = pagesize;
            subAgent.aid = pAgentId;
            subAgent.currentPage = pageno;

            var template = html40;

            if(flag == 2){
                template = html41;
            }
            $.ajax({
                url: requestUrl+'/rest/wechat/config/getSelfOrChildAgentList',
                type: 'get',
                data: {'agentName':agentName, 'pAgentId':pAgentId, 'pageNo': pageno, 'pageSize':pagesize},
                success(data){
                 
                    if (!data.success) {
                        layer.alert(data.msg);

                    } else {
                        var htmlList="";
                        var dataList = data.data;
                        
                        $.each(dataList, (i, item) => {
                            htmlList += laytpl(template).render(item);
                        });
                        $('#wxConfigList').empty().append(htmlList);
                        if(flag == 1){
                            SubAgentList.configAgentProfile();
                            SubAgentList.clickWxagent2Config_href();
                        }
                        if(flag == 2){
                            //注册删除二级代理商按钮
                            SubAgentList.deleteAgent2Func();
                        }

                        //加载分页
                        SubAgentList.page(agentName, data.count,subAgent.pageSize,pageno, flag);
                    }
                },
                error(data){
                    layer.alert('error'+data.responseText);
                }
            });
        },

        //huoqu

        page(agentName, pageTotal,pageSize,pageNo, flag){
            var agentName = $('#search_agentName_input').val();
            if(pageSize){
                var pageSize = pageSize;
            }else{
                var pageSize = 15;
            }
            $(".count_tcdPageCode.allPageCode").createPage({
                pageCount:Math.ceil(pageTotal/pageSize), //总页数
                current: pageNo,
                backFn: function(p) {
                    subAgent.currentPage = p;
                    if(flag == 2){
                        SubAgentList.loadAgentData(pageSize, p, subAgent.aid, flag, agentName);
                    }
                    if(flag == 1){
                        SubAgentList.loadAgentData(pageSize, p, 0, flag, agentName);
                    }

                }
            });
        },

        changePage(flag) {

            $(".count_pageSize.allPageSize").change(function(){
                var rowNum = $(this).val();
                subAgent.pageSize = rowNum;
                var agentName = $('#search_agentName_input').val();
                if(flag == 2){
                    SubAgentList.loadAgentData(rowNum, 1, subAgent.aid, flag, agentName);
                }
                if(flag == 1){
                    SubAgentList.loadAgentData(rowNum, 1, 0, flag, agentName);
                }
            });
        },

        //
        searchAgentList(flag){

            $('#serchAgentBtn').on('click', function () {
                var agentName = $('#search_agentName_input').val();
                if(flag == 2){
                    SubAgentList.loadAgentData(15, 1, subAgent.aid, flag, agentName);
                }
                if(flag == 1){
                    SubAgentList.loadAgentData(15, 1, 0, flag, agentName);
                }
            });
        },

        //一级代理商页面：添加一级代理商按钮
        popUpAddAgentPage: function () {
            
            $('#addLevel1AgentBtn').on('click', function () {

                layer.open({
                    title: '添加一级代理商',
                    type: 1,
                    area: ['600px', '300px'],
                    shadeClose: true,
                    content: html37,  //? 针对es6中 html的引入方式。
                    success: function () {
                        //提交一级代理商信息
                        $('#submitAddLevelAgent').on('click', function () {

                            var config_agentId = '0';
                            var agentName = $("#agentName").val();
                            var agentPrice = $("#agentPrice").val();
                            SubAgentList.addAgentInfo(config_agentId, agentName, agentPrice);

                        });
                        //关闭一级代理商弹出窗口
                        $('#closeAddLevel1AgentPopPage').on('click', function () {
                            layer.closeAll();
                        });
                    }
                });
            });
        },

        //添加代理商
        addAgentInfo: function(agentId, agentName, price, flag){

            var data = new Object();
            data.agentName = agentName;
            data.pAgentId = agentId;
            if(price != null){
                data.price = price;
            }

            if(flag == 1)
             if(!SubAgentList.checkPriceFormater(price)){
                           layer.msg('小数点后保留两位！',{time:1000});
                           return;
                        }

            $.ajax({
                url: requestUrl+'/rest/wechat/config/addSelfOrChildAgent',
                type: 'POST',
                dataType: 'json',
                data: data,
                success(data){
                    if (!data.success) {
                        layer.alert(data.msg);
                    } else {
                        layer.closeAll();
                        layer.msg('操作成功！');
                        //加载一级代理商列表内容
                        var pid = agentId;
                        if(flag == 1){
                            pid = 0;
                        }
                        SubAgentList.loadAgentData(15, 1, pid, flag);
                    }
                },
                error(data){
                    layer.alert('error'+data.responseText);
                }
            });
        },

        //更新代理商价格
        updateAgentInfo: function (agentId, agentName, agentPrice) {

            if(!SubAgentList.checkPriceFormater(agentPrice)){
                           layer.msg('小数点后保留两位！',{time:1000});
                           return;
                        }

            $.ajax({
                url: requestUrl+'/rest/wechat/config/updateAgentXifenPrice',
                type: 'POST',
                dataType: 'json',
                data: {'agentName':agentName, 'price':agentPrice, 'agentId':agentId},
                success(data){
                    if (!data.success) {
                        layer.alert(data.msg);
                    } else {
                        layer.closeAll();
                        layer.msg('操作成功！');
                    }
                },
                error(data){
                    layer.alert('error'+data.responseText);
                }
            });
        },


        //注册配置代理商单价按钮
        configAgentProfile: function () {
            $('.btn.btn-blue.agentProfileConfBtn').on('click', function () {

                var agentId = $(this).attr('data');
                var currentXifenPrice = $(this).attr('data-price');
                var updateXifenPrice = $(this).attr('data-updateprice');
                var maxXifenPriceYuan = $(this).attr('data-maxXifenPriceYuan');
                var isineffect = $(this).attr('data-isineffect');
                layer.open({
                    title: '收益配置',
                    type: 1,
                    area: ['600px', '300px'],
                    shadeClose: true,
                    content: html39,

                    success: function (layero, index) {
                        $('#config_agentId').val(agentId);
                        $('#currentXifenPrice').text(updateXifenPrice);
                        $("#agentPrice").val(updateXifenPrice);
                        $('#maxXifenPriceYuan').val(maxXifenPriceYuan);
                        $('#alertmsg').hide();

                        if('false' == isineffect){

                            $('#invalidTomorrow_lable').text("明日生效");
                        }

                        if('true' ==isineffect){
                            $('#invalidTomorrow_lable').text();
                        }


                    }
                });

                //提交代理商信息
                $('#submitAddLevelAgent').on('click', function(){

                    var config_agentId = $('#config_agentId').val();
                    var price = $("#agentPrice").val();
                    if(price == updateXifenPrice){
                        layer.msg('未调整金额！')
                    }else{
                        
                        if(!SubAgentList.checkPriceFormater(price)){
                           layer.msg('小数点后保留两位！',{time:1000});
                           return;
                        }

                        SubAgentList.updateAgentInfo(config_agentId, '',price);
                        var agentName = $('#search_agentName_input').val();
                        SubAgentList.loadAgentData(subAgent.pageSize, subAgent.currentPage, subAgent.aid, flag, agentName);
                    }
                    

                });
                //关闭代理商弹出窗口
                $('#closeAddLevel1AgentPopPage').on('click', function () {
                    layer.closeAll();
                });

                 //input change事件
                $('#agentPrice').on('change', function(){
                    var price = $("#agentPrice").val();
                    var maxXifenPriceYuan = $('#maxXifenPriceYuan').val();
                    if(price < maxXifenPriceYuan){
                        $('#alertmsg').show();
                    }

                });
            });
        },


        
        //打开二级代理商添加页面
        popUpAddAgent2Page: function () {

            $('#addLevel2AgentBtn').on('click', function () {
               
                layer.open({
                    title: '添加二级代理商',
                    type: 1,
                    area: ['600px', '250px'],
                    shadeClose: true,
                    content: html38,
                    success: function (layero, index) {
                        $('#config_agentId').val(subAgent.aid);
                }
                });

                //提交二级代理商信息
                $('#submitAddLevelAgent').on('click', function () {
                    var config_agentId = $('#config_agentId').val();
                    var agentName = $('#agentName').val();
                    SubAgentList.addAgentInfo(config_agentId, agentName,null,2);

                });
                //关闭代理商弹出窗口
                $('#closeAddLevel1AgentPopPage').on('click', function () {
                    layer.closeAll();
                });

            });

        },

        deleteAgent2Func : function () {

            $('.btn.btn-blue.deleteAgent2').on('click', function () {

                var agentId = $(this).attr('data');

                layer.msg('确定要删除吗?',{
                    time: 0,
                    btn:['确定', '取消'],
                    yes: function (index) {

                        $.ajax({
                            url: requestUrl+'/rest/wechat/config/deleteChildAgent',
                            type: 'POST',
                            dataType: 'json',
                            data: {'agentId':agentId, 'pAgentId':subAgent.aid},
                            success(data){
                                if (!data.success) {
                                    layer.alert(data.msg);
                                } else {
                                    layer.closeAll();
                                    layer.msg('操作成功！',{time:1000});
                                    //reload page
                                    var agentName = $('#search_agentName_input').val();
                                    SubAgentList.loadAgentData(subAgent.pageSize, subAgent.currentPage, subAgent.aid, subAgent.flag, agentName);

                                }
                            },
                            error(data){
                                layer.alert('error'+data.responseText);
                            }
                        });
                    }
                })

            });
            
        },

        checkPriceFormater(price, num=2) {
          var regu = /^[0-9]+\.?[0-9]*$/;
          if (price.value != "") {
            if (!regu.test(price)) {
              return false;
            } else {
              
              if (price.indexOf('.') > -1) {
                if (price.split('.')[1].length > num) {
                 return false;
                }
              }
            }
          }
          return true;
        },


        //面包屑跳转
        openConfigAgentInfoPage(){
            $("#configAgentInfo").click(function(){
            //    history.pushState({},null,'main.html#wxconfig');
                $(".app-main-content").remove();
                wxconfig.init('1');

            })
        },

        openConfig2AgentInfoPage(){
            $("#configSecAgentInfo, #popupSecondAgentPage").click(function(){
                history.replaceState({},null,'main.html#wxagent2config');
                history.go(0);
                $(".app-main-content").remove();

            })
        },
        
        clickWxagent2Config_href: function(){
            $('.btn.btn-blue.wxagent2Config_href').on('click', function(){
                subAgent.aid =  $(this).attr('data');
            });
        }
 }
 
export default SubAgentList;