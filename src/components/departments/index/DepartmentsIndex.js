import React from 'react';
import {Link} from 'react-router-dom';
import {Glyphicon, Table, Button, Modal} from 'react-bootstrap';
import Preloader from '../../../shared/preloader/Preloader';
import DepartmentService from '../../../services/DepartmentService';
import './departmentsIndex.css';
import ListComponent from "../../list/List";

class DepartmentsIndex extends ListComponent {

    service = null;
    confirmMessage = 'Вы уверены, что хотите удалить отдел?';

    /**
     * Constructor for component
     *
     * @param props
     */
    constructor(props) {
        super(props);
        this.service = new DepartmentService();
        this.state = {
            items: [],
            isLoading: false,
            errorMessageVisible: false
        };
    }

    /**
     * On delete entity handler
     *
     * @param error
     */
    deleteErrorHandler = (error) => {
        this.setState({
            errorMessageVisible: true
        });
    };

    /**
     * Close modal block
     */
    closeModal = () => {
        this.setState({
            errorMessageVisible: false
        });
    };

    render() {
        return (<div className="DepartmentsIndex">
            <h1>Отделы</h1>
            <div>
                <Link to="/departments/add" className="btn btn-success">
                    <Glyphicon glyph="plus"/>
                    Добавить
                </Link>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Наименование</th>
                        <th>Количество сотрудников</th>
                        <th>Максимальная ЗП</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                {this.state.items.map((item, index) => {
                    return <tr key={index}>
                        <td>{item.name}</td>
                        <td>{item.staffes_count}</td>
                        <td>{item.max_salary}</td>
                        <td>
                            <Link to={'/departments/edit/' + item.id} className="btn btn-primary">
                                <Glyphicon glyph="edit"/>
                            </Link>
                        </td>
                        <td>
                            <Button bsStyle="danger" onClick={() => {this.deleteItem(item.id)}}>
                                <Glyphicon glyph="remove"/>
                            </Button>
                        </td>
                    </tr>;
                })}
                </tbody>
            </Table>
            {this.state.isLoading && <Preloader/>}
            <Modal show={this.state.errorMessageVisible}>
                <Modal.Header closeButton>
                    <Modal.Title>Ошибка сервера</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        Невозможно удалить отдел, в котором есть сотрудники. Пожалуйста, удалите сотрудников из отдела, который вы хотите удалить.
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.closeModal}>Закрыть</Button>
                </Modal.Footer>
            </Modal>
        </div>);
    }
}

export default DepartmentsIndex;