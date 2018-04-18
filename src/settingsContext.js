import React from 'react';
import localforage from 'localforage';

localforage.config({
    name: 'nmmes-web-gui',
    version: 1.0,
    storeName: 'settings',
    description: 'Storage for settings'
});

export const settingsContext = React.createContext(localforage);
