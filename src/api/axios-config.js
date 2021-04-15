import axios from 'axios';
import store from '../store';
import Vue from 'nativescript-vue';


let url = 'https://la-bohemia.herokuapp.com/api';
let apiVersion = `v1`;

const configHandler = (config) => {
    return config;
};

const successHandler = (response) => {
    return response.data;
};

const errorHandler = (error) => {
    console.log(error);
    let messageData = Object.create(null);
    messageData.title = 'Ocurrió un error en la solicitud!';
    messageData.content = '';
    if (error.response) {
        if(error.response.status === 401) {
            messageData.title = 'No autorizado';
        }
        if(error.response.status === 403) {
            messageData.title = 'No autorizado para la acción solicitada.';
        }
        if(error.response.status === 404) {
            messageData.title = 'Dirección no encontrada!';
        }
        if(error.response.status === 422) {
            messageData.title = 'Revisa los siguientes datos!';
            messageData.content = error.response.data.errors;
        }
    } else if (error.request) {
        messageData.title = 'Sin respuesta del servidor!';
    }
    console.log(messageData);
    return Promise.reject(messageData);
};

export default {
    version: `${apiVersion}`,
    endpoint: `${url}`,

    requestInterceptor: config => {
        config.headers.Authorization = `Bearer ${store.getters['auth/token']}`;
        return config;
    },
    responseInterceptor: response => {
        return response.data;
    },

    init() {
        console.log('axios-config init')
        console.log('store.getters[auth/token]',store.getters['auth/token'])

        Vue.prototype.$http = axios.create({ baseURL: this.endpoint });
        Vue.prototype.$http.interceptors.request.use(this.requestInterceptor);
        Vue.prototype.$http.interceptors.response.use(this.responseInterceptor);
    }
}