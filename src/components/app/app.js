import React from 'react';
import { Route } from 'react-router-dom'
import BanksManagement from '../banks-management/banks-management';
import AppHeader from '../app-header/app-header';
import AddBank from '../add-bank/add-bank';
import Calculator from '../calculator/calculator';

const App = () => {

    return (
        <>
            <AppHeader/>
            <Route exact path='/'>
                <BanksManagement/>
            </Route>
            <Route path='/add-bank/:id'>
                <AddBank/>
            </Route>
            <Route path='/calculator/'>
                <Calculator/>
            </Route>
        </>
    )
}


export default App;