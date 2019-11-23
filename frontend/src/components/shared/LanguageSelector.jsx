import React from 'react';
import { inject, observer } from 'mobx-react';
import { stores } from '../../common/config';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { D } from '../../App';

export default inject([stores.localizationStore])(observer(function (props) {
    const { localizationStore, nav, onClick, currentLanguage, ...otherProps } = props;
    const { currentLanguageName, languages } = localizationStore;
    const setLanguage = (lang) => () => {
        if (onClick) {
            onClick(lang);
        } else {
            props.localizationStore.currentLanguageKey = lang;
        }
    }
    if(!languages || languages.length == 0) return null;

    return <UncontrolledDropdown {...otherProps} nav={nav} inNavbar={nav}>
        <DropdownToggle color={nav ? undefined : 'link'} nav={nav} caret>
            {D(currentLanguage || currentLanguageName)}
        </DropdownToggle>
        <DropdownMenu right>
            {languages.map(l =>
                <DropdownItem key={l.id} onClick={setLanguage(l.shortName)}>
                    {D(l.displayName)}
                </DropdownItem>)}
        </DropdownMenu>
    </UncontrolledDropdown>
}))