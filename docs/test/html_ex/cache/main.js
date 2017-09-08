

let area;

document.addEventListener("DOMContentLoaded",function(){
	
	console.log(navigator.cookieEnabled);
	
	area=document.getElementById("txt");
	
	area.value=document.cookie;
	
	
	
});


let date1 = new Date();

//30日後の日付データを作成
date1.setTime(date1.getTime() + 30 *24*60*60*1000);

//GMT形式に変換して変数date2に格納する
let date2 = date1.toGMTString();



let save=function(){
	document.cookie="hoge="+encodeURIComponent(area.value)+";expires="+date2+";";
	
	console.log(document.cookie,area.value);
};

let load=function(){
	area.value=document.cookie;
};
