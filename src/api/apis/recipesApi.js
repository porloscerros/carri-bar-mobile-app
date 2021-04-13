import api from '../api';

const resource = '/recipes';

export default  {
    get(params) {
        params = {
            'params': params
        };
        return api.get(`${resource}`, params);
    },
    find(id, params) {
        params = {
            'params': params
        };
        return api.get(`${resource}/${id}`, params);
    },
    create(data) {
        return api.post(`${resource}`, data);
    },
    update(id, data) {
        if (data.constructor.name === "FormData")
            data.append('_method', 'put');
        if (data.constructor.name === "Object")
            data._method = 'put';
        return api.post(`${resource}/${id}`, data);
    },
    delete(id) {
        return api.delete(`${resource}/${id}`);
    },
    getTypes(params) {
        params = {
            'params': params
        };
        return api.get(`${resource}/types`, params);
    },
}
