import 'moment';
import moment from "moment";

export const saleInitialState = {
    id: null,
    date: moment().format('YYYY-MM-DD HH:mm'),
    table: '',
    total: 0,
    recipes: [],
};

export const recipeInitialState = {
    recipe: {
        id: null,
        name: ""
    },
    quantity: 0,
    price: 0,
    recipe_id: null
};