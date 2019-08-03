import React from "react";

export const HasChanged = (current, change) => {
    let keys = Object.keys(current);
    let hasChange = false;
    keys.forEach(key => {
        if (current[key] !== change[key]) {
            hasChange = true;
        }
    })
    return hasChange;
}

export const GetFormDataById = (id) => {
    return GetFormData(document.getElementById(id));
}

export const GetFormData = (target) => {
    const formData = new FormData(target);
    let iterator = formData.keys();
    const data = {};
    while (true) {
        const entry = iterator.next();
        if (entry.done) {
            break;
        }
        data[entry.value] = formData.get(entry.value);
    }
    return data;
}

const CustomForm = function (props) {

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = GetFormData(e.target);
        props.onSubmit(data);
    }

    const handleError = (e, e1, e2) => {
        e.preventDefault();
        debugger;
    }
    const { onSubmit, ...otherProps } = props;
    return (<form {...otherProps}
        onSubmit={handleSubmit}
        onError={handleError}
        >
        {props.children}
    </form>)
}

export default CustomForm;