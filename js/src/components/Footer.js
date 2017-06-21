import React, { Component } from 'react';
import { Icon , Menu } from 'semantic-ui-react';

export default class Footer extends Component {

    render() {
        return (
            <footer className={"pageFooter"}>
                <a href="https://github.com/avcohen/openDroneClient" target="_blank"><Icon link size="big" color="black" name="github" /></a>

            </footer>
        );
    }
}
