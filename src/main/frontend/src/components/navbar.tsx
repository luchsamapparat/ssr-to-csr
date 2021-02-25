import Link from 'next/link';
import { FunctionComponent } from 'react';
import NavLink from './nav-link';

type NavbarProps = {}

const Navbar: FunctionComponent<NavbarProps> = () => {
    return (
        <nav className="navbar navbar-expand navbar-light bg-light">
            <div className="container">
                <Link href="/">
                    <a className="navbar-brand">📝 To-Do App</a>
                </Link>
                <ul className="navbar-nav collapse navbar-collapse">
                    <li className="nav-item">
                        <NavLink href="/">Tasks</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink href="/tasks/completed">Completed Tasks</NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;