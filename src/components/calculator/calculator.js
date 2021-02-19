import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { Jumbotron, Container, Form, Button, Table, Alert } from 'react-bootstrap';
import firebaseService from '../../services/firebaseService';
import { banksLoaded, banksRequested } from '../../actions';

import './calculator.css'

const Calculator = ({banks, banksLoaded, banksRequested, loading}) => {
    const [selectedBank, setSelectedBank] = useState(null);
    const [tableData, setTableData] = useState([]);
    const [initialLoan, setInitialLoan] = useState('');
    const [downPayment, setDownPayment] = useState('');
    const [warningMessage, setWarningMessage] = useState('');
    const [alertShow, setAlertShow] = useState(false);

    useEffect(()=>{
        new firebaseService().getData(banksLoaded, banksRequested);
    }, [])

    const onChangeBank = (e) => {
        setSelectedBank(banks.find(item=>item.name === e.target.value))
    }

    const onChangeLoan = (e)=> {
        setInitialLoan(e.target.value)
    }

    const onChangeDownPayment = (e)=> {
        setDownPayment(e.target.value)
    }


    const onSubmit = (e) => {
        e.preventDefault();

        setAlertShow(false)

        const {maxLoan, minPayment} = selectedBank;
        if(+initialLoan > +maxLoan) {
            setWarningMessage(`maximum amount ${maxLoan}`);
            setAlertShow(true)
            return
        }

        if(+downPayment < +initialLoan*minPayment/100) {
            setWarningMessage(`Minimum down payment ${initialLoan*minPayment/100}`);
            setAlertShow(true)
            return
        }
        const numMonthly = +selectedBank.term;
        const interestRate = +selectedBank.interestRate/100/12;
        const total = +((initialLoan*interestRate*Math.pow(1+interestRate, numMonthly))/((Math.pow(1+interestRate, numMonthly))-1)).toFixed(2);

        let loanBalance = initialLoan;
        let table = [];

        for (let i=1; i<=numMonthly; i++) {
            const month = i;
            const interestPay = +(loanBalance*interestRate).toFixed(2);
            loanBalance = +(loanBalance - total + interestPay).toFixed(2);
            const equity = +(+downPayment + +initialLoan - loanBalance).toFixed(2);
            table=[...table, {month, total, interestPay, loanBalance, equity}];
        }
        setTableData(table)
    }

    if (!loading && !selectedBank) {
        setSelectedBank(banks[0]);
    }
    

    return (
        <Jumbotron className="min-vh-100">
            <Container>
            <Alert show={alertShow} variant="warning">
                    <Alert.Heading>{warningMessage} 
                    </Alert.Heading>
                    <hr />
                    <div className="d-flex justify-content-end">
                        <Button onClick={()=>setAlertShow(false)} className="mr-2" variant="outline-warning">OK</Button>
                    </div>
                </Alert>
            <div className="title">Mortgage calculator</div>
                <Form onSubmit={onSubmit}>
                    <Form.Group controlId="initial">
                        <Form.Label>Initial loan</Form.Label>
                        <Form.Control onChange={onChangeLoan} value={initialLoan} required type="text" />
                    </Form.Group>
                    <Form.Group controlId="downPayment">
                        <Form.Label>Down payment</Form.Label>
                        <Form.Control onChange={onChangeDownPayment} value={downPayment} required type="text" />
                    </Form.Group>
                    <Form.Group controlId="bank">
                        <Form.Label>Choose bank</Form.Label>
                        <Form.Control onChange={onChangeBank} required type="text" as="select">
                            {
                                banks.map(item=>{
                                    return (
                                        <option key={item.id}>{item.name}</option>
                                    )
                                })
                            }
                        </Form.Control>
                    </Form.Group>
                    <Button disabled={loading} variant="primary" type="submit">
                        Calculate
                    </Button>
                </Form>
                <Table className="mt-3" striped bordered hover size="sm">
                    <thead>
                        <tr>
                        <th>Month</th>
                        <th>Total payment</th>
                        <th>Interest payment</th>
                        <th>Loan balance</th>
                        <th>Equity</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        tableData.map(item=>{
                            return (
                                <tr key={item.month}>
                                    <td>{item.month}</td>
                                    <td>{item.total}</td>
                                    <td>{item.interestPay}</td>
                                    <td>{item.loanBalance}</td>
                                    <td>{item.equity}</td>
                                    
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </Table>
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

export default connect(mapStateToProps, {banksLoaded, banksRequested})(Calculator);