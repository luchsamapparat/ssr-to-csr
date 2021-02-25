import { useRouter } from 'next/router';
import { FunctionComponent, MouseEvent } from 'react';

type NavLinkProps = { href: string };

const NavLink: FunctionComponent<NavLinkProps> = ({ children, href }) => {
    const router = useRouter()

    const isActive = router.pathname === href;

    const handleClick = (e: MouseEvent) => {
        e.preventDefault()
        router.push(href)
    }

    return (
        <a href={href} onClick={handleClick} className={`nav-link ${isActive ? 'active' : ''}`} aria-current={isActive ? 'page' : undefined}>
            {children}
        </a>
    )
}

export default NavLink