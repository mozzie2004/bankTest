import React from 'react';
import { Button, Container, Jumbotron, ListGroup } from 'react-bootstrap';

const BanksManagement = () => {
    return (
        <Jumbotron className="vh-100">
            <Container>
                <div className="d-flex justify-content-end mb-3">
                    <Button>Add new bank</Button>
                </div>
                <ListGroup>
                    <ListGroup.Item className="d-flex justify-content-between">
                        <div>Bank 1</div>
                        <div className="icon-groupe">
                            <i style={{cursor: 'pointer'}} className="bi bi-pencil mr-2"></i>
                            <i style={{cursor: 'pointer'}} className="bi bi-trash"></i>
                        </div>
                    </ListGroup.Item>
                    <ListGroup.Item>Bank 2</ListGroup.Item>
                </ListGroup>
            </Container>
        </Jumbotron>
    )
}

export default BanksManagement;