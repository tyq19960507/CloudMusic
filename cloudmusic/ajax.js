var jq=jQuery.noConflict();
var result=[];//保存搜索结果
var imgID=[];//保存歌曲图片id分割后的数组
jq(document).ready(function(){
	function search(){
			var search_consequence=new Array();//接收数据返回的搜索结果
	    	var name =jq("#searchtext").val();//搜索的关键字
	    	urlString = "http://s.music.qq.com/fcgi-bin/music_search_new_platform?t=0&n=3&aggr=1&cr=1&loginUin=0&format=json&inCharset=GB2312&outCharset=utf-8&notice=0&platform=jqminiframe.json&needNewCode=0&p=1&catZhida=0&remoteplace=sizer.newclient.next_song&w="+name;
			// jq.ajax({
			// 	type: "GET",
			//   	url: "ajax.php",
			//   	dataType: 'json',
			//   	data: urlString,
			//   	success: function(data) {
			//   			console.log('搜索成功');
			//         	// data = JSON.parse(data);
			//         	// search_consequence=data['data']['song']['list']['0']['f'].split('|');//将返回的数据分割为数组
			//         	// console.log(search_consequence);
			//         	// result[0]=search_consequence[0];//歌曲id
			//         	// result[1]=search_consequence[1];//歌曲名
			//         	// result[2]=search_consequence[3];//歌手名
			//         	// result[3]=search_consequence[22];//歌曲图片
			//         	// jq('._song').html(result[1]);
			//         	// jq('._songer').html(result[2]);
			//       	},
			//   	error:function(){
			//   		console.log('搜索失败');
			//   	}
			// });
			jq.post("ajax.php", {
	        	urlString,
		      	}, function(data) {
		        	data = JSON.parse(data);
		        	search_consequence=data['data']['song']['list']['0']['f'].split('|');//将返回的数据分割为数组
		        	console.log(search_consequence);
		        	result[0]=search_consequence[0];//歌曲id
		        	result[1]=search_consequence[1];//歌曲名
		        	result[2]=search_consequence[3];//歌手名
		        	result[3]=search_consequence[22];//歌曲图片
		        	jq('._song').html(result[1]);
		        	jq('._songer').html(result[2]);
		      	})
			}
	function newPlay(){
		jq("#audio").attr("src","http://ws.stream.qqmusic.qq.com/"+result[0]+".m4a?fromtag=46");
		imgID=result[3].split('');
		jq(".photo").attr("src","http://imgcache.qq.com/music/photo/mid_album_90/"+imgID[12]+"/"+imgID[13]+"/"+result[3]+".jpg");
		jq('.song').html(result[1]);
		jq('.songer').html(result[2]); 
	}
	jq("#search").unbind('click').click(search);
	jq(".handle #bofang").unbind('click').click(newPlay);
});