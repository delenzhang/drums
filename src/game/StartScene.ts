class StartScene extends Scene {
		public btn_tc: eui.Label;//弹出层按钮
		public btn_qh2: eui.Label;//切换场景


		public constructor() {
			super();
			this.skinName = "resource/game/StartScene.exml";
		}
		banerHight=200
		protected onComplete() {
			// this.btn_tc.touchEnabled = true;
			// this.btn_qh2.touchEnabled = true;
			this.drawStart()
			// this.btn_tc.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTaptc, this);
			// this.btn_qh2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTapqiehuan, this);
		}
		static system=null
		private context:egret.Sprite = new egret.Sprite();
		private async drawStart() {
			let stageW = this.stage.stageWidth;
			let stageH = this.stage.stageHeight;

			let topMask = new egret.Shape();
			topMask.graphics.beginFill(0x000000, 0.5);
			topMask.graphics.drawRect(0, 0, stageW, this.banerHight*1.5);
			topMask.graphics.endFill();
			topMask.y = 33;
			this.context.addChild(topMask);


			let colorLabel = new egret.TextField();
			colorLabel.textColor = 0xffffff;
			colorLabel.width = stageW;
			colorLabel.textAlign = egret.HorizontalAlign.CENTER;
			colorLabel.text = "通用架子鼓模拟";
			colorLabel.size = 48;
			colorLabel.x = 0;
			colorLabel.y = 80;
			this.context.addChild(colorLabel);

			let textfield = new egret.TextField();
			this.context.addChild(textfield);
			textfield.alpha = 0;
			textfield.width = stageW - 240;
			textfield.textAlign = egret.HorizontalAlign.LEFT;
			textfield.size = 32;
			textfield.textColor = 0xffffff;
			textfield.x = 220;
			textfield.y = 180;
			this.textfield = textfield;

			let button = new eui.Button();
			button.label = "开始游戏";
			button.horizontalCenter = 0;
			// button.verticalCenter = 0;
			button.y = stageH/3*2;
			this.context.addChild(button);
			button.x = (stageW-100) /2;
			button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
			const result = await RES.getResAsync("description_json")
			this.startAnimation(result);
			this.context.cacheAsBitmap = true
			this.addChild(this.context)
			
		}
		static gameScene = null
		private onTapqiehuan(){
			if (StartScene.gameScene ==null) {
				StartScene.gameScene = new GameScene();
			} else {
				StartScene.gameScene.startScene(true)
			}
			//切换到第二个场景
			SceneManager.Instance.changeScene(StartScene.gameScene);
		}
		 /**
     * 描述文件加载成功，开始播放动画
     * Description file loading is successful, start to play the animation
     */
		private textfield: egret.TextField;
		private startAnimation(result: Array<any>): void {
			let parser = new egret.HtmlTextParser();

			let textflowArr = result.map(text => parser.parse(text));
			let textfield = this.textfield;
			let count = -1;
			let change = () => {
				count++;
				if (count >= textflowArr.length) {
					count = 0;
				}
				let textFlow = textflowArr[count];

				// 切换描述内容
				// Switch to described content
				textfield.textFlow = textFlow;
				let tw = egret.Tween.get(textfield);
				tw.to({ "alpha": 1 }, 200);
				tw.wait(2000);
				tw.to({ "alpha": 0 }, 200);
				tw.call(change, this);
			};

			change();
		}
		/**
		 * 点击按钮
		 * Click the button
		 */
		private async onButtonClick(e: egret.TouchEvent) {
			// let panel = new eui.Panel();
			// panel.title = "Title1122";
			// panel.horizontalCenter = 0;
			// panel.verticalCenter = 0;
			// this.addChild(panel);
			this.onTapqiehuan()
			await platform.login();
			const userInfo = await platform.getUserInfo();
			console.log(userInfo);
		}
}