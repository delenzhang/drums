class ScrollerItem extends eui.ItemRenderer {
	public rolename_id :eui.Label;
	public flag :boolean
	public select_id: eui.Rect
	public constructor() {
		super();
		this.skinName ="resource/game/ScrollerItem.exml";
	}

	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}


	protected childrenCreated():void
	{
		super.childrenCreated();
	}
	 protected dataChanged():void{
		 let currentItem = Common.data[GameScene.selectedIndex]
		 if (JSON.stringify(this.data) === JSON.stringify(currentItem)) {
			 this.flag = true
			 this.select_id.visible = true
		 } else {
			 this.flag = false
			 this.select_id.visible = false
		 }
		 this.rolename_id.text = this.data.name;
	 }
}