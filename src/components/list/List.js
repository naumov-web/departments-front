import {Component} from 'react';

class ListComponent extends Component {

    confirmMessage = null;

    /**
     * Component did mount event
     */
    componentDidMount = () => {
        this.loadItems();
    };

    /**
     * Load items from server
     */
    loadItems = () => {
        this.setState({isLoading: true});
        this.service.list().then((data) => {
            if (data && data.items) {
                this.setState({
                    items: data.items,
                    isLoading: false
                })
            }
        });
    };

    /**
     * Delete item
     *
     * @param id
     */
    deleteItem = (id) => {
        if (window.confirm(this.confirmMessage)) {
            this.setState({isLoading: true});
            this.service.delete(id).then((data) => {
                if (!data && this.deleteErrorHandler) {
                    this.deleteErrorHandler(data);
                }
                this.loadItems();
            });
        }
    };

}

export default ListComponent;