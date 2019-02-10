class EndScene extends Scene {
	public btn_fh:eui.Label;
    private score_id: eui.Label
	private end_help_id: eui.Label
	public constructor() {
		super();
		this.skinName = "resource/game/EndScene.exml";
	}
	protected onComplete() {
		this.btn_fh.touchEnabled = true;
		this.btn_fh.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTapqiehuan, this);
	}
	setScore(text, name) {
		let _names = name.split('')
		let _sceretname = []
		for(let i = 0, l= _names.length;i<l;i++) {
			if (i==0) {
				_sceretname.push(_names[i])
			} else {
				_sceretname.push('*')
			}
		}
		this.score_id.text = text
		this.end_help_id.text = `歌曲《${_sceretname.join('')}》，一不小心打败了你呢！`
	}
	private onTapqiehuan() {
		let s1:StartScene =  new StartScene();
		//切换回最开始的场景
        SceneManager.Instance.changeScene(s1);
	}
}