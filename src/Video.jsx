import React from 'react';
import './style/video';
import classnames from 'classnames';

class ProgressBar extends React.Component {
    render = () => (<div className={classnames(this.props.className, "nmmes-progressbar")} style={this.props.containerStyle}>
        <div className="bar" style={{
                width: this.props.progress + "%",
                ...this.props.style
            }}/>
    </div>);
}

class Labeled extends React.Component {
    render = () => (<div className={classnames(this.props.className, "nmmes-label", this.props.label.toLowerCase())} style={this.props.containerStyle}>
        <label className="label">{this.props.label}</label>
        <div className="content">
            {this.props.children}
        </div>
    </div>);
}

export default class Video extends React.Component {
    state = {
        expanded: false
    }
    details() {
        return this.state.expanded
            ? (<div className="details">
                <table>
                    <tr>
                        <th>Filename</th>
                        <td>[REVO]Nausicaa of the Valley of the Wind[BD,1080p] [BD0E1A0F].mkv</td>
                    </tr>
                    <tr>
                        <th>Directory</th>
                        <td>/home/mnt/movies/desktop/anime</td>
                    </tr>
                    <tr>
                        <th>Filesize</th>
                        <td>28.0 GiB</td>
                    </tr>
                    <tr>
                        <th>Overall Bitrate</th>
                        <td>34 Mb/s</td>
                    </tr>
                    <tr onClick={() => this.setState({
                            expandedVideos: !this.state.expandedVideos
                        })}>
                        <th>Video Streams</th>
                        <td>1</td>
                    </tr>
                    <tr>
                        <th>Audio Streams</th>
                        <td>7</td>
                    </tr>
                    <tr>
                        <th>Subtitle Streams</th>
                        <td>7</td>
                    </tr>
                </table>
                {this.videoDetails()}
            </div>)
            : null;
    }
    videoDetails(num = 0) {
        return (<table>
            <tr>
                <th>Video {num}</th>
                <td/>
            </tr>
            <tr>
                <th>Format/Info</th>
                <td>Advanced Video Codec</td>
            </tr>
            <tr>
                <th>Bit depth</th>
                <td>10 bits</td>
            </tr>
            <tr>
                <th>Width</th>
                <td>1,920 pixels</td>
            </tr>
            <tr>
                <th>Height</th>
                <td>1,038 pixels</td>
            </tr>
        </table>)
    }
    audioDetails(num = 0) {
        return (<table>
            <tr>
                <th>Audio {num}</th>
                <td/>
            </tr>
            <tr>
                <th>Format/Info</th>
                <td>Advanced Video Codec</td>
            </tr>
            <tr>
                <th>Bit depth</th>
                <td>10 bits</td>
            </tr>
            <tr>
                <th>Width</th>
                <td>1,920 pixels</td>
            </tr>
            <tr>
                <th>Height</th>
                <td>1,038 pixels</td>
            </tr>
            <tr>
                <th>Audio Streams</th>
                <td>7</td>
            </tr>
            <tr>
                <th>Subtitle Streams</th>
                <td>7</td>
            </tr>
        </table>)
    }
    render = () => (<div className={classnames("nmmes-video", {expanded: this.state.expanded})}>
        <div className="status">
            <Labeled label="Filename">{this.props.data.filename}</Labeled>
            <Labeled label="Progress">{this.props.data.progress + "%"}</Labeled>
            <div className="controls">
                <button className={classnames("attention drop-down", {active: this.state.expanded})} onClick={() => {
                        this.setState({
                            expanded: !this.state.expanded
                        });
                    }}>Details</button>
            </div>
        </div>
        <ProgressBar progress={this.props.data.progress} containerStyle={{
                backgroundColor: '#efefef'
            }}/> {this.details()}
    </div>);
}
