import React, { Component } from 'react';
import { Icon , Menu } from 'semantic-ui-react';

export default class Footer extends Component {

    render() {
        const footerItem = {
            margin : '5px',
        }
        return (
            <footer className={"pageFooter"}>
                <a style={footerItem} href="https://github.com/avcohen/openDroneClient" target="_blank"><Icon link size="big" color="black" name="github" /></a>
                <a style={footerItem} href="mailto:avcohen@gmail.com" target="_blank">email</a>
                <a style={footerItem} href="https://github.com/avcohen/openDroneClient/blob/master/README.md" target="_blank">about</a>
            </footer>
        );
    }
}
