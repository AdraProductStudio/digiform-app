import React from 'react'
import Image from '../utils/images';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Button } from 'react-bootstrap';
import CustomButton from '../components/CustomButton';


const Header = () => {
    
    const handleUploadForm = () => {
        alert("Upload form")
    }

    return (
        <Navbar className="header-section" >
            <Container>
                <Navbar.Brand href="#home">
                    <img src={Image.adraLogo} alt="adra-logo" width={60} />
                </Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    <CustomButton 
                        buttonName="Upload Form"
                        className='px-3 btn custom-button'
                        customOnclick={handleUploadForm}
                    />
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header
