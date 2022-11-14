import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function NavBar() {
  const { currentUser, logout } = useAuth();
  const [user, setUser] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    currentUser? setUser(true) : setUser(false);
    }, [currentUser])
  
  
  
  return (
    <Navbar>
      <Container>
        <Link to="/">
          <Navbar.Brand href="/">BadBank</Navbar.Brand>
        </Link>
        <Nav className="me-auto">
            <Nav.Link disabled={user} href="/login">Log In</Nav.Link> 
            <Nav.Link disabled={user} href="/signup">Sign Up</Nav.Link>
            <Nav.Link disabled={!user} href="/deposit">Deposit</Nav.Link>
            <Nav.Link disabled={!user} href="/withdraw">Withdraw</Nav.Link>
            <Nav.Link disabled={!user} onClick={() => {
              logout();
              navigate('/login');
            }} >Logout</Nav.Link>            
        </Nav>

        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
             {currentUser?.email}
            </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
