import React, {Component} from 'react';
import {Glyphicon, Table} from 'react-bootstrap';
import DepartmentService from '../../services/DepartmentService';

class GridIndex extends Component {

    departmentService = null;

    constructor(props) {
        super(props);
        this.departmentService = new DepartmentService();
        this.state = {
            departments: [],
            staffes: []
        };
    }

    /**
     * After component mount method
     */
    componentDidMount = () => {
        this.loadItems();
    };

    /**
     * Before component update method
     *
     * @param nextProps
     * @param nextState
     * @returns {boolean}
     */
    shouldComponentUpdate = (nextProps, nextState) => {
        return nextState.departments.length > 0 && nextState.staffes.length > 0;
    };

    /**
     * Build staffes list
     */
    buildStaffes = () => {
        const staffes = [];
        const staff_ids = [];
        const dl = this.state.departments;
        for(let i = 0, len = dl.length; i < len; i++) {
            let dls = dl[i].staffes || [];
            for(let j = 0, len2 = dls.length; j < len2; j++) {
                if (staff_ids.indexOf(dls[j].id) == -1) {
                    staffes.push(dls[j]);
                    staff_ids.push(dls[j].id);
                }
            }
        }
        this.setState({
            staffes: staffes
        });
    };

    /**
     * Check if department contains staff by id
     *
     * @param department
     * @param staff_id
     * @returns {boolean}
     */
    checkContainsStaffInDepartment = (department, staff_id) => {
        const staffes = department.staffes || [];
        for(let i = 0, len = staffes.length; i < len; i++) {
            if (staffes[i].id == staff_id) return true;
        }
        return false;
    };

    /**
     * Load staffes and departments
     */
    loadItems = () => {
        this.departmentService.departmentsStaffes().then((data) => {
            this.setState({
                departments: data.items
            });
            this.buildStaffes();
        });
    };

    render() {
        return (<div className="GridIndex">
            <h1>Распределение сотрудников по отделам</h1>
            <Table bordered>
                <thead>
                    <tr>
                        <th></th>
                        {this.state.departments.map((item, index) => {
                            return <th className="text-center" key={index}>{item.name}</th>;
                        })}
                    </tr>
                </thead>
                <tbody>
                    {this.state.staffes.map((staff, si) => {
                        return <tr key={si}>
                            <td>{staff.surname + ' ' + staff.name}</td>
                            {this.state.departments.map((dep, di) => {
                                return <td className="text-center" key={di}>
                                    {this.checkContainsStaffInDepartment(dep, staff.id) && <Glyphicon glyph={'ok'}/>}
                                </td>;
                            })}
                        </tr>;
                    })}
                </tbody>
            </Table>
        </div>);
    }
}

export default GridIndex;