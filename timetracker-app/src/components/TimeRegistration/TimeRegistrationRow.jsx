
import React from 'react';
import { isWeekend, format, isToday } from 'date-fns';
import daLocale from 'date-fns/locale/da';
export default function TimeRegistrationRow({ date, hours, comments, fromQuery }) {

    const dateFormatted = format(date, fromQuery ? "dd DD. MMM YYYY" : "dd DD. MMM", { locale: daLocale });
    let classNames = "";
    const highlightToday = isToday(date);
    const highlightWeekend = isWeekend(date);
    if(highlightToday) classNames += "today ";
    if(highlightWeekend) classNames += "weekend"
    return (<tr key={date}>
        <td className={classNames}>{dateFormatted}</td>
        <td>{hours || ""}</td>
        <td>
            {comments &&
                <ul>
                    {comments.map((c, i) => <li key={`${date.value}-${i}`}>{c}</li>)}
                </ul>
            }
        </td>
    </tr>
    )
}