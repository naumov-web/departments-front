class Validators {

    /**
     * Check is value not empty
     *
     * @param value
     * @returns {boolean}
     */
    required = (value) => {
        return value.length !== 0;
    };

    /**
     * Check is value integer
     *
     * @param value
     * @returns {boolean}
     */
    integer = (value) => {
        return parseInt(value) == value;
    }
  
}

export default Validators;