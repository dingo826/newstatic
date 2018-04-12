
function html(){
	return (`
		<div class="app-main-content shopTmpl">
			<div class="app-content-top">
				<p><span class="backBefore"><img src="adsys/images/left_icon.png">返回</span><span><img src="adsys/images/right_icon.png">投放规则 —— <span class="toshopTitle">店铺选择</span></span><span></span></p>
			</div>
			<div class="app-content shopTmp">
				<div class="tabname">
					<ul>
						<li class='toshopTabName'>添加店铺</li>
						<span id="saveMerchant" class="save saveShop">保存</span>
						<span id="saveMerchant" class="save deleteShop" style="display:none">删除</span>
					</ul>
				</div>
				<div class="condition tab">
						<input type="hidden" name="sort" id="sort" value="" />
						<input type="hidden" name="assort" id="assort" value="" />
						<ul class="aj_listTop">
							<li>
								<label>店铺名称：</label>
								<input type="text" name="shopTmp_shopName" id="shopTmp_shopName" value="" class="form-control"/>
							</li>
							<li>
								<label>所属代理商：</label>
								<input name="shopTmp_agent" class="shopTmp_agent" type="text">
							</li>
							<li>
								<label>是否KA：</label>
								<select name='isKA' class="shop_isKA form-control select">
									<option value="" selected="selected">全部</option>
									<option value="1">是</option>
									<option value="0">否</option>
								</select>
							</li>
							<li>
								<label>是否可控</label>
								<select name='isControl' class="shop_isControl form-control select">
									<option value="" selected="selected">全部</option>
									<option value="1">是</option>
									<option value="0">否</option>
								</select>
							</li>
							<li>
							<label>类型</label>
							<select class="adType1" style="margin:0 8px 0 0">
								<option value="" selected="selected">--请选择--</option>
							</select>
							<select class="adType2" style="margin:0 8px 0 0">
								<option value="" selected="selected">--请选择--</option>
							</select>
							</li>
							<li>
								<span style="white-space:nowrap;">
									<input type="hidden" name="areaCode" id="areaCode" value="" style="width:200px">区域筛选：
									<select id="province" style="margin:0 8px 0 0"><option value="">--请选择--</option></select>
									<select id="city" style="margin:0 8px 0 0"><option value="">--请选择--</option></select>
									<select id="county" style="margin:0 8px 0 0"><option value="">--请选择--</option></select>
								</span>
							</li>
							<li>
								<input name="" class="button btn-blue shop_searchBtn" type="button" value=" 搜 索 " />
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
									<th><input type="checkbox" id="shop_leftCheck" /></th>
									<th>店铺名称</th>
									<th>所属代理商</th>
									<th>地区</th>
									<th>类型</th>
									<th>KA</th>
									<th>可控</th>
								</tr>
							</thead>
							<tbody class="J-shopList">

							</tbody>
						</table>

						<!--分页-->
						<div class="tcdPageCode_box">
							<div class="tcdPageCode_main">
								<span class="pageCount">
									<select class="shop_pageSize allPageSize">
										<option selected="selected" value="15">15</option>
										<option value="50">50</option>
										<option value="100">100</option>
									</select>
								</span>
								<div class="shop_tcdPageCode allPageCode"></div>
							</div>
						</div>
					</div>
					<div class="search-R">
						<table>
							<thead>
								<tr>
									<th>店铺名称</th>
									<th>所属代理商</th>
									<th>地区</th>
									<th>类型</th>
									<th>KA</th>
									<th>可控</th>
								</tr>
							</thead>
							<tbody id="addShoplist_r">

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
		</div>`)
}

export default html;