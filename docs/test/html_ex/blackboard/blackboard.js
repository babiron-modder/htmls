let number=0;
let z_max=1;
let mouse_x=0;
let mouse_y=0;
let move_start_x=0;
let move_start_y=0;
let ob=null;
let is_moveing=false;

window.onload=function(){
	document.body.addEventListener("mousemove", mmove, false);
	document.body.addEventListener("mouseup", mup, false);
}

function mmove(e){
	mouse_x=e.x;
	mouse_y=e.y;
	if(is_moveing){
		ob.style.left=(e.x-move_start_x)+"px";
		ob.style.top=(e.y-move_start_y)+"px";
		
		console.log(move_start_x-e.x);
	}
}

function mup(e){
	is_moveing=false;
}


let BlackBoard=(function(){
	
	let containObj=[];
	let field;
	
	let _BlackBoard=function(){
		
	};
	
	_BlackBoard.prototype.addObj=function(){
		let _obj;
		let _type=document.getElementById("FormType").value;
		field=document.getElementById("BlackBoard");
		
		switch(_type){
			case "box":
				_obj=new BoxObject(100,200);
				break;
			case "line":
				
				break;
		}
		
		field.appendChild(_obj.getObj());
	};
	
	
	return new _BlackBoard();
})();


let inherits = function(childCtor, parentCtor) {
  Object.setPrototypeOf(childCtor.prototype, parentCtor.prototype);
};


let BaseObject=(function(){
	let _BaseObject=function(_obj,_width,_height){
		this.obj=_obj;
		this.width=_width;
		this.height=_height;
		this.x=0;
		this.y=0;
	};
	
	_BaseObject.prototype.setWidth=function(_width){
		this.width=_width;
	};
	
	_BaseObject.prototype.getWidth=function(){
		return this.width;
	};
	
	_BaseObject.prototype.setHeight=function(_height){
		this.height=_height;
	};
	
	_BaseObject.prototype.getHeight=function(){
		return this.height;
	};
	
	_BaseObject.prototype.getObj=function(){
		return this.obj;
	};
	
	return _BaseObject;
})();


let BoxObject=(function(){
	
	let _BoxObject=function(_width,_height){
		
		let _obj=document.createElement("div");
		_obj.style.borderStyle="solid";
		_obj.style.width=_width+"px";
		_obj.style.height=_height+"px";
		_obj.style.position="relative";
		
		_obj.style.zIndex=z_max++;
		// _obj.style.position="absolute";
		// _obj.style.top=150+"px";
		
		_obj.onmousedown=function(e){
			console.log("miso"+(++number));
			
			move_start_x=e.x;
			move_start_y=e.y;
			ob=_obj;
			is_moveing=true;
			
			// z_max++;
		};
		
		BaseObject.call(this,_obj,_width,_height);
	};
	
	inherits(_BoxObject,BaseObject);
	
	return _BoxObject;
})();



