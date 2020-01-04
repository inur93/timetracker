import React from 'react';
import './App.css';
import Login from "./pages/Login";
import 'bootstrap/dist/css/bootstrap.min.css';
import api from './common/api';
import AuthStore from "./stores/AuthStore";
import TimeRegistrationStore from './stores/TimeRegistrationStore';
import { HashRouter, Switch, Route, NavLink as Link } from "react-router-dom";
import { observer, Provider } from "mobx-react";
import TimeOverview from "./pages/TimeOverview";
import {
    Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem, NavLink
} from 'reactstrap';
import { stores as storeKeys } from "./common/config";
import { toast as toastify } from 'react-toastify';

import { action, decorate, observable } from 'mobx';
import jwt from './common/jwt.service';
import Profile from './pages/Profile';
import LocalizationStore from './stores/LocalizationStore';
import ManageDictionary from './pages/ManageDictionary';
import Register from './pages/Register';
import LanguageSelector from './components/shared/LanguageSelector';
import TimeDetails from './pages/TimeDetails';

const stores = {
    [storeKeys.authStore]: new AuthStore(api.AuthApi, api.UserApi),
    [storeKeys.timeRegistrationStore]: new TimeRegistrationStore(api.TimeRegistrationApi),
    [storeKeys.localizationStore]: new LocalizationStore(api.LocalizationApi)
}

const processString = (msg, templateValues = []) => {

    let translated = D(msg);
    templateValues.forEach((value, index) => {
        translated = translated.replace(`{${index}}`, value);
    });
    return translated;
}

export const toast = {
    warn: (msg, templateValues) => toastify.warn(processString(msg, templateValues)),
    error: (msg, templateValues) => toastify.error(processString(msg, templateValues)),
    info: (msg, templateValues) => toastify.info(processString(msg, templateValues)),
    success: (msg, templateValues) => toastify.success(processString(msg, templateValues)),
}

export function D(str) {
    return stores.localizationStore.getValue(str);
}
export default observer(function(props) {

        if (stores.authStore.loading) {
            return <div>loading</div>
        }
        if (!stores.authStore.self) {
            return <Provider {...stores}>
                <HashRouter>
                    <Switch>
                        <Route path="/register" component={Register} />
                        <Route path="/" component={Login} />
                    </Switch>
                </HashRouter>
            </Provider>
        }

        const { isOpen, setIsOpen } = props.uiStore;
       
        return (
            <div>
                <Provider {...stores}>
                    <HashRouter>
                        <Navbar color="light" light expand="md" fixed="top">
                            <NavbarBrand tag={Link} to="/">TimeTracker</NavbarBrand>
                            <NavbarToggler onClick={() => setIsOpen(!isOpen)} />
                            <Collapse isOpen={isOpen} navbar>
                                <Nav className="ml-auto" navbar>
                                    <NavItem>
                                        <NavLink tag={Link} exact to="/">{D('Overview')}</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink tag={Link} to="/profile">{D('My profile')}</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink tag={Link} to="/administration">{D('Administration')}</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink href="/" onClick={jwt.destroyToken}>{D('Log out')}</NavLink>
                                    </NavItem>
                                    <LanguageSelector nav/>
                                </Nav>
                            </Collapse>
                        </Navbar>

                        <Route path={"/"} exact component={TimeOverview} />
                        <Route path="/profile" component={Profile} />
                        <Route path="/administration" component={ManageDictionary} />
                        <Route path="/details/:date" component={TimeDetails} />
                    </HashRouter>
                </Provider>
            </div>
        );
    });

export class AppUiStore {
    isOpen = false;

    setIsOpen = (isOpen) => {
        this.isOpen = isOpen;
    }
}

decorate(AppUiStore, {
    isOpen: observable,
    setIsOpen: action
})