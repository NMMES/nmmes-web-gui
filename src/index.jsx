import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'normalize.css';
import {AppContainer} from 'react-hot-loader';

const root = document.createElement('div');
root.id = "root";
document.body.appendChild(root);

const render = Component => {
    ReactDOM.render(<AppContainer>
        <Component/>
    </AppContainer>, document.getElementById('root'));
};

render(App);

// Webpack Hot Module Replacement API
if (module.hot) {
    module.hot.accept('./App', () => {
        render(App);
    });
}
