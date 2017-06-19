import React, { Component } from 'react';
import { Menu, Icon} from 'semantic-ui-react';

export default class Header extends Component {
    state = {
        activeMenuItem : null,
        menuItems : [
            { key: 'map', name: 'map view' },
            { key: 'listview', name: 'list view' },
            { key: 'about', name: 'about' },
        ],
    }


    _setActiveMenuItem(e){
        console.log('here', e, name )
        e.preventDefault();
    }

    _renderMenuItems(){
        return (
            this.state.menuItems.map((menuItem) =>
                <Menu.Item
                    name={menuItem.key}
                    active={this.state.activeMenuItem === menuItem.key}
                    onClick={this._setActiveMenuItem}
                >
                    {menuItem.name}
                </Menu.Item>
            )
        )
    }

    render() {
        const { activeMenuItem } = this.state;

        return (
            <div>
                <h1>Dronemappr</h1>
                <Menu>
                    <Menu.Item>
                        <img src='assets/drone.png' />
                    </Menu.Item>
                    {this._renderMenuItems()}
                    <Menu.Menu position='right'>
                        <Menu.Item>
                            <Icon name='content' />
                        </Menu.Item>
                    </Menu.Menu>
                </Menu>
            </div>
        );
    }
}
