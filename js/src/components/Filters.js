import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ColorPicker from './ColorPicker'
import Layers from './Layers';
import { Container, Form, Grid, Icon, Menu, Message } from 'semantic-ui-react';

const options = {
    country : [
        { key : 'all', text: 'All', value : 'all'},
        { key: 'afganistan', text: 'Afghanistan', value: 'afghanistan' },
        { key: 'pakistan', text: 'Pakistan', value: 'pakistan' },
        { key: 'syria', text: 'Syria', value: 'syria'  },
        { key: 'yemen', text: 'Yemen', value: 'yemen' },
    ],
    year : [
        { key : 'all', text: 'All', value : 'all'},
        { key : '2015', text: '2015', value : 2015 },
        { key : '2016', text: '2016', value : 2016 },
        { key : '2017', text: '2017', value : 2017 },
    ]
}

export default class Filters extends Component {

    constructor(props){
        super(props)
        this.state = {
            filterName : null,
            country : null,
            year : null,
            filterByRadius : false,
            radius : null,
            origin : {
                lat : null,
                lng : null,
            }
        }
        this._onFilterChange = this._onFilterChange.bind(this);
    }

    _onFilterChange = (e, {name, value, checked}) => {
        // console.log(checked, name, value)
        if (name === 'origin') {
            const latLngString = value.replace(/\s/g,'');
            const latLngArr = latLngString.split(',');
            this.setState({
                origin : {
                    lat : latLngArr[0],
                    lng : latLngArr[1],
                }
            })
        }
        else {
            this.setState({
                [name] : name === 'filterByRadius' ? checked : value,
            })
        }
    }

    _onFilterSubmit = (e) => {
        this.props.dispatch('UPDATE_FILTERS', this.state);
        this.props.dispatch('FILTER_STRIKES', this.state);
        e.preventDefault();
    }

    _addLayer = (e) => {
        this.props.dispatch('ADD_LAYER', this.state);
        e.preventDefault();
    }

    _toggleAll = (e) => {
        this.props.dispatch('DISPLAY_ALL');
        e.preventDefault();
    }

    _clearAllLayers = (e) => {
        this.props.dispatch('DELETE_FILTERED_DATA');
        e.preventDefault();
    }

    // _flagRenderer = (item) => <Flag name={item.countryCode} />

    render() {
        return (
            <Container fluid>
                <Form className={"info message"} >
                    <Grid stackable columns='1' divided='vertically'>
                        <Grid.Row>
                            <Form.Input name="filterName" label="Filter Name" placeholder="Filter Name" onChange={this._onFilterChange} />
                            <Form.Select name="country" label="Country" options={options.country} placeholder="All" onChange={this._onFilterChange} />
                            <Form.Select name="year" label="Year" options={options.year} placeholder="All" onChange={this._onFilterChange} />
                            <Form.Button label="Apply Filter" onClick={this._onFilterSubmit} ><Icon name="filter"></Icon></Form.Button>

                            <Form.Button label="Add Layer" onClick={this._addLayer} >
                                <Icon.Group>
                                    <Icon name='clone' />
                                    <Icon corner name='add' />
                                </Icon.Group>
                            </Form.Button>

                            <Form.Button label="Clear Layers" onClick={this._clearAllLayers} >
                                <Icon.Group>
                                    <Icon name='clone' />
                                    <Icon corner name='remove' />
                                </Icon.Group>
                            </Form.Button>

                        </Grid.Row>
                        <Grid.Row>
                            <Layers {...this.props} />
                        </Grid.Row>
                    </Grid>
                </Form>
            </Container>
        );
    };


};

// <Form.Button onClick={this._toggleAll} >{this._toggleAllMarkerVisibility()}</Form.Button>

// by radius jsx to reintegrate
// <Form.Input name="origin" label="Lat / Long" placeholder="-51.126, 12.331" onChange={this._onFilterChange} />
// <Form.Input name="radius" label="Distance (KM)" onChange={this._onFilterChange} />
// <Form.Checkbox name="filterByRadius" label="Filter By Radius" onChange={this._onFilterChange} />
