function $(selector){
	return document.querySelector(selector);//定义寻找dom对象的方法
}
var player=(function(){
	var modulation=function(){
		//点击音量按钮出现音量调节栏
		$('.horn').onclick=function(){
			if(window.getComputedStyle($('.volumn'),null).display=='none'){
				$('.volumn').style.display="block";
			}else{
				$('.volumn').style.display="none";
			}
		}
        //调节音量大小
        $('.volumn').onclick=function(event){
        	var volumnRight=$('.volumn_right').clientWidth; //获取最大音量的线条宽度
        	var volumnLeft=$('.volumn_left').clientWidth; //获取当前音量的线条宽度
        	var deviationX=getScreenOffsetLeft($('.volumn_circle'));//获取小圆点距离浏览器边缘的距离
        	var differWidth=event.clientX-deviationX;//获取小圆点偏移量
        	var percent=(differWidth+volumnLeft)/volumnRight;
        	//控制音量条变化范围
        	if(percent>1){
        		percent=1;
        	}else if(percent<0){
        		percent=0;
        	}
        	$('.volumn_circle').style.left=percent*100+'%';//改变小圆点的位置
        	$('.volumn_left').style.width=percent*100+'%';//改变当前音量的线条宽度
        	$('audio').volume = percent;
        }
        //暂停歌曲播放
		$('#suspend').onclick=function(){
			if($('#suspend').className=="icon icon-pause"){
				$('#suspend').className="icon icon-play2";
				$('#bofang').title="播放";
				$('audio').pause();
				return;
			}else if($('#suspend').className=="icon icon-play2")
			$('#suspend').className="icon icon-pause";
			$('#bofang').title="暂停";
			$('audio').play();
			return;
		}
	}
	var playanimation=function(){
			//歌曲播放时间进度
			var photo=$('.fengmian');//封面图片
			var photoDeg=0;//记录图片旋转角度
			var progressBar=$('.line_past');//播放进度条
			var progressCircle=$('.line_circle');//进度条上的小圆点
			var timePercent=0;//播放时间与总时长百分比
			var cur_time=Math.floor($('#audio').duration);//获得当前播放音乐的总时长
			var pastTime=$('#pasttime');//已播放的时间
			var overTime=$('#overtime');//音乐总时长
			var overM=Math.floor(cur_time/60);//时长的分钟
			var overS=cur_time%60;//时长的秒数
			overM=overM>=10?overM:'0'+overM;
			overS=overS>=10?overS:'0'+overS;
			overTime.innerHTML='/'+overM+':'+overS;//分钟和秒数载入页面
			var bartime=setInterval(function(){
				////////////////////////bug
				cur_time=Math.floor($('#audio').duration);//获得当前播放音乐的总时长
				overM=Math.floor(cur_time/60);//时长的分钟
				overS=cur_time%60;//时长的秒数
				overM=overM>=10?overM:'0'+overM;
				overS=overS>=10?overS:'0'+overS;
				overTime.innerHTML='/'+overM+':'+overS;//分钟和秒数载入页面
				///////////////////////////////////////////////////////
				var now_time=Math.floor($('#audio').currentTime);//获得已播放的时间
				timePercent=now_time/cur_time;
				var nowM=Math.floor(now_time/60);
				var nowS=now_time%60;
				nowM=nowM>=10?nowM:'0'+nowM;
				nowS=nowS>=10?nowS:'0'+nowS;
				var timeText=nowM+':'+nowS;
				pastTime.innerHTML=nowM+':'+nowS;
				progressBar.style.width=timePercent*100+'%';
				progressCircle.style.left=timePercent*100+'%';
				return timeText;
			},100);
			//点击进度条调整歌曲播放进度
			$('.audio_bottom').onmousedown=function(event){
				var maxLine=$('.audio_line').clientWidth;//获得进度条最大宽度
				var nowLine=$('.line_past').clientWidth;//获得小圆点当前left数值即已播放进度条宽度
				var circleLeft=getScreenOffsetLeft($('.line_circle'));//获得小圆点距离浏览器边框的距离
				var devCircle=event.clientX-circleLeft;//计算出小圆点偏移量
				var linePercent=(devCircle+nowLine)/maxLine.toFixed(2);
				if(linePercent>1){
					linePercent=1;
				}else if(linePercent<0){
					linePercent=0;
				}
				progressBar.style.width=linePercent*100+'%';//改变进度条宽度
				progressCircle.style.left=linePercent*100+'%';//改变小圆点位置
				$('#audio').currentTime=linePercent*cur_time;
			}
			//封面图片转动
			var photorotate=setInterval(function(){
				photoDeg+=0.5;
				photo.style.transform='rotate('+photoDeg+'deg)';
			},20);
	}
	var getScreenOffsetLeft= function(ele) { // 获取相对于屏幕的左偏移量
        var left = 0;
        while (ele) {
            left += ele.offsetLeft;
            ele = ele.offsetParent;
        }
        return left;
    }
    var getScreenOffsetTop= function(ele) { // 获取相对于屏幕的顶部偏移量
        var top = 0;
        while (ele) {
            top += ele.offsetTop;
            ele = ele.offsetParent;
        }
        return top;
    }
	return {
		modulation:modulation,
		playanimation:playanimation
	};
})();
player.modulation();
setTimeout("player.playanimation()",300); 
