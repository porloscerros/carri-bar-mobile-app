import * as ApplicationSettings from "application-settings";
import Vue from 'nativescript-vue';
import axios from 'axios'
axios.defaults.withCredentials = true;

export default {
    namespaced: true,

    state: {
        authenticated: false,
        user: null,
        token: null,
    },

    getters: {
        authenticated (state) {
            return state.authenticated
        },
        user (state) {
            return state.user
        },
        token (state) {
            return state.token
        },
    },

    mutations: {
        SET_AUTHENTICATED (state, value) {
            state.authenticated = value
        },

        SET_USER (state, value) {
            state.user = value
        },

        SET_TOKEN (state, value) {
            state.token = value
        }
    },

    actions: {
        loadLocalStoredToken({ commit, dispatch, state }) {
            console.log('store.auth action loadLocalStoredToken')
            let token = null;
            const storedState = ApplicationSettings.getString("token");
            console.log('storedState', storedState)
            if(storedState) token = JSON.parse(storedState);
            if(token) {
                commit('SET_TOKEN', token);
                console.log('state.token =', state.token)
                dispatch('me');
                return token;
            }
            console.log('state.token =', state.token)
            return null;
        },
        async signIn ({ commit, dispatch, rootGetters }, credentials) {
            // dispatch('incrementLoading', null, {root: true});
            try {
                let url = `${rootGetters.apiBaseUrl}/sanctum/token`;
                let response = await axios.post(url, credentials);
                commit('SET_TOKEN', response.data);
                ApplicationSettings.setString("token", JSON.stringify(response.data));
                return dispatch('me');
            } catch (error) {
                console.error(error);
                /*
                let messageData = Object.create(null);
                messageData.title = 'ocurrió un error en la solicitud!';
                messageData.content = '';
                if (error.response) {
                    if(error.response.status === 401) {
                        messageData.title = 'no autorizado';
                    }
                    if(error.response.status === 404) {
                        messageData.title = 'dirección no encontrada!';
                    }
                    if(error.response.status === 422) {
                        messageData.title = 'revisa los siguientes datos!';
                        messageData.content = error.response.data.errors;
                    }
                } else if (error.request) {
                    messageData.title = 'sin respuesta del servidor!';
                }
                console.log(messageData.title, messageData.content);
                */
                return Promise.reject(new Error(error.response));
            }
            // dispatch('decrementLoading', null, {root: true});
        },
        async signOut ({ dispatch, commit }) {
            console.log('store.auth signOut')
            await axios.post('/api/logout');
            commit('SET_TOKEN', null);
            ApplicationSettings.remove("token");
            return dispatch('me');
        },
        me ({ state, commit, dispatch, rootGetters }) {
            // dispatch('incrementLoading', null, {root: true});
            axios.defaults.headers.common['Authorization'] = `Bearer ${state.token}`;
            axios.defaults.headers.common['Accept'] = 'application/json';
            return axios.get(`${rootGetters.apiBaseUrl}/v1/users/me`).then((response) => {
                commit('SET_AUTHENTICATED', true);
                commit('SET_USER', response.data.data);
            }).catch((error) => {
                console.log(error);
                commit('SET_AUTHENTICATED', false);
                commit('SET_USER', null);
                commit('SET_TOKEN', null);
            })
            // dispatch('decrementLoading', null, {root: true});
        },
        async forgotPassword ({ dispatch }, credentials) {
            dispatch('incrementLoading', null, {root: true});
            try {
                let response = await axios.post('/forgot-password', credentials);
                dispatch('decrementLoading', null, {root: true});
                return response;
            } catch (error) {
                dispatch('decrementLoading', null, {root: true});
                if (error.response && error.response.status === 422) {
                    return Promise.reject(new Error(error.response.data.errors.email[0]));
                }
                console.log(error);
                return Promise.reject(new Error(error.response.status));
            }
        },
        async resetPassword ({ dispatch }, credentials) {
            dispatch('incrementLoading', null, {root: true});
            try {
                let response = await axios.post('/reset-password', credentials);
                dispatch('decrementLoading', null, {root: true});
                return response;
            } catch (error) {
                dispatch('decrementLoading', null, {root: true});
                if (error.response && error.response.status === 422) {
                    return Promise.reject(new Error(error.response.data.errors));
                }
                console.log(error);
                return Promise.reject(new Error(error.response.status));
            }
        },
    }
}
