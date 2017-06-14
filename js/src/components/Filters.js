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
    
    constructor(props){
        super(props)
        this.state = {
            country : "all",
            year : "all",
            radius : null,
            filterByRadius : false,
        }
        // this.handleChange = this.handleChange.bind(this);
    }

    handleChange = (e, {name, value}) => {
        console.log(name, value)
        // ***
        // HOW TO ACCESS PROPS OF ITEMS CLICKED? REF? WHUT....
        // ***

        // this.setState({ value })
    }

    render() {
        return (
            <Form>
                <Form.Group widths='equal'>
                    <Form.Select name="Country" label="Country" options={options.country} placeholder="All" onChange={this.handleChange} />
                    <Form.Select name="Year" label="Year" options={options.year} placeholder="All" onChange={this.handleChange} />
                        <Form.Group>
                            <Form.Checkbox label="Filter By Radius" checked={ this.state.filterByRadius } onChange={this.handleChange} />
                            <Form.Input label="Lat / Long" placeholder="-51.1245,12.3345" onChange={this.handleChange} />
                            <Form.Input label="Distance (KM)" onChange={this.handleChange} />
                        </Form.Group>
                </Form.Group>
            </Form>
        );
    };
}
