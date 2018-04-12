var HTML = function(){
	return (`
		<div class="app-main-content">
			<div class="app-content-top">
				<p><span><img src="adsys/images/left_icon.png">广告投放</span></p>
			</div>
			<div class="app-content">
				<div class="tabname">
					<ul>
						<li>广告投放</li>
						<div class="craeteAd">创建广告</div>
					</ul>
				</div>
				<div class="tab">
					<form class="findCondition">
						<ul class="form-inline">
							<li class="w200">
								<label>广告主</label>
								<input name="advertiser" type="text" class="form-control w119 ownerName" />
							</li>
							<li>
								<label>广告名称</label>
								<input name="adsname" type="text" class="form-control w119 adsname" />
							</li>
							<li>
								<label>投放人</label>
								<input name="putpeople" type="text" class="form-control w119 releaseUser" />
							</li>
							<li>
								<label>广告位</label>
								<select name="location" class="form-control select w105 adTypeSelect">
									<option value="">全部</option>
									<option value="100">全屏背景图</option>
									<option value="101">主页banner</option>
									<option value="102">弹屏广告</option>
									<option value="103">功能区</option>
									<option value="104">信息流</option>
									<option value="105">全屏轮播广告</option>
									<option value="106">全屏自动跳转广告</option>
									<option value="107">悬浮广告</option>
								</select>
							</li>
							<li>
								<label>状态</label>
								<select name="status" class="form-control select w105 status">
									<option value="1">投放中</option>
									<option value="0">待投放</option>
									<option value="2">结束</option>
									<option value="">全部</option>
								</select>
							</li>
							<li>
								<label>投放范围</label>
								<select name="area" class="form-control select w105 rangeType">
									<option value="">全部</option>
									<option value="1">指定代理商</option>
									<option value="2">指定店铺</option>
									<option value="3">组合店铺</option>
								</select>
							</li>
							<li style='float:right;margin-bottom:0px;margin-right:0px;'>
								<span class="btn btn-blue J-searchAdlist">搜索</span>
								<span class="btn btn-blue J-export">导出Excel</span>
							</li>
						</ul>
					</form>
				</div>
				<div class="delist">
					<table>
						<thead>
							<tr>
								<th>广告主</th>
								<th>广告名称</th>
								<th>投放人</th>
								<th>广告位</th>
								<th>状态</th>
								<th>开始时间</th>
								<th>结束时间</th>
								<th>投放范围</th>
								<th>PV</th>
								<th>UV</th>
								<th>点击数</th>
								<th>操作</th>
							</tr>
						</thead>
						<tbody class="J-AdList">

						</tbody>
					</table>
				</div>
				<!--分页-->
				<div class="tcdPageCode_box">
					<div class="tcdPageCode_main">
						<span class="pageCount">
							<select class="pageSize allPageSize">
								<option selected="selected" value="15">15</option>
								<option value="50">50</option>
								<option value="100">100</option>
							</select>
						</span>
						<div class="tcdPageCode allPageCode"></div>
					</div>
				</div>
			</div>
		</div>
	`)
}
export default HTML