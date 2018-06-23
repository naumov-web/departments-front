import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NavMenu extends Component {
  render() {
    return (<div className="NavMenu">
            <Link className="btn btn-link" to="/">Сетка</Link>
            <Link className="btn btn-link" to="/staffes">Сотрудники</Link>
            <Link className="btn btn-link" to="/departments">Отделы</Link>
    </div>);
  }
}

export default NavMenu;