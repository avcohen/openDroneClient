import React, { Component } from 'react';
import CountUp from 'react-countup';

export default class Counter extends Component {

    constructor(props){
        super(props)
        this.state = {
            redraw : false
        }
    };

    _getStartYear() {
        const {cachedResults} = this.props;
        const startYear = Math.min.apply(Math, cachedResults.map((i) => {
            const d = new Date(i.date);
            const y = d.getFullYear();
            return y
        }))
        console.log(startYear)
        return startYear;
    }

    render(){

        const currentStrikesDisplayed = this.props.filteredResults.length > 0 ? this.props.filteredResults.length : this.props.cachedResults.length

        const counterStyle = {
            fontFamily : 'solari',
            fontSize : '45px',
            marginTop : '50px',
            paddingTop : '20px',
        };

        return(
            <div>
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
            <h2>Strikes since {this._getStartYear()}</h2>
            </div>
        );
    };
};
