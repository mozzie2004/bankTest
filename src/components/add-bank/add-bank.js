import React, { useState } from 'react';
import { Form, Button, Jumbotron, Container, Spinner } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';

import firebase from 'firebase';

const AddBank = () => {
    const [bank, setBank] = useState({
        name: '',
        interestRate: '',
        maxLoan: '',
        minPayment: '',
        term: ''
    });

    const [buttonDisabled, setButtonDisabled] = useState(false);

    const params = useParams();
    const history = useHistory();

    const onNameChange = (e) => {
        const value = e.target.value
        switch (e.target.id) {
            case 'name':
                setBank({...bank, name: value})
                break;
            case 'rate':
                setBank({...bank, interestRate: value})
                break;
            case 'loan':
                setBank({...bank, maxLoan: value})
                break;
            case 'payment':
                setBank({...bank, minPayment: value})
                break;
            case 'term':
                setBank({...bank, term: value})
                break;
            
            default:
                setBank({...bank})
        }
    }

    const onSubmit = (e) => {
        e.preventDefault();
        setButtonDisabled(true);
        const db = firebase.firestore();

        db.collection("banks").add(bank)
        .then((docRef) => {
            setButtonDisabled(false);
            history.push('/');
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
        
    }

    const spinner = (
        <Spinner
            className="mr-1"
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"/>
    )

    return(
        <Jumbotron>
            <Container>
                <Form onSubmit={onSubmit}>
                    <Form.Group controlId="name">
                        <Form.Label>Bank name</Form.Label>
                        <Form.Control required onChange={onNameChange} value={bank.name} type="text" />
                    </Form.Group>
                    <Form.Group controlId="rate">
                        <Form.Label>Interest rate</Form.Label>
                        <Form.Control required pattern="[0-9]{1,}" onChange={onNameChange} value={bank.interestRate} type="text" />
                    </Form.Group>
                    <Form.Group controlId="loan">
                        <Form.Label>Maximum loan</Form.Label>
                        <Form.Control required pattern="[0-9]{1,}"  onChange={onNameChange} value={bank.maxLoan} type="text" />
                    </Form.Group>
                    <Form.Group controlId="payment">
                        <Form.Label>Minimum down payment</Form.Label>
                        <Form.Control required pattern="[0-9]{1,}"  onChange={onNameChange} value={bank.minPayment} type="text" />
                    </Form.Group>
                    <Form.Group controlId="term">
                        <Form.Label>Loan term</Form.Label>
                        <Form.Control required pattern="[0-9]{1,}"  onChange={onNameChange} value={bank.term} type="text"  />
                    </Form.Group>
                    <Button disabled={buttonDisabled} variant="primary" type="submit">
                        {buttonDisabled ? spinner : ''}
                         Add bank
                    </Button>
                </Form>
            </Container>
        </Jumbotron>
    )
}

export default AddBank;