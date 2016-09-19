function getStyle(obj,attr){
	return obj.currentStyle?parseFloat(obj.currentStyle[attr]):parseFloat(getComputedStyle(obj,false)[attr]);
}

//js完美运动框架
function move(obj,json,optional){  
 //optional是可选参数，包含time type fn
	optional=optional||{};
	optional.time=optional.time||700;
	optional.type=optional.type||'ease-out';
	optional.fn=optional.fn||null;

	var start={}; 
	var dis={};

	for(var key in json){
		start[key]=getStyle(obj,key); //求出的是start的起始值
		dis[key]=json[key]-start[key]; 
	}
	var count=Math.round(optional.time/30);
	var n=0;

	clearInterval(obj.timer);
	obj.timer=setInterval(function(){
		n++;
		for(var key in json){
			//var a=1-n/count;//0---1的数
			//var cur=start[key]+dis[key]*(1-a*a*a);//减速-->'ease-out'
			
			//var a=n/count;//0---1的数
			//var cur=start[key]+dis[key]*(a*a*a);//加速-->'ease-in'
			
			//var a=n/count;//0---1的数
			//var cur=start[key]+dis[key]*a;//匀速-->'linear'

			switch(optional.type){
				case 'linear':
					var a=n/count;
					var cur=start[key]+dis[key]*a; //运动公式,求出每一个属性当前运动到哪
					break;
				case 'ease-out':
					var a=1-n/count;
					var cur=start[key]+dis[key]*(1-a*a*a);
					break;
				case 'ease-in':
					var a=n/count;
					var cur=start[key]+dis[key]*a*a*a;
					break;
				case 'ease-in-out':
					if(n/count<=0.5){
						//加速
						var a=n/count*1.5; //为什么要乘1.5？
						var cur=start[key]+dis[key]*a*a*a;
					}else{
						move(obj,json,{time:optional.time/2,fn:optional.fn})
					}
			}
			
			if(key=='opacity'){
				obj.style.opacity=cur;
				obj.style.filter='alpha(opacity='+100*cur+')';
			}else{
				obj.style[key]=cur+'px';
			}
		}
		if(n==count){ //停止条件
			clearInterval(obj.timer);
			optional.fn && optional.fn(); //回调函数，用户在外面传了函数，再调用
		}
	}, 30)
}