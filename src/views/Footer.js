import React from 'react'
import { Container, Navbar } from 'react-bootstrap'

const Footer = () => {
    return (
        <Navbar className="bg-light footer-section">
            <Container className='justify-content-center'>
                <Navbar.Text >
                    Copyright ©2025 Powered by  <a href="#login" target='_blank'>ADRA</a>
                </Navbar.Text>
            </Container>
        </Navbar>
    )
}

export default Footer
