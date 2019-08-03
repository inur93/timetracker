import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faAngleLeft, faAngleRight, faCrosshairs, faGlobeEurope } from '@fortawesome/free-solid-svg-icons';

function Icon(props){
    return <FontAwesomeIcon {...props} icon={props.i} />;
}
export function IconNext(){
    return <Icon i={faAngleRight} />;
}

export function IconPrevious(props){
    return <Icon i={faAngleLeft} />;
}

export function IconToday(){
    return <Icon i={faCrosshairs}/>;
}

export function IconEverything(){
    return <Icon i={faGlobeEurope}/>
}