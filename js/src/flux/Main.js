import React, { Component } from 'react';
import App from '../components/App';
import { Dimmer, Loader } from 'semantic-ui-react';
import { actions } from './actions';
import { Store } from './store';

let loading = true;

export default class Main extends Component {
    state = Store
	dispatch(actionName, options) {
		const actionToDo = actions[actionName];
		actionToDo(this.state, options).then((newStore) => {
			this.setState(newStore);
		})
        .catch(e => console.log(e));;
	}

    componentDidMount(){
        setTimeout(() => { loading = false }, 500);
    }

	render() {
		const sharedProps = {
			dispatch: (...args) => this.dispatch(...args),
		};
        if (loading){
            this.dispatch('FETCH_ALL_DATA');
            return(
                <Dimmer active>
                    <Loader indeterminate>Loading</Loader>
                </Dimmer>
            )
        } else {
            return (
                <App {...this.state} {...sharedProps} />
            )
        }
	}
}
