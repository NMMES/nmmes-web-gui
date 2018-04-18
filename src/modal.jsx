import React from 'react';
import './style/modal';
import classnames from 'classnames';

export default class Modal extends React.Component {
    state = {};
    close(e) {
        e.stopPropagation();
        this.props.onClose();
    }
    render = () => (<div key="modal" onClick={this.close.bind(this)} style={this.props.style} className={classnames(this.props.className, "nmmes-modal", {'open': this.props.open})}>
        <div className="content" onClick={e => e.stopPropagation()}>
            {this.props.children}
        </div>
    </div>);
}
