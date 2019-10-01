import React, {Component} from 'react';
import Axios from 'axios';

import ApiStatus from './ApiStatus';

export default class Fetch extends Component {
    constructor(props) {
        super(props);
        this.source = null;
        this.state = {
            status: ApiStatus.INITIALIZED,
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
                this.setState({status: ApiStatus.SUCCESS, response: response.data});
            })
            .catch((thrown) => {
                // handle error

                if (Axios.isCancel(thrown)) {
                    console.log('Request canceled', thrown.message);
                } else {
                    this.setState({status: ApiStatus.ERROR, response: thrown.response});
                }
            });

    }
    componentWillMount() {
        this.children = React.Children.toArray(this.props.children).reduce((total, currentValue, currentIndex, arr)=>{
            return { ...total, [currentValue.type.name.toUpperCase()] : currentValue }
        },{})
    }

    render() {
        const {children} = this.props;
        const {status, response} = this.state;
        if (this.children[status])
            return React.cloneElement(this.children[status].component,{response});
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
