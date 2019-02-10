const LifeNum = 3
class GameScene extends Scene {
	static tc;
	private song_name: eui.Label
	private songArray
	private bass_id:eui.Image
	static bass_music;
	private snare_id: eui.Image
	static snare_id_music;
	private floor_id: eui.Image
	static floor_id_music;
	private ltom_id: eui.Image
	static ltom_id_music;
	private stom_id: eui.Image
	static stom_id_music;
	private crash_id: eui.Image
	static crash_id_music;
	private highhit_id: eui.Image
	static highhit_id_music;
	private caicha_id: eui.Image
	static caicha_id_music;
	private ride_id: eui.Image
	static ride_id_music;
	private select_id: eui.Label
	static selectedIndex=0
	static volume = 0.5
	private sound_id;
	private playbtn_id;
	private replay_id;
	private position=0;
	public constructor() {
		super();
		this.skinName = "resource/game/GameScene.exml";
	}
	protected async onComplete() {
		Common.ajax({
			url: Common.domain + '/snowman/data/songConfig.json',
			onSuccess: (r) => {
				try {
				this.songArray = JSON.parse(r)
				this.initScene()
				} catch(e) {
					console.error(e)
				}
				
			}
		})
		// const result = await RES.getResAsync("songConfig_json")
		
	}
	private static lifeComp=null;
	// 初始化游戏舞台， 只会重新开始时执行
	private async initScene() {
		if (!GameScene.tc) {
			GameScene.tc = new Tanchu(this.songArray, GameScene.selectedIndex, this.selectSong.bind(this));
		}
		this.selectSong(GameScene.selectedIndex)
		GameScene.tc.fetchSong(GameScene.selectedIndex)
		this.setVolume(GameScene.volume)
		this.startScene()
		this.bass_id.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.bassClick, this);
		this.bindevent(['snare_id', 'floor_id', 'ltom_id', 'stom_id', 'crash_id',
		'caicha_id', 'highhit_id', 'ride_id'])
		this.select_id.touchEnabled = true
		this.select_id.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTaptc, this);
		this.playbtn_id.addEventListener(egret.TouchEvent.TOUCH_TAP, this.playbtnClick, this);
		this.replay_id.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
			if (Common.sound && Common.sound.channel) {
				Common.sound.channel.stop()
				Common.sound.channel = Common.sound.play(0)
		    }
		}, this);
		this.sound_id.addEventListener(eui.UIEvent.CHANGE, this.changeHandler, this);
	}
	changeHandler(e) {
		this.setVolume(e.target.value/ 100)
	}
	playbtnClick() {
		let play =this.playbtn_id.text === '播放'
		this.playbtn_id.text  = play?'暂停': '播放'
		if (Common.sound && Common.sound.channel) {
			if (play) {
				Common.sound.channel = Common.sound.play(this.position)
			} else {
				this.position = Common.sound.channel.position
				Common.sound.channel.stop()
			}
		}
	}
	bindevent(args) {
		args.forEach(arg => {
			this[arg].addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.shakeClick.bind(this, arg), this);
		})
	}
	bassClick(){
		GameScene.bass_music.play(0, 1);
		this.tweens(this.bass_id)
	}
	shakeClick(arg, e) {
		this[arg].anchorX = 0.5;
        this[arg].anchorY = 0.5;
		GameScene[arg+'_music'].play(0, 1)
		if (arg === 'highhit_id') {
			arg = 'caicha_id'
		}
		this.shake(this[arg])
	}
	// 重新开始或者下一关都会执行, reload 需要初始化所有的状态
	startScene(reload=false){
		if (!GameScene.bass_music) {
			var sound:egret.Sound = RES.getRes("di_gu_mp3");
			GameScene.bass_music = sound
		}
		if (!GameScene.snare_id_music) {
			GameScene.snare_id_music = RES.getRes("snare_mp3");
		}
		if (!GameScene.floor_id_music) {
			GameScene.floor_id_music = RES.getRes("floor_mp3");
		}
		if (!GameScene.ltom_id_music) {
			GameScene.ltom_id_music = RES.getRes("high_tom_tomh_mp3");
		} 
		if (!GameScene.stom_id_music) {
			GameScene.stom_id_music = RES.getRes("low_tom_tomms_mp3");
		}
		if (!GameScene.crash_id_music) {
			GameScene.crash_id_music = RES.getRes("crash_cymbal1_crash_mp3");
		} 
		if (!GameScene.caicha_id_music) {
			GameScene.caicha_id_music = RES.getRes("closed_hi_hat_hlhatcl_loud1r_mp3");
		} 
		if (!GameScene.highhit_id_music) {
			GameScene.highhit_id_music = RES.getRes("openhh_mp3");
		} 
		if (!GameScene.ride_id_music) {
			GameScene.ride_id_music = RES.getRes("ride_cym_mp3");
		} 
	}
	flashTimes = 2
	private shake(obj) {
		let tw = egret.Tween.get(obj)
		tw.to({ scaleX: 1.02,scaleY: 1.02 }, 50, egret.Ease.quadOut).to({ scaleX: 1,scaleY: 1 }, 50, egret.Ease.quadOut)
		tw.call(() => {
				egret.Tween.removeTweens(obj);
				obj.alpha = 1;
		}, this, []);
	}
	private tweens(obj) {
		let tw = egret.Tween.get(obj)
		for(let i = 0; i< this.flashTimes; i++) {
			let time =Math.floor(30/(i+1))
			tw.to({ alpha: 0.9}, time, egret.Ease.quadOut)
			tw.to({ alpha: (1)}, time, egret.Ease.quadIn)
		}
		tw.call(() => {
				egret.Tween.removeTweens(obj);
				obj.alpha = 1;
		}, this, []);
	}
	setVolume(index) {
		GameScene.volume = index;
		this.sound_id.value = index*100
		if (Common.sound && Common.sound.channel) {
			Common.sound.channel.volume = GameScene.volume;
		}
	}
	private selectSong(index) {
		GameScene.selectedIndex = index
		this.song_name.text = this.songArray[GameScene.selectedIndex].name
	}
	//弹出场景
	private onTaptc(){
		SceneManager.Instance.pushScene(GameScene.tc);
	}
	private onTapqiehuan() {
		let s1:EndScene =  new EndScene();
        SceneManager.Instance.changeScene(s1);
	}
}