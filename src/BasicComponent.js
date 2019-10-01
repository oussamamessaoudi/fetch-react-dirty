import React from 'react';
import ApiStatus from "./ApiStatus";

function BasicComponent({response, children}) {
    return children(response);
}

function Error(props) {
    return <BasicComponent {...props}/>;
}

function Success(props) {
    return <BasicComponent {...props}/>;
}

function Loading(props) {
    return <BasicComponent {...props}/>;
}
function Initialize(props) {
    return <BasicComponent {...props}/>;
}

export {Error , Success, Loading, Initialize};
