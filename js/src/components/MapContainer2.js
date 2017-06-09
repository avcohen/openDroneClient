import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import request from 'superagent';

export default class MapContainer extends Component {

    state = {
        searchQuery : null,
        searchResults : null,
        center : { lat: 35.996023, lng: 36.784644 },
        displayAll : true
    }

    constructor(props){
        super(props)
        this.props.dispatch('FETCH_ALL_DATA', this.state)

    }

    componentWillMount(){
    }

    componentDidMount(){
        this.map = new google.maps.Map(this.refs.map, {
            zoom : 4,
            center : this.state.center
        })

        this.marker = new google.maps.Marker({
            position : {lat: 35.996023, lng: 36.784644},
            map : this.map
        })

        const root = ReactDOM.findDOMNode(this.refs.root);
        const node = ReactDOM.findDOMNode(this.refs.shim);

        root.addEventListener('mouseenter', () => {
            setTimeout(() => {
                node.style.zIndex = -1;
                node.style.cursor = 'initial';
            }, 2000)
        });

        root.addEventListener('mouseleave', () => {
            node.style.zIndex = 2;
            node.style.cursor = 'wait';
        });
    }



    render() {
        const mapStyle = {
            width : "100%",
            height : "600px",
        }
        const parStyles = Object.assign({}, {
            position: 'relative'
        }, this.mapStyle);

        const shimStyles = {
            position: 'absolute',
            zIndex: 2,
            height: '100%',
            width: '100%',
            top: 0,
            left: 0,
            cursor: 'wait',
        }
        return (
            <div ref="root" style={parStyles}>
                <div ref="shim" style={shimStyles}></div>
                <div id="droneMap" ref="map" style={mapStyle}></div>
            </div>
        );
    }
}
