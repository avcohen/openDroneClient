import React, { Component } from 'react';
import request from 'superagent';

export default class MapContainer extends Component {

    state = {
        searchQuery : null,
        center : { lat : 22.1011879, lng : 6.2820317 },
        displayAll : true
    }

    constructor(props){
        super(props)
        this.props.dispatch('FETCH_ALL_DATA', this.state)
    }

    componentDidMount(){
        let center = {lat: 35.996023, lng: 36.784644};
        this.map = new google.maps.Map(this.refs.map, {
            zoom : 4,
            center
        })

        this.marker = new google.maps.Marker({
            position : {lat: 35.996023, lng: 36.784644},
            map : this.map
        })
    }

    mapStyle = {
        width : "100%",
        height : "600px",
    }



    render() {
        return (
            <div id="droneMap" ref="map" style={this.mapStyle}></div>
        );
    }
}
