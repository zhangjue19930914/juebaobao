/**
 * Created by tang on 2016-07-09.
 */
define(function(require,exports,module){
    require("home.js").home();

    var  timer1=setInterval(function(){
        if(now==1){
            clearInterval(timer1);
            require("basicInfo.js").basicInfo();
        }
    },30);
      var  timer2=setInterval(function(){
         if(now==2){
             clearInterval(timer2);
             require("skill.js").skill();
         }
     },30);
    var timer3=setInterval(function(){
        if(now==3){
            clearInterval(timer3);
            require("show.js").show();
        }
    },30);
    var timer4=setInterval(function(){
        if(window.now==4){
            clearInterval(timer4);
            require("contact.js").contact(4);
        }
    },30);

});