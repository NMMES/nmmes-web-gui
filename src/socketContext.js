import React from 'react';
import {Client} from 'nmmes-simple-rpc';

const socket = new Client('ws://localhost:3000');

// socket.onopen = async () => {
//     console.debug('RPC connection open');
//     try {
//         const modules = await socket.call('modules.list');
//         for (let m of modules) {
//             console.log(await socket.call('modules.options', [m]));
//         }
//     } catch (e) {
//         console.error(e);
//     }
// };

export const SocketContext = React.createContext(socket);
