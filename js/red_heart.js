﻿(function(){})();var arr=[];var r=4;var radian;var i;var radianDecrement;var time=10;var intervalId;var num=360;var startRadian=Math.PI;var ctx;function startAnimation(){ctx=document.getElementById("myCanvas").getContext("2d");ctx.width=document.documentElement.clientHeight-20;ctx.heigh=document.documentElement.clientWidth-20;drawHeart()}function drawHeart(){ctx.strokeStyle="#F47F27";ctx.lineWidth=1;radian=startRadian;radianDecrement=Math.PI/num*2;ctx.moveTo(getX(radian),getY(radian));i=0;intervalId=setInterval("printHeart()",time)}function printHeart(){radian+=radianDecrement;ctx.lineTo(getX(radian),getY(radian));i++;ctx.stroke();if(i>=num){clearInterval(intervalId)}}function getX(t){return 100+r*(16*Math.pow(Math.sin(t),3))}function getY(t){return 50-r*(13*Math.cos(t)-5*Math.cos(2*t)-2*Math.cos(3*t)-Math.cos(4*t))}window.onload=function(){startAnimation()};