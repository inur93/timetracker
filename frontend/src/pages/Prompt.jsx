import React from 'react';
import ReactDOM from 'react-dom';
import {Modal, ModalFooter, ModalHeader, ModalBody,
Button} from 'reactstrap';

const renderPrompt = (title, msg, okValue, cancelValue, onAccept, onReject) => {
    ReactDOM.render(<Modal isOpen>
        {title && <ModalHeader>{title}</ModalHeader>}
        {msg && <ModalBody>{msg}</ModalBody>}
        <ModalFooter>
            {okValue && <Button color="primary" onClick={onAccept}>{okValue}</Button> }
            {cancelValue && <Button color="secondary" onClick={onReject}>{cancelValue}</Button>}
        </ModalFooter>
    </Modal>, document.getElementById('prompt'))
}

const unMountPrompt  = (callback) => () => {
    ReactDOM.unmountComponentAtNode(document.getElementById('prompt'));
    callback();
}

export default {
    alert: (title, msg, onConfirm, {okValue} = {}) => {
        renderPrompt(title, msg, okValue || "OK", undefined, unMountPrompt(onConfirm));
    },
    confirm: (title, msg, onConfirm, onReject, {okValue, cancelValue} = {}) => {
        renderPrompt(title, msg, okValue || "OK", cancelValue || "Cancel", unMountPrompt(onConfirm), unMountPrompt(onReject))
    }
}