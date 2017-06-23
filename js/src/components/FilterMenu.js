import React, { Component } from 'react';
import Counter from './Counter';
import { Menu, Icon } from 'semantic-ui-react';

export default class FilterMenu extends Component {

    constructor(props){
        super(props);
        this.state = {
            filterMenuVisible : false,
            layerMenuVisible : false,
        };
    };

    _toggleAll = (e) => {
        this.props.dispatch('DISPLAY_ALL');
        e.preventDefault();
    }

    _toggleAllMarkerVisibility(){
        return this.props.displayAll === true ? { icon : "hide" , text : "Hide All", color : "orange" } : {icon : "unhide" , text : "Show All", color : "blue" }
    };

    _toggleFilterMenuVisibility = (e) => {
        this.setState({ filterMenuVisible : !this.state.filterMenuVisible });
        this.props.dispatch('TOGGLE_FILTER_MENU_VISIBILITY', !this.state.filterMenuVisible );
        e.preventDefault();
    };

    menuStyles = {
        marginTop: '20px',
    }

    render(){
        return(
            <Menu inverted stackable style={this.menuStyles} >
                <Menu.Item name='Toggle' color={this._toggleAllMarkerVisibility().color} active={this.displayAll === true} onClick={this._toggleAll}  >
                    <Icon name={this._toggleAllMarkerVisibility().icon} />
                    {this._toggleAllMarkerVisibility().text}
                </Menu.Item>

                <Menu.Menu position='right' >
                    <Menu.Item name='Filters' onClick={this._toggleFilterMenuVisibility} >
                        <Icon name={this.props.filterMenuVisible === false ? 'plus' : 'minus' } />
                        {this.props.filterMenuVisible === false ? 'Show Filters' : 'Hide Filters' }
                    </Menu.Item>
                </Menu.Menu>
            </Menu>
        );
    };
};
