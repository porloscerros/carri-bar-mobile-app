import api from './api';

const resource = '/roles';

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
}
