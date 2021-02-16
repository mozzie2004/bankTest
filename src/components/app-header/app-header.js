import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Navbar } from 'react-bootstrap';

const AppHeader = () => {
    return (
        <Navbar bg="dark" variant="dark">
            <Container className="justify-content-start">
                <Link className="mr-3" to="/">BanksManagement</Link>
                <Link to="/">Mortgage calculator</Link>
                <i className="bi bi-pencil"></i>
            </Container>
        </Navbar>
    )
}

export default AppHeader;