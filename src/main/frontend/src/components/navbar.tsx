import { FunctionComponent } from 'react';
import { Link, NavLink } from 'remix';

type NavbarProps = {}

const Navbar: FunctionComponent<NavbarProps> = () => {
    return (
        <nav className="navbar navbar-expand navbar-light bg-light">
            <div className="container">
                <Link to="/" className="navbar-brand">📝 To-Do App</Link>
                <ul className="navbar-nav collapse navbar-collapse">
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/">Tasks</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/tasks/completed">Completed Tasks</NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;