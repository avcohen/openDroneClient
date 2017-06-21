import React, { Component } from 'react';
import CountUp from 'react-countup';

export default class Counter extends Component {

    constructor(props){
        super(props)
    };

    render(){

        const counterStyle = {
            fontFamily : 'solari',
            fontSize : '45px',
        };

        return(
            <CountUp
              style={counterStyle}
              className="custom-count"
              start={0}
              end={this.props.cachedResults.length}
              duration={1.75}
              useEasing={true}
              separator=" "
              redraw="true"
              decimal=","
            />
        );
    };
};
