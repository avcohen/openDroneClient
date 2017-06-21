import React, { Component } from 'react';
import CountUp from 'react-countup';

export default class Counter extends Component {

    constructor(props){
        super(props)
        this.state = {
            redraw : false
        }
    };

    render(){

        const currentStrikesDisplayed = this.props.filteredResults.length > 0 ? this.props.filteredResults.length : this.props.cachedResults.length

        const counterStyle = {
            fontFamily : 'solari',
            fontSize : '45px',
        };

        return(
            <CountUp
              style={counterStyle}
              className="custom-count"
              start={0}
              end={currentStrikesDisplayed}
              duration={1.75}
              useEasing={true}
              separator=" "
              redraw={this.state.redraw}
              decimal=","
            />
        );
    };
};
