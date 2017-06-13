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

    state = {
        mapLoaded : false,
		markersLoaded : false,
        mapUrl : 'https://maps.googleapis.com/maps/api/js'
    }

	// marker = null

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
        const {mapUrl} = this.state;
        const {center, apiKey} = this.props;
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
		this.props.markers.forEach((marker) =>{
			const {position, animation} = marker;
			if (!this.map) return;
			this.marker = new google.maps.Marker({
				position,
				map : this.map,
				animation: google.maps.Animation[animation]
			});

			this.infoWindow = new google.maps.InfoWindow({
				content : 'lol',
			})

			this.infoWindow.open(this.map , this.marker);

			// this.infoWindow.addEventListener('click', () => {
			//
			// })

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
        this.props.dispatch('FETCH_ALL_DATA')
        this._loadMap();
        this._initShimLogic();
    }

	componentWillReceiveProps(nextProps) {
		this._loadMarkers(nextProps)
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
