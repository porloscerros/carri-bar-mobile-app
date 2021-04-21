import * as ApplicationSettings from "application-settings";
import axios from 'axios';

export default {
    namespaced: true,

    state: {
        authenticated: true,
        user: null,
        token: null,
        authenticating: true,
    },

    getters: {
        authenticated (state) {
            return state.authenticated
        },
        isAuthenticating (state) {
            return state.authenticating
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
        SET_AUTHENTICATING (state, value) {
            state.authenticating = value
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
            console.log('store.auth action loadLocalStoredToken');
            let token = null;
            const storedState = ApplicationSettings.getString("token");
            console.log('local storedState', storedState)
            if(storedState) token = JSON.parse(storedState);
            if(token)
                commit('SET_TOKEN', token);
        },
        async me ({ state, commit, dispatch, rootGetters }) {
            commit('SET_AUTHENTICATING', true);
            axios.defaults.headers.common['Authorization'] = `Bearer ${state.token}`;
            axios.defaults.headers.common['Accept'] = 'application/json';
            return await axios.get(`${rootGetters.apiBaseUrl}/v1/users/me`).then((response) => {
                console.log('store.auth me response', response.data.data);
                commit('SET_AUTHENTICATED', true);
                commit('SET_USER', response.data.data);
                commit('SET_AUTHENTICATING', false);
            }).catch((error) => {
                console.error('store.auth me error', error);
                console.error(error.data);
                commit('SET_AUTHENTICATED', false);
                commit('SET_USER', null);
                commit('SET_TOKEN', null);
                commit('SET_AUTHENTICATING', false);
            })
        },
        async signIn ({ commit, dispatch, rootGetters }, credentials) {
            // dispatch('incrementLoading', null, {root: true});
            try {
                let url = `${rootGetters.apiBaseUrl}/sanctum/token`;
                let data = JSON.stringify(credentials);
                const headers = {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                };
                let response = await axios.post(url, data, {
                    headers: headers
                });
                // let response = await axios.post(url, credentials);
                console.log('store.auth signIn response.data', response.data)
                commit('SET_TOKEN', response.data);
                ApplicationSettings.setString("token", JSON.stringify(response.data));
                return dispatch('me');
            } catch (error) {
                console.error('store.auth signIn error', error);
                console.error(error.response.data);
                console.log(Object.keys(error.response))
                //[data, status, statusText, headers, config, request]
                return error;
            }
            // dispatch('decrementLoading', null, {root: true});
        },
        async signOut ({ dispatch, commit }) {
            console.log('store.auth signOut')
            await axios.post('/logout/');
            commit('SET_TOKEN', null);
            ApplicationSettings.remove("token");
            return dispatch('me');
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
