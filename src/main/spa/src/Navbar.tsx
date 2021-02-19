import React, { FunctionComponent } from 'react';
import { NavLink } from 'react-router-dom';

type NavbarProps = {}

const Navbar: FunctionComponent<NavbarProps> = () => (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
            <a className="navbar-brand" href="/">📝 To-Do App</a>
            <ul className="navbar-nav collapse navbar-collapse">
                <li className="nav-item">
                    <NavLink className="nav-link" activeClassName="active" exact={true} to="/">Tasks</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" activeClassName="active" exact={true} to="/tasks/completed">Completed Tasks</NavLink>
                </li>
            </ul>
        </div>
    </nav>
);

export default Navbar;
