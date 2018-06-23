import Axios from 'axios';
import ApiConfig from '../config/api';

class CoreHttpService {
  
    /**
     * Send GET request
     *
     * @param {*} data - HTTP-request params
     * @returns {Promise}
     */
    sendGet = (data) => {
        data['method'] = 'get';
        data['headers'] = {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
        };
        return this.send(data);
    };

    /**
     * Send POST request
     *
     * @param {*} data - HTTP-request params
     * @returns {Promise}
     */
    sendPost = (data) => {
        data['method'] = 'post';
        this.addJsonHeaders(data);
        return this.send(data);
    };

    /**
     * Send PUT request
     *
     * @param {*} data - HTTP-request params
     * @returns {Promise}
     */
    sendPut = (data) => {
        data['method'] = 'put';
        this.addJsonHeaders(data);
        return this.send(data);
    };

    /**
     * Send DELETE request
     *
     * @param {*} data - HTTP-request params
     * @returns {Promise}
     */
    sendDelete = (data) => {
        data['method'] = 'delete';
        this.addJsonHeaders(data);
        return this.send(data);
    };
  
    /**
     * Send request to server
     *
     * @param {*} data - HTTP-request params
     */
    send = (data) => {
        data['baseURL'] = ApiConfig['BaseURL'];
        const method = data['method'];
        if (method === 'get' || method === 'delete')
        {
            return Axios[method](
                data['baseURL'] + data['url'],
                {
                    "headers": data['headers']
                }
            ).then((res) => {
                return res.data;
            }).catch((error) => {
                this.errorHandler(error);
            });
        }
        else {
            return Axios[method](
                data['baseURL'] + data['url'],
                data['data'] || {},
                {
                    "headers": data['headers']
                }
            ).then((res) => {
                return res.data;
            }).catch((error) => {
                this.errorHandler(error);
            });
        }
    };
  
    /**
     * Add headers for json-request
     *
     * @param {*} data - HTTP-request params
     */
    addJsonHeaders = (data) => {
        data['headers'] = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };
    };

    /**
     * Error handler function
     *
     * @param {*} error - error params
     */
    errorHandler = (error) => {
        if (error.response) {}
    };
  
}

export default CoreHttpService;