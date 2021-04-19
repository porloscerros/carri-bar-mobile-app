import Home from '~/pages/Home'
import Recipes from '~/pages/recipes/List'
import Sales from '~/pages/sales/List'
import Login from '~/pages/auth/Login'
import InventoryList from '~/components/inventories/List'
import InventoryCreate from '~/components/inventories/Create'
import InventoryDetail from '~/components/inventories/Detail'
import InventoryEdit from '~/components/inventories/Edit'
import TestPicker from '~/components/inputs/SelectPicker'

const routes = {
    Home,
    InventoryList,
    InventoryCreate,
    InventoryDetail,
    InventoryEdit,
    Recipes,
    Sales,
    Login,
    TestPicker,
};

export default routes