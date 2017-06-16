import React, { Component } from 'react';
import Filters from './Filters';
import Footer from './Footer';
import Header from './Header';
import MapContainer from './MapContainer';
import { Menu } from 'semantic-ui-react';

// make filters component parent of MapContainer and future ListContianer??
//
export default class App extends Component {
    constructor(props){
        super(props)
    }

    render() {
        return (
            <div>
                <Header {...this.props} />
                <Filters {...this.props} />
                <MapContainer {...this.props} apiKey={"AIzaSyCgnmah1dhhXHZBFOj4z3CTuGxaatp0htE"} />
                <Footer {...this.props} />
            </div>
        );
    }
}
