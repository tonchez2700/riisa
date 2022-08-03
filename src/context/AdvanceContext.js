import { Alert } from 'react-native'
import createDataContext from './createDataContext'
import AsyncStorage from '@react-native-async-storage/async-storage';
import httpClient from '../services/httpClient'
import * as rootNavigation from '../helpers/rootNavigation';
import { INVITED_ENTRY_TYPE, PROVIDER_ENTRY_TYPE, SERVICE_ENTRY_TYPE } from '../config/defines';
import moment from 'moment';

const initialState = {
    error: false,
    message: "",
    fetchingData: false,
    listAdvance: [],
    data: '',

}

const AdvanceReducer = (state = initialState, action) => {

    switch (action.type) {
        case 'CLEAR_STATE':
            return {
                ...initialState,
            }
        case 'FETCHING_DATA':
            return { ...state, fetchingData: action.payload.fetchingData }
        case 'SET_ADVANCE':
            return {
                ...state,
                fetchingData: false,
                listAdvance: action.payload.result.result
            }
        case 'SET_DATA':
            return {
                ...state,
                fetchingData: false,
                data: action.payload.result.result
            }
        case 'SET_REQUEST_ERROR':
            return {
                ...state,
                error: true,
                message: action.payload.message,
                fetchingData: false
            }
        default:
            return state
    }

}

const clearState = (dispatch) => {
    return () => {
        dispatch({ type: 'CLEAR_STATE' });
    }
}

const loadAdvance = (dispatch) => {
    return async () => {
        try {
            dispatch({ type: 'FETCHING_DATA', payload: { fetchingData: true } });
            const user = JSON.parse(await AsyncStorage.getItem('user'));
            const token = user.token
            const response = await httpClient
                .get(`advances/getAdvances`, {
                    'Authorization': token,
                }
                );
            if (response.status != 400) {
                dispatch({
                    type: 'SET_ADVANCE',
                    payload: {
                        result: response
                    }
                });

            } else {
                dispatch({
                    type: 'SET_REQUEST_ERROR',
                    payload: {
                        error: true,
                        message: 'Por el momento el servicio no está disponible, inténtelo mas tarde.'
                    }
                });
            }
        } catch (error) {
            dispatch({
                type: 'SET_REQUEST_ERROR',
                payload: {
                    error: true,
                    message: 'Por el momento el servicio no está disponible, inténtelo mas tarde.'
                }
            });
        }


    }
}

const getAdvanceById = (dispatch) => {
    return async (id) => {
        try {
            dispatch({ type: 'FETCHING_DATA', payload: { fetchingData: true } });
            const user = JSON.parse(await AsyncStorage.getItem('user'));
            const token = user.token
            const response = await httpClient
                .get(`advances/getAdvanceById/${id}`, {
                    'Authorization': token,
                }
                );
            if (response.status != 400) {
                dispatch({
                    type: 'SET_DATA',
                    payload: {
                        result: response
                    }
                });
                rootNavigation.navigate('LayoffPersonalScreen', response.result)
            } else {
                dispatch({
                    type: 'SET_REQUEST_ERROR',
                    payload: {
                        error: true,
                        message: 'Por el momento el servicio no está disponible, inténtelo mas tarde.'
                    }
                });
            }
        } catch (error) {
            dispatch({
                type: 'SET_REQUEST_ERROR',
                payload: {
                    error: true,
                    message: 'Por el momento el servicio no está disponible, inténtelo mas tarde.'
                }
            });
        }
    }

}

const authorizationAdvance = (dispatch) => {
    return async (id,dataFrom) => {
        try {
            dispatch({ type: 'FETCHING_DATA', payload: { fetchingData: true } });
            const data = {
                tokenId: id,
                sourceProccesStatus: dataFrom.sourceProcessStatusId,
                targetProcessStatus: dataFrom.targetProcessStatusId
            }
            console.log(data);
            const user = JSON.parse(await AsyncStorage.getItem('user'));
            const token = user.token
            const response = await httpClient.post(
                'advances/AuthorizeAdvAdvance',
                data,
                {
                    'Authorization': `Bearer ${token}`,
                }

            )
            console.log(response);
            if (response.status != 400) {
                dispatch({
                    type: 'SET_DATA',
                    payload: {
                        result: response
                    }
                });
                rootNavigation.navigate('HomeScreen')
            } else {
                dispatch({
                    type: 'SET_REQUEST_ERROR',
                    payload: {
                        error: true,
                        message: 'Por el momento el servicio no está disponible, inténtelo mas tarde.'
                    }
                });
            }
        } catch (error) {
            dispatch({
                type: 'SET_REQUEST_ERROR',
                payload: {
                    error: true,
                    message: 'Por el momento el servicio no está disponible, inténtelo mas tarde.'
                }
            });
        }
    }

}

export const { Context, Provider } = createDataContext(
    AdvanceReducer,
    {
        clearState,
        loadAdvance,
        getAdvanceById,
        authorizationAdvance

    },
    initialState
);