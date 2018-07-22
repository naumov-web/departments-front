import CoreHttpService from './CoreHttpService';

const getDepartments = '/api/departments';
const getDepartmentsStaffes = '/api/departments-staffes';
const getDepartment = '/api/departments/{id}';
const createDepartment = '/api/departments';
const updateDepartment = '/api/departments/{id}';
const deleteDepartment = '/api/departments/{id}';

class DepartmentService extends CoreHttpService {

    /**
     * Get departments list
     *
     * @param params
     * @returns {Promise}
     */
    list = (params = null) => {
        return this.sendGet({
            url: getDepartments
        });
    };

    /**
     * Get departments list with staffes
     *
     * @returns {Promise}
     */
    departmentsStaffes = () => {
        return this.sendGet({
            url: getDepartmentsStaffes
        });
    };

    /**
     * Get one department info
     *
     * @param id
     * @returns {Promise}
     */
    item = (id) => {
        return this.sendGet({
            url: getDepartment.replace('{id}', id)
        });
    };

    /**
     * Create department
     *
     * @param data
     * @returns {Promise}
     */
    create = (data) => {
        return this.sendPost({
            url: createDepartment,
            data: data
        });
    };

    /**
     * Update department
     *
     * @param id
     * @param data
     * @returns {Promise}
     */
    update = (id, data) => {
        return this.sendPut({
            url: updateDepartment.replace('{id}', id),
            data: data
        });
    };

    /**
     * Delete department by id
     *
     * @param id
     * @returns {Promise}
     */
    delete = (id) => {
        return this.sendDelete({
            url: deleteDepartment.replace('{id}', id)
        });
    }

}

export default DepartmentService;