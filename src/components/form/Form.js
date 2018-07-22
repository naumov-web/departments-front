import {Component} from 'react';
import Validators from '../../utils/Validators';

class FormComponent extends Component {

    validator = null;
    service = null;
    validators = {};

    /**
     * Constructor for component
     *
     * @param props
     */
    constructor(props) {
        super(props);
        this.validator = new Validators();
        this.state = {
            fields: {},
            isLoading: false,
            valid: false,
            redirectToList: false
        };
    }

    /**
     * Merge state of "this" and state of child component
     *
     * @param childState
     */
    mergeState = (childState) => {
        for(let key in childState) {
            this.state[key] = childState[key];
        }
    };


    /**
     * Component did mount event handler
     */
    componentDidMount = () => {
        if (this.props.match &&
            this.props.match.params &&
            this.props.match.params['id']
        ) {
            this.setState({
                isLoading: true,
                title: this.editModeTitle
            });
            this.service.item(this.props.match.params['id']).then((data) => {
                this.setState({
                    isLoading: false,
                    fields: this.prepareLoadedItem ? this.prepareLoadedItem(data) : data
                });
                this.refreshValidFlag();
            });
        }
        if (this.loadHandbooks) {
            this.loadHandbooks();
        }
    };

    /**
     * Refresh "valid" flag in state
     */
    refreshValidFlag = () => {
        for (let k in this.state.fields) {
            let vs = this.getValidationState(k);
            if (vs === 'error') {
                this.setState({
                    valid: false
                });
                return;
            }
        }
        this.setState({
            valid: true
        });
    };

    /**
     * Get validation state by field name
     *
     * @param fieldName
     * @returns {string}
     */
    getValidationState = (fieldName) => {
        if (this.validators[fieldName]) {
            for (let i = 0, len = this.validators[fieldName].length; i < len; i++) {
                let vn = this.validators[fieldName][i];
                if (!this.validator[vn](this.state.fields[fieldName] || '')) return 'error';
            }
        }
        return 'success';
    }

    /**
     * On "change" event handler
     *
     * @param event
     * @param fieldName
     */
    handleChange = (event, fieldName) => {
        let f = this.state.fields;
        f[fieldName] = event.target.value;
        this.setState({
            fields: f
        });
        this.refreshValidFlag();
    }


    /**
     * Save entity
     */
    saveEntity = () => {
        this.setState({isLoading: true});
        if (this.state.fields.id) {
            this.service.update(this.state.fields.id, this.state.fields).then((data) => {
                this.redirectToList();
            });
        } else {
            this.service.create(this.state.fields).then((data) => {
                this.redirectToList();
            });
        }
    };

    /**
     * Redirect to entities list
     */
    redirectToList = () => {
        this.setState({
            redirectToList: true
        });
    };

};

export default FormComponent;