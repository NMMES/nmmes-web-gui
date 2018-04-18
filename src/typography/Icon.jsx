import React from 'react';
import 'material-design-icons/iconfont/material-icons.css';
import iconMap from '../assets/icon-map.json';
import classnames from 'classnames';

export default class Icon extends React.Component {
    render = () => {
        let iconCode = `&#x${iconMap[this.props.name]};`;
        return (<i {...this.props} className={classnames('material-icons', this.props.className)} dangerouslySetInnerHTML={{__html: iconCode}} />)
    };
}
