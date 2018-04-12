
const checkpng = '__webpack_require__(46)';
const fullbgpng =' __webpack_require__(48)';
const bannerpng = '__webpack_require__(44)';
const bombAdpng = '__webpack_require__(45)';
const funcpng = '__webpack_require__(49)';
const infopng = '__webpack_require__(50)';
const fullAdpng = '__webpack_require__(47)';
const jumpAdpng = '__webpack_require__(51)';
var HTML = function(){
	return (`
	<div class="app-main-content createTmpl">

	  <div class="app-content">
		<!--创建素材-->
		<div class="material">
		  <div class="tabname">
			<ul>
			  <li>创建广告</li>
			</ul>
		  </div>
		  <div class="main">
			<div class="adChoise">
			  <p style="font-size:14px;color:#000;font-weight:bold">选择广告位</p>
			  <ul class="clearfix">
			  <!--选择广告位-->
				<li>
				  <input name="adradio" type="radio" class="fullbg" id="fullbg" value="100" checked="checked"/>
				  <label for="fullbg">全屏背景图</label>
				</li>
				<li>
				  <input name="adradio" type="radio" class="banner" id="banner" value="101"/>
				  <label for="banner">主页Banner</label>
				</li>
				<li>
				  <input name="adradio" type="radio" class="bombAd" id="bombAd" value="102"/>
				  <label for="bombAd">弹屏广告（全屏）</label>
				</li>
				<li>
				  <input name="adradio" type="radio" class="func" id="func" value="103"/>
				  <label for="func">功能区</label>
				</li>
				<!--<li>
				  <input name="adradio" type="radio" class="info" id="info" value="104"/>
				  <label for="info">信息流</label>
				</li>-->
				<li>
				  <input name="adradio" type="radio" class="fullAd" id="fullAd" value="105"/>
				  <label for="fullAd">全屏轮播广告</label>
				</li>
				<li>
				  <input name="adradio" type="radio" class="jumpAd" id="jumpAd" value="106"/>
				  <label for="jumpAd">全屏自动跳转广告</label>
				</li>
				<li>
				  <input name="adradio" type="radio" class="jsad" id="jsad" value="107"/>
				  <label for="jsad">悬浮广告</label>
				</li>
			  </ul>
			</div>
			<div class="sucai">
			  <p style="font-size:14px;color:#000;font-weight:bold;margin-bottom:20px">选择广告素材</p>
			  <ul class="sucaiTab">
				<!--全屏背景-->
				<li class='Fullbg_main ad_editMain' data-adtype="100">
				  <div class="uploadifyBox uploadFullbg editContent">
					  <span class="txt">选择图片：</span>
					  <div class="btn btn-primary btn-addon fileinput-button">
						  图片上传
						  <input id="fileuploadFullbg" class="selectfiles" type="file" name="files[]" multiple="multiple">
					  </div>
					  <span class="size">（图片尺寸：750*1334）</span>
					  <div class="bgImg"></div>
				  </div>
				  <div class="Imglocation"><img src="adsys/images/fullbg.png"></div>
				</li>
				<!--banner-->
				<li class='Banner_main ad_editMain' data-adtype="101">
				  <div class="uploadifyBox uploadBannerbg editContent">
					  <span class="txt">选择图片：</span>
					  <div class="btn btn-primary btn-addon fileinput-button">
						  图片上传
						  <input id="fileuploadBannerbg" class="selectfiles" type="file" name="files[]" multiple="multiple">
					  </div>
					  <span class="size">（图片尺寸：750*230）</span>
					  <p style="margin-top:10px;">图片链接：<input type="url" id="bannerHref" name="bannerHref" value="" class="bannerHref AdHref"  placeholder="可为空,表示无链接"></p>
					  <div class="BannerImg"></div>
				  </div>
				  <div class="Imglocation"><img src="adsys/images/bannerImg.png"></div>
				</li>
				<!--弹屏广告-->
				<li class='bombAd_main ad_editMain' data-adtype="102">
				  <div class="uploadifyBox uploadbombAd editContent">
					  <span class="txt">选择图片：</span>
					  <div class="btn btn-primary btn-addon fileinput-button">
						  图片上传
						  <input id="fileuploadbombAd" class="selectfiles" type="file" name="files[]" multiple="multiple">
					  </div>
					  <span class="size">（图片尺寸：600*750）</span>
					  <p style="margin-top:10px;">图片链接：<input type="url" id="bombAdHref" name="bombAdHref" value="" class="bombAdHref AdHref"  placeholder="可为空,表示无链接"></p>
					  <div class="bombAdImg"></div>
				  </div>
				  <div class="Imglocation"><img src="adsys/images/bombAdImg.png"></div>
				</li>
				<!--功能区-->
				<li class='func_main ad_editMain' data-adtype="103">
				  <div class="uploadifyBox uploadfuncImg editContent">
					  <span class="txt">选择图片：</span>
					  <div class="btn btn-primary btn-addon fileinput-button">
						  图片上传
						  <input id="fileuploadfuncImg" class="selectfiles" type="file" name="files[]" multiple="multiple">
					  </div>
					  <span class="size">（图片尺寸：347*146）</span>
					  <p style="margin-top:10px;">图片链接：<input type="url" id="funcHref" name="funcHref" value="" class="funcHref AdHref"  placeholder="不能为空"></p>
					  <div class="funcImg"></div>
				  </div>
				  <div class="Imglocation"><img src="adsys/images/fullAdImg.png"></div>
				</li>
				<!--信息流-->
				<li class='info_main ad_editMain' data-adtype="104">
				  <table style="display: inline-block">
					<tbody>
					  <tr>
						<td valign="top">图文格式：</td>
						<td class='r imgsize'>
						<input name="imgsize" type="radio" class="small" id="small" value="1" checked="checked"/><label for='small'>小图</label>
						<input name="imgsize" type="radio" class="big" id="big" value="2" style="margin-left:70px;"/><label for='big'>大图</label><br/>
						（小图尺寸：96*96，大图尺寸：690*230）
						</td>
					  </tr>
					  <tr>
						<td>选择图片：</td>
						<td class='r'>
						  <div class="btn btn-primary btn-addon fileinput-button">
							图片上传
							<input id="fileuploadfuncImg" class="selectfiles" type="file" name="files[]" multiple="multiple">
						  </div>
						</td>
					  </tr>
					  <tr>
						<td>标题：</td>
						<td class='r'><input type="text" id="infoTitle" name="infoTitle" value="" placeholder="不超过10个字符" maxlength='10' class="infoIpt"></td>
					  </tr>
					  <tr>
						<td valign="top">介绍：</td>
						<td class='r'><textarea id="Introduce" name="Introduce" value="" placeholder="不超过30个字符" maxlength='30' class="infoIpt" style="height:70px;"></textarea></td>
					  </tr>
					  <tr>
						<td valign="top">地址：</td>
						<td class='r'><textarea id="infoAddress" name="infoAddress" value="" placeholder="不超过24个字符" maxlength='24' class="infoIpt" style="height:70px;"></textarea></td>
					  </tr>
					  <tr>
						<td>按钮：</td>
						<td class='r isShowBtn'>
						  <input name="infoisShow" type="radio" class="infoShow" id="infoShow" value="1" checked="checked"/><label for='infoShow'>显示</label>
						  <input name="infoisShow" type="radio" class="infoHide" id="infoHide" value="0" style="margin-left:70px"/><label for='infoHide'>隐藏</label>
						</td>
					  </tr>
					  <tr>
						<td>按钮文字：</td>
						<td class='r'>
						  <input type="text" id="BtnTxt" name="BtnTxt" value="" placeholder="不超过4个字" maxlength='4' class="infoIpt">
						</td>
					  </tr>
					  <tr>
						<td>图片链接：</td>
						<td class='r'>
						  <input type="url" id="infoHref" name="infoHref" value="" class="infoHref AdHref infoIpt"  placeholder="可为空,表示无链接">
						</td>
					  </tr>
					  <tr>
						<td colspan="2"><div class="infoImgsmall"></div><div class="infoImgbig"></div></td>
					  </tr>
					</tbody>
				  </table>
				  <div class="Imglocation"><img src="adsys/images/infoAdImg.png"></div>
				</li>
				<!--全屏轮播广告-->
				<li class='fullAd_main ad_editMain' data-adtype="105">
				  <div class="uploadifyBox uploadfullAd editContent">
					  <span class="txt">选择图片：</span>
					  <div class="btn btn-primary btn-addon fileinput-button">
						  图片上传
						  <input id="fileuploadfullAd" class="selectfiles" type="file" name="files[]" multiple="multiple">
					  </div>
					  <span class="size">（图片尺寸：750*1334）</span>
					  <p style="margin-top:10px;">图片链接：<input type="url" id="fullAdHref" name="fullAdHref" value="" class="fullAdHref AdHref"  placeholder="可为空,表示无链接"></p>
					  <div class="fullAdImg"></div>
				  </div>
				  <div class="Imglocation"><img src="adsys/images/fullAdImg.png"></div>
				</li>
				<!--全屏自动跳转广告-->
				<li class='jumpAd_main ad_editMain' data-adtype="106">
				  <div class="uploadifyBox uploadjumpAd editContent">
					  <span class="txt">选择图片：</span>
					  <div class="btn btn-primary btn-addon fileinput-button">
						  图片上传
						  <input id="fileuploadjumpAd" class="selectfiles" type="file" name="files[]" multiple="multiple">
					  </div>
					  <span class="size">（图片尺寸：750*1334）</span>
					  <p style="margin-top:10px;">图片链接：<input type="url" id="jumpAdImgHref" name="jumpAdImgHref" value="" class="jumpAdImgHref AdHref"  placeholder="可为空,表示无链接"></p>
					  <p style="margin-top:10px;">跳转链接：<input type="url" id="jumpHref" name="jumpHref" value="" class="jumpHref AdHref"  placeholder="不可为空"></p>
					  <div class="jumpAdImg"></div>
				  </div>
				  <div class="Imglocation"><img src="adsys/images/jumpAdImg.png"></div>
				</li>
				<!--js广告-->
				<li class="JsAd ad_editMain" data-adtype="107">
					<style>
						.ad_tab {
							width: 400px; margin: 0 auto;
						}
						.ad_tab span {
							display:inline-block;
							width: 198px; height: 30px; line-height: 30px;
							color:#333;
							border: 1px solid #797979; background:#fff;
						}
						.ad_tab span.active {
							color:#fff;
							border: 1px solid #075ed3; background:#075ed3;
						}
					</style>
					<div class="ad_tab">
						<span class="active">JS投放</span>
						<span>直客素材投放</span>
					</div>
				  <p class="txt">广告代码JS：（配置JS前，请与开发确认，保证该JS有效性）</p>
				  <textarea placeholder="请输入js代码" class="jsTxt"></textarea>
				</li>
			  </ul>
			</div>
			<!--<div class="J_saveSC">保存并下一步</div>-->
		  </div>
		</div>
		<!--投放规则-->
		<div class="rule">
		  <div class="main">
			<div class="adinfo">
			  <p style="font-size:14px;color:#000;font-weight:bold">备注广告信息</p>
			  <ul>
				<li>
				  <label>广告主：</label>
				  <input name="adMaster" type="txt" class="adMaster" maxlength="30" placeholder="请填写（不超过30字符）" onfocus="this.placeholder=''" onblur="this.placeholder='请填写（不超过30字符）'"/>
				</li>
				<li>
				  <label>广告名称：</label>
				  <input name="adName" type="txt" class="adName" maxlength="30" placeholder="请填写（不超过30字符）" onfocus="this.placeholder=''" onblur="this.placeholder='请填写（不超过30字符）'"/>
				</li>
			  </ul>
			</div>
			<div class="putRule">
			<p style="font-size:14px;color:#000;font-weight:bold;margin-bottom:20px">投放规则</p>
			<table>
			<tbody>
			<tr>
			  <td>投放日期：</td>
			  <td>
			  <input size="16" type="text" id="datetimeStart" readonly class="form_datetime"> - <input size="16" type="text" id="datetimeEnd" readonly class="form_datetime">
			  </td>
			</tr>
			<tr>
			  <td>投放范围：</td>
			  <td>
				<ul class='clearfix'>
				  <li class="putAreaLi">
					<img src="adsys/images/check.png" style="width:26px;display:none;" class="checkpng agentCheckPng"/>
					<!--<input type="checkbox" name="putArea" id="agent">-->
					<label for="agent" id="agentShop">代理商店铺</label>
				  </li>
				  <li class="putAreaLi">
					<img src="adsys/images/check.png" style="width:26px;display:none;" class="checkpng ShopCheckPng"/>
					<!--<input type="checkbox" name="putArea" id="appointShop">-->
					<label for="appointSho" id='appointShop'>指定店铺</label>
				  </li>
				  <!--<li class="putAreaLi">
					<input type="checkbox" name="putArea" id="condition">
					<label for="condition">条件店铺</label>
				  </li>-->
				  <span style="color:red;font-size:14px;display:inline-block;line-height: 35px;">温馨提示：多个范围设置后共同生效。</span>
				</ul>
			  </td>
			</tr>
			<tr class='agent'>
			  <td>代理商选择：</td>
			  <td>
				<div class="addAgent grayBtn">添加代理商</div>
				<div class="editAgent grayBtn">编辑代理商</div>
			  </td>
			</tr>
			<tr class='agent'>
			  <td>例外店铺：</td>
			  <td>
				<div class="addShop grayBtn">添加店铺</div>
				<div class="editShop grayBtn">编辑店铺</div>
			  </td>
			</tr>
			<tr class="appointShop" style="display:none;">
			  <td>店铺选择：</td>
			  <td>
				<div class="appointAddShop grayBtn">添加店铺</div>
				<div class="appointEditShop grayBtn">编辑店铺</div>
			  </td>
			</tr>
			<tr class='adPutNum'>
			  <td>投放次数：</td>
			  <td>
				<select name="status" class="form-control select putNumSelect">
				  <option value="1">不限次数</option>
				  <option value="2">自定义</option>
				</select>
				<input type='text' class="releaseSum" style="display:none" maxlength="8" value="" placeholder="请输入大于0的整数" onfocus="this.placeholder=''" onblur="this.placeholder='请输入大于0的整数'">
			  </td>
			</tr>
			<tr class='adPutSort'>
			  <td>优先排序：</td>
			  <td>
				<select name="sort" class="form-control select sortsSelect">
				  <option value="">请选择</option>
				  <option value="1">1</option>
				  <option value="2">2</option>
				  <option value="3">3</option>
				  <option value="4">4</option>
				  <option value="5">5</option>
				</select>
			  </td>
			</tr>
			</tbody>
			</table>
			</div>
			<div class="J_submit">提交</div>
		  </div>
		</div>
	  </div>
	</div>
`)
}
export default HTML