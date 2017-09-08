

let area;

document.addEventListener("DOMContentLoaded",function(){
	
	console.log(navigator.cookieEnabled);
	
	area=document.getElementById("txt");
	
	area.value=document.cookie;
	
	
	
});


let save=function(){
	document.cookie=encodeURIComponent(area.value);
	console.log(document.cookie,area.value);
};

let load=function(){
	area.value=document.cookie;
};
