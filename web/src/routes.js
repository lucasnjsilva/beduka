import React from 'react';
import { BrowserRouter, Switch, Redirect } from 'react-router-dom';

import SignIn from './views/SignIn';
import Home from './views/Home';
import ShowContact from './views/ShowContact';
import CreateContact from './views/CreateContact';
import UpdateContact from './views/UpdateContact';
import DeleteContact from './views/DeleteContact';

import PublicRoute from './utils/PublicRoute';
import PrivateRoute from './utils/PrivateRoute'

function Routes() {
    const Logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('id');
        return <Redirect to='/' />
    }

    return (
        <BrowserRouter>
            <Switch>
                <PublicRoute restricted={true} exact path="/" name="SignIn" component={SignIn} />

                <PrivateRoute restricted={true} exact path="/dashboard" name="Home" component={Home} />
                <PrivateRoute path="/cadastrar" component={CreateContact} />
                <PrivateRoute path="/logout" component={Logout} />
                <PrivateRoute path="/editar/:id" component={UpdateContact} />
                <PrivateRoute path="/detalhe/:id" component={ShowContact} />
                <PrivateRoute path="/deletar/:id" component={DeleteContact}/>
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;
