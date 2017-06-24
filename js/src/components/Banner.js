import React, { Component } from 'react';
import Counter from './Counter';
import { Menu, Header , Image } from 'semantic-ui-react';

export default class Banner extends Component {
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
                <Header as='h1'>
                <Image src='assets/drone.png' avatar/>
                    <Header.Content>
                    Dronemappr
                    </Header.Content>
                </Header>
                <Counter {...this.props} />
            </div>
        );
    }
}
