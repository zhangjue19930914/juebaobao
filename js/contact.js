define(function(require,exports,module){var move=require("base.js").move;exports.contact=function(iNow){var oContact=document.getElementById("contact");var oNext1=document.getElementById("next1");var oPrev1=document.getElementById("prev1");var aConLi=oContact.children;var page6Pos=[];if(page6Pos.length<aConLi.length){for(var i=0;i<aConLi.length;i++){page6Pos.push({left:aConLi[i].offsetLeft,top:aConLi[i].offsetTop})}}if(iNow==4){var ready6=false;var toPosNow=0;for(var i=0;i<aConLi.length;i++){aConLi[i].style.left=(aConLi[0].parentNode.offsetWidth-aConLi[i].offsetWidth)/2+"px";aConLi[i].style.top=(aConLi[0].parentNode.offsetHeight-aConLi[i].offsetHeight)/2+"px";aConLi[i].index=i}function toPos(){for(var i=toPosNow;i<aConLi.length;i++){aConLi[i].style.opacity="0";aConLi[i].style.filter="alpha(opacity:0)";aConLi[i].style.zIndex=5-i+10}aConLi[toPosNow].style.opacity="1";aConLi[toPosNow].style.filter="alpha(opacity:100)";for(var i=toPosNow;i<aConLi.length;i++){(function(index){move(aConLi[index],page6Pos[aConLi[toPosNow].index],{duration:1000,complete:function(){toPosNow++;if(toPosNow<aConLi.length){toPos()}else{ready6=true;zindex()}}})})(i)}}toPos();oPrev1.onclick=function(){if(!ready6){return}ready6=false;for(var i=0;i<aConLi.length;i++){aConLi[i].index++;if(aConLi[i].index==aConLi.length){aConLi[i].index=0}move(aConLi[i],page6Pos[aConLi[i].index],{complete:function(){ready6=true;zindex()}})}};oNext1.onclick=function(){if(!ready6){return}ready6=false;for(var i=0;i<aConLi.length;i++){aConLi[i].index--;if(aConLi[i].index==-1){aConLi[i].index=aConLi.length-1}move(aConLi[i],page6Pos[aConLi[i].index],{complete:function(){ready6=true;zindex()}})}};function zindex(){for(var i=0;i<aConLi.length;i++){aConLi[i].style.zIndex=(aConLi.length-aConLi[i].index+1)%3+1;aConLi[i].style.opacity=(aConLi.length-aConLi[i].index)/10+0.5;aConLi[i].style.filter="alpha(opacity:"+((aConLi.length-aConLi[i].index)/10+0.5)*100+")"}}}else{for(var i=0;i<aConLi.length;i++){move(aConLi[i],{left:(aConLi[0].parentNode.offsetWidth-aConLi[i].offsetWidth)/2,top:(aConLi[0].parentNode.offsetHeight-aConLi[i].offsetHeight)/2})}}}});