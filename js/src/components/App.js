import React, { Component } from 'react';
import Filters from './Filters';
import Footer from './Footer';
import FilterMenu from './FilterMenu';
import Header from './Header';
import MapContainer from './MapContainer';
import { Menu, Sidebar } from 'semantic-ui-react';

// make filters component parent of MapContainer and future ListContianer??

const apiKey = 'AIzaSyCgnmah1dhhXHZBFOj4z3CTuGxaatp0htE';

export default class App extends Component {
    constructor(props){
        super(props)
    }


    render() {
        return (
            <div>
                <Header {...this.props} />
                <FilterMenu {...this.props} />
                <Sidebar.Pushable>
                    <Sidebar as={Menu} animation='push' direction='top' visible={this.props.filterMenuVisible}>
                        <Filters {...this.props} />
                    </Sidebar>
                    <Sidebar.Pusher>
                        <MapContainer {...this.props} apiKey={apiKey} />
                    </Sidebar.Pusher>
                </Sidebar.Pushable>
                <Footer {...this.props} />
            </div>
        );
    }
}

//
