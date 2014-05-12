;
(function(window, undefined) {

		var didi = window.didi || {};
		if (didi.AutoPlay) {
			return didi.AutoPlay;
		} else {
			window.didi = didi;
		}

		var _AutoPlay = null,
			timer = null,
			num = 0;

		
		var AutoPlay = function(opts) {

			if (!(this instanceof AutoPlay)) {
				_AutoPlay = new AutoPlay(opts);
				return _AutoPlay;
			} else {
				new AutoPlay.fn.init(opts);
			}
		};

		//fn
		AutoPlay.fn = AutoPlay.prototype = {
			constructor: AutoPlay,
			init: function(opts) {
				if (!opts) {
					return;
				}
				//初始化
				var divWall = document.getElementById(opts.id),
					aBtn = divWall.getElementsByTagName('a'),
					oImg = divWall.getElementsByTagName('img')[0],
					oUl = divWall.getElementsByTagName('ul')[0],
					aLi = oUl.getElementsByTagName('li'),
					arrUrl = opts.picUrl,
					strLi='',
					iscallBack=opts.iscallBack;

				divWall.style.width = opts.width || "260px";
				divWall.style.height = opts.height || "210px";
				oImg.style.width = opts.oImgWidth || "260px";
				oImg.style.height = opts.oImgHeight || "210px";

				
				//li展示
				for (var i = 0; i < arrUrl.length; i++) {
					 strLi+= '<li><img src="' + arrUrl[i] + '" /></li>';
					 oUl.innerHTML = strLi;
				}

				//图片展示
				oImg.src = arrUrl[num];
				aLi[num].className = 'active';

				//图片点击切换
				for(var i=0; i<aLi.length; i++){
					aLi[i].index = i;
					aLi[i].onclick = function() {
						num = this.index;
						isPlay();
					};
				}
				

				//创建左右按钮
				if (opts.isBtn && opts.isBtn !== false) {
					var divBtn = document.createElement('div');
					divBtn.innerHTML='<a class="prev" href="javascript:;"></a><a class="next" href="javascript:;"></a>';
					divWall.appendChild(divBtn);
					
					isBtn();
				}

				//是否图片自动播放
				if (opts.isAuto) {
					function isAuto() {
						var arrUrl = opts.picUrl;
						timer = setInterval(function() {
							num++;
							num %= arrUrl.length;
							isPlay();
						}, 1000);
					}
					isAuto();
					divWall.onmouseover = function() {
						clearInterval(timer);
					};
					divWall.onmouseout = isAuto;

				}

				//按钮切换
				function isBtn(){
					aBtn[0].onclick = function (){
						num--;
						if( num == -1 ){
							num = arrUrl.length-1;
						}
						
						isPlay();
					};
					aBtn[1].onclick = function (){
						num++;
						if( num == arrUrl.length ){
							num = 0;
						}
						
						isPlay();
					};
				}
				

				//图片切换
				function isPlay() {
					oImg.src = arrUrl[num];
					for (var i = 0; i < aLi.length; i++) {
						aLi[i].className = '';
					}
					aLi[num].className = 'active';

				}

				//小图显示隐藏
				if(opts.isPic){
					for (var i = 0; i < aLi.length; i++) {
						aLi[i].onmouseover = function() {
							this.getElementsByTagName('img')[0].style.display = 'inline-block';
						};
						aLi[i].onmouseout = function() {
							this.getElementsByTagName('img')[0].style.display = 'none';
						};
					}
				}

				//是否添加回调函数
				if(!opts.iscallBack ==opts.iscallBack()) 
					opts.iscallBack();


			}

		}

	window.didi.AutoPlay = AutoPlay;

})(window);