import React from 'react';
import FormComponent from '../../form/Form';
import StaffService from "../../../services/StaffService";
import DepartmentService from '../../../services/DepartmentService';
import HandbookService from '../../../services/HandbookService';
import {Link, Redirect} from 'react-router-dom';
import {FormGroup, ControlLabel, FormControl, Button, Glyphicon} from 'react-bootstrap';
import Preloader from '../../../shared/preloader/Preloader';

class StaffEdit extends FormComponent {

    validators = {
        name: ['required'],
        surname: ['required'],
        gender_id: ['required'],
        salary: ['integer'],
        department_ids: ['required']
    };
    editModeTitle = 'Редактирование сотрудника';
    departmentService = null;
    handbookService = null;

    /**
     * Constructor for component
     *
     * @param props
     */
    constructor(props) {
        super(props);
        this.service = new StaffService();
        this.departmentService = new DepartmentService();
        this.handbookService = new HandbookService();
        this.mergeState({
            title: 'Добавление сотрудника',
            departments: [],
            gender: []
        });
    }

    /**
     * Transform loaded fields
     *
     * @param fields
     * @returns {*}
     */
    prepareLoadedItem = (fields) => {
        let department_ids = [];
        let departments = fields.departments || [];
        for(let i = 0, len = departments.length; i < len; i++)
        {
            department_ids.push(departments[i].id);
        }
        fields.department_ids = department_ids;
        return fields;
    };

    /**
     * Load custom data for form
     */
    loadHandbooks = () => {
        this.departmentService.list().then(
            (data) => {
                if (data.items) {
                    this.setState({
                        departments: data.items
                    });
                }
            }
        );
        this.handbookService.getGenderTypes().then(
            (data) => {
                if (data) {
                    this.setState({
                        gender: data
                    });
                }
            }
        );
    };

    /**
     * Set or delete id from "department_ids" array
     *
     * @param id
     * @param event
     */
    setDepartmentExists = (id, event) => {
        let checked = event.target.checked;
        let f = this.state.fields;
        let department_ids = f.department_ids || [];
        if (checked) {
            department_ids.push(id);
        }
        else {
            for(let i = 0, len = department_ids.length; i < len; i++) {
                if (department_ids[i] === id) {
                    department_ids.splice(i, 1);
                    break;
                }
            }
        }
        f.department_ids = department_ids;
        this.setState({
            fields: f
        });
        this.refreshValidFlag();
    };

    /**
     * Check is department`s id exists
     *
     * @param id
     * @returns {boolean}
     */
    checkIsDepartmentIdExists = (id) => {
        let department_ids = this.state.fields.department_ids || [];
        return department_ids.indexOf(id) !== -1;
    };

    render() {
        if (this.state.redirectToList)
            return (<Redirect to="/staffes"/>);
        return (<div className="StaffEdit">
            <h1>{this.state.title}</h1>
            <form>
                <FormGroup
                    controlId="staffName"
                    validationState={this.getValidationState('name')}
                >
                    <ControlLabel>Имя</ControlLabel>
                    <FormControl
                        type="text"
                        value={this.state.fields.name || ''}
                        placeholder="Введите имя сотрудника"
                        onChange={(event) => {
                            this.handleChange(event, 'name')
                        }}
                    />
                    <FormControl.Feedback/>
                </FormGroup>
                <FormGroup
                    controlId="staffSurname"
                    validationState={this.getValidationState('surname')}
                >
                    <ControlLabel>Фамилия</ControlLabel>
                    <FormControl
                        type="text"
                        value={this.state.fields.surname || ''}
                        placeholder="Введите фамилию сотрудника"
                        onChange={(event) => {
                            this.handleChange(event, 'surname')
                        }}
                    />
                    <FormControl.Feedback/>
                </FormGroup>
                <FormGroup
                    controlId="staffLastname"
                    validationState={this.getValidationState('lastname')}
                >
                    <ControlLabel>Отчество</ControlLabel>
                    <FormControl
                        type="text"
                        value={this.state.fields.lastname || ''}
                        placeholder="Введите отчество сотрудника"
                        onChange={(event) => {
                            this.handleChange(event, 'lastname')
                        }}
                    />
                    <FormControl.Feedback/>
                </FormGroup>
                <FormGroup
                    controlId="staffGender"
                    validationState={this.getValidationState('gender_id')}
                >
                    <ControlLabel>Пол</ControlLabel>
                    <FormControl componentClass="select"
                                 defaultValue={this.state.fields.gender_id}
                                 onChange={(event) => {
                                     this.handleChange(event, 'gender_id')
                                 }}
                                 placeholder="Выберите пол сотрудника">
                        <option value=""> --- </option>
                        {this.state.gender.map((item, index) => {
                            return <option key={index} selected={this.state.fields.gender_id == item.id} value={item.id}>{item.name}</option>;
                        })}
                    </FormControl>
                </FormGroup>
                <FormGroup
                    controlId="staffSalary"
                    validationState={this.getValidationState('salary')}
                >
                    <ControlLabel>Заработная плата</ControlLabel>
                    <FormControl
                        type="text"
                        value={this.state.fields.salary || ''}
                        placeholder="Введите заработную плату сотрудника"
                        onChange={(event) => {
                            this.handleChange(event, 'salary')
                        }}
                    />
                    <FormControl.Feedback/>
                </FormGroup>
                <FormGroup>
                    <ControlLabel>Отделы</ControlLabel>
                    {this.state.departments.map((item, index) => {
                        return <div key={index}>
                            <label><input type="checkbox"
                                          checked={this.checkIsDepartmentIdExists(item.id)}
                                          onClick={(event) => {
                                this.setDepartmentExists(item.id, event)
                            }} /> {item.name}</label>
                        </div>;
                    })}
                </FormGroup>
                <div>
                    <Button bsStyle="success" disabled={!this.state.valid} onClick={this.saveEntity}>
                        <Glyphicon glyph="ok"/> Сохранить
                    </Button>
                    <Link to="/staffes" className="btn btn-default cancel-link">
                        <Glyphicon glyph="chevron-left"/> Отмена
                    </Link>
                </div>
            </form>
            {this.state.isLoading && <Preloader/>}
        </div>);
    }
}

export default StaffEdit;