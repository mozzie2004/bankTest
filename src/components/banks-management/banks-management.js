import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Button, Container, Jumbotron, ListGroup, Spinner } from 'react-bootstrap';
import {banksLoaded, banksRequested} from '../../actions'

import firebase from 'firebase';
import { useHistory } from 'react-router-dom';


const BanksManagement = ({banks, loading, banksLoaded, banksRequested}) => {

    useEffect(()=>{
        banksRequested();
        const db = firebase.firestore();
        let data = [];
        db.collection("banks").get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                const newItem = {...doc.data(), id: doc.id}
                data = [...data, newItem]
            });
            banksLoaded(data)
        });
    }, [banksLoaded, banksRequested]);

    const history = useHistory();

    let listItem = null;
    if (loading) {
        listItem = <div className='d-flex justify-content-center'><Spinner className="" animation="border" variant="primary" /></div>
    } else if(banks) {
        listItem = banks.map(item => {
            return (
                <ListGroup.Item key={item.id} className="d-flex justify-content-between">
                    <div>{item.name}</div>
                    <div className="icon-groupe">
                        <i style={{cursor: 'pointer'}} className="bi bi-pencil mr-2"></i>
                        <i style={{cursor: 'pointer'}} className="bi bi-trash"></i>
                    </div>
                </ListGroup.Item>
            )
        })
        
    }
    return (
        <Jumbotron className="vh-100">
            <Container>
                <div className="d-flex justify-content-end mb-3">
                    <Button onClick={()=>history.push('/add-bank/new')}>Add new bank</Button>
                </div>
                <ListGroup>
                    {listItem}
                </ListGroup>
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

export default connect(mapStateToProps, {banksLoaded, banksRequested})(BanksManagement);