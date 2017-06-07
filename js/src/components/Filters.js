import React, { Component } from 'react';
import { Form, Checkbox } from 'semantic-ui-react';

const options = {
    country : [
        { key: 'afganistan', text: 'Afganistan', value: 'afganistan' },
        { key: 'syria', text: 'Syria', value: 'syria' },
        { key: 'yemen', text: 'Yemen', value: 'yemen' },
    ],
    administration : [
        { key : 'bush', text: 'George W. Bush', value : 'bush'},
        { key : 'obama', text: 'Barack Obama', value : 'obama'},
        { key : 'trump', text: 'Donald Trump', value : 'trump'},
    ]
}

export default class Filters extends Component {

    state = {};

    constructor(props){
        super(props)
    }

    componentDidMount(){}

    componentWillReceiveProps(){}

    render() {
        return (
            <Form>
                <Form.Group widths='equal'>
                    <Form.Select label='Country' options={options.country} placeholder='Country' />
                    <Form.Select label='Administration' options={options.administration} placeholder='Administration' />
                    <Form.Field><Checkbox label='Search by Radius (KM)' /></Form.Field>
                </Form.Group>
            </Form>
        );
    };
}
