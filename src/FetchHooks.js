import React, {useEffect} from 'react';
import Axios from "axios";
import ApiStatus from "./ApiStatus";


export const FetchHooks = ({url, method, data, children}) => {
    const [state, setState] = React.useState({});
    const [childrenMap, setChildrenMap] = React.useState([]);

    useEffect(() => {
        const source = Axios.CancelToken.source();
        setState({status: ApiStatus.LOADING});

        Axios({
            url,
            method,
            data,
            cancelToken: source.token
        })
            .then((response) => {
                // handle success
                setState({status: ApiStatus.SUCCESS, response: response.data, httpStatus: response.status});
            })
            .catch((thrown) => {
                // handle error
                if (Axios.isCancel(thrown)) {
                    console.log('Request canceled', thrown.message);
                } else {
                    setState({status: ApiStatus.ERROR, response: thrown.response, httpStatus: thrown.response.status});
                }
            });
        return () => {
            if (source) {
                source.cancel('Operation canceled by component unmounted.');
            }
        };
    }, [url, method, data]);

    useEffect(() => {
        setChildrenMap(React.Children.toArray(children).reduce((total, currentValue) => {
            const child = currentValue.type.name.toUpperCase();
            if (total[child])
                return {...total, [child]: [...total[child], currentValue]};
            else
                return {...total, [child]: [currentValue]}
        }, {}))
    }, [children]);

    if (childrenMap[state.status])
        return childrenMap[state.status].map(child => React.cloneElement(child, {
            response: state.response,
            httpStatus: state.httpStatus
        }));
    else
        return null;
};