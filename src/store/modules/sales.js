import * as ApplicationSettings from "application-settings";
import axios from 'axios';
import {
    saleInitialState,
    recipeInitialState,
} from '../constants/sales';

export default {
    namespaced: true,

    state: {
        sale: saleInitialState,
        recipe: recipeInitialState,
        recipes: [],
    },

    getters: {
        sale (state) {
            return state.sale
        },
        form (state) {
            return state.sale
        },
        kitchenRecipes(state) {
            return state.recipes.filter(item => {
                return item.type.keyname === 'food';
            });
        },
        barRecipes(state) {
            return state.recipes.filter(item => {
                return item.type.keyname === 'bar';
            });
        },
        recipe (state) {
            return state.recipe;
        },
    },

    mutations: {
        SET_SALE (state, payload) {
            state.sale = Object.assign({}, state.sale, payload);
        },
        SET_SALE_INITIAL_STATE (state) {
            state.sale = saleInitialState;
        },
        ADD_SALE_RECIPE (state, payload) {
            state.sale.recipes.push(payload);
        },
        SET_RECIPE (state, payload) {
            console.log('SET_RECIPE payload',payload);
            state.recipe = Object.assign({}, state.recipe, payload);
            console.log('SET_RECIPE state.sale',state.recipe);
        },
        SET_RECIPES (state, payload) {
            state.recipes = payload
        },
    },

    actions: {
        setSale({ commit }, obj) {
            commit('SET_SALE', obj)
        },
        setSaleInitialState({ commit }) {
            commit('SET_SALE_INITIAL_STATE')
        },
        addSaleRecipe({ commit }, obj) {
            commit('ADD_SALE_RECIPE', obj)
        },
        setRecipe({ commit }, obj) {
            commit('SET_RECIPE', obj)
        },
        setRecipes({ commit }, data) {
            commit('SET_RECIPES', data)
        },
        getSale({ commit }, obj) {
            commit('SET_SALE', obj)
        },
    }
}
