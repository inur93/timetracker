import React from 'react';
import { LoginForm } from "../components/LoginForm";
import { Container, Row, Col } from 'reactstrap';
import { inject, observer } from 'mobx-react';
import { stores } from '../common/config';
import Page from './Page';
import LanguageSelector from '../components/shared/LanguageSelector';

export default inject([stores.authStore])(function ({ authStore }) {
    return (
        <Page title="Timetracker" rightMenu={<LanguageSelector />}>
            <Container>
                <Row>
                    <Col md={{ size: 6, offset: 3 }}>
                        <LoginForm onLogin={authStore.handleLogin} />
                    </Col>
                </Row>
            </Container>
        </Page>
    )
})