import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Label, Icon } from 'semantic-ui-react';

export default class Layers extends Component {

    constructor(props){
        super(props);
        this.state = {
            layersExist : (this.props.filterLayers.length === 0) ? false : true,
        }
    };

    // _layerContainerStyles = {
    // };
    //
    // _layerItemStyles = {
    // };
    //
    // _loadLayers(props = this.props){
    //
    // };

    // deletes layer entirely
    _removeLayer(e, data, i){
        console.log(e, data)
        e.preventDefault();
    }

    // toggles highlight of label to show is active/inactive, toggles props of current layer to match
    _toggleLayerVisibility = (e, data) => {
        console.log(e, data)
        e.preventDefault();
    }

    _renderLayerList(props = this.props){
        // if filter layers array is empty, do nothing
        if (!this.props.filterLayers.length){
            return;
        }

        const layers = this.props.filterLayers;

        // return a label element for each obj in array
        return layers.map((layer, i) => {
            console.log('----', layer)
            return(
                <Label color="red" onClick={this._toggleLayerVisibility} key={i}>
                    {layer.filterName}
                    <Icon name="delete" onClick={(e,data) => this._removeLayer(e, data, i)} />
                </Label>
            );
        })
    };


    render(){
        return (
            <div>{this._renderLayerList()}</div>
        );
    }

};
