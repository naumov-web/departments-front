import CoreHttpService from './CoreHttpService';

const getGender = '/api/handbook/gender';

class HandbookService extends CoreHttpService {

    /**
     * Get gender types
     *
     * @returns {Promise}
     */
    getGenderTypes = () => {
        return this.sendGet({
            url: getGender
        })
    }

}

export default HandbookService;