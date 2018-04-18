import React from 'react';
import Video from './Video';
import './style/dashboard';
import classnames from 'classnames';
import {SocketContext} from './socketContext';
import {Helmet} from "react-helmet";

const videoData = [
    {
        filename: "[ReinForce][MovingLines][Anon] Captain Harlock (BDRip 1920x804 x264 FLAC)(Edited Retail Softsubs).mkv",
        progress: 25
    }
];

class VideoList extends React.Component {
    componentDidMount() {
        this.props.socket.call('videos.list').then(videos => {
            console.log(videos)
            // this.setState({videos});
        }, console.error);
    }
    render() {
        let videos = [];
        return videos;
    }
}
export default class Dashboard extends React.Component {
    videos() {}
    render = () => (<div style={this.props.style} className={classnames(this.props.className, "nmmes-page-dashboard")}>
        <Helmet>
            <title>Dashboard</title>
        </Helmet>
        <SocketContext.Consumer>
            {socket => <VideoList socket={socket}/>}
        </SocketContext.Consumer>
        <Video data={videoData[0]}></Video>
        <Video data={videoData[0]}></Video>
    </div>);
}
