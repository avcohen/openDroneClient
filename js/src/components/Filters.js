import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Form } from 'semantic-ui-react';

const options = {
    country : [
        { key : 'all', text: 'All', value : 'all'},
        { key: 'afganistan', text: 'Afghanistan', value: 'afghanistan' },
        { key: 'syria', text: 'Syria', value: 'syria' },
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
                    lngt : latLngArr[1],
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
        this.props.dispatch('UPDATE_FILTERS', this.state); // not updating props
        //this.props.dispatch('FILTER_STRIKES', this.state); // seems to be firing before 'FETCH ALL' ?
        e.preventDefault();
    }

    render() {
        return (
            <Form>
                <Form.Group widths='equal'>
                    <Form.Select name="country" label="Country" options={options.country} placeholder="All" onChange={this._onFilterChange} />
                    <Form.Select name="year" label="Year" options={options.year} placeholder="All" onChange={this._onFilterChange} />
                        <Form.Group>
                            <Form.Checkbox name="filterByRadius" label="Filter By Radius" onChange={this._onFilterChange} />
                            <Form.Input name="origin" label="Lat / Long" placeholder="-51.126, 12.331" onChange={this._onFilterChange} />
                            <Form.Input name="radius" label="Distance (KM)" onChange={this._onFilterChange} />
                        </Form.Group>
                </Form.Group>
                <Form.Button onClick={this._onFilterSubmit} >Filter</Form.Button>
            </Form>
        );
    };


};
