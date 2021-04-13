import store from './../store';
import axios from 'axios';

let url = `${store.getters['apiBaseUrl']}`;
let apiVersion = `v1`;
const client = axios.create({
    baseURL: `${url}/${apiVersion}`,
});
let token = store.getters['auth/token'];
if(token) {
    client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
} else {
    store.dispatch('auth/loadLocalStoredToken')
    .then(token => {
        client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    });
}

const configHandler = (config) => {
    // store.dispatch('incrementLoading');
    return config;
};

const successHandler = (response) => {
    // store.dispatch('decrementLoading');
    return response.data;
};

const errorHandler = (error) => {
    // store.dispatch('decrementLoading');
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
client.interceptors.request.use(
    config => configHandler(config),
    error => console.log(error)
);
client.interceptors.response.use(
    response => successHandler(response),
    error => errorHandler(error)
);

export default client;
