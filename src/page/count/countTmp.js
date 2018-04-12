/* 20 */
function html() {
    return (`
        <div class="app-main-content">
            <div class="app-content countTmp">
              <div class="tabname">
                <ul>
                  <li>结算管理</li>
                </ul>
              </div>
              <div class="tab">
                <form class="findCondition">
                  <ul class="form-inline">
                    <li class="w200">
                      <label>代理商名称</label>
                      <input name="agentName" type="text" class="form-control w105" />
                    </li>
                    <li>
                      <label>提现单号</label>
                      <input name="applyNo" type="text" class="form-control w105" />
                    </li>
                    <li>
                      <label>状态</label>
                      <select name="status" class="form-control select w105">
                        <option value="1">已提交</option>
                        <option value="2">已结算</option>
                      </select>
                    </li>
                    <li>
                      <label>日期</label>
                      <input type="text" class="w105 date" value="" name="endTime"> - <input type="text" class="w105 date" value="" name="startTime">
                    </li>
                    <li>
                      <span class="btn btn-blue J-search">搜索</span>
                    </li>
                    <li>
                      <span class="btn btn-blue J-export">导出Excel</span>
                    </li>
                  </ul>
                </form>
              </div>
              <div class="delist">
                <table>
                  <thead>
                    <tr>
                      <th>提现单号</th>
                      <th>支付宝账号/银行卡号</th>
                      <th>开户银行</th>
                      <th>姓名</th>
                      <th>提现金额</th>
                      <th>支付金额</th>
                      <th>发票状态</th>
                      <th>代理商名称</th>
                      <th>提现状态</th>
                      <th>提现申请日期</th>
                      <th>提现处理日期</th>
                    </tr>
                  </thead>
                  <tbody class="J-countList">
                  </tbody>
                </table>
              </div>
              <div class="import">
                <span class="btn btn-blue J_uploadAll">导入Excel批量处理结算状态</span>
                <input id="fileupload" class="selectfiles" type="file" name="file" multiple="multiple">
              </div>
              <!--分页-->
              <div class="tcdPageCode_box">
                <div class="tcdPageCode_main">
                  <span class="pageCount">
                    <select class="count_pageSize allPageSize">
                      <option selected="selected" value="15">15</option>
                      <option value="50">50</option>
                      <option value="100">100</option>
                    </select>
                  </span>
                  <div class="count_tcdPageCode allPageCode"></div>
                </div>
              </div>
            </div>
        </div>
  `)
}

export default html;