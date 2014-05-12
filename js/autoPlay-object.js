function AutoPlay(obj){

	//初始化
	thisObj = obj;
	aBtn = thisObj.getElementsByTagName('a');
	oImg = thisObj.getElementsByTagName('img')[0];
	oUl = thisObj.getElementsByTagName('ul')[0];
	aLi = oUl.getElementsByTagName('li');
	thisObj.arrUrl = [ 'img/01.jpg', 'img/02.jpg', 'img/03.jpg', 'img/05.jpg' ];
	thisObj.strLi='';
	this.timer = null;
	this.num = 0;

	thisObj.style.width = "260px";
	thisObj.style.height = "210px";
	oImg.style.width = "260px";
	oImg.style.height = "210px";

	_this=this;

	//li展示
	for (var i = 0; i < thisObj.arrUrl.length; i++) {
		 thisObj.strLi+= '<li><img src="' + thisObj.arrUrl[i] + '" /></li>';
		 oUl.innerHTML = thisObj.strLi;
	}

	//图片展示
	oImg.src = thisObj.arrUrl[this.num];
	aLi[this.num].className = 'active';

	//图片点击切换
	for(var i=0; i<aLi.length; i++){
		aLi[i].index = i;

		aLi[i].onclick = function() {
			_this.num = this.index;
			_this.isPlay();
		};
	}

	thisObj.onmouseover = function() {
		clearInterval(timerStart);
	};
	
	thisObj.onmouseout = function() {
		_this.isAuto();
	};
}

//小图显示隐藏
AutoPlay.prototype.isPic = function() {
	for (var i = 0; i < aLi.length; i++) {

		aLi[i].index = i;

		aLi[i].onmouseover = function() {
			_this.num = this.index;

			aLi[_this.num].getElementsByTagName('img')[0].style.display = 'inline-block';
		};
		aLi[i].onmouseout = function() {

			_this.num = this.index;

			aLi[_this.num].getElementsByTagName('img')[0].style.display = 'none';
		};
	}
}

//创建左右按钮
AutoPlay.prototype.isBtn = function() {
	var divBtn = document.createElement('div');
	divBtn.innerHTML='<a class="prev" href="javascript:;"></a><a class="next" href="javascript:;"></a>';
	thisObj.appendChild(divBtn);
	_this.tabBtnLR();
}
	
//按钮切换
AutoPlay.prototype.tabBtnLR = function() {

	aBtn[0].onclick = function (){
		_this.num--;
		if( _this.num == -1 ){
			_this.num = thisObj.arrUrl.length-1;
		}
		
		_this.isPlay();
	};

	aBtn[1].onclick = function (){
		_this.num++;
		if( _this.num == thisObj.arrUrl.length ){
			_this.num = 0;
		}
		_this.isPlay();
	};
}

//是否图片自动播放

AutoPlay.prototype.isAuto = function() {
	_this=this;

	timerStart = setInterval(function() {
		_this.num++;
		_this.num %= thisObj.arrUrl.length;

		_this.isPlay();
	}, 1000);
}

//图片切换
AutoPlay.prototype.isPlay = function() {

	oImg.src = thisObj.arrUrl[_this.num];

	for (var i = 0; i < aLi.length; i++) {
		aLi[i].className = '';
	}
	aLi[_this.num].className = 'active';
}
	
				

