import React from 'react';
import FormComponent from '../../form/Form';
import DepartmentService from '../../../services/DepartmentService';
import {Link, Redirect} from 'react-router-dom';
import {FormGroup, ControlLabel, FormControl, Button, Glyphicon} from 'react-bootstrap';
import Preloader from '../../../shared/preloader/Preloader';
import './departmentsEdit.css';

class DepartmentEdit extends FormComponent {

    validators = {
        name: ['required']
    };
    editModeTitle = 'Редактирование отдела';

    /**
     * Constructor for component
     *
     * @param props
     */
    constructor(props) {
        super(props);
        this.service = new DepartmentService();
        this.mergeState({
            title: 'Добавление отдела'
        });
    }

    render = () => {
        if (this.state.redirectToList)
            return (<Redirect to="/departments"/>);
        return (<div className="DepartmentEdit">
            <h1>{this.state.title}</h1>
            <form>
                <FormGroup
                    controlId="formBasicText"
                    validationState={this.getValidationState('name')}
                >
                    <ControlLabel>Наименование отдела</ControlLabel>
                    <FormControl
                        type="text"
                        value={this.state.fields.name || ''}
                        placeholder="Введите наименование отдела"
                        onChange={(event) => {
                            this.handleChange(event, 'name')
                        }}
                    />
                    <FormControl.Feedback/>
                </FormGroup>
                <div>
                    <Button bsStyle="success" disabled={!this.state.valid} onClick={this.saveEntity}>
                        <Glyphicon glyph="ok"/> Сохранить
                    </Button>
                    <Link to="/departments" className="btn btn-default cancel-link">
                        <Glyphicon glyph="chevron-left"/> Отмена
                    </Link>
                </div>
            </form>
            {this.state.isLoading && <Preloader/>}
        </div>);
    }
}

export default DepartmentEdit;