import React from 'react';
import CustomForm from "../shared/CustomForm";
import {Modal, ModalHeader, ModalBody, ModalFooter, Button, FormGroup, Label, Input, FormFeedback} from 'reactstrap';
import { format } from 'date-fns';
import { D } from '../../App';



function TimeRegistration(props){

    const {onSubmit, onClose, title, saveText, isSaving} = props; 
    return (
        <Modal isOpen toggle={onClose} >
            <CustomForm onSubmit={onSubmit}>
            <ModalHeader toggle={onClose}>{D(title)}</ModalHeader>
            <ModalBody>
            <FormGroup>
                <Label for="registration-date">{D('Date')}</Label>
                <Input id="registration-date"
                    required
                    defaultValue={format(new Date(), "YYYY-MM-DD")}
                    type="date"
                    name="date" />
                    <FormFeedback>Field is required</FormFeedback>
            </FormGroup>
            <FormGroup>
                <Label for="hours-registered">{D('Hours')}</Label>
                <Input id="hours-registered"
                    required
                    type="number"
                    step="0.25"
                    min="0"
                    max="24"
                    name="timeRegistered" />
            </FormGroup>
            
            <FormGroup>
                <Label for="comment">{D('Comment')}</Label>
                <Input id="comment"
                    type="textarea"
                    name="comment" />
            </FormGroup>
            
            </ModalBody>
            <ModalFooter>
                <Button color="primary" type="submit" disabled={isSaving}>{D(saveText)}</Button>
                <Button color={'secondary'} onClick={onClose}>{D('Cancel')}</Button>
            </ModalFooter>
            </CustomForm>
        </Modal>)
}

export function CreateTimeRegistration(props){
    return <TimeRegistration title="Register time" saveText="Create" {...props} />
}