import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Glyphicon } from 'react-bootstrap';

class StaffesIndex extends Component {
  render = () => {
    return (<div className="StaffesIndex">
            <h1>Сотрудники</h1>
            <div>
              <Link to="/staffes/edit" className="btn btn-success">
                <Glyphicon glyph="plus" /> 
                Добавить
              </Link>
            </div>
    </div>);
  }
}

export default StaffesIndex;