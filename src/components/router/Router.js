import {BrowserRouter, Route} from 'react-router-dom';
import React, {Component} from 'react';
import GridIndex from '../grid/GridIndex';
import DepartmentsIndex from '../departments/index/DepartmentsIndex';
import DepartmentEdit from '../departments/edit/DepartmentEdit';
import StaffesIndex from '../staffes/index/StaffesIndex';
import StaffEdit from '../staffes/edit/StaffEdit';
import NavMenu from '../../shared/nav-menu/NavMenu';

class Router extends Component {
    render() {
        return (<BrowserRouter>
            <div>
                <NavMenu/>
                <Route exact path='/' component={GridIndex}/>
                <Route exact path='/departments' component={DepartmentsIndex}/>
                <Route exact path='/departments/add' component={DepartmentEdit}/>
                <Route exact path='/departments/edit/:id' component={DepartmentEdit}/>
                <Route exact path='/staffes' component={StaffesIndex}/>
                <Route exact path='/staffes/add' component={StaffEdit}/>
                <Route exact path='/staffes/edit/:id' component={StaffEdit} />
            </div>
        </BrowserRouter>);
    }
}

export default Router;