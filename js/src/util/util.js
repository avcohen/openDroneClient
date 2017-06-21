export const generateRandomFunc = (functionRoot, cb = function(){}) => {
	const functionName = `${functionRoot}_${Date.now()}`;
	window[functionName] = (overrideCb = null) => {
		delete window[functionName];
		if (overrideCb) {
			overrideCb();
			return;
		}
		cb();
	}
	return functionName;
};


export const paramify = params => Object.keys(params)
	.map(key => [key, params[key]].join('='))
	.join('&');


export const loadGMapScript = (url, params) => {
	return new Promise((resolve, reject) => {
		const functionName = generateRandomFunc('gmapsCallback', () => {
			resolve(true)
		});

		params = Object.assign({}, params, {
			callback: functionName
		});

		const script = document.createElement('script');
		script.onload = () => window[functionName];
		script.onerror = (e) => window[functionName](() => {
			reject(e);
		});
		script.type = 'text/javascript';
	    script.src = url + '?' + paramify(params);
	    document.body.appendChild( script );
	});
}

export const loadMap = (domNode, options = {}) => new google.maps.Map(domNode, Object.assign({
	zoom: 3,
	streetViewControl : false,
	mapTypeControl: false,
	scaleControl: false,
	rotateControl: false,
	fullscreenControl: false,
}, options));
