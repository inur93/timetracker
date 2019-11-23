import React, { useState } from 'react';
import { inject, observer } from "mobx-react";
import { stores } from "../common/config";
import CustomForm, { GetFormDataById } from "../components/shared/CustomForm";
import Page from "./Page";
import { FormGroup, Label, Input, Button, FormFeedback } from 'reactstrap';
import { D } from '../App';
import {NavLink} from 'react-router-dom';
import LanguageSelector from '../components/shared/LanguageSelector';

export default inject([stores.authStore])(observer(function ({ authStore }) {
    const { registerUser } = authStore;
    const [passwordNotEqual, setPasswordNotEqual] = useState(false);
    const [passwordEqual, setPasswordEqual] = useState(false);
    const handleChange = (e) => {
        const data = GetFormDataById('register-form');
        let isEqual = false;
        if (e.target.name === 'password' || e.target.name === 'repeatPassword') {
            if (data.password.length >= 6 && data.password === data.repeatPassword) {
                isEqual = true;
            }
        }
        setPasswordEqual(isEqual);
        setPasswordNotEqual(false);
    }
    const handleSubmit = (data) => {
        if (data.password !== data.repeatPassword) {
            setPasswordNotEqual(true);
        }else{
            const {repeatPassword, ...user} = data;
            registerUser(user);
        }
    }
    return <Page title="Register" rightMenu={<LanguageSelector />}>
        <CustomForm id="register-form" onSubmit={handleSubmit} onChange={handleChange}>
            <FormGroup>
                <Label for="username">{D('Username')}</Label>
                <Input id="username"
                    required
                    name="username" />
            </FormGroup>
            <FormGroup>
                <Label for="firstname">{D('Firstname')}</Label>
                <Input id="firstname"
                    name="firstname" />
            </FormGroup>
            <FormGroup>
                <Label for="lastname">{D('Lastname')}</Label>
                <Input id="lastname"
                    name="lastname" />
            </FormGroup>
            <FormGroup>
                <Label for="password">{D('Password')}</Label>
                <Input valid={passwordEqual} id="password"
                    required
                    minLength={6}
                    name="password"
                    type="password" />
            </FormGroup>
            <FormGroup>
                <Label for="repeat-password">{D('Repeat password')}</Label>
                <Input id="repeat-password"
                    invalid={passwordNotEqual}
                    valid={passwordEqual}
                    required
                    minLength={6}
                    name="repeatPassword"
                    type="password" />
                    <FormFeedback invalid>{D('The passwords do not match')}</FormFeedback>
            </FormGroup>

            <Button type="submit" name="submit" color="primary">{D('Register')}</Button>
            <Button tag={NavLink} to="/login" color="link">{D('Go to login page')}</Button>
        </CustomForm>
    </Page>
}))