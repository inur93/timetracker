
import React from 'react';
import { isWeekend, format, isToday } from 'date-fns';
import { inject, observer } from 'mobx-react';
import { stores } from '../../common/config';
import {withRouter} from 'react-router-dom';

export default inject([stores.localizationStore])(withRouter(observer(function ({ date, hours, comments, fromQuery, localizationStore, history }) {
    const dateFormatted = format(date, fromQuery ? "dd DD. MMM YYYY" : "dd DD. MMM", { locale: localizationStore.currentLocale });
    const dateForUrl = format(date, "MM-DD-YYYY");
    let classNames = "";
    const highlightToday = isToday(date);
    const highlightWeekend = isWeekend(date);
    if (highlightToday) classNames += "today ";
    if (highlightWeekend) classNames += "weekend";

    const navigateDetails = () => {
        history.push(`/details/${dateForUrl}`);
    }
    return (<tr key={date} onClick={navigateDetails}>
        <td className={classNames}>{dateFormatted}</td>
        <td>{hours || "-"}</td>
        <td>
            {comments &&
                <ul>
                    {comments.map((c, i) => <li key={`${date.value}-${i}`}>{c}</li>)}
                </ul>
            }
        </td>
    </tr>
    )
})));