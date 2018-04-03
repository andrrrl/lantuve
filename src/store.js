import Vue from 'vue'
import Vuex from "vuex";

import {
    createSocketioPlugin
} from 'vuex-socketio-plugin'
import * as io from 'socket.io-client'

Vue.use(Vuex);

let _client = null;
// export type State = {
//     messages: string[],
//     count: any,
//     isConnected: any
// }


// Store
export default new Vuex.Store({
    plugins: [createSocketioPlugin('http://192.168.4.31:3000' || 'http://localhost:3000')],
    state: {
        API: [],
        count: 0,
        isConnected: false,
        messages: ['hola...'],
        signal: 'idle'
    },
    created: {
        API() {
            state.API = ['http://192.168.4.31', '3000']
        }
    },
    mutations: {
        SOCKET_CONNECT(state, status) {
            state.isConnected = true;
            console.log(state, status);
        },
        SOCKET_DISCONNECT(state) {
            state.isConnected = false;
        },
        SOCKET_USER_MESSAGE(state, {
            data
        }) {
            state.messages = state.messages.concat(data[0].signal);
            state.signal = data[0].signal;
            console.log(data);
        },
        increment(state) {
            state.count++;
        },
        decrement(state) {
            state.count--
        }
    },
    actions: {
        increment: ({
            commit
        }) => commit('increment'),
        decrement: ({
            commit
        }) => commit('decrement'),
        socket_userMessage(context, messages) {
            context.dispatch('newMessage', messages);
            console.log('newMessage', context, messages);
        }
    },
    getters: {
        evenOrOdd: state => state.count % 2 === 0 ? 'even' : 'odd'
    }
});