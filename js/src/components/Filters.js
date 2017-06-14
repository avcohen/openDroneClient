import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Form } from 'semantic-ui-react';

const options = {
    country : [
        { key : 'all', text: 'All', value : 'all'},
        { key: 'afganistan', text: 'Afganistan', value: 'afganistan' },
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

    state = {
        country : null,
        year : null,
        filterByRadius : false,
        radius : null,
        origin : {
            lat : null,
            lng : null,
        }
    }

    constructor(props){
        super(props)
        // this.handleChange = this.handleChange.bind(this);
    }

    handleChange = (e, {name, value, checked}) => {
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


    handleSubmit = (e) => {
        console.log('new state submitted : ', this.state)
        this.props.dispatch('UPDATE_FILTERS', this.state);
        e.preventDefault();
    }

    render() {
        return (
            <Form>
                <Form.Group widths='equal'>
                    <Form.Select name="country" label="Country" options={options.country} placeholder="All" onChange={this.handleChange} />
                    <Form.Select name="year" label="Year" options={options.year} placeholder="All" onChange={this.handleChange} />
                        <Form.Group>
                            <Form.Checkbox name="filterByRadius" label="Filter By Radius" onChange={this.handleChange} />
                            <Form.Input name="origin" label="Lat / Long" placeholder="-51.1245, 12.3345" onChange={this.handleChange} />
                            <Form.Input name="radius" label="Distance (KM)" onChange={this.handleChange} />
                        </Form.Group>
                </Form.Group>
                <Form.Button onClick={this.handleSubmit} >Filter</Form.Button>
            </Form>
        );
    };
}
