import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Button, Checkbox, Form, Input, Select } from 'semantic-ui-react';

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
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;


        this.setState({
          [name]: value
        });
        // this.props.dispatch('UPDATE_FILTERS', this.state)

    }

    componentDidMount(){

    }


    render() {

        return (
            <form>
                <input
                    name="filterByRadius"
                    type="checkbox"
                    checked={ this.state.filterByRadius }
                    onChange={ this.handleChange }
                />
            </form>
        );
    };
}
