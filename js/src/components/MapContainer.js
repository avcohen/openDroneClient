import React, { Component } from 'react';
import GoogleApiComponent from 'google-maps-react';

export class MapContainer extends Component {

    render() {
        if(!this.props.loaded){
            return <div>lol still loading</div>
        }
        return (
            <div>le map will live here.</div>
        );
    }
}

export default GoogleApiComponent({
    apiKey : 'AIzaSyCgnmah1dhhXHZBFOj4z3CTuGxaatp0htE'
})(MapContainer)
