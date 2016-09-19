function jsonp(options){    //url data fnSucc fnError callback timeout   url必须有，其他参数可选

	options=options||{};
	options.data=options.data||{};
	options.callback=options.callback||'cb';
	options.timeout=options.timeout||0;

	var cbName='jsonp_'+new Date().getTime();
	options.data[options.callback]=cbName;
	window[options.data[options.callback]]=function(json){
		clearTimeout(timer);
		options.fnSucc && options.fnSucc(json);
		document.head.removeChild(oScript);
		delete window[options.data[options.callback]];
	};

	var arr=[];
	for(var key in options.data){
		arr.push(key+'='+encodeURIComponent(options.data[key]));
	}
	options.url=options.url+'?'+arr.join('&');
	

	var oScript=document.createElement('script');
	oScript.src=options.url;
	document.head.appendChild(oScript);
	if(options.timeout){
		var timer=setTimeout(function(){
			options.fnError && options.fnError();
			document.head.removeChild(oScript);
			window[options.data[options.callback]]=function(){
				delete window[options.data[options.callback]];
			};	
		}, options.timeout)
	}
}