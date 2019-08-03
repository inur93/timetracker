import React, { useState, useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import { stores } from '../common/config';
import Page from './Page';
import Pagination from '../components/shared/Pagination/Pagination';
import { Table, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Input, Button } from 'reactstrap';
import { D } from '../App';
import CustomForm, { GetFormDataById, HasChanged } from '../components/shared/CustomForm';
import Prompt from './Prompt';

export default inject([stores.localizationStore])(observer(function (props) {
    const { languages, missingTranslations, saveTranslations } = props.localizationStore;
    const [editingLanguage, setEditingLanguage] = useState(localStorage.getItem('editing-lang') || 'en');
    const [translations, setTranslations] = useState([]);
    const [formElements, setFormElements] = useState({});
    const selectedLang = languages.find(l => l.shortName === editingLanguage) || { displayName: editingLanguage, translations: {} };

    const [totalSize, setTotalSize] = useState(0);
    const [pagination, setPagination] = useState({
        page: 0,
        pageSize: 5
    });

    //update table with translations
    useEffect(() => {

        localStorage.setItem('editing-lang', editingLanguage);
        let keys = Object.keys(selectedLang.translations);
        keys = keys.concat(missingTranslations);
        keys = [...new Set(keys)];

        const pageSize = pagination.pageSize;
        const count = keys.length;
        const start = pagination.page * pageSize;
        const end = start + pageSize >= count ? count : start + pageSize;

        keys = keys.sort((a, b) => a.localeCompare(b));
        keys = keys.slice(start, end);

        let translations = [];
        let formElements = {};
        keys.forEach(key => {
            const value = selectedLang.translations[key];
            translations.push({ key, value: value || "", lang: editingLanguage });
            //init form elements map
            formElements[key] = value;
        });

        setTotalSize(count);
        setTranslations(translations);
        setFormElements(formElements);

    }, [editingLanguage, selectedLang, pagination, missingTranslations]);

    const save = elements => {
        saveTranslations(editingLanguage, elements);
    }

    const promptSaveChanges = (callback) => {
        var updatedElements = GetFormDataById('dictionary-form');
        if (HasChanged(formElements, updatedElements)) {
            const onOk = () => {
                save(updatedElements);
                callback();
            }
            Prompt.confirm("Save changes?", "You have unsaved changes. Press OK to save before you continue.", onOk, callback);
        } else {
            callback();
        }
    }

    const setPaginationAndSave = p => {
        promptSaveChanges(() => setPagination(p));
    }

    const changeLanguage = lang => () => {
        promptSaveChanges(() => setEditingLanguage(lang));
    }

    return (
        <Page title="Administrate dictionary">
            <UncontrolledDropdown >
                <DropdownToggle caret color="primary">
                    {D(selectedLang.displayName)}
                </DropdownToggle>
                <DropdownMenu>
                    {languages.map(l =>
                        <DropdownItem key={`${l.shortName}-lang-select`} onClick={changeLanguage(l.shortName)}>
                            {D(l.displayName)}
                        </DropdownItem>)}
                </DropdownMenu>
            </UncontrolledDropdown>
            <CustomForm id="dictionary-form" onSubmit={save}>
                <Table striped responsive>
                    <thead>
                        <tr>
                            <th>{D("Key")}</th>
                            <th>{D("Value")}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {translations.map(t =>
                            <tr key={t.key}>
                                <td>{t.key}</td>
                                <td><Input key={`${t.lang}-${t.key}`} id={`${t.lang}-${t.key}`} name={`${t.key}`} defaultValue={t.value} /></td>
                            </tr>)}
                    </tbody>
                </Table>
                <Pagination page={pagination.page}
                    pageSize={pagination.pageSize}
                    count={totalSize}
                    onChange={page => setPaginationAndSave({ ...pagination, page })} />
                <Button color="primary" type="submit">{D('Save')}</Button>
            </CustomForm>
        </Page>
    );
}))