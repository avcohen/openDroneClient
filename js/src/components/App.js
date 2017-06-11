import React, { Component } from 'react';
import MapContainer, { InfoWindow, Marker } from './MapContainer';
import Filters from './Filters';
import Footer from './Footer';
import Header from './Header';

export default class App extends Component {
    constructor(props){
        super(props)
    }
    componentDidMount(){}

    componentWillReceiveProps(){}

    render() {
        return (
            <div>
                <Header {...this.props} />
                <Filters {...this.props} {...this.state} />
                <MapContainer {...this.props} apiKey={"AIzaSyCgnmah1dhhXHZBFOj4z3CTuGxaatp0htE"}>
                    {this.props.markers.map(marker => <Marker {...marker} ></Marker>)}
                </MapContainer>
                <Footer {...this.props} />
            </div>
        );
    }
}
