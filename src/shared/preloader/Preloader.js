import React, { Component } from 'react';
import {Glyphicon} from 'react-bootstrap';
import './preloader.css';

class Preloader extends Component {
    render() {
        return (<div className="Preloader">
                <Glyphicon glyph="refresh" />
        </div>);
    }
}

export default Preloader;