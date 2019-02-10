class Common {
	public constructor() {
	}
	static domain = 'https://www.luofu.site'
	static ajax = (config) => {
		let request = new egret.HttpRequest();
		request.responseType = egret.HttpResponseType.TEXT;
		request.open(config.url, config.method ? egret.HttpMethod[config.method.toUpperCase()] : egret.HttpMethod.GET);
		request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		request.send();
		request.addEventListener(egret.Event.COMPLETE,(event) => {
			 let request = <egret.HttpRequest>event.currentTarget;
			 config.onSuccess && config.onSuccess(request.response)
		}, request);
		request.addEventListener(egret.IOErrorEvent.IO_ERROR, (e) => {
			config.error&&config.error(e)
		}, request);
		request.addEventListener(egret.ProgressEvent.PROGRESS,(e) => {
			config.progress&&config.progress(e)
		},request);
	}
	static sound = null
}
window['Common'] = Common