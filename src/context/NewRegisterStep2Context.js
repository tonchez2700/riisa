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
    dataStudent: [],
    dataProgram: [],
    data: [],
    countries: [
        'Egypt',
        'Canada',
        'Australia',
        'Ireland',
        'Brazil',
        'England',
        'Dubai',
        'France',
        'Germany',
        'Saudi Arabia',
        'Argentina',
        'India',
    ],

}

const NewRegisterStep2Reducer = (state = initialState, action) => {

    switch (action.type) {
        case 'CLEAR_STATE':
            return {
                ...initialState,
            }
        case 'FETCHING_DATA':
            return { ...state, fetchingData: action.payload.fetchingData }
        case 'SET_REQUEST_ERROR':
            return {
                ...state,
                error: true,
                message: action.payload.message,
                fetchingData: false
            }
        case 'SET_INPUT':
            let typedata = action.payload.typedata
            return {
                ...state,
                dataProgram: {
                    ...state.dataProgram,
                    [typedata]: action.payload.value
                }

            }
        case 'SET_ITEMS':
            return {
                ...state,
                data: [action.payload.value]
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


const getStudentbyEmail = (dispatch) => {
    return async (id) => {
        try {
            dispatch({ type: 'FETCHING_DATA', payload: { fetchingData: true } });
            const user = JSON.parse(await AsyncStorage.getItem('user'));
            const token = user.token
            const response = await httpClient
                .get(`campains?campain_status_id=${id}`, {
                    'Authorization': token,
                }
                );
            if (response != '') {
                dispatch({
                    type: 'SET_DATA_STUDENT',
                    payload: {
                        result: response
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


const handleInputChange = (dispatch) => {
    return async (value, typedata) => {

        dispatch({
            type: 'SET_INPUT',
            payload: { value, typedata }
        })
    }
}

const handleInputItems = (dispatch) => {
    return async (value) => {

        dispatch({
            type: 'SET_ITEMS',
            payload: { value }
        })
    }
}

export const { Context, Provider } = createDataContext(
    NewRegisterStep2Reducer,
    {
        clearState,
        getStudentbyEmail,
        handleInputChange,
        handleInputItems,

    },
    initialState
);