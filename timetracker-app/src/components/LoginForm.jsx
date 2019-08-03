import React from 'react';
import { Button, FormGroup, Input, Label } from 'reactstrap';
import CustomForm from './shared/CustomForm';

export function LoginForm({ onLogin }) {
    
    return (
        <CustomForm onSubmit={onLogin}>
            <FormGroup>
                <Label for="username">Username</Label>
                <Input id="username"
                    required
                    name="username" />
            </FormGroup>
            <FormGroup>
                <Label for="password">Password</Label>
                <Input id="password"
                    required
                    name="password"
                    type="password"/>
            </FormGroup>
            <Button type="submit" name="submit" color="primary">Login</Button>
        </CustomForm>
    )
}