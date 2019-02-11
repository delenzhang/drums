class Tanchu extends Scene{
	public btn_close:eui.Label;
    private game_list_scroller: eui.Scroller
	private verticalScrollBar: eui.VScrollBar
	private list;
	private datalist;
	private selectedIndex = 0;
	private fn
	public constructor(data, selectedIndex, fn) {
		super();
		this.datalist = data
		Common.data = data
		this.selectedIndex = selectedIndex
		this.fn = fn
		this.skinName = "resource/game/tanchu.exml";
	}
	protected onComplete() {
		this.btn_close.touchEnabled = true;
		this.btn_close.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTapclose, this);
		this.game_list_scroller.verticalScrollBar = this.verticalScrollBar;
		this.game_list_scroller.scrollPolicyH = eui.ScrollPolicy.OFF;
		this.game_list_scroller.addEventListener(egret.Event.CHANGE, this.onScrollerChange, this);
		this.setDate()
	}
	onScrollerChange(){
		let scrollV = this.game_list_scroller.viewport.scrollV;
        let thumbY = Math.abs(scrollV) / (this.game_list_scroller.viewport.measuredHeight - this.game_list_scroller.height);
        this.verticalScrollBar.thumb.y = thumbY * (this.verticalScrollBar.height - this.verticalScrollBar.thumb.height);
	}
	setDate() {
        var list = new eui.List();
        list.dataProvider = new eui.ArrayCollection(this.datalist);
		list.selectedIndex = this.selectedIndex;
        list.itemRenderer = ScrollerItem;
		this.list = list
		this.game_list_scroller.viewport = list;
		list.addEventListener(eui.ItemTapEvent.ITEM_TAP,this.onChange,this);
	}
	private onTapclose() {
		SceneManager.Instance.popScene();
	}
	private onChange(e:eui.PropertyEvent):void{
        //获取点击消息
		 for(let i = 0;i<this.list.$children.length;i++){
			 if (this.list.selectedIndex ===i) {
				 this.list.$children[i]['select_id'].visible = true
			 } else {
				 this.list.$children[i]['select_id'].visible = false
			 }
        }
		this.fetchSong(this.list.selectedIndex)
		this.fn&&this.fn(this.list.selectedIndex)
    }
    fetchSong(index){
		let currentItem = this.datalist[index]
		if (Common.sound && Common.sound.channel) {
			Common.sound.channel.stop()
			Common.sound.close()
		} else {
			var sound:egret.Sound = new egret.Sound();
			sound.addEventListener(egret.Event.COMPLETE, (event:egret.Event) => {
				Common.sound.channel = sound.play();
				Common.sound.channel.volume = GameScene.volume;
			}, this);
			sound.addEventListener(egret.IOErrorEvent.IO_ERROR, function loadError(event:egret.IOErrorEvent) {
				console.log("loaded error!");
			}, this);
			Common.sound = sound
		}
		Common.sound.load(Common.domain + currentItem.url);
	}
}