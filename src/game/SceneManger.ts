class SceneManager {
	private static _manager:SceneManager;
	public static get Instance(){
		if( SceneManager._manager==null){
			SceneManager._manager = new SceneManager();
		}
		return SceneManager._manager;
	}
	public constructor() {

	}
	public rootLayer:eui.UILayer;//起始场景
	private currentScene:Scene;//需要显示的场景
	private pop_scene:Scene;//弹出场景层
	//切换场景
	public changeScene(s:Scene){
		if(this.currentScene){
			this.rootLayer.removeChild(this.currentScene);
			this.currentScene = null;
		}
		this.rootLayer.addChild(s);
		this.currentScene = s;
	}
	//弹出场景层
	public pushScene(s:Scene){
		this.popScene();
		if(!this.pop_scene){
			this.rootLayer.addChild(s);
			this.pop_scene = s;
		}
	}
	//关闭场景层
	public popScene(){
		if(this.pop_scene){
			this.rootLayer.removeChild(this.pop_scene);
			this.pop_scene = null;
		}
	}
	public removeAllChildNum2(_dis): number {
		if (egret.is(_dis, "egret.DisplayObjectContainer") == false) {
			return
		}
		var childNum = _dis.numChildren;
		console.log(childNum, _dis)
		for (var i: number = 0; i < childNum; i++) {
			let child =  _dis.getChildAt(i)
			_dis.removeChild(child)
			this.removeAllChildNum2(child);
		}
	}
}