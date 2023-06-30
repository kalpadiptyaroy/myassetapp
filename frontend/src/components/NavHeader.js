import { Nav, Navbar, Button } from 'rsuite';
import HomeIcon from '@rsuite/icons/legacy/Home';
import { useNavigate } from 'react-router-dom';

function NavHeader() {
    const navigate = useNavigate();
    const signUpButtonClickHandler = () => navigate("/signup");

    return (
        <Navbar>
            <Navbar.Brand href="#">ASSET MANAGER</Navbar.Brand>
            <Nav justified>
                <Nav.Item icon={<HomeIcon />}>Home</Nav.Item>
                <Nav.Item>About</Nav.Item>
            </Nav>
            <Nav style={{paddingTop: "8px", paddingRight: "15px"}} pullRight>
                <Button appearance='primary' color='green' onClick={signUpButtonClickHandler}>Sign Up</Button>
            </Nav>
        </Navbar>
    );
}

export default NavHeader;