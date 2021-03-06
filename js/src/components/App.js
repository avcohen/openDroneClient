import React, { Component } from 'react';
import Banner from './Banner';
import Filters from './Filters';
import Footer from './Footer';
import FilterMenu from './FilterMenu';
import MapContainer from './MapContainer';
import { Dimmer, Loader, Menu, Sidebar } from 'semantic-ui-react';

const apiKey = 'AIzaSyCgnmah1dhhXHZBFOj4z3CTuGxaatp0htE';

export default class App extends Component {
    constructor(props){
        super(props)
        this.state = {
            loading : false,
        }
    }

    render() {
        const _sidebarStyle = {
            textAlign : 'left',
            padding : '5px',
        }

        return (
            <div>
            <Dimmer active={this.state.loading} />
                <Banner {...this.props} />
                <FilterMenu {...this.props} />
                <Sidebar.Pushable>
                    <Sidebar style={_sidebarStyle} as={Menu} animation='overlay' direction='top' visible={this.props.filterMenuVisible}>
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
