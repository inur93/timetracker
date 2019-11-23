import React from 'react';
import { inject, observer } from 'mobx-react';
import {
    Modal, ModalBody, ModalHeader, ModalFooter,
    Button,
    FormGroup, Input, Label
} from 'reactstrap';
import { D } from '../../App';
import CustomForm from './CustomForm';
import { stores } from '../../common/config';
export default inject([stores.localizationStore])(observer(function ({ cancel, onSubmit, localizationStore }) {
    const { locales } = localizationStore;
    return <Modal isOpen>
        <ModalHeader>{D('Add language')}</ModalHeader>
        <CustomForm onSubmit={onSubmit}>
            <ModalBody>
                <FormGroup>
                    <Label for="short-name">{D('Short name')}</Label>
                    <Input id="short-name" name="shortName" placeholder={D('fx ENG')} required />
                </FormGroup>
                <FormGroup>
                    <Label for="long-name">{D('Long name')}</Label>
                    <Input id="long-name" name="displayName" placeholder={D('fx English')} required />
                </FormGroup>
                <FormGroup>
                    <Label for="locale">{D('Locale')}</Label>
                    <Input type="select" name="locale" required>
                        {locales.map(l => <option key={l.id} value={l.id}>{D(l.name)}</option>)}
                    </Input>
                </FormGroup>
            </ModalBody>
            <ModalFooter>
                <Button onClick={cancel}>{D('Cancel')}</Button>
                <Button type="submit" color="primary">{D('Create')}</Button>
            </ModalFooter>
        </CustomForm>
    </Modal>
}))