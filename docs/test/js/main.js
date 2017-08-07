//main.js

/*

１、使うコンストラクタの読み込み


２、ロード画面を表示
３、次で使うもののロード（インスタンス化）
４、画面生成
５、ループ
６、ループでロードが必要
７、２に戻る。

*/



(function(){
	let canvas=null;
	let debug=null;
	let ctx=null;
	let SPRITE_MODELS=null;
	let loadingImage=false;
	
	
	// スプライトのコンストラクタのロード
	function loadSprites(){
		// スプライトのデータオブジェクト(処理は画像の処理のみ)
		SPRITE_MODELS=(function(){
			// スプライトの原型オブジェクト
			let _DEFAULT=(function(){
				let _fn=function(_img,_x,_y){
					let that=this;
					this.isLoading=true;
					this.imgs=_img;
					this.x=_x;
					this.y=_y;
					this.defaultImgX=0;
					this.imgX=0;
					this.imgY=0;
					this.width=32;
					this.height=32;
					this.img=new Image();
					this.img.src=_img;
					this.img.onload=function(){
						that.isLoading=false;
					}
					this.animationTickMax=6;
					this.animationTick=0;
					this.animationState=0;
					this.animationStateMax=2;
					this.animation=false;
					
					canvas.addEventListener("click", function (evnt) { 
						let button = evnt.target.getBoundingClientRect();
						let mouseX = evnt.clientX - button.left;
						let mouseY = evnt.clientY - button.top;
						
						if((mouseX>that.x && mouseY>that.y)&&(mouseX<that.x+that.width && mouseY<that.y+that.height)){
							that.clickEvent();
						}
						
					});
				};
				
				// 画像を描画する
				_fn.prototype.draw=function(){
					//console.log(this.isLoading);
					ctx.drawImage(this.img,this.imgX,this.imgY,this.width,this.height,this.x,this.y,this.width,this.height);
				};
				
				// 座標を指定する
				_fn.prototype.setPos=function(_x,_y){
					this.x=_x;
					this.y=_y;
				};
				_fn.prototype.animationEnd=function(){};
				
				// アニメーション
				_fn.prototype.animate=function(){
					if(!this.animation){
						return;
					}
					if((++this.animationTick)==this.animationTickMax){
						this.animationTick=0;
						this.imgX+=this.width;
						if((++this.animationState)==this.animationStateMax){
							this.animationState=0;
							this.imgX=this.defaultImgX;
							this.animationEnd();
						}
					}
					
				};
				
				// クリックイベント
				_fn.prototype.clickEvent=function(){};
				
				
				
				return _fn;
				
			})();
			
			// ロード文字オブジェクト
			let _LOADING=(function(){
				let _fn=function(){
					_DEFAULT.call(this,"img/loading.png",480-186-8,320-32-8);
					this.width=163;
				};
				_fn.prototype=Object.create(_DEFAULT.prototype);
				
				return _fn;
			})();
			
			// ドット
			let _DOTTO=(function(){
				let _fn=function(){
					_DEFAULT.call(this,"img/dotto.png",480-32-8,320-32-8);
					this.animationStateMax=8;
					this.animation=true;
				};
				_fn.prototype=Object.create(_DEFAULT.prototype);
				
				return _fn;
			})();
			
			
			//宝箱のオブジェクト 
			let _CHEST=(function(){
				let _fn=function(_x,_y){
					_DEFAULT.call(this,"img/chest.png",_x,_y);
				};
				_fn.prototype=Object.create(_DEFAULT.prototype);
				
				_fn.prototype.open=function(){
					this.imgX=32;
				};
				
				return _fn;
			})();
			
			//煙のオブジェクト 
			let _SMOKE=(function(){
				let _fn=function(_x,_y){
					_DEFAULT.call(this,"img/smoke.png",_x,_y);
					this.animationStateMax=8;
					this.animationEnd=function(){
						this.animation=false;
					};
				};
				_fn.prototype=Object.create(_DEFAULT.prototype);
				
				_fn.prototype.start=function(){
					this.animation=true;
				};
				
				
				return _fn;
			})();
			
			
			return {
				DEFAULT:_DEFAULT,
				LOADING:_LOADING,
				DOTTO:_DOTTO,
				CHEST:_CHEST,
				SMOKE:_SMOKE,
			};
		})();
	}
	
	// スプライト関数命令
	let Sprite=(function(){
		let _sprites={}; // バッファにあるスプライト
		
		// キャラをスプライトに登録する関数
		let _spset=function(_id,_model){
			_sprites[_id]=_model;
		};
		
		// スプライトオブジェクトの取得する関数
		let _get=function(_id){
			return _sprites[_id];
		}
		
		// スプライトに登録した画像たちを描画する関数
		let _drawAll=function(){
			for(let prop in _sprites){
				_sprites[prop].animate();
				_sprites[prop].draw();
			}
		};
		
		// スプライトの画像が読み込み中ならtrue、読み込み終わったらfalseを返す関数
		let _checkIsLoading=function(){
			for(let prop in _sprites){
				if(_sprites[prop].isLoading){
					return true;
				}
			}
			return false;
		};
		
		return {
			spset:_spset,
			get:_get,
			drawAll:_drawAll,
			checkIsLoading:_checkIsLoading,
		};
	})();
	
	
	
	// DOMがロード終わったとき
	document.addEventListener("DOMContentLoaded",
	function(){
		debug=document.getElementById("debug");
		
		
		loadSprites(); //スプライトのロード
		loadAssets(); //初期画面のロード
		
		loading(); //スプライトのロードが終わったらループ開始
		
	});
	
	// 初期画面のロード
	function loadAssets(){
		canvas=document.getElementById("bg");
		ctx=canvas.getContext("2d");
		
		//---------------------
		//  初期画面表示
		//---------------------
		
		
		Sprite.spset(0,new SPRITE_MODELS.CHEST(222,165));
		Sprite.spset(-2,new SPRITE_MODELS.LOADING());
		Sprite.spset(-1,new SPRITE_MODELS.DOTTO());
		
		Sprite.get(0).clickEvent=function(){
			Sprite.get(0).open();
			Sprite.spset(1,new SPRITE_MODELS.SMOKE(220,150));
			Sprite.get(1).start();
		}
		
		//----------------------
		
		
		
	}
	
	// デバッグ用の関数
	function showDebug(word){
		debug.textContent=word;
	}
	
	
	// 読み込み終わったらmainLoopへ飛ぶ
	function loading(){
		setTimeout(function(){
			if(Sprite.checkIsLoading()){
				loading();
			}else{
				// ロード画面消去
				//
				
				mainLoop();
			};
			
		},100);
	}
	
	// メインループ
	function mainLoop(){
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		Sprite.drawAll();
		requestId=window.requestAnimationFrame(mainLoop);
	}
	
	
})();