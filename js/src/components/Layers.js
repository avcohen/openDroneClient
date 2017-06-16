import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Label, Icon } from 'semantic-ui-react';

export default class Layers extends Component {

    constructor(props){
        super(props);

        this._removeLayer = this._removeLayer.bind(this);
    };

    // _layerContainerStyles = () => {};
    //
    // _layerItemStyles = () => {};
    //
    // _loadLayers(){};
    //
    _removeLayer = (e, data) => {
        console.log(e, data)
        e.preventDefault();
    }

    // load in layer list
    // componentDidMount(){};

    // logic to check length of layer list, refresh if change
    // componentWillReceiveProps(){};

    render(){


        //onRemove to delete layer, onclick to isolate visibility of only that layer
        return (
            <Label color="red">
                Layer 1
                <Icon name="delete" onClick={this._removeLayer} />
            </Label>


        );
    }
};
