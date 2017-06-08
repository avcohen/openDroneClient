import React, { Component } from 'react';
import MapContainer2 from './MapContainer2';
import GMaps, { Marker } from './GMaps';
import Filters from './Filters';
import Footer from './Footer';
import Header from './Header';

export default class App extends Component {
    constructor(props){
        super(props)
    }
    componentDidMount(){

    }

    componentWillReceiveProps(){

    }

    render() {
        return (
            <div>
                <Header {...this.props} />
                <Filters {...this.props} />
                <GMaps {...this.props} apiKey={"AIzaSyCgnmah1dhhXHZBFOj4z3CTuGxaatp0htE"} center={{ lat: 35.996023, lng: 36.784644 }}>
                    <Marker position={{lat: 35.996023, lng: 36.784644}} animation="DROP" />
                    <Marker position={{lat: 30.996023, lng: 36.784644}} animation="DROP" />
                </GMaps>
                <Footer {...this.props} />
            </div>
        );
    }
}
