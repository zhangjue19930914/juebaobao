function ajax(optional){
	optional=optional||{};
	optional.data=optional.data||{};
	optional.type=optional.type||'GET';
	optional.time=optional.time||0;
	optional.fnSucc=optional.fnSucc||null;
	optional.fnError=optional.fnError||null;


	optional.data.t=new Date().getTime();
	var arr=[];
	for(var key in optional.data){
		arr.push(key+'='+encodeURIComponent(optional.data[key]));
	}
	var str=arr.join('&');

	if(window.XMLHttpRequest){
		var oAjax=new XMLHttpRequest();
	}else{
		var oAjax=new ActiveXObject("Microsoft.XMLHTTP");
	}

	if(optional.type=='GET'){
		oAjax.open('GET',optional.url+'?'+str,true);
		oAjax.send();
	}else{
		oAjax.open('POST',optional.url,true);
		oAjax.setRequestHeader('content-type','application/x-www-form-urlencoded');
		oAjax.send(str);
	}

	oAjax.onreadystatechange=function(){
		if(oAjax.readyState==4){
			if(oAjax.status==200){
				optional.fnSucc(oAjax.responseText);
				clearTimeout(timer);
			}else{
				optional.fnError&&optional.fnError();
				clearTimeout(timer);
			}
		}
	};


	if(optional.time){
		var timer=setTimeout(function(){
			alert('超时了');
			oAjax.abort();
		}, optional.time)
	}
}