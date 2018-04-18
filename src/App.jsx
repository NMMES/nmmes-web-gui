import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
import Add from './Add';
import {Helmet} from "react-helmet";
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

import './style/app';
import 'roboto-fontface/css/roboto/roboto-fontface.css';

class App extends React.Component {
    render = () => (<Router>
        <div id="app">
            <Helmet>
                <meta charSet="utf-8"/>
                <title>Loading...</title>
            </Helmet>
            <Navbar/>
            <div style={{
                    display: 'flex',
                    flex: '1 0 auto'
                }}>
                <Sidebar/>
                <div id="content" style={{
                        flex: '1 0 auto'
                    }}>
                    <Route path="/videos/dashboard" component={Dashboard}/>
                    <Route path="/videos/add" component={Add}/>
                </div>
            </div>
        </div>
    </Router>);
}

import {hot} from 'react-hot-loader';
export default hot(module)(App);
