import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Form, Button, Jumbotron, Container, Spinner, Alert } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';

import firebase from 'firebase';

const AddBank = ({banks}) => {
    const [bank, setBank] = useState({
        name: '',
        interestRate: '',
        maxLoan: '',
        minPayment: '',
        term: ''
    });

    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [showAlert, setShowAlert] = useState(false)

    const params = useParams();
    const history = useHistory();

    useEffect(()=>{
        if (params.id !== 'new') {
            const curentBank = banks.find(item=>item.id === params.id)
            setBank(curentBank)
        }
    }, [banks, params.id])

    const onChange = (e) => {
        const value = e.target.value
        switch (e.target.id) {
            case 'name':
                setBank({...bank, name: value});
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

        if(params.id !== 'new') {
           
            db.collection("banks").doc(params.id).set(bank)
            .then(() => {
                setButtonDisabled(false);
                history.push('/');
            })
            .catch((error) => {
                console.error("Error writing document: ", error);
                setShowAlert(true);
                setButtonDisabled(false);
            });
        } else {
            db.collection("banks").add(bank)
            .then((docRef) => {
                setButtonDisabled(false);
                history.push('/');
                
            })
            .catch((error) => {
                console.error("Error adding document: ", error);
                setShowAlert(true);
                window.scroll(0, 100);
                setButtonDisabled(false);
            });
        }

    }

    const spinner = (
        <Spinner
            className="mr-1"
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"/>
    );

    const alert = (
        <Alert className="mt-2" variant="danger">
            Error adding document
        </Alert>
    );

    const buttonTitle = params.id === 'new' ? 'Add bank' : 'Edit bank';

    

    return(
        <Jumbotron className="min-vh-100">
            <Container>
                <Form onSubmit={onSubmit}>
                    <Form.Group controlId="name">
                        <Form.Label>Bank name</Form.Label>
                        <Form.Control required onChange={onChange} value={bank.name} type="text" />
                    </Form.Group>
                    <Form.Group controlId="rate">
                        <Form.Label>Interest rate</Form.Label>
                        <Form.Control required pattern="[0-9]{1,}"  onChange={onChange} value={bank.interestRate} type="text" />
                    </Form.Group>
                    <Form.Group controlId="loan">
                        <Form.Label>Maximum loan</Form.Label>
                        <Form.Control required pattern="[0-9]{1,}"  onChange={onChange} value={bank.maxLoan} type="text" />
                    </Form.Group>
                    <Form.Group controlId="payment">
                        <Form.Label>Minimum down payment</Form.Label>
                        <Form.Control required pattern="[0-9]{1,}"  onChange={onChange} value={bank.minPayment} type="text" placeholder="as a percentage of the loan amount" />
                    </Form.Group>
                    <Form.Group controlId="term">
                        <Form.Label>Loan term</Form.Label>
                        <Form.Control required pattern="[0-9]{1,}"  onChange={onChange} value={bank.term} type="text" placeholder="number of months" />
                    </Form.Group>
                    <Button disabled={buttonDisabled} variant="primary" type="submit">
                        {buttonDisabled ? spinner : ''}
                        {buttonTitle}
                    </Button>
                </Form>
                {showAlert ? alert : ''}
            </Container>
        </Jumbotron>
    )
}

const mapStateToProps = ({banks}) => {
    return {
        banks
    }
}

export default connect(mapStateToProps)(AddBank);