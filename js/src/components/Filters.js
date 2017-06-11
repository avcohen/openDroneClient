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
    administration : [
        { key : 'all', text: 'All', value : 'all'},
        { key : 'bush', text: 'George W. Bush', value : 'bush'},
        { key : 'obama', text: 'Barack Obama', value : 'obama'},
        { key : 'trump', text: 'Donald Trump', value : 'trump'},
    ]
}

export default class Filters extends Component {

    constructor(props){
        super(props)
        this.state = {
            country : "all",
            administration : "all",
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
                    <Form.Select name="country" label="Country" options={options.country} placeholder="All" onChange={this.handleChange} />
                    <Form.Select label="Administration" options={options.administration} placeholder="All" onChange={this.handleChange} />
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
