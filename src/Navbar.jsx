import React from 'react';
import './style/navbar';
import {Icon} from './typography';
import {Link} from 'react-router-dom';
import Modal from './modal';
import {settingsContext} from './settingsContext';

class Controls extends React.Component {
    state = {};
    componentDidMount() {
        this.props.storage.getItem('connections').then(connections => {
            this.setState({connections});
        });
    }
    render() {

        return (<div className="controls">
            <a className="link" onClick={() => {
                    this.setState({connectionModalOpen: true});
                }}><Icon name="settings_input_component"/></a>
            <Modal open={this.state.connectionModalOpen} onClose={() => {
                    this.setState({connectionModalOpen: false});
                }}>
                <h2>Connection Handler</h2>
                <hr/>
                {this.state.connections}
            </Modal>
            <Link to="/settings" className="link"><Icon name="settings"/></Link>
        </div>);
    }
}

export default class Navbar extends React.Component {
    render = () => (<div className="nmmes-navbar">
        <img id="logo" src={require('./assets/temp_icon.png')}/>
        <div id="brand">NMMES Web UI</div>
        <settingsContext.Consumer>
            {settings => <Controls storage={settings}/>}
        </settingsContext.Consumer>
    </div>);
}
