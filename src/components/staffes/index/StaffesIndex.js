import React from 'react';
import {Link} from 'react-router-dom';
import {Glyphicon, Table, Button} from 'react-bootstrap';
import ListComponent from '../../list/List';
import StaffService from "../../../services/StaffService";

class StaffesIndex extends ListComponent {

    service = null;
    confirmMessage = 'Вы уверены, что хотите удалить сотрудника?';

    /**
     * Constructor for component
     *
     * @param props
     */
    constructor(props) {
        super(props);
        this.service = new StaffService();
        this.state = {
            items: [],
            isLoading: false
        };
    }

    render = () => {
        return (<div className="StaffesIndex">
            <h1>Сотрудники</h1>
            <div>
                <Link to="/staffes/add" className="btn btn-success">
                    <Glyphicon glyph="plus"/>
                    Добавить
                </Link>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Фамилия</th>
                        <th>Имя</th>
                        <th>Отчество</th>
                        <th>Пол</th>
                        <th>Заработная плата</th>
                        <th>Отделы</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                {this.state.items.map((item, index) => {
                    return <tr key={index}>
                        <td>{item.surname}</td>
                        <td>{item.name}</td>
                        <td>{item.lastname}</td>
                        <td>{item.gender}</td>
                        <td>{item.salary}</td>
                        <td>{item.departmentNames}</td>
                        <td>
                            <Link to={'/staffes/edit/' + item.id} className="btn btn-primary">
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
        </div>);
    }
}

export default StaffesIndex;