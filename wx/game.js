require('./weapp-adapter.js');
require('./platform.js');
require('./manifest.js');
require('./egret.wxgame.js');

// 启动微信小游戏本地缓存，如果开发者不需要此功能，只需注释即可
// 只有使用 assetsmanager 的项目可以使用
if(window.RES && RES.processor) {
    require('./library/image.js');
    require('./library/text.js');
    require('./library/sound.js');
    require('./library/binary.js');
}
var exportJson = {};
window.wx.login({
  success: (userRes) => {
    exportJson.code = userRes.code;//向服务端传递code用于获取微信小游戏的用户唯一标识
  },
});
let sysInfo = window.wx.getSystemInfoSync();
//获取微信界面大小
let width = sysInfo.screenWidth;
let height = sysInfo.screenHeight;
window.wx.getSetting({
  success(res) {
    console.log(res.authSetting);
    if (res.authSetting["scope.userInfo"]) {
      console.log("用户已授权");
      window.wx.getUserInfo({
        success(res) {
          console.log(res, '登录了');
          exportJson.userInfo = res.userInfo;
          //此时可进行登录操作
          startEgret()
        }
      });
    } else {
      console.log("用户未授权");
      let button = window.wx.createUserInfoButton({
        type: 'text',
        text: '',
        style: {
          left: 0,
          top: 0,
          width: width,
          height: height,
          backgroundColor: '#00000000',//最后两位为透明度
          color: '#ffffff',
          fontSize: 20,
          textAlign: "center",
          lineHeight: height,
        }
      });
      button.onTap((res) => {
        if (res.userInfo) {
          console.log("用户授权:", res);
          exportJson.userInfo = res.userInfo;
          //此时可进行登录操作
          startEgret()
          button.destroy();
        } else {
          console.log("用户拒绝授权:", res);
        }
      });
    }
  }
})
function startEgret() {
  egret.runEgret({
    //以下为自动修改，请勿修改
    //The following is automatically modified, please do not modify
    //----auto option start----
		entryClassName: "Main",
		orientation: "landscape",
		frameRate: 30,
		scaleMode: "fixedWidth",
		contentWidth: 640,
		contentHeight: 1136,
		showFPS: false,
		fpsStyles: "x:0,y:0,size:12,textColor:0xffffff,bgAlpha:0.9",
		showLog: false,
		maxTouches: 2,
		//----auto option end----
    renderMode: 'webgl',
    audioType: 0,
    calculateCanvasScaleFactor: function (context) {
        var backingStore = context.backingStorePixelRatio ||
            context.webkitBackingStorePixelRatio ||
            context.mozBackingStorePixelRatio ||
            context.msBackingStorePixelRatio ||
            context.oBackingStorePixelRatio ||
            context.backingStorePixelRatio || 1;
        return (window.devicePixelRatio || 1) / backingStore;
    }
});
}

// require("egret.min.js")
