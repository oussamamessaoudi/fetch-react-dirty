import React, {Children, cloneElement, createContext, useContext, useEffect, useState} from 'react';
import Axios from "axios";
import {MethodHttp} from "./MethodHttp";
import {ApiStatus} from "./ApiStatus";

interface FetchProps {
	url: string,
	method: MethodHttp,
	data?: object,
	start: boolean
	children: Array<object>
}

interface IState {
	status: ApiStatus,
	response?: object,
	httpStatus?: number
}

interface IContext {
	LOADING?: JSX.Element,
	SUCCESS?: JSX.Element,
	ERROR?: JSX.Element,
	headers?: Array<any>,
}

const FetchContext = createContext<IContext>({});
export const FetchProvider = FetchContext.Provider;
export const FetchTSHooks = ({url, method = MethodHttp.GET, data, start = true, children}: FetchProps) => {
	const [state, setState] = useState<IState>({status: ApiStatus.INITIALIZE});
	const [childrenMap, setChildrenMap] = useState<Object>({});
	const valueContext = useContext(FetchContext);
	useEffect(() => {
		if (!start) return;

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
				if (!Axios.isCancel(thrown)) {
					setState({
						status: ApiStatus.ERROR,
						response: thrown.response,
						httpStatus: thrown.response && thrown.response.status
					});
				}
			});
		return () => {
			if (source) {
				source.cancel('Operation canceled by component unmounted.');
			}
		};
	}, [url, method, data, start]);

	useEffect(() => {
		setChildrenMap(Children.toArray(children).reduce((total: Object, currentValue: JSX.Element) => {
			return {...total, [currentValue.type.name.toUpperCase()]: currentValue}
		}, {}))
	}, [children]);
	if (childrenMap[state.status])
		return cloneElement(childrenMap[state.status], {
			response: state.response,
			httpStatus: state.httpStatus
		});
	else if (valueContext[state.status])
		if (typeof (valueContext[state.status]) === 'function')
			return valueContext[state.status]();
		else
			return valueContext[state.status];
	return null;
};