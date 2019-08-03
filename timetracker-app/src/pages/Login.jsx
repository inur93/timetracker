import React from 'react';
import {LoginForm} from "../components/LoginForm";
import {Container, Row, Col} from 'reactstrap';
import { inject } from 'mobx-react';
import { stores } from '../common/config';

export default inject([stores.authStore])(function({authStore}){
    return (
        <Container>
            <Row>
                <Col md={{size: 6, offset: 3}}>
                <LoginForm onLogin={authStore.handleLogin}/>
                </Col>
            </Row>
        </Container>
    )
})