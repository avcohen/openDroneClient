import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import request from 'superagent';
import { Card , Icon, Sidebar } from 'semantic-ui-react';
import { generateRandomFunc, paramify, loadGMapScript, loadMap } from '../util/util';

export default class MapContainer extends Component {

	constructor(props){
		super(props);
		this.state = {
			filtered : false,
			mapLoaded : false,
			markersLoaded : false,
			mapUrl : 'https://maps.googleapis.com/maps/api/js'
		};
	};

    _wrapStyle = {
        position: 'relative',
        width : "100%",
        height : "600px",
    };

    _shimStyles = {
        position: 'absolute',
        height: '100%',
        width: '100%',
        top: 0,
        left: 0,
        cursor: 'wait',
    };

    _loadMap() {
        const { mapUrl} = this.state;
        const { center, apiKey } = this.props;
        loadGMapScript(mapUrl, {key: apiKey})
            .then(_ => this.map = loadMap(this.refs.map, {
                center,
            }))
			.then(_ => this._loadMarkers())
            .then(_ => this.setState({
                mapLoaded: true,
            }))
    };
	_markerConstructor(markerArray){
		markerArray.forEach((strike, i) => {
			if (!this.map) return;
			const strikePosition = { lat : strike.lat , lng : strike.lng }

			const marker = new google.maps.Marker({
				strikeData : {
					country : strike.country,
					date : strike.date,
					description : strike.description,
					kills : strike.kills,
					coords : { lat : strike.lat , lng : strike.lng },
					l1 : strike.l1 ? strike.l1 : undefined,
					l2 : strike.l2 ? strike.l2 : undefined,
					l3 : strike.l3 ? strike.l3 : undefined,
					l4 : strike.l4 ? strike.l4 : undefined,
				},
				position : { lat : strike.lat, lng : strike.lng },
				map : this.map,
			});

			const htmlLinkConstructor = (currMarker) => {
				let html = '';
				const linkArray = [];

				for(let i = 1; i < 5 ; i++){
					if ( currMarker.strikeData[`l${i}`]){
						linkArray.push(currMarker.strikeData[`l${i}`])
					}
				}

				linkArray.forEach((link, i) => {
						console.log(link)
						console.log(i)
						//old <div class="item"><a href=${link} target="_blank">Link ${i+1}</a></div>
						html += `
							<div class="ui horizontal list">
								<div class="item"><a href=${link} target="_blank">Link ${i+1}</a></div>
							</div>
						`
				})


				return html
			}

// old
			// <div class="summary">${marker.strikeData.country}</div>
			// <div class="summary">Date : ${marker.strikeData.date}</div>
			// <div class="summary">Casualties : ${marker.strikeData.kills}</div>
			// <div class="summary">Details : ${marker.strikeData.description}</div>
			// <div class="summary">Coords : ${marker.strikeData.coords.lat.toFixed(5) || 'N/A'} , ${marker.strikeData.coords.lng.toFixed(5)}</div>
			// <div class="summary strikeLinks">
			// 	<div class="ui horizontal list">
			// 		${htmlLinkConstructor(marker)}
			// 	</div>
			// </div>
			//
			const infoWindow = new google.maps.InfoWindow({
				content : `
					<div class="ui card">
						<div class="content">
							<div class="header">${marker.strikeData.country}</div>
							<br>
							<div class="meta">Date : ${marker.strikeData.date}</div>
							<div class="meta">Casualties : ${marker.strikeData.kills}</div>
							<div class="meta">Coords : ${marker.strikeData.coords.lat.toFixed(5) || 'N/A'} , ${marker.strikeData.coords.lng.toFixed(5)}</div>
							<div class="description">${marker.strikeData.description}</div>
						</div>
						<div class="extra content">
							${htmlLinkConstructor(marker)}
						</div>
					</div>
				`,





			});

			marker.addListener('click', () => {
				if (this.currentOpenWindow) {
					this.currentOpenWindow.close();
					this.currentOpenWindow = null;
				}
				this.infoWindows[i].open(this.map , marker);
				this.currentOpenWindow = this.infoWindows[i];
			})

			this.markers.push(marker)
			this.infoWindows.push(infoWindow)
		})
	}

	_loadMarkers(props = this.props) {
		const {cachedResults, filteredResults , filterLayers, displayAll } = props;

		// clear markers from maps
		if (this.markers && this.markers.length) {
			this.markers.forEach(marker => marker.setMap(null))
		}

		// containers for markers to be returned from data sets then pushed to map;
		this.markers = [];
		this.infoWindows = [];
		this.currentOpenWindow = null;

		if (props.displayAll) {
			const dataToLoad = (filteredResults.length === 0) ? cachedResults : filteredResults;
			this._markerConstructor(dataToLoad)
		}

		filterLayers.map((filterLayer, i) => {
			// add regex to allow inclusion of 'all' among year, country, etc..
			const filteredData = cachedResults.filter((r) => {
				const year = new Date(r.date.toString());
				const fullYear = year.getFullYear();
				return 	r.country.toLowerCase() === filterLayer.country
						&& fullYear  === filterLayer.year
			})
			this._markerConstructor(filteredData);
		})
	};

    _initShimLogic() {
        const root = ReactDOM.findDOMNode(this.refs.root);
        const node = ReactDOM.findDOMNode(this.refs.shim);
        let timeout = null;
        root.addEventListener('mouseenter', () => {
            clearTimeout(timeout)
            timeout = setTimeout(() => {
                node.style.zIndex = -1;
                node.style.cursor = 'initial';
            }, 500)
        });
        root.addEventListener('mouseleave', () => {
            clearTimeout(timeout)
            node.style.zIndex = 2;
            node.style.cursor = 'wait';
        });
    };

    componentDidMount(){
        this._initShimLogic();
		this._loadMap();
    };

	componentWillReceiveProps(nextProps) {

		if (this.props.filteredResults.length !== nextProps.filteredResults.length
			|| this.props.filterLayers.length !== nextProps.filterLayers.length
			|| this.props.displayAll !== nextProps.displayAll
			) {
				this._loadMarkers(nextProps);
		}
	};

    render(){
        const { _wrapStyle , _shimStyles } = this
        return (
            <div ref="root" style={ _wrapStyle }>
				<div ref="shim" style={ _shimStyles }></div>
                <div id="droneMap" ref="map" style={ _wrapStyle }></div>
				{this.renderMarkers()}
            </div>
        );
    };

	renderMarkers(){
			const {mapLoaded} = this.state;
			if (!mapLoaded) return null;
			const {children} = this.props;
			const {Children, cloneElement} = React;
			return Children.map(children, (child) => cloneElement(child, {
				mapLoaded: true,
				map: this.map,
			}))
	};
}
