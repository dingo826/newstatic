/* 42 */
module.exports = "<div class=\"app-main-content\">\n    <div class=\"app-content countTmp\">\n        <ol class=\"breadcrumb\">\n            <li><a href=\"main.html#wxconfig\">代理商配置</a></li>\n            <li>二级代理商配置</li>\n        </ol>\n        <div class=\"tabname\">\n            <ul>\n                <li>二级代理商配置</li>\n            </ul>\n        </div>\n        <div class=\"tab\">\n            <form class=\"findCondition\">\n                <ul class=\"form-inline\">\n                    <li class=\"w200\">\n                        <label>代理商名称</label>\n                        <input name=\"agentName\" id=\"search_agentName_input\" type=\"text\" maxlength=\"50\" size=\"500\" class=\"form-control w105\"/>\n                    </li>\n                    <li>\n                        <span class=\"btn btn-blue J-search\" id ='serchAgentBtn'>搜索</span>\n                    </li>\n                    <li>\n                        <span class=\"btn btn-blue J-export\" id=\"addLevel2AgentBtn\">添加二级代理商</span>\n                    </li>\n                </ul>\n            </form>\n        </div>\n        <div class=\"delist\">\n            <table>\n                <thead>\n                <tr>\n                    <th width=\"8%\">二级代理商名称</th>\n                    <th width=\"8%\">吸粉单价</th>\n                    <th width=\"8%\">今日新增粉丝数</th>\n                    <th width=\"16%\">操作</th>\n                </tr>\n                </thead>\n                <tbody class=\"J-countList\" id=\"wxConfigList\">\n\n                </tbody>\n            </table>\n        </div>\n\n        <!--分页-->\n        <div class=\"tcdPageCode_box\">\n            <div class=\"tcdPageCode_main\">\n                <span class=\"pageCount\">\n                  <select class=\"count_pageSize allPageSize\">\n                    <option selected=\"selected\" value=\"15\">15</option>\n                    <option value=\"50\">50</option>\n                    <option value=\"100\">100</option>\n                  </select>\n                </span>\n                <div class=\"count_tcdPageCode allPageCode\"></div>\n            </div>\n        </div>\n    </div>\n\n\n</div>";