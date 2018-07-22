import CoreHttpService from './CoreHttpService';

const getStaffes = '/api/staffes';
const getStaff = '/api/staffes/{id}';
const createStaff = '/api/staffes';
const updateStaff = '/api/staffes/{id}';
const deleteStaff = '/api/staffes/{id}';

class StaffService extends CoreHttpService {

    /**
     * Get staffes list
     *
     * @param params
     * @returns {Promise}
     */
    list = (params = null) => {
        return this.sendGet({
            url: getStaffes
        });
    };

    /**
     * Get one staff info
     *
     * @param id
     * @returns {Promise}
     */
    item = (id) => {
        return this.sendGet({
            url: getStaff.replace('{id}', id)
        });
    };

    /**
     * Create staff
     *
     * @param data
     * @returns {Promise}
     */
    create = (data) => {
        return this.sendPost({
            url: createStaff,
            data: data
        });
    };

    /**
     * Update staff
     *
     * @param id
     * @param data
     * @returns {Promise}
     */
    update = (id, data) => {
        return this.sendPut({
            url: updateStaff.replace('{id}', id),
            data: data
        });
    };

    /**
     * Delete staff by id
     *
     * @param id
     * @returns {Promise}
     */
    delete = (id) => {
        return this.sendDelete({
            url: deleteStaff.replace('{id}', id)
        });
    }

}

export default StaffService;