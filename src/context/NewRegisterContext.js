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
    dataFrom: '',
    data: [],
    countries: [
        { city: 'City1', value: 'City1' },
        { city: 'City2', value: 'City2' },
        { city: 'City3', value: 'City3' },
        { city: 'City4', value: 'City4' },
        { city: 'City5', value: 'City5' },
        { city: 'City6', value: 'City6' },
        { city: 'City7', value: 'City7' },
        { city: 'City8', value: 'City8' },
    ],
    jobs: [
        { city: 'Job1', value: 'Job1' },
        { city: 'Job2', value: 'Job2' },
        { city: 'Job3', value: 'Job3' },
        { city: 'Job4', value: 'Job4' },
    ],
    genders: [
        { city: 'Masculino', value: 'Masculino' },
        { city: 'Femenino', value: 'Femenino' },
    ],

}

const NewRegisterReducer = (state = initialState, action) => {

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
        case 'SET_DATA_STUDENT':
            let typedata = action.payload.typedata
            return {
                ...state,
                fetchingData: false,
                dataFrom: {
                    ...state.dataFrom,
                    [typedata]: action.payload.value
                }
            }
        case 'SET_FROM_STUDENT':
            return {
                ...state,
                fetchingData: false,
                dataFrom: {
                    ...state.dataFrom,
                    email: action.payload.response[0].user.email,
                    phone: action.payload.response[0].phone,
                    name: action.payload.response[0].user.name,
                    paternal_surname: action.payload.response[0].user.paternal_surname,
                    maternal_surname: action.payload.response[0].user.maternal_surname,
                    city: action.payload.response[0].city.name,
                    birthdate: action.payload.response[0].birthdate,
                    gender: action.payload.response[0].gender.name,
                    job: action.payload.response[0].job.name,
                    media_origin: action.payload.response[0].media_origin.name,
                }
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
    return async (email) => {
        try {
            dispatch({ type: 'FETCHING_DATA', payload: { fetchingData: true } });
            const user = JSON.parse(await AsyncStorage.getItem('user'));
            const token = user.token
            const response = await httpClient
                .get(`students?email=${email}`, {
                    'Authorization': `Bearer ${token}`,
                }
                );
            if (response != '') {
                dispatch({
                    type: 'SET_FROM_STUDENT',
                    payload: { response }
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


const handleInputChange = (dispatch) => {
    return async (value, typedata) => {

        dispatch({
            type: 'SET_DATA_STUDENT',
            payload: { value, typedata }
        })
    }
}


export const { Context, Provider } = createDataContext(
    NewRegisterReducer,
    {
        clearState,
        getStudentbyEmail,
        handleInputChange,

    },
    initialState
);