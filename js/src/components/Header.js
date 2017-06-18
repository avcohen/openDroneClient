import React, { Component } from 'react';
import { Menu } from 'semantic-ui-react';

export default class Header extends Component {
    state = {
        activeMenuItem : null,
        menuItems : [
            { key: 'map', name: 'map view' },
            { key: 'listview', name: 'list view' },
            { key: 'about', name: 'about' },
        ],
    }

    _renderMenuItems(){
        return (
            this.state.menuItems.map((menuItem) =>

                <Menu.Item
                    name={menuItem.key}
                    active={this.state.activeMenuItem === menuItem.key}
                    onClick={this.handleItemClick}
                >
                    {menuItem.name}
                </Menu.Item>
            )
        )
    }

    render() {
        const { activeMenuItem } = this.state;




        return (
            <Menu stackable>
                <Menu.Item>
                    <img src='assets/drone.png' />
                </Menu.Item>
                {this._renderMenuItems()}
            </Menu>
        );
    }
}
