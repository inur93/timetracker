
import React from 'react';
import { Container, Row, Col, Card, CardBody, CardHeader } from 'reactstrap';
import { D } from '../App';

export default function Page({ title, children, rightMenu }) {
    return (
        <Container className="page">
            <Row>
                <Col xs="12" lg={{ size: 10, offset: 1 }}>
                    <Card>
                        <CardHeader tag="h1">{D(title)}
                        <div className="page-header-menu">
                            {rightMenu}
                        </div>
                        </CardHeader>
                        <CardBody>
                            {children}
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}