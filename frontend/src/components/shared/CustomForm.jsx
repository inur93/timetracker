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

const initKeys = (obj, key, partialKey) => {
    let result = partialKey.match(/(.*)\[(\d)\].?(.*)/);
    if (result) {

        let outer = result[1];
        let index = result[2];
        let inner = result[3];

        if (!obj[outer]) obj[outer] = [];

        // element in array can be object or simple type
        let innerObj = inner ?
            { [inner]: obj[partialKey] } :
            obj[partialKey];

        if (obj[outer][index]) {
            obj[outer][index][inner] = obj[partialKey];
        } else {
            obj[outer][index] = innerObj;
        }
        //we cannot delete keys right away since they have to be used for other keys as well
        let keysToDelete = initKeys(obj, key, outer);
        return [partialKey, ...(keysToDelete || [])];
    } else {
        return null;
    }

}
const serializeFormData = (obj) => {
    let keysToDelete = [];
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            keysToDelete = keysToDelete.concat(initKeys(obj, key, key));
        }
    }
    keysToDelete.forEach(key => delete obj[key]);
    return obj;
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
        const type = target.elements.namedItem(entry.value).type;
        let rawValue = formData.get(entry.value);
        let parsedValue;
        switch (type) {
            case 'number':
                parsedValue = rawValue && Number(rawValue);
                break;
            case 'datetime':
            case 'date':
                parsedValue = rawValue && new Date(rawValue).getTime();
                break;
            default:
                parsedValue = rawValue;
        }
        data[entry.value] = parsedValue;
    }
    return serializeFormData(data);
}

const CustomForm = function (props) {

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = GetFormData(e.target);
        props.onSubmit(data, e);
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