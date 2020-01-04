import React, { useState, useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import { stores } from '../common/config';
import Page from './Page';
import Pagination from '../components/shared/Pagination/Pagination';
import { Table, Button } from 'reactstrap';
import { D } from '../App';
import CustomForm, { GetFormDataById, HasChanged } from '../components/shared/CustomForm';
import Prompt from './Prompt';
import DictionaryRow from '../components/Dictionary/DictionaryRow';
import LanguageSelector from '../components/shared/LanguageSelector';
import CreateLanguage from '../components/shared/CreateLanguage';

export default inject([stores.localizationStore])(observer(function (props) {
    const { languages, missingTranslations, saveTranslations, deleteKey } = props.localizationStore;
    const [editingLanguage, setEditingLanguage] = useState(localStorage.getItem('editing-lang') || 'en');
    const [translations, setTranslations] = useState([]);
    const [formElements, setFormElements] = useState({});
    const [createLanguage, setCreateLanguage] = useState(false);
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

        //filter any possible empty keys even though they should not ever be part of this array
        keys = keys.filter(a => !!a).sort((a, b) => (a).localeCompare(b));
        keys = keys.slice(start, end);

        let translations = [];
        let formElements = {};
        keys.forEach(key => {
            const value = selectedLang.translations[key];
            translations.push({ key, value: value || "", lang: editingLanguage });
            //init form elements map
            formElements[key] = value || "";
        });

        setTotalSize(count);
        setTranslations(translations);
        setFormElements(formElements);

    }, [editingLanguage, selectedLang, pagination, missingTranslations]);

    const save = elements => {
        saveTranslations(editingLanguage, elements);
    }

    const handleDelete = key => () => {
        //TODO spinner
        deleteKey(editingLanguage, key);
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

    const changeLanguage = lang => {
        promptSaveChanges(() => setEditingLanguage(lang));
    }

    const onCreateLanguage = (langauge) => {
        debugger;
    }

    return (
        <Page title="Administrate dictionary" rightMenu={
            <div className="button-row">
                <div><Button color="link" onClick={() => setCreateLanguage(true)}>{D('Add language')}</Button></div>
                <LanguageSelector onClick={changeLanguage} currentLanguage={editingLanguage} />
            </div>
        }>
            {createLanguage && <CreateLanguage cancel={() => setCreateLanguage(false)} onSubmit={onCreateLanguage} />}
            <CustomForm id="dictionary-form" onSubmit={save}>
                <Table striped responsive>
                    <colgroup>
                        <col width={250} />
                        <col width="auto" />
                        <col width={30} />
                    </colgroup>
                    <thead>
                        <tr>
                            <th>{D("Key")}</th>
                            <th>{D("Value")}</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {translations.map(t => <DictionaryRow key={t.key} translation={t} onDelete={handleDelete} />)}
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