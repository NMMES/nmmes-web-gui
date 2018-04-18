import React from 'react';
import './style/add';
import classnames from 'classnames';
import {SocketContext} from './socketContext';
// import Dropzone from 'react-dropzone';
import join from 'join-path';
import Modal from './modal';
import {Helmet} from "react-helmet";
import {Icon} from './typography';

// const dropzone = <Dropzone className="nmmes-dropzone" onDrop={this.onDrop.bind(this)} style={{width: '100%'}}>
//     <p>Try dropping some files here, or click to select files to upload.</p>
// </Dropzone>;

class Directory extends React.PureComponent {
    state = {
        open: false,
        children: [],
        active: false
    };
    constructor(props) {
        super(props);
        if (props.path.length > 1)
            this.name = props.path.substring(props.path.lastIndexOf("/") + 1);
        else
            this.name = props.path;
        }
    open(e) {
        e.stopPropagation();
        this.setState({
            open: !this.state.open
        });
    }
    select(e) {
        e.stopPropagation();
        this.props.onSelect(this);
        this.setState({active: true});
    }
    deselect() {
        this.setState({active: false});
    }
    componentDidMount() {
        this.props.socket.call('files.list', this.props.path).then(([files]) => {
            this.setState({children: files});
        }).catch(error => {
            this.setState({error})
        });
    }
    render() {
        let files = [];
        for (let [name, data] of Object.entries(this.state.children)) {
            if (data.type !== 'd')
                continue;
            const path = join(this.props.path, name);
            files.push(<Directory key={path} path={path} onSelect={this.props.onSelect} socket={this.props.socket} type={data.type}/>);
        }
        return (<li onClick={this.state.error
                ? e => e.stopPropagation()
                : this.select.bind(this)} className={classnames('nmmes-directory', {
                'empty': files.length === 0,
                'open': this.state.open,
                'active': this.state.active,
                'error': this.state.error
            })}>
            <div className="nmmes-directory-info" title={this.state.error
                    ? this.state.error
                    : this.name}>
                <Icon onClick={this.state.error
                        ? e => e.stopPropagation()
                        : this.open.bind(this)} className="nmmes-directory-icon" name={this.state.open
                        ? 'folder_open'
                        : 'folder'}></Icon>
                <div className={classnames('name')}>{this.name}</div>
            </div>
            {
                this.state.open
                    ? <ul className="nmmes-directory-list">{files}</ul>
                    : null
            }
        </li>);
    }
}

class FileList extends React.PureComponent {
    state = {};
    selectDirectory(component) {
        if (this.state.selected)
            this.state.selected.deselect.call(this.state.selected);
        this.setState({selected: component});
        this.props.onSelect(component.props.path);
    }
    render() {
        return (<ul className="nmmes-directory-list directory-list">
            <Directory path={this.props.root} type="d" onSelect={this.selectDirectory.bind(this)} socket={this.props.socket}/>
        </ul>);
    }
}

class File extends React.PureComponent {
    state = {};
    select(e) {
        e.stopPropagation();
        this.props.onSelect(this);
        this.setState({active: true});
    }
    deselect() {
        this.setState({active: false});
    }
    render() {
        return (<div className={classnames('nmmes-file', {active: this.state.active})} onClick={this.select.bind(this)}>
            <input type="checkbox"/>
            <Icon name={this.props.type === 'f' ? "insert_drive_file" : 'folder'}/>
            <div className={classnames('name')} title={this.props.name}>{this.props.name}</div>
        </div>);
    }
}

class DirectoryContents extends React.PureComponent {
    state = {
        children: []
    };
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (this.props.path !== nextProps.path) {
            this.setState({loading: true});
            this.props.socket.call('files.list', nextProps.path).then(([files]) => {
                this.setState({children: files, loading: false});
            }).catch(error => {
                this.setState({error, loading: false})
            });
        }
    }
    selectFile(component) {
        const path = join(this.props.path, component.props.name);
        if (this.state.selected)
            this.state.selected.deselect.call(this.state.selected);
        this.setState({selected: component});
        this.props.onSelect(path);
    }
    render() {
        let files = [];
        for (let [name, data] of Object.entries(this.state.children)) {
            files.push(<File key={name} name={name} onSelect={this.selectFile.bind(this)} type={data.type}/>);
        }
        return (<div className={classnames('directory-contents', {loading: this.state.loading})}>
            <div className="nmmes-file" style={{borderBottom: '1px solid lightgrey'}}>
                <input type="checkbox" style={{visibility: 'hidden'}}/>
                <Icon name="folder" style={{visibility: 'hidden'}}/>
                <div>Name</div>
            </div>
            {files}
        </div>);
    }
}
class FilePreview extends React.PureComponent {
    state = {
        children: [],
        metadata: {}
    };
    UNSAFE_componentWillReceiveProps(nextProps) {
        if (this.props.path !== nextProps.path) {
            this.setState({loading: true});
            this.props.socket.call('files.metadata', nextProps.path).then(([metadata]) => {
                console.debug(metadata)
                this.setState({metadata, loading: false});
            }).catch(error => {
                console.error(error);
                this.setState({error, loading: false})
            });
        }
    }
    render() {
        return (<div className="nmmes-file-preview">
            <div className="path">{this.props.path}</div>
            <div className="size">{this.state.metadata.size}</div>
        </div>);
    }
}

export default class Add extends React.PureComponent {
    state = {
        path: '/'
    };
    videos() {}
    onDrop(files) {
        console.debug(`Files dropped in dropzone:`, files);
    }
    selectDirectory(path) {
        this.setState({directory: path});
    }
    selectFile(path) {
        this.setState({file: path});
    }
    render() {
        return (<div style={this.props.style} className={classnames(this.props.className, "nmmes-page-add")}>
            <Helmet>
                <title>Add Videos</title>
            </Helmet>
            <Modal open={this.state.selectModalOpen} onClose={() => {
                    this.setState({selectModalOpen: false});
                }}>
                <SocketContext.Consumer>
                    {
                        socket => [
                            <div key="files" className="file-manager">
                                <FileList root="/" onSelect={this.selectDirectory.bind(this)} socket={socket}/>
                                <DirectoryContents onSelect={this.selectFile.bind(this)} path={this.state.directory} socket={socket}/>
                                <FilePreview path={this.state.file} socket={socket}/>
                            </div>,
                            <div key="controls" className="controls">
                                <button>Cancel</button>
                                <button>Add</button>
                            </div>
                        ]
                    }</SocketContext.Consumer>
            </Modal>
            <button onClick={() => {
                    this.setState({selectModalOpen: true});
                }}>open</button>
        </div>);
    }
}
