import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Button, Container, Jumbotron, ListGroup, Spinner, Alert, Row, Col } from 'react-bootstrap';
import {banksLoaded, banksRequested, removeBank} from '../../actions';
import Chart from '../chart/chart';
import firebaseService from '../../services/firebaseService';
import { useHistory } from 'react-router-dom';

import './banks-management.css'


const BanksManagement = ({banks, loading, banksLoaded, banksRequested, removeBank}) => {
    const [alertShow, setAlertShow] = useState(false);
    const [selectedId, setSelectedId] = useState('');


    useEffect(()=>{
        new firebaseService().getData(banksLoaded, banksRequested);
    }, [banksLoaded, banksRequested]);

    const history = useHistory();

    const onAlertRemove = (id) => {
        setSelectedId(id);
        setAlertShow(true);
        window.scroll(0, 0);
    }

    const onRemoveBank = () => {
       new firebaseService().db.collection("banks").doc(selectedId).delete().then(() => {
            setAlertShow(false);
            setSelectedId('')
            removeBank(selectedId);
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
    }



    let listItem = null;
    if (loading) {
        listItem = <div className='d-flex justify-content-center'><Spinner className="" animation="border" variant="primary" /></div>
    } else if(banks) {
        listItem = banks.map(item => {
            return (
                <ListGroup.Item key={item.id} className="d-flex justify-content-between">
                    <div>{item.name}</div>
                    <div className="icon-groupe">
                        <i onClick={()=>history.push(`/add-bank/${item.id}`)} style={{cursor: 'pointer'}} className="bi bi-pencil mr-2"></i>
                        <i onClick={()=>onAlertRemove(item.id)} style={{cursor: 'pointer'}} className="bi bi-trash"></i>
                    </div>
                </ListGroup.Item>
            )
        })
        
    }
    return (
        <Jumbotron className="min-vh-100">
            <Container>
                <div className="title">Banks management</div>
                <div className="d-flex justify-content-end mb-3">
                    <Button onClick={()=>history.push('/add-bank/new')}>Add new bank</Button>
                </div>
                <Alert show={alertShow} variant="danger">
                    <Alert.Heading>Remove permanently 
                        {
                        selectedId ? ` ${banks.find(item=>item.id === selectedId).name}` : ''
                        }?
                    </Alert.Heading>
                    <hr />
                    <div className="d-flex justify-content-end">
                        <Button onClick={()=>setAlertShow(false)} className="mr-2" variant="outline-danger">Cancel</Button>
                        <Button onClick={onRemoveBank} variant="outline-danger">Remove</Button>
                    </div>
                </Alert>
                <Row>
                    <Col xs={12} md={6}>
                        <ListGroup>
                            {listItem}
                        </ListGroup>
                    </Col>
                    <Col xs={12} md={6}>
                        <Chart/>
                    </Col>
                </Row>
            </Container>
        </Jumbotron>
    )
}

const mapStateToProps = ({banks, loading}) => {
    return {
        banks, 
        loading
    }
}

export default connect(mapStateToProps, {banksLoaded, banksRequested, removeBank})(BanksManagement);