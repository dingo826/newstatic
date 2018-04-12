function html() {
  return (`
    <div class="app-main-content agentTmpl">
      <div class="app-content-top">
        <p><span class="backBefore"><img src="adsys/images/left_icon.png">返回</span><span><img src="adsys/images/right_icon.png">投放规则 —— <span class="toAgentTitle">代理商选择</span></span></p>
      </div>
      <div class="app-content agentTmp">
        <div class="tabname">
          <ul>
            <li class="toAgentTabName">广告投放</li>
            <span id="saveMerchant" class="save saveAgent">保存</span>
            <span id="saveMerchant" class="save deleteAgent" style="display:none">删除</span>
          </ul>
        </div>
        <div class="condition tab">
            <input type="hidden" name="sort" id="sort" value="" />
            <input type="hidden" name="assort" id="assort" value="" />
            <ul class="aj_listTop">
              <li>
                <label>代理商名称：</label>
                <input type="text" name="agentTmp_agentName" id="agentTmp_agentName" value="" class="form-control"/>
              </li>
              <li>
                <label>角色分类：</label>
                <select name='agentTmp_role' class="agentTmp_role form-control select">
                  <option value="" selected="selected">全部</option>
                  <option value="agent">代理商</option>
                  <option value="strategy">战略</option>
                  <option value="business">城市商圈</option>
                  <option value="register">自注册</option>
                </select>
              </li>
              <li>
                <label>是否KA：</label>
                <select name='isKA' class="isKA form-control select">
                  <option value="" selected="selected">全部</option>
                  <option value="1">是</option>
                  <option value="0">否</option>
                </select>
              </li>
              <li>
                <label>是否可控</label>
                <select name='isControl' class="isControl form-control select">
                  <option value="" selected="selected">全部</option>
                  <option value="1">是</option>
                  <option value="0">否</option>
                </select>
              </li>
              <li>
                <label>渠道经理</label>
                <select name='magerName' class="magerName form-control select">
                </select>
              </li>
              <li>
                <input name="" class="button sousuoBtn" type="button" value=" 搜 索 "/>
              </li>
            </ul>
            <input type="hidden" id="xToken" name="xToken" value="f54a2c8b-26f4-4bc3-bb7c-ad1f389523ac" />
        </div>

        <!--/搜索-->
        <div class="searchList">
          <div class="search-L">
            <table>
              <thead>
                <tr>
                  <th><input type="checkbox" id="leftCheck" /></th>
                  <th>代理商名称</th>
                  <th>角色分类</th>
                  <th>KA</th>
                  <th>可控</th>
                  <th>渠道经理</th>
                </tr>
              </thead>
              <tbody class="J-reslist">

              </tbody>
            </table>

            <!--分页-->
            <div class="tcdPageCode_box">
              <div class="tcdPageCode_main">
                <span class="pageCount">
                  <select class="agent_pageSize allPageSize">
                    <option selected="selected" value="15">15</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                  </select>
                </span>
                <div class="agent_tcdPageCode allPageCode"></div>
              </div>
            </div>
          </div>

          <div class="search-R">
            <table>
              <thead>
                <tr>
                  <!--<th><input type="checkbox" id="rightCheck" /></th>-->
                  <th>
                    代理商名称
                  </th>
                  <th>角色分类</th>
                  <th>KA</th>
                  <th>可控</th>
                  <th>
                    渠道经理
                  </th>
                </tr>
              </thead>
              <tbody id="addMerchant">

              </tbody>
            </table>
          </div>
          <div id="loading" style="display:none; width:200px; text-align:center;position:absolute;left:50%">
            <div style="width:32px; height:32px; margin:20px auto 30px">
              <img src="adsys/images/loading.gif"></div>
            <p>信息正在提交中，请稍候……</p>
          </div>
          <div id="dataLoading" style="display:none; width:200px; text-align:center;position:absolute;left:50%">
            <div style="width:32px; height:32px; margin:20px auto 30px">
              <img src="adsys/images/loading.gif"></div>
            <p>数据加载中，请稍候……</p>
          </div>
        </div>
        <div class="tipmsg">您选择的店铺总数已达到500上限，请保存！</div>
      </div>
    </div>
`)
}
export default html;