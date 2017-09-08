











//--------> Gameオブジェクト <--------
//  
//  すべてを統括するオブジェクト
//  
//  画像のロード
//  
//  
//  
let Game=(function(){
	let isloading=false;
	let loading_image;
	let loading_image_count=0;
	let loaded_image_count=0;
	let ctx;
	let canvas;
	let handle=null;
	
	let Main=function(){
		
	};
	
	
	//--------> DOMが読まれたら１番に実行 <--------
	//  
	//  ロード画面の画像をロード
	//  
	Main.prototype.setUp=function(){
		canvas=document.getElementById("game_main")
		ctx=canvas.getContext("2d");
		
		
		
		
		
		
		//----> ロード画面の素材のロード <----
		loading_image=new Image();
		loading_image.src="img/load.png";
		
		//ロード画面の素材のロードが終了しらたらロードを終了
		loading_image.onload=function(){
			isloading=false;
		};
		
		//ロード画面の素材がロード終了するまで
		loadLoop(function(){
			//画面は真っ暗
		},function(){
			console.log("load.png loaded!");
			//ロード画面が読み込まれたら初期ロード画面を表示
			startInitLoading();
		});
		
	};
	
	
	
	//--------> 初期ロード画面を表示 <--------
	//  
	//  ロード画面の画像の読み込み後に実行される
	//  
	//  Load関数が実行され、ロード画面が表示される
	//  
	//  Load関数実行後、画像の読み込みが終了するまでロード画面が続く
	//  
	//  画像が読み込み終わったらLoopへと移行
	//  
	function startInitLoading(){
		isloading=true;
		
		Load();
		
		endLoading();
		
		loadLoop(stepLoading,function(){
			console.log("Image loaded");
			Init();
			mainLoop();
		});
		
	}
	
	//--------> mainLoop <--------
	//  
	//  ループする
	//  
	function mainLoop(){
		// console.log("loop");
		ctx.clearRect(0, 0, 480, 320);
		
		Sprite.drawAll();
		Loop();
		handle=window.requestAnimationFrame(mainLoop);
	}
	
	
	//--------> ロードを終了する関数 <--------
	//  
	//  画像の読み込み中ならそれまで待つ。
	//  
	function endLoading(){
		
		if(loading_image_count==loaded_image_count){
			isloading=false;
			loading_image_count=0;
			loaded_image_count=0;
			return;
		}
		
		// console.log(loading_image_count+","+loaded_image_count);
		
		setTimeout(endLoading,100);
	}
	
	
	//--------> ロード画面のステップ <--------
	//  
	//  ロード画面を表示し、アニメーションをする
	//  
	let step=0;
	function stepLoading(){
		
		ctx.clearRect(0, 0, 480, 320);
		
		
		ctx.translate(400,240);
		ctx.drawImage(loading_image,0,0);
		ctx.translate(32,32);
		ctx.rotate( 10 * Math.PI / 180 );
		ctx.translate(-32,-32);
		ctx.translate(-400,-240);
		
		
		// console.log(step);
		
		
		if((++step)==360){
			step=0;
		}
		
	}
	
	
	//--------> ロードループ <--------
	//  
	//  この関数の実行後にコードを書いてはいけない。
	//  
	//  returnもしてはいけない。
	//  
	//  無理やりシングルスレッドにしている。
	//  
	//  ロード中の関数はstepLoadingを使えばいい。
	//  
	//  
	function loadLoop(loadingFn,loadedFn){
		setTimeout(function(){
			if(isloading){
				console.log("loading");
				loadingFn();
				loadLoop(loadingFn,loadedFn);
			}else{
				loadedFn();
			}
		},100);
	}
	
	
	//--------> 画像をロード <--------
	//  
	// 「GameImages.キーワード=Imageオブジェクト」と登録
	//  
	//  Load関数以外で使用してはいけない
	//  
	Main.prototype.loadImage=function(keyword,src){
		let _imgobj=new Image();
		_imgobj.src=src;
		
		GameImages[keyword]=_imgobj;
		
		loading_image_count++;
		
		GameImages[keyword].onload=function(){
			loaded_image_count++;
		};
	};
	
	
	//--------> 画像をまとめてロード <--------
	//  
	//  「GameImages.キーワード=Imageオブジェクト」と登録
	//  
	//  obj = { キーワード:画像の場所 ,....}
	//  
	//  Load関数以外で使用してはいけない
	//  
	Main.prototype.loadImages=function(obj){
		let _i, _imgobj;
		for(_i in obj){
			_imgobj=new Image();
			_imgobj.src=obj[_i];
			
			GameImages[_i]=_imgobj;
			
			loading_image_count++;
			
			GameImages[_i].onload=function(){
				loaded_image_count++;
			};
		}
	};
	
	
	
	
	
	
	
	//*********************************************************************************
	//  
	//  
	//  ここから付属
	//  
	//  
	//*********************************************************************************
	
	
	
	
	
	
	
	//--------> スプライト管理用 <--------
	let Sprite=(function(){
		let sprites={};
		let Main=function(){
			
		};
		
		
		Main.prototype.create=function(spnum,img,x,y,width,height){
			sprites[spnum]=new SpriteObject(img,x,y,width,height);
		};
		
		Main.prototype.drawAll=function(){
			let _i;
			for(_i in sprites){
				sprites[_i].drow();
			}
		};
		
		Main.prototype.moveTo=function(spnum,x,y){
			sprites[spnum].moveTo(x,y);
		};
		
		Main.prototype.move=function(spnum,x,y){
			sprites[spnum].move(x,y);
		};
		
		Main.prototype.getX=function(spnum){
			return sprites[spnum].x;
		};
		
		Main.prototype.getY=function(spnum){
			return sprites[spnum].y;
		};
		
		Main.prototype.getWidth=function(spnum){
			return sprites[spnum].width;
		};
		
		Main.prototype.getHeight=function(spnum){
			return sprites[spnum].height;
		};
		
		return (new Main());
	})();
	
	
	Main.prototype.spset=function(spnum,img,x,y,width,height){
		Sprite.create(spnum,img,x,y,width,height);
	};
	
	Main.prototype.spmoveto=function(spnum,x,y){
		Sprite.moveTo(spnum,x,y);
	};
	
	Main.prototype.spmove=function(spnum,x,y){
		Sprite.move(spnum,x,y);
	};
	
	Main.prototype.spX=function(spnum){
		return Sprite.getX(spnum);
	};
	
	Main.prototype.spY=function(spnum){
		return Sprite.getY(spnum);
	};
	
	Main.prototype.spWidth=function(spnum){
		return Sprite.getWidth(spnum);
	};
	
	Main.prototype.spHeight=function(spnum){
		return Sprite.getHeight(spnum);
	};
	
	
	
	
	
	//--------> スプライトオブジェクト <--------
	//  
	//  スプライトのオブジェクト
	//  
	let SpriteObject=(function(){
		let Main=function(img,x,y,width,height){
			this.x=x;
			this.y=y;
			this.width=width;
			this.height=height;
			this.visivle=true;
			this.tag;
			
			this.img=img;
			
			this.animate;
			
			this.imageX=0;
			this.imageY=0;
			
			
			this.damage;
		};
		
		Main.prototype.drow=function(){
			ctx.drawImage(this.img,this.imageX,this.imageY,this.width,this.height,this.x,this.y,this.width,this.height);
		};
		
		Main.prototype.moveTo=function(x,y){
			this.x=x;
			this.y=y;
		};
		
		Main.prototype.move=function(x,y){
			this.x+=x;
			this.y+=y;
		};
		
		return Main;
	})();
	
	
	
	//--------> 画像オブジェクト <--------
	//  
	//  スプライトに登録する用の画像オブジェクト
	//  
	let ImageObject=(function(){
		let Main=function(imgobj){
			this.obj=imgobj;
			
		};
		
		return Main;
	})();
	
	
	
	
	
	let keyArray=[];
	
	document.onkeydown=function(e){
		// console.log(e.keyCode);
		keyArray[e.keyCode]=true;
	};
	
	document.onkeyup=function(e){
		// console.log(e.keyCode);
		keyArray[e.keyCode]=false;
	};
	
	
	Main.prototype.getKey=function(key){
		if(keyArray[key]==true){
			return true;
		}
		return false;
	};
	
	
	
	
	
	return ( new Main() );
})();



document.addEventListener("DOMContentLoaded",function(){
	Game.setUp();
	
	
	
});




let GameImages={};

let KEYS={
	LEFT:37,
	UP:38,
	RIGHT:39,
	DOWN:40,
};





let Load=function(){
	Game.loadImages({
		// a0:"https://dummyimage.com/3000x4000/000/fff",
		// a1:"https://dummyimage.com/3000x4000/000/fff",
		// a2:"https://dummyimage.com/3000x4000/000/fff",
		// a3:"https://dummyimage.com/3000x4000/000/fff",
		// a4:"https://dummyimage.com/3000x4000/000/fff",
		// a5:"https://dummyimage.com/3000x4000/000/fff",
		// a6:"https://dummyimage.com/3000x4000/000/fff",
		// a7:"https://dummyimage.com/3000x4000/000/fff",
		// a8:"https://dummyimage.com/3000x4000/000/fff",
		hoge:"img/miso.png",
		player:"img/player.png",
	});
};

let Init=function(){
	Game.spset("miso",GameImages.player,0,0,16,16);
	
};


let vel_x=0;
let vel_y=0;
let ac=0;
let before_x=0;
let before_y=0;

let Loop=function(){
	
	// if(Game.getKey(KEYS.LEFT)){
		// Game.spmove("miso",-3,0);
	// }
	// if(Game.getKey(KEYS.UP)){
		// if(vel==0){
			// vel=-5;
		// }
		
	// }
	// if(Game.getKey(KEYS.RIGHT)){
		// Game.spmove("miso",3,0);
	// }
	// if(Game.getKey(KEYS.DOWN)){
		// Game.spmove("miso",0,1);
	// }
	
	// ac+=0.015;
	// vel=vel+(ac*ac)/2;
	
	
	// if(Game.spY("miso")>320-64){
		// Game.spmoveto("miso",Game.spX("miso"),320-64);
		// vel=0;
		// ac=0;
	// }
	// Game.spmove("miso",0,vel);
	
	
	
	vel_y+=2;
	if(vel_x>0){
		vel_x--;
	}else if(vel_x<0){
		vel_x++;
	}
	
	
	
	if(vel_x>4){
		vel_x=3;
	}else if(vel_x<-4){
		vel_x=-3;
	}
	
	if(Game.getKey(KEYS.UP)){
		if(before_y==320-16){
			vel_y=-13;
		}
		vel_y--;
	}
	if(Game.getKey(KEYS.RIGHT)){
		vel_x+=2;
	}
	if(Game.getKey(KEYS.LEFT)){
		vel_x-=2;
	}
	
	
	if(before_y+vel_y>320-16){
		vel_y=320-16-before_y;
	}
	
	Game.spmove("miso",vel_x,vel_y);
	
	before_x=Game.spX("miso");
	before_y=Game.spY("miso");
};



