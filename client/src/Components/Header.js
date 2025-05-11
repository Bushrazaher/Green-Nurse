import { Navbar, Nav, NavItem } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
//import { logout } from "../Features/UserSlice"; 
import { useDispatch } from "react-redux";


const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    
      <Navbar className="header">
        <Nav>
          <NavItem>
            <Link>
             <Link to="/login"></Link>
            </Link>
          </NavItem>
          <NavItem>
            <Link to="/">Home</Link>
          </NavItem>
          <NavItem>
            <Link to="/car1">Car</Link>
          </NavItem>
          <NavItem>
            <Link to="/profile">Profile</Link>
          </NavItem>
          <NavItem>
            <Link to="/comment">Feedback</Link>
          </NavItem>
          <NavItem>
           
          </NavItem>
        </Nav>
      </Navbar>
    
  );
};

export default Header;
