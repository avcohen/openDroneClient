import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';

export default class Header extends Component {
    state = {
        menuItems : [
            { key: 'map', name: 'map view' },
            { key: 'listview', name: 'list view' },
            { key: 'about', name: 'about' },
        ],
    }


    render() {
        return (
            <div>
                <Menu items={this.state.menuItems} />
            </div>
        );
    }
}
