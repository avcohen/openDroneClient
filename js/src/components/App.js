import React, { Component } from 'react';
import MapContainer from './MapContainer';
import Footer from './Footer';
import Header from './Header';

export default class App extends Component {

    componentDidMount() {}

    componentWillReceiveProps(nextProps){}

    render() {
        return (
            <div>
                <Header {...this.props} />
                <MapContainer {...this.props} />
                <Footer {...this.props} />
            </div>
        );
    }
}
