import Vue from 'vue'
import Vuex from "vuex";

import {
    createSocketioPlugin
} from 'vuex-socketio-plugin'
import * as io from 'socket.io-client'

Vue.use(Vuex);

Vue.config.productionTip = process.env.NODE_ENV === 'production';

let server = Vue.config.productionTip ? 'http://192.168.4.31:3000' : 'http://localhost:3000';


// Store
export default new Vuex.Store({
    plugins: [createSocketioPlugin(server)],
    state: {
        API: server,
        count: 0,
        isConnected: false,
        messages: ['hola...'],
        signal: 'idle'
    },
    created: {
        API() {
            state.API = server
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