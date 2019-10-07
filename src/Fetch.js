import React, {Component} from 'react';
import Axios from 'axios';

import ApiStatus from './ApiStatus';

export default class Fetch extends Component {
    constructor(props) {
        super(props);
        this.source = null;
        this.state = {
            status: ApiStatus.INITIALIZED,
            httpStatus: 0,
            response: {}
        };
    }

    componentDidMount() {
        const {url, method, data, children} = this.props;
        const {CancelToken} = Axios;
        this.source = CancelToken.source();
        this.setState({status: ApiStatus.LOADING});

        this.axios = Axios({
            url,
            method,
            data,
            cancelToken: this.source.token
        })
            .then((response) => {
                // handle success
                this.setState({status: ApiStatus.SUCCESS, response: response.data, httpStatus: response.status});
            })
            .catch((thrown) => {
                // handle error

                if (Axios.isCancel(thrown)) {
                } else {
                    this.setState({
                        status: ApiStatus.ERROR,
                        response: thrown.response,
                        httpStatus: thrown.response.status
                    });
                }
            });

    }
    componentWillMount() {
        this.children = React.Children.toArray(this.props.children).reduce((total, currentValue) => {
            const child = currentValue.type.name.toUpperCase();
            if (total[child])
                return {...total, [child]: [...total[child], currentValue]};
            else
                return {...total, [child]: [currentValue]}
        },{})
    }

    render() {
        const {status, response, httpStatus} = this.state;
        if (this.children[status])
            return this.children[status].map(child => React.cloneElement(child, {response, httpStatus}));
        else
            return null;
    }

    componentWillUnmount() {
        if (this.source) {
            this.source.cancel('Operation canceled by component unmounted.');
        }
    }
}


Fetch.defaultProps = {
    method: 'get',
    data: {}
};
