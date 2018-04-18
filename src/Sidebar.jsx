import React from 'react';
import './style/sidebar';
import classnames from 'classnames';
import {Icon} from './typography';
import {Link} from 'react-router-dom';

export default class Sidebar extends React.Component {
    render = () => (<div style={this.props.style} className={classnames(this.props.className, "nmmes-sidebar")}>
        <Link to="/videos/add" className="link"><Icon name="library_add"/>
            <label>Add</label>
        </Link>
        <Link to="/videos/dashboard" className="link"><Icon name="library_books"/>
            <label>Dashboard</label>
        </Link>
    </div>);
}
