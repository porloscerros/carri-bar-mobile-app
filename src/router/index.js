import Home from '~/pages/Home'
import Recipes from '~/pages/recipes/List'
import Sales from '~/pages/sales/List'
import Login from '~/pages/auth/Login'
import InventoryList from '~/components/inventories/List'
import InventoryDetails from '~/components/inventories/Detail'
import InventoryEdit from '~/components/inventories/Edit'

const routes = {
    Home,
    InventoryList,
    InventoryDetails,
    InventoryEdit,
    Recipes,
    Sales,
    Login,
};

export default routes