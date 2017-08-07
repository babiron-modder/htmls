// test1.js

/*
・RPGとか

１、初期ロード
　ロード画像読み込み
　ロード画面の表示
　ほかの画像の読み込み
　スプライト一覧を読み込み

２、ステージロード
　BGロード
　スプライトロード
　イベント設定

３、ループ
　BG描画
　スプライト描画



*/



(function(){
	let canvas=null;
	let ctx=null;
	
	document.addEventListener("DOMContentLoaded",
		function(){
			// キャンバスのロードとか
			init();
			
			// ロード画面の表示
			Load.setUp();
			
			// 画像とスプライトの読み込み
			loadImages();
			loadSprites();
			
			// 初期画面のロード
			loadGame();
			
			// ロード画面の消去
			hideLoadingImage();
			
			// ループ開始
			mainLoop();
			
		}
	);
	
	function init(){
		canvas=document.getElementById("bg");
		ctx=canvas.getContext("2d");
	}
	
	
	let Screen=(function(){
		_clear=function(){
			ctx.clearRect(0, 0, canvas.width, canvas.height);
		};
		
		
		_fadeIn=function(){
			
		};
		
		
		_fadeOut=function(){
			
		};
		
	})();
	
	
	// ロード関連の命令
	let Load=(function{
		let isLoading=false;
		let loadingImage=new Image();
		
		_setUp=function(){
			loadingImage.src="img/loading.png";
			loadingImage.onload=function(){
				isLoading=true;
				Screen.clear();
				ctx.drawImage(loadingImage,0,0);
				_loop();
			};
		};
		
		_start=function(){
			isLoading=true;
			ctx.drawImage(loadingImage,0,0);
			setTimeout(function(){
				_loop();
			},1);
		}; 
		
		_end=function(){
			isLoading=false;
		};
		
		_loop=function(){
			if(isloading){
				requestId=window.requestAnimationFrame(_loop);
			}
		};
		
	})();
	
	
	// 画像の読み込み
	
	
	
	
	
	
})();



