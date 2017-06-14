import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import request from 'superagent';


const generateRandomFunc = (functionRoot, cb = function(){}) => {
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

const paramify = params => Object.keys(params)
	.map(key => [key, params[key]].join('='))
	.join('&');

const loadGMapScript = (url, params) => {
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

const loadMap = (domNode, options = {}) => new google.maps.Map(domNode, Object.assign({
	zoom: 3,
}, options));



export default class MapContainer extends Component {

	constructor(props){
		super(props);
		console.log('fetching all data from api')
		this.props.dispatch('FETCH_ALL_DATA');

	}

    state = {
        mapLoaded : false,
		markersLoaded : false,
        mapUrl : 'https://maps.googleapis.com/maps/api/js'
    }

    _wrapStyle = {
        position: 'relative',
        width : "100%",
        height : "600px",
    }

    _shimStyles = {
        position: 'absolute',
        zIndex: 2,
        height: '100%',
        width: '100%',
        top: 0,
        left: 0,
        cursor: 'wait',
    }

    _loadMap() {
		// console.log(this.props)
        const { mapUrl} = this.state;
        const { center, apiKey } = this.props;
		// console.log(center, apiKey)
        loadGMapScript(mapUrl, {key: apiKey})
            .then(_ => this.map = loadMap(this.refs.map, {
				// options
                center,
            }))
			.then(_ => this._loadMarkers())
			// .then(_ => this._loadInfoWindows())
            .then(_ => this.setState({
                mapLoaded: true,
            }))
    }


	_loadMarkers() {
		console.log('loading markers', this.props);
		this.markers = [];
		this.infoWindows = [];
		this.currentOpenWindow = null;
		this.props.cachedResults.forEach((strike, i) => {
			if (!this.map) return;
			setTimeout(() => {
				const marker = new google.maps.Marker({
					strikeData : {
						country : strike.country,
						date : strike.date,
						kills : strike.kills,
						coords : { lat : strike.lat , lng : strike.lon }
					},
					position : { lat : strike.lat, lng : strike.lon },
					map : this.map,
					animation: google.maps.Animation['DROP']
				});

				const infoWindow = new google.maps.InfoWindow({
					content : `
						<h3>Location : ${marker.strikeData.country}</h3>
						<h5>Date : ${marker.strikeData.date}</h5>
						<h5>Kills : ${marker.strikeData.kills}</h5>
						<h5>Coords : ${marker.strikeData.coords.lat} , ${marker.strikeData.coords.lng} </h5>
						<h5>
							<ul class="strikeLinksList">
								<li class="strikeLink"><a href="#" target="_blank">Link</a></li>
								<li class="strikeLink"><a href="#" target="_blank">Link</a></li>
								<li class="strikeLink"><a href="#" target="_blank">Link</a></li>
							</ul>
						</h5>
					`,
				});

				marker.addListener('click', () => {
					if (this.currentOpenWindow) {
						console.log('currentOpenWindow', this.currentOpenWindow)
						this.currentOpenWindow.close();
						this.currentOpenWindow = null;
					}

					console.log('infoWindows')
					this.infoWindows[i].open(this.map , marker);
					this.currentOpenWindow = this.infoWindows[i];
				})

				this.markers.push(marker)
				this.infoWindows.push(infoWindow)
			}, i * 10)
		})
	}

    _initShimLogic() {
        const root = ReactDOM.findDOMNode(this.refs.root);
        const node = ReactDOM.findDOMNode(this.refs.shim);
        let timeout = null;
        root.addEventListener('mouseenter', () => {
            clearTimeout(timeout)
            timeout = setTimeout(() => {
                node.style.zIndex = -1;
                node.style.cursor = 'initial';
            }, 2000)
        });
        root.addEventListener('mouseleave', () => {
            clearTimeout(timeout)
            node.style.zIndex = 2;
            node.style.cursor = 'wait';
        });
    }

    componentDidMount(){
        this._loadMap();
        this._initShimLogic();
    }

	componentWillReceiveProps(nextProps) {
		// this._loadMarkers(nextProps)
		// why need this?
	}

    render(){
        const { _wrapStyle , _shimStyles } = this
        return (
            <div ref="root" style={ _wrapStyle }>
                <div ref="shim" style={ _shimStyles }></div>
                <div id="droneMap" ref="map" style={ _wrapStyle }></div>
				{this.renderMarkers()}
            </div>
        );
    }

	renderMarkers(){
			const {mapLoaded} = this.state;
			if (!mapLoaded) return null;
			// console.log(this.props.children)
			const {children} = this.props;
			const {Children, cloneElement} = React;
			return Children.map(children, (child) => cloneElement(child, {
				mapLoaded: true,
				map: this.map,
			}))
	}
}
