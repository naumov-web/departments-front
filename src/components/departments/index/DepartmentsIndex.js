import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Glyphicon } from 'react-bootstrap';

class DepartmentsIndex extends Component {
  render() {
    return (<div className="DepartmentsIndex">
            <h1>Отделы</h1>
            <div>
              <Link to="/departments/add" className="btn btn-success">
                <Glyphicon glyph="plus" /> 
                Добавить
              </Link>
            </div>
    </div>);
  }
}

export default DepartmentsIndex;