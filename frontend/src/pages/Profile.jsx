import React, { useState } from 'react';
import Page from './Page';
import CustomForm, { HasChanged, GetFormData } from '../components/shared/CustomForm';
import { FormGroup, Label, Input, Button } from 'reactstrap';
import { inject, observer } from 'mobx-react';
import { stores } from '../common/config';
import { D } from '../App';

export default inject([stores.authStore])(observer(function (props) {
    const { self, updateSelf } = props.authStore;
    const { username, firstname, lastname } = self;
    const [hasChange, setHasChange] = useState(false);
    const [didChange, setDidChange] = useState(false);
    const handleChange = (e) => {
        const change = GetFormData(e.currentTarget);
        setHasChange(HasChanged({ firstname, lastname }, change));
        setDidChange(true);
    }
    const submit = async (user) => {
        let success = await updateSelf(user);
        if (success) {
            setDidChange(false);
            setHasChange(false);
        }
    }
    return (
        <Page title="My profile">
            <CustomForm onSubmit={submit} onChange={handleChange}>
                <FormGroup>
                    <Label for="username">{D('Username')}</Label>
                    <Input plaintext readOnly value={username} />
                </FormGroup>
                <FormGroup>
                    <Label for="firstname">{D('First name')}</Label>
                    <Input id="firstname" name="firstname" required defaultValue={firstname || ""} />
                </FormGroup>
                <FormGroup>
                    <Label for="lastname">{D('Last name')}</Label>
                    <Input id="lastname" name="lastname" required defaultValue={lastname || ""} />
                </FormGroup>
                <Button id="save-user-changes" disabled={!hasChange} color="primary" type="submit">
                    {D('Save')}
                </Button>
                {!hasChange && didChange &&
                    <FormGroup>
                        <Input plaintext readOnly value={D("All changes have already been saved")} />
                    </FormGroup>
                }
            </CustomForm>
        </Page>
    )
}))