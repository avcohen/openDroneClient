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

    /**
     * _removeLayer - called by onRemove for each filter Label Element
     *
     * @param  {object} e    event
     * @param  {object} data data from element where function was called
     * @param  {number} i    index of layer clicked
     */
    _removeLayer(e, data, i){
        e.stopPropagation(); // required to prevent bubble up to parent Label element
        this.props.dispatch('REMOVE_LAYER', i);
        e.preventDefault();
    }

    /**
     * _toggleLayerVisibility - toggles highlight of label to show as active/inactive, toggles props of current layer to match
     *
     * @param  {object} e    event
     * @param  {object} data data from element where function was called
     * @param  {number} i    index of layer clicked
     */
    _toggleLayerVisibility(e, data, i){
        // console.log(e, data, i)
        e.preventDefault();
    }

    _renderLayerList(props = this.props){
        const layers = props.filterLayers;
        // if filter layers array is empty, do nothing
        if (props.filterLayers.length === 0){
            return('');
        }

        // return a label element for each obj in array
        return layers.map((layer, i) => {
            return(
                <Label
                    color="red"
                    content={layer.filterName}
                    onClick={(e, data) => this._toggleLayerVisibility(e, data, i)}
                    onRemove={(e,data) => this._removeLayer(e, data, i)}
                    key={i}
                />
            );
        })
    };


	componentWillReceiveProps(nextProps){
        if (this.props.filterLayers.length !== nextProps.filterLayers.length){
            this._renderLayerList(nextProps);
        }
    };

    render(){
        return (
            <Label.Group size="large">{this._renderLayerList()}</Label.Group>
        );
    }

};
