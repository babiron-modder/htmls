const black="●";
const white="◯";

let current_turn=0; //0=black, 1=white
let my_turn;


//開始関数
function start(){
	let i,j,k;
	let tr,th;
	
	let main_table=document.getElementById("game");
	
	//盤の生成
	for(i=0;i<8;i++){
		
		tr=document.createElement("tr");
		
		for(j=0;j<8;j++){
			th=document.createElement("th");
			th.id=j+","+i;
			
			tr.appendChild(th);
		}
		
		main_table.appendChild(tr);
	}
	
	//ターンの設定
	my_turn=document.getElementById("turn").selectedIndex;
	
	//初期石
	putStone(4,3,false);
	putStone(3,3,false);
	putStone(3,4,false);
	putStone(4,4,false);
}


//石を置く関数
function putStone(x,y,check){
	
	//おけるかどうかチェック
	if(check){
		if(isPuttable(x,y,false)==0)
			return false;
		isPuttable(x,y,true);
	}
	
	//石を置く
	let hoge=document.getElementById(x+","+y);
	
	hoge.textContent=((current_turn==0)?black:white);
	
	current_turn=((current_turn==1)?0:1);
	
	
	
	
	//おける場所を表示
	let i,j;
	let foo;
	
	for(i=0;i<8;i++){
		for(j=0;j<8;j++){
			if(isPuttable(i,j,false)){
				
				foo=document.getElementById(i+","+j);
				foo.classList.add("canPut");
				foo.onclick=function(){
					let id_name=this.id.split(",");
					
					putStone(id_name[0]*1,id_name[1]*1,true);
					
					console.log(this.id.split(","));
				};
				
			}else{
				
				foo=document.getElementById(i+","+j);
				foo.classList.remove("canPut");
				foo.onclick=null;
				
			}
		}
	}
	
	
	return true;
}


//石を取得する関数
function getStone(x,y){
	let stone=document.getElementById(x+","+y).textContent;
	
	if(stone==black){
		return 0;
	}else if(stone==white){
		return 1;
	}
	
	return -1;
}


//石をひっくり返す関数
function turnStone(x,y){
	let stone=document.getElementById(x+","+y);
	
	if(stone.textContent==black){
		stone.textContent=white;
	}else if(stone.textContent==white){
		stone.textContent=black;
	}
}


//石が置けるかどうか確認する関数（trueをいれるとひっくり返る）
function isPuttable(x,y,turn){
	let step_x,step_y;
	
	//石が置いてあったらカエレ
	if(getStone(x,y)!=-1)
		return false;
	
	//調べる方向を決定
	for(step_x=-1;step_x<2;step_x++){
		for(step_y=-1;step_y<2;step_y++){
			
			if(step_x==0 && step_y==0)
				continue;
			
			if(hasCombo(x,y,step_x,step_y,turn))
				return true;
			
		}
	}
	
	return false;
}

//連鎖があるか（trueをいれるとひっくり返る）
function hasCombo(x,y,step_x,step_y,turn){
	let count=0;
	let checked_stone;
	let stone_array=[];
	let i;
	
	while(true){
		x+=step_x;
		y+=step_y;
		
		if( x==-1 || x==8 || y==-1 || y==8 )
			break;
		
		checked_stone=getStone(x,y);
		
		if(checked_stone==-1){
			break;
		}else if(checked_stone!=current_turn){
			count++;
			stone_array.push([x,y]);
			
			
		}else if(checked_stone==current_turn){
			if(count==0){
				break;
			}
			
			if(turn){
				for(i=0;i<count;i++){
					turnStone(stone_array[i][0],stone_array[i][1]);
					// alert(stone_array[i][0]+" "+stone_array[i][1]);
				}
			}
			return true;
		}
		
	}
	
	return false;
	
}











