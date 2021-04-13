
import inventories from './apis/inventoriesApi';
import recipes from './apis/recipesApi';
import sales from './apis/salesApi';
import roles from './apis/rolesApi';
import users from './apis/usersApi';

const repositories = {
    inventories: inventories,
    //recipes: recipes,
    //sales: sales,
    roles: roles,
    users: users,
};

export const apiFactory = {
    get: name => repositories[name]
};
