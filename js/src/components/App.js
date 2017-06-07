import React, { Component } from 'react';
import MapContainer2 from './MapContainer2';
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
                <MapContainer2 {...this.props} />
                <Footer {...this.props} />
            </div>
        );
    }
}
