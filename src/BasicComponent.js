import React from 'react';

function BasicComponent({response, httpStatus, children}) {
    if (typeof children === 'function')
        return children(response, httpStatus);
    else
        return children;
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
