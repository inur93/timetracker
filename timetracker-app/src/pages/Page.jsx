
import React from 'react';
import { Container, Row, Col, Card, CardBody, CardHeader } from 'reactstrap';
import { D } from '../App';

export default function Page({ title, children }) {
    return (
        <Container className="page">
            <Row>
                <Col xs="12" lg={{ size: 10, offset: 1 }}>
                    <Card>
                        <CardHeader tag="h1">{D(title)}</CardHeader>
                        <CardBody>
                            {children}
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}