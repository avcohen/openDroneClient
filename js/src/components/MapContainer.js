import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import request from 'superagent';
import { Card , Icon, Sidebar } from 'semantic-ui-react';
import { generateRandomFunc, paramify, loadGMapScript, loadMap } from '../util/util';

export default class MapContainer extends Component {

	constructor(props){
		super(props);
		this.props.dispatch('FETCH_ALL_DATA');
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
        zIndex: 2,
        height: '100%',
        width: '100%',
        top: 0,
        left: 0,
        cursor: 'wait',
    };

    _loadMap() {
		// console.log(this.props)
        const { mapUrl} = this.state;
        const { center, apiKey } = this.props;
		// console.log(center, apiKey)
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
			const marker = new google.maps.Marker({
				strikeData : {
					country : strike.country,
					date : strike.date,
					kills : strike.kills,
					coords : { lat : strike.lat , lng : strike.lon }
				},
				position : { lat : strike.lat, lng : strike.lon },
				map : this.map,
			});


		// Geocoder
		// Needs better loop to pull data, esp if data not present.
		// const geocoder = new google.maps.Geocoder;
		// const formattedAddress = geocoder.geocode({'location' : { lat : parseFloat(strike.lat) , lng : parseFloat(strike.lon) } } , (results, status) =>{
		// 	if (status === 'OK'){
		// 		console.log( results[4].formatted_address )
		// 		return results[4].formatted_address
		// 	}

			const infoWindow = new google.maps.InfoWindow({
				content : `
					<div class="ui card">
						<div class="content">
							<div class="header">Strike Data</div>
						</div>
						<div class="content">
							<h3 class="ui sub header">${marker.strikeData.country}</h3>
							<h3 class="ui sub header">formatted address placeholder</h3>
							<h3 class="ui sub header">Casualties : ${marker.strikeData.kills}</h3>
							<div class="ui small feed">
								<div class="event">
									<div class="content">
										<div class="summary">
											Coords : ${marker.strikeData.coords.lat.toFixed(3)} , ${marker.strikeData.coords.lng.toFixed(3)}
										</div>
									</div>
								</div>
							</div>
						</div>
						<div class="extra content">
							<button class="ui button">Link 1</button>
							<button class="ui button">Link 2</button>
							<button class="ui button">Link 3</button>
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

	/**
	 * _loadMarkers - description
	 *
	 * @param  {type} props = this.props description
	 * @return {type}                    description
	 */

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
		// const dataToLoad = (filteredResults.length === 0) ? cachedResults : filteredResults;
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
		this._loadMap();
        this._initShimLogic();
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
