window.onload=function(){

	//设置page，pageBox,box的高度
	var oBox=document.getElementById('box');
	var oPageBox=document.getElementById('pageBox');
	var aPages=oPageBox.children;
	oBox.style.height=document.documentElement.clientHeight+'px';
	oPageBox.style.height=document.documentElement.clientHeight*4+'px';
	for(var i=0;i<aPages.length;i++){
		aPages[i].style.height=document.documentElement.clientHeight+'px';
	}

	//头部文字效果
	var oDiv=document.getElementsByClassName('intro')[0];
	var aSpan=oDiv.children;
	var timer=null;

	for(var i=0;i<aSpan.length;i++){
		(function(index){
			timer=setTimeout(function(){
				move(aSpan[index],{opacity:1});
				
			}, 150*i)
		})(i);
		if(i==aSpan.length) clearInterval(timer);
	}

	//page2弹性菜单
	var oElastic=document.getElementById('elastic');
	var aLi=oElastic.children;
	var oActive=aLi[aLi.length-1];

	for(var i=0;i<aLi.length-1;i++){
		aLi[i].onmouseover=function(){
			elastic(oActive,this.offsetLeft);
		};
	}

	//move
	function elastic(obj,iTarget){
		var speed=0;
		var left=0;
		clearInterval(obj.timer);
		obj.timer=setInterval(function(){
			speed+=(iTarget-left)/5;
			speed*=0.7;
			left=speed+obj.offsetLeft;
			obj.style.left=left+'px';
			if(left==iTarget && Math.abs(speed)<1){
				clearInterval(obj.timer);
			}
		}, 30)
	}


	//Css作品拉钩效果
	var oCssLagou=document.getElementById('css_lagou');

	var aLi1=oCssLagou.children;

	for(var i=0;i<aLi1.length;i++){
		lagou(aLi1[i]);
	}

	//getDir 获取方向
	function getDir(obj,oEvt){
		//var oCardBodyBox=document.getElementById('cardBodyBox');
		var x = oEvt.clientX - obj.offsetLeft - obj.offsetWidth/2;
		var y = obj.offsetTop + obj.offsetHeight/2 - oEvt.clientY+oCardBodyBox.offsetTop;
		// n 0 左 1 下  2 右   3 上
		return Math.round((Math.atan2(y,x)*180/Math.PI + 180)/90)%4;
	}
	function lagou(obj){
		obj.onmouseover=function(ev){
			var oEvt=ev||event;
			var oFrom=oEvt.fromElement||oEvt.relatedTarget;
			if(obj.contains(oFrom)) return;

			var oSpan=this.children[0].children[1];
			var n=getDir(this,oEvt);
			switch(n){
				case 0:
					oSpan.style.left='-160px';
					oSpan.style.top=0;
					break;
				case 1:
					oSpan.style.left=0;
					oSpan.style.top='160px';
					break;
				case 2:
					oSpan.style.left='160px';
					oSpan.style.top=0;
					break;
				case 3:
					oSpan.style.left=0;
					oSpan.style.top='-160px';
			}
			move(oSpan,{left:0,top:0})
		};

		obj.onmouseout=function(ev){
			var oEvt=ev||event;
			var oTo=oEvt.toElement||oEvt.relatedTarget;
			if(obj.contains(oTo)) return;
			var oSpan=this.children[0].children[1];
			var n=getDir(this,oEvt);
			switch(n){
				case 0:
					move(oSpan,{left:-160,top:0})
					break;
				case 1:
					move(oSpan,{left:0,top:160})
					break;
				case 2:
					move(oSpan,{left:160,top:0})
					break;
				case 3:
					move(oSpan,{left:0,top:-160})
			}
		};
	}


	//js作品拉钩效果
	var oJsLagou=document.getElementById('js_lagou');
	var aLi2=oJsLagou.children;
	for(var i=0;i<aLi2.length;i++){
		lagou(aLi2[i]);
	}

	//ajax作品拉钩效果
	var oAjaxLagou=document.getElementById('ajax_lagou');
	var aLi3=oAjaxLagou.children;
	for(var i=0;i<aLi3.length;i++){
		lagou(aLi3[i]);
	}


	//pages选项卡切换
	var oPrev=document.getElementById('prev');
	var oNext=document.getElementById('next');
	var iNow=0;

	oNext.onclick=function(){
		
		if(iNow==aPages.length-1) return;
		iNow++;
		if(iNow==2) intro();
		move(oPageBox,{top:-iNow*aPages[0].offsetHeight});
	};

	oPrev.onclick=function(){
		
		if(iNow== 0) return;
		iNow--;
		if(iNow==2) intro();
		move(oPageBox,{top:-iNow*aPages[0].offsetHeight});
	};

	//page2导航栏选项卡
	var oCardBodyBox=document.getElementById('cardBodyBox');
	var aCardBody=oCardBodyBox.children;
	for(var i=0;i<aLi.length-1;i++){
		aLi[i].index=i;
		aLi[i].onclick=function(){
			for(var i=0;i<aLi.length-1;i++){
				aCardBody[i].style.display='none';
			}
			aCardBody[this.index].style.display='block';
		};
	}

	//page滚轮事件
	//封装addMouseWheel函数
	function addMouseWheel(obj,fn){
		//1.判断浏览器
		if(navigator.userAgent.toLowerCase().indexOf('firefox')!= -1){
			//ff
			obj.addEventListener('DOMMousescroll', fnWheel, false);
		}else{
			//ie chrome
			obj.onmousewheel=fnWheel;
		}
		//2.定义fnWheel函数
		function fnWheel(ev){
			var oEvt=ev||event;
			var down=true;
			//3.统一方向
			if(oEvt.wheelDelta){
				//ie chorme
				down=oEvt.wheelDelta<0?true:false;
			}else{
				//ff
				down=oEvt.detail>0?true:false;
			}
			//4.回调函数
			fn(down);
			oEvt.preventDefault && oEvt.preventDefault();
		}
	}

	var ready=true;
	addMouseWheel(document,function(down){
		if(down){
			if(!ready) return;	
			if(iNow==aPages.length-1) return;
			ready=false; //***
			iNow++;
			if(iNow==2) intro();
			move(oPageBox,{top:-iNow*aPages[0].offsetHeight},{fn:function(){
				ready=true; //回调函数，运动完把ready改成false
				//alert(ready)
			}})
		}else{
			if(!ready) return;
			if(iNow== 0) return;
			ready=false; //***
			iNow--;
			if(iNow==2) intro();
			move(oPageBox,{top:-iNow*aPages[0].offsetHeight},{fn:function(){
				ready=true;
			}})
		}
	})

	//page1 四个按钮切换
	var oHome=document.getElementById('home');
	var oDemo=document.getElementById('demo');
	var oAbout=document.getElementById('about_me');
	var oContact=document.getElementById('contact');

	oHome.onclick=function(){
		iNow=0;
		move(oPageBox,{top:-iNow*aPages[0].offsetHeight})
	};

	oDemo.onclick=function(){
		iNow=1;
		move(oPageBox,{top:-iNow*aPages[0].offsetHeight})
	};

	oAbout.onclick=function(){
		iNow=2;
		move(oPageBox,{top:-iNow*aPages[0].offsetHeight})
		intro();
	};

	oContact.onclick=function(){
		iNow=3;
		move(oPageBox,{top:-iNow*aPages[0].offsetHeight})
	};


	//page3自我介绍
	var showText=true;   //重新加载的时候又改成true
	function intro(){
		if(!showText) return;
		var str="非常感谢您来到我的小屋，我的小屋或许没有那么的华丽和张扬，但是我相信简约也是一种美，我的技术或许还没有那么的成熟，但是我有一颗追求完美的心。";
		var oDec=document.getElementById('dec');
		var timer2=null;
		
		// 
		for(var i=0;i<str.length;i++){
			var oSpan2=document.createElement('span');
			oSpan2.style.opacity=0;
			oSpan2.innerHTML=str[i];
			oDec.appendChild(oSpan2);
		}
		// console.log(oDec.innerHTML)
		for(var i=0;i<oDec.children.length;i++){
			(function(index){
				timer2=setTimeout(function(){
					move(oDec.children[index],{opacity:1})
				}, i*100)
			})(i)
			if(i==oDec.children.length) clearInterval(timer2);
		}
		showText=false;
	}


	//page3随机运动小球
	var oRandom=document.getElementById('random');
	var aRandomSpan=oRandom.getElementsByTagName('span');

	for(var i=0;i<aRandomSpan.length;i++){
		(function(index){
			setInterval(function(){
				move(aRandomSpan[index],{left:Math.random()*50,top:Math.random()*50},{type:'linear',time:1000})
			}, 500)
		})(i)
	}


	//home 回到主页
	var aGoHome=document.getElementsByClassName('goHome');
	for(var i=0;i<aGoHome.length;i++){
		aGoHome[i].onclick=function(){
			iNow=0;
			move(oPageBox,{top:-iNow*aPages[0].offsetHeight})
		};
	}

	
};