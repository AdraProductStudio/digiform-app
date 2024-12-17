import React from 'react'
import Image from '../utils/images';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Button } from 'react-bootstrap';


const Header = () => {
    return (
        <Navbar className="bg-body-tertiary header-section" >
            <Container>
                <Navbar.Brand href="#home">
                    <img src={Image.adraLogo} alt="adra-logo" width={60} />
                </Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <Button variant="primary" className='px-3'>Upload Form</Button>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header
