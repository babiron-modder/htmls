//久々すぎて書き方を完全に忘れていたでござる

let Reversi=(function(){
	
	//面倒だからfreezeはしてないからそこんとこよろしく
	
	//stoneType
	const stoneType={
		BLANK_SPACE:-1,
		BLACK_STONE:0,
		WHITE_STONE:1,
	};
	
	//stoneIcon
	const stoneIcon={
		BLANK_SPACE:" ",
		BLACK_STONE:"●",
		WHITE_STONE:"〇",
	};
	
	//turnType
	const turnType={
		BLACK_TURN:0,
		WHITE_TURN:1,
	};
	
	
	let _current_turn=turnType.BLACK_TURN;
	
	function _startGame(){
		
	}
	
	
	function _setField(){
		//let game_field=document.getElementById("game");
	}
	
	function _drowField(){
		
	}
	
	
	//----------------------------------------------------------------
	//               サブのオブジェクト
	//----------------------------------------------------------------
	
	let Player=(function(){
		let _Player=function(_stoneType){
			this.stoneType=_stoneType;
		};
		
		_Player.prototype.putStone=function(_x,_y){
			GameRule.putStone(_x,_y);
		};
		
		return _Player;
	})();
	
	
	
	//ゲームのルールオブジェクト
	//フィールド配置、ゲームのルールの処理
	let GameRule=(function(){
		_GameRule=function(){
			this.cuurentStoneIcon=stoneIcon.BLACK_STONE;
			this.cuurentStoneType=stoneType.BLACK_STONE;
			
			this.gameField=[];
			
			this.puttableArea=[];
		};
		
		//8x8のフィールドを生成
		_GameRule.prototype.createField=function(){
			let i,j;
			let tmp;
			
			this.gameField=[];
			
			for(i=0;i<8;i++){
				tmp=[];
				for(j=0;j<8;j++){
					tmp.push(new StoneSpace());
				}
				this.gameField.push(tmp);
			}
			
		};
		
		//石を座標に置く
		_GameRule.prototype.putStone=function(_x,_y){
			let i;
			let go_flag=false;
			
			for(i=0;i<this.puttableArea.length;i++){
				if(_x==this.puttableArea[i][0] && _y==this.puttableArea[i][1]){
					go_flag=true;
					break;
				}
			}
			
			if(!go_flag)
				return;
			
			this.gameField[_x][_y].setStone(new Stone(this.cuurentStoneType,this.cuurentStoneIcon));
			
		};
		
		
		//ある方向のコンボを計測
		_GameRule.prototype.checkCombo=function(_x,_y,_step_x,_step_y,_turn){
			let count=0;
			let checked_stone;
			let stone_array=[];
			let i;
			
			while(true){
				_x+=_step_x;
				_y+=_step_y;
				
				if( _x==-1 || _x==8 || _y==-1 || _y==8 )
					break;
				
				checked_stone_type=this.gameField[_x][_y].getStoneType();
				
				if(checked_stone_type==stoneType.BLANK_SPACE){
					break;
				}else if(checked_stone_type!=this.cuurentStoneType){
					count++;
					stone_array.push(this.gameField[_x][_y].stone);
					
				}else if(checked_stone_type==this.cuurentStoneType){
					if(count==0){
						break;
					}
					
					if(_turn){
						for(i=0;i<count;i++){
							stone_array[i].turnStone();
						}
					}
					return true;
				}
			}
			
			return false;
		}
		
		
		//石をひっくり返す
		_GameRule.prototype.turnStone=function(_x,_y){
			let step_x,step_y;
			
			for(step_x=-1;step_x<2;step_x++){
				for(step_y=-1;step_y<2;step_y++){
					
					if(step_x==0 && step_y==0)
						continue;
					
					this.checkCombo(_x,_y,step_x,step_y,true);
					
				}
			}
			
		}
		
		
		//すべての置ける場所を洗い出してマーキング
		_GameRule.prototype.checkPuttableSpaces=function(){
			let step_x,step_y;
			let i,j;
			
			for(i=0;i<8;i++){
				for(j=0;j<8;j++){
					
					for(step_x=-1;step_x<2;step_x++){
						for(step_y=-1;step_y<2;step_y++){
							
							if(step_x==0 && step_y==0)
								continue;
							
							if(this.checkCombo(_x,_y,step_x,step_y,false)){
								this.gameField[i][j].setHighLight();
								this.gameField[i][j].setClickFunc(function(){
									//
									//
									//
									//    飽きたからここでやめる
									//
									//
									//
								});
							}
							
						}
					}
					
				}
			}
			
			
			
		};
		
		
		//描画処理
		_GameRule.prototype.drowField=function(){
			
		};
		
		
		//ターンを一つ経過
		_GameRule.prototype.countTurn=function(){
			
		};
		
		
		
		return _GameRule;
	})();
	
	
	
	// 継承関数
	let inherits=function(_childConstructor,_parentConstructor){
		Object.setPrototypeOf(_childConstructor.prototype,_parentConstructor.prototype);
	};
	
	
	//石を置くスペースのオブジェクト (石から継承すべき？そっちのほうが楽？)
	//主に描画担当、BlankStoneで初期化
	let StoneSpace=(function(){
		
		let _StoneSpace=function(){
			
		// let _StoneSpace=function(x,y){
			// this.x=x;
			// this.y=y;
			
			this.stone=new BlankStone();
			
			this.element=document.createElement("th");
		};
		
		_StoneSpace.prototype.setStone=function(_stone){
			this.stone=_stone;
		};
		
		_StoneSpace.prototype.getStoneType=function(){
			return this.stone.getStoneType();
		};
		
		
		// ここから描画とかクリック処理
		_StoneSpace.prototype.drowStone=function(){
			this.element.textContent=this.stone.getStoneIcon();
		};
		
		_StoneSpace.prototype.setHighLight=function(){
			this.element.classList.add("canPut");
		};
		
		_StoneSpace.prototype.removeHightLight=function(){
			this.element.classList.remove("canPut");
		};
		
		_StoneSpace.prototype.setClickFunc=function(func){
			this.element.onclick=func;
		};
		
		
		return _StoneSpace;
	})();
	
	
	
	
	//空白の石。初期状態ですべてのマスに置かれていると考える
	let BlankStone=(function(){
		
		let _BlankStone=function(){
			this.stoneType=stoneType.BLANK_SPACE;
			this.stoneIcon=stoneIcon.BLANK_SPACE;
		};
		
		_BlankStone.prototype.getStoneType=function(){
			return this.stoneType;
		};
		
		_BlankStone.prototype.getStoneIcon=function(){
			return this.stoneIcon;
		};
		
		_BlankStone.prototype.turnStone=function(){};
		
		return _BlankStone;
	})();
	
	
	//BlankStoneを継承した石オブジェクト
	let Stone=(function(){
		
		let _Stone=function(stoneType,stoneIcon){
			BlankStone.call(this); //callする意味があるかと言われたら「ない」と答える
			this.stoneType=stoneType; //謎のオーバーライドをしているため、継承と呼べるかどうかは謎
			this.stoneIcon=stoneIcon; //iconを分ける必要があるかと言われたら「一応」と答える
		};
		
		inherits(_Stone,BlankStone);
		
		//オーバーライド
		_Stone.prototype.turnStone=function(){
			
			if(this.stoneType==stoneType.BLACK_STONE){
				this.stoneType=stoneType.WHITE_STONE;
			}else if(this.stoneType==stoneType.WHITE_STONE){
				this.stoneType=stoneType.BLACK_STONE;
			}
			
		};
		
		return _Stone;
	})();
	
	return {
		startGame:_startGame,
	};
})();






