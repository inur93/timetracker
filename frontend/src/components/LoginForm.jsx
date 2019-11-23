import React from 'react';
import { Button, FormGroup, Input, Label } from 'reactstrap';
import CustomForm from './shared/CustomForm';
import { D } from '../App';
import {NavLink} from 'react-router-dom';

export function LoginForm({ onLogin }) {
    
    return (
        <CustomForm onSubmit={onLogin}>
            <FormGroup>
                <Label for="username">{D('Username')}</Label>
                <Input id="username"
                    required
                    name="username" />
            </FormGroup>
            <FormGroup>
                <Label for="password">{D('Password')}</Label>
                <Input id="password"
                    required
                    name="password"
                    type="password"/>
            </FormGroup>
            <Button type="submit" name="submit" color="primary">{D('Login')}</Button>
            <Button color="link" tag={NavLink} to="/register">{D('register')}</Button>
        </CustomForm>
    )
}