import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import {NavDropdown} from 'react-bootstrap';
import Chart from 'chart.js'; 

const MyChart = ({banks}) => {
    const [ctx, setCtx] = useState(null);
    const [title, setTitle] = useState('Interest rate')


    useEffect(()=>{
        const ctx = document.getElementById('myChart').getContext('2d');
        setCtx(ctx);
    }, [setCtx]);

    

    

    const onSelect = (eventKey) => {
        setTitle(eventKey)
    }

    const labels = banks.map(item=>item.name);
    let data = [];
    switch(title) {
        case 'Interest rate':
            data = banks.map(item=>+item.interestRate)
            break;
        case 'Maximum loan':
            data = banks.map(item=>+item.maxLoan)
            break;
        case 'Minimum payment':
            data = banks.map(item=>+item.minPayment)
            break;
        case 'Loan term':
            data = banks.map(item=>+item.term)
            break;
        default:
            data = []
    }

    const chartConfig = {
        type: 'bar',
        data: {
            labels,
            datasets: [{
                label: title,
                data,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }
        ]
        },
        options: {
          scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        },
            events: ['']
        }
    }

    if(ctx){
        new Chart(ctx, chartConfig);
   }


    return (
        <div>
            <div>
            <NavDropdown onSelect={onSelect} id="dropdown-basic-button" title={title}>
                <NavDropdown.Item eventKey="Interest rate">Interest rate</NavDropdown.Item>
                <NavDropdown.Item eventKey="Maximum loan">Maximum loan</NavDropdown.Item>
                <NavDropdown.Item eventKey="Minimum payment">Minimum payment</NavDropdown.Item>
                <NavDropdown.Item eventKey="Loan term">Loan term</NavDropdown.Item>
            </NavDropdown>
            </div>
            <canvas id="myChart" width="400" height="400"></canvas>
        </div>
    )
}

const mapStateToProps = ({banks}) => {
    return {
        banks
    }
}

export default connect(mapStateToProps)(MyChart);