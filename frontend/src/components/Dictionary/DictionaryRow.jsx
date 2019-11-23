import React from 'react';
import {Input, Button} from 'reactstrap';
import { D } from '../../App';
import './DictionaryRow.css';

export default function ({translation, onDelete}) {
    const {key, lang, value} = translation;
    return <tr>
        <td className="key-col">{key}</td>
        <td className="value-col"><Input key={`${lang}-${key}`} id={`${lang}-${key}`} name={`${key}`} defaultValue={value} /></td>
        <td className="action-col"><Button color="link" onClick={onDelete(key)}>{D('delete')}</Button></td>
    </tr>
}