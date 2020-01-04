import React, { useState, useEffect } from 'react';
import { stores } from "../common/config";
import { observer, inject } from "mobx-react";
import Page from './Page';
import { FormGroup, Input, Label, Button, Col, Row } from 'reactstrap';
import CustomForm, { HasChanged } from '../components/shared/CustomForm';
import { D, toast } from '../App';
import { format } from 'date-fns';
import { flow } from 'mobx';
import {NavLink} from 'react-router-dom';

const loadData = flow(function* (date, timeRegistrationStore, setTimeRegistrations) {
    let from = new Date(date).getTime();
    let to = new Date(date).getTime() + 1000 * 60 * 60 * 24;
    try {

        const list = yield timeRegistrationStore.fetchTimeRegistrations(from, to, "");
        setTimeRegistrations(list);
    } catch (e) {
        toast.error("Could not load timeregistrations by date", [e.message]);
    }
});

export default inject(stores.timeRegistrationStore, stores.localizationStore)(observer(function (props) {
    const { localizationStore, timeRegistrationStore } = props;
    const { currentLocale } = localizationStore;
    //const { loading } = timeRegistrationStore;

    const [timeRegistrations, setTimeRegistrations] = useState([]);
    const [toDelete, setToDelete] = useState([]);
    const date = props.match.params.date;

    
    const handleSubmit = async (data, e) => {
        const updates = data.list.map(t => ({...t, remove: toDelete.includes(t.id)}));
        let actualUpdates = [];
        updates.forEach(update => {
            let current = timeRegistrations.find(t => t.id === update.id);
            const {remove, ...updates} = update;
            if(HasChanged(updates, current) || remove){
                actualUpdates.push(update);
            }
        });
        await timeRegistrationStore.updateDeleteRegistrations(actualUpdates);
        loadData(date, timeRegistrationStore, setTimeRegistrations);
    }
    const toggleDelete = (id) => () => {
        const list = [...toDelete];
        if (list.includes(id)) {
            list.splice(list.indexOf(id), 1);
        } else {
            list.push(id);
        }
        setToDelete(list);
    }
    const isRemoved = (id) => {
        return toDelete.includes(id);
    }
    useEffect(() => {
        loadData(date, timeRegistrationStore, setTimeRegistrations);
    }, [date, timeRegistrationStore, setTimeRegistrations]);

    return <Page title="Registration Details" rightMenu={format(date, 'DD. MMM YYYY', { locale: currentLocale })}>
        <CustomForm onSubmit={handleSubmit}>
            {timeRegistrations.map((t, index) => {
                const removed = isRemoved(t.id);
                const idId = `list[${index}].id`;
                const dateId = `list[${index}].date`;
                const hoursId = `list[${index}].timeRegistered`;
                const commentId = `list[${index}].comment`;
                
                const dateFormatted = new Date(t.date).toISOString().substr(0,10);
                return (
                    <Row form key={t.id} className={removed ? 'row-removed' : undefined}>
                        <Input name={idId} defaultValue={t.id} hidden/>
                        <Col sm={3}>
                            <FormGroup>
                                <Label for={dateId}>{D('date')}</Label>
                                <Input id={dateId} name={dateId} type="date" defaultValue={dateFormatted} required/>
                            </FormGroup>
                        </Col>
                        <Col sm={2} lg={1}>
                            <FormGroup>
                                <Label for={hoursId}>hours</Label>
                                <Input id={hoursId} name={hoursId} type="number" step="0.1" defaultValue={t.timeRegistered} required/>
                            </FormGroup>
                        </Col>
                        <Col sm={5} lg={7}>
                            <FormGroup>
                                <Label for={commentId}>{D('comment')}</Label>
                                <Input id={commentId} name={commentId} type="textarea" defaultValue={t.comment} />
                            </FormGroup>
                        </Col>
                        <Col sm={2} lg={1}>
                            <FormGroup>
                                <Label />
                                <Button onClick={toggleDelete(t.id)} className="no-padding" block color="link">{removed ? D('undo') : D('delete')}</Button>
                            </FormGroup>
                        </Col>
                    </Row>)
            }
            )}
            <Button color="secondary" tag={NavLink} to="/">{D('Back to overview')}</Button>{' '}
            <Button color="primary" type="submit">{D('Save')}</Button>
        </CustomForm>
    </Page>
}))