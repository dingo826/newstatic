/* 0 */
/* 分页插件*/
function aa(){
	var firstPage  = true;
	var pageOptions;
	var ms = {
		init:function(obj,args){
			return (function(){
				ms.fillHtml(obj,args);
				ms.bindEvent(obj,args);
			})();
		},
		//填充html
		fillHtml:function(obj,args){
			return (function(){
				obj.empty();
				//上一页
				if(args.current > 1){
					obj.append('<a href="javascript:;" class="prevPage prevPage-img">上一页</a>');
				}else{
					obj.remove('.prevPage');
					obj.append('<span class="disabled prevPage-img">上一页</span>');
				}
				//中间页码
				if(args.current != 1 && args.current >= 4 && args.pageCount != 4){
					obj.append('<a href="javascript:;" class="tcdNumber">'+1+'</a>');
				}
				if(args.current-2 > 2 && args.current <= args.pageCount && args.pageCount > 5){
					obj.append('<span>...</span>');
				}
				var start = args.current -2,end = args.current+2;
				if((start > 1 && args.current < 4)||args.current == 1){
					end++;
				}
				if(args.current > args.pageCount-4 && args.current >= args.pageCount){
					start--;
				}
				for (;start <= end; start++) {
					if(start <= args.pageCount && start >= 1){
						if(start != args.current){
							obj.append('<a href="javascript:;" class="tcdNumber">'+ start +'</a>');
						}else{
							obj.append('<span class="current">'+ start +'</span>');
						}
					}
				}
				if(args.current + 2 < args.pageCount - 1 && args.current >= 1 && args.pageCount > 5){
					obj.append('<span>...</span>');
				}
				if(args.current != args.pageCount && args.current < args.pageCount -2  && args.pageCount != 4){
					obj.append('<a href="javascript:;" class="tcdNumber">'+args.pageCount+'</a>');
				}
				//下一页
				if(args.current < args.pageCount){
					obj.append('<a href="javascript:;" class="nextPage nextPage-img">下一页</a>');
				}else{
					obj.remove('.nextPage');
					obj.append('<span class="disabled nextPage-img">下一页</span>');
				}
			})();
		},
		//绑定事件
		bindEvent:function(obj,args){
			return (function(){
					obj.off("click","a.tcdNumber");
					obj.off("click","a.prevPage");
					obj.off("click","a.nextPage");
					obj.off("click","a.input_btn");

					obj.on('click','a.tcdNumber',function(){
						var current = parseInt($(this).text());
						if(firstPage){
							ms.fillHtml(obj,{'current':current,'pageCount':args.pageCount});
							if(typeof(args.backFn)=='function'){
								args.backFn(current);
							}
						}else{
							ms.fillHtml(obj,{'current':current,'pageCount':pageOptions.pageCount});
							if(typeof(pageOptions.backFn)=='function'){
								pageOptions.backFn(current);
							}
						}
					});
					//上一页
					obj.on('click','a.prevPage',function(){
						var current = parseInt(obj.children('span.current').text());
						if(firstPage){
							ms.fillHtml(obj,{'current':current-1,'pageCount':args.pageCount});
							if(typeof(args.backFn)=='function'){
								args.backFn(current-1);
							}
						}else{
							ms.fillHtml(obj,{'current':current-1,'pageCount':pageOptions.pageCount});
							if(typeof(pageOptions.backFn)=='function'){
								pageOptions.backFn(current-1);
							}
						}
					});
					//下一页
					obj.on('click','a.nextPage',function(){
							var current = parseInt(obj.children('span.current').text());
							if(firstPage){
								ms.fillHtml(obj,{'current':current+1,'pageCount':args.pageCount});
								if(typeof(args.backFn)=='function'){
									args.backFn(current+1);
								}
							}else{
								ms.fillHtml(obj,{'current':current+1,'pageCount':pageOptions.pageCount});
								if(typeof(pageOptions.backFn)=='function'){
									pageOptions.backFn(current+1);
								}
							}
					});
					//跳转
					$(document).on('click','.input_btn',function(){
						if(firstPage){
							var current = parseInt($('.input_text').val());
							var re = /^[1-9]+[0-9]*]*$/;
							if (re.test(current)) {
								if(current>args.pageCount){
									alert('跳转页不能大于总页数');
									return;
								}
							}
							else{
								alert('请输入一个正整数');
								return;
							}
							ms.fillHtml(obj,{'current':current,'pageCount':args.pageCount});
							if(typeof(args.backFn)=='function'){
								args.backFn(current);
							}
						}else{
							var current = parseInt($('.input_text').val());
							var re = /^[1-9]+[0-9]*]*$/;
							if (re.test(current)) {
								if(current>pageOptions.pageCount){
									alert('跳转页不能大于总页数');
									return;
								}
							}
							else{
								alert('请输入一个正整数');
								return;
							}
							ms.fillHtml(obj,{'current':current,'pageCount':pageOptions.pageCount});
							if(typeof(pageOptions.backFn)=='function'){
								pageOptions.backFn(current);
							}
						}
					});
			})();
		}
	}
	$.fn.createPage = function(options){
		var args = $.extend({
			pageCount : 10,
			current : 1,
			backFn : function(){}
		},options);
		ms.init(this,args);
	}
	// $.fn.createRalodPage = function(options){
	// 	ms.fillHtml(this,{'current':1,'pageCount':options.pageCount});
	// 	firstPage = false;
	// 	pageOptions = options;
	// }
}
export default aa;