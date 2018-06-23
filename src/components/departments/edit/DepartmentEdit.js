import React, { Component } from 'react';
import Validators from '../../../utils/Validators';
import {FormGroup, ControlLabel, FormControl} from 'react-bootstrap';

class DepartmentEdit extends Component {
  
  validator = null;
  validators = {
    name: ['required']
  };
  
  constructor(props) {
    super(props);
    this.validator = new Validators();
    this.state = {
      fields: {}
    };
  }
  
  getValidationState = (fieldName) => {
    if (this.validators[fieldName]) {
      for(let i = 0, len = this.validators[fieldName].length; i < len; i++) {
        let vn = this.validators[fieldName][i];
        if (!this.validator[vn](this.state.fields[fieldName] || '')) return 'error';
      }
    }
    return 'success';
  }
  
  handleChange = (event, fieldName) => {
    let f = this.state.fields;
    f[fieldName] = event.target.value;
    this.setState({
      fields: f
    });
  }
  
  render = () => {
    return (<div className="DepartmentEdit">
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
                    onChange={(event) => {this.handleChange(event, 'name')}}
                  />
                  <FormControl.Feedback />
                </FormGroup>
                <div>
                    
                </div>
            </form>
    </div>);
  }
}

export default DepartmentEdit;