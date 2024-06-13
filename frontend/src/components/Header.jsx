import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { ACCESS_TOKEN } from '../constants';

function Header() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">Note App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
       
            <Nav.Link href="/calculator">Calculator</Nav.Link>
            <Nav.Link href="/currency">Currency Converter</Nav.Link>
            
          </Nav>
          <Nav className='float-end'>
            {localStorage.getItem(ACCESS_TOKEN) && <Nav.Link href="/logout">Logout</Nav.Link>}
             {!localStorage.getItem(ACCESS_TOKEN) && <Nav.Link href="/login">Login</Nav.Link>}
            <Nav.Link href="/register">Register</Nav.Link>
             </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;