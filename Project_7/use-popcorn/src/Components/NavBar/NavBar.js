import "../../index.css";
import NavBarLogo from "./NavBarLogo";


const NavBar = ({children}) => {

    return (
        <nav className="nav-bar">
            <NavBarLogo />
            {children}
        </nav>
    );
};

export default NavBar;
