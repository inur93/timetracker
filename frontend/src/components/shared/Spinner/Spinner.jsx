import React from 'react';
import './Spinner.css';
export default function Spinner({size}){

    return <div className={`lds-ring ${size || 'xs'}`}><div></div><div></div><div></div><div></div></div>;
}