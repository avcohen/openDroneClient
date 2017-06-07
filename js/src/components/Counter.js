import React, { Component } from 'react';

export default class Counter extends Component {
    handleClick(e) {
        this.props.dispatch('UPDATE_IDX');
    }
    render() {
        const {index} = this.props;
        return (<div onClick={(e) => this.handleClick(e)}>
            <h1>Counter: {index}</h1>
            <em>Click to increment</em>
        </div>);
    }
}
