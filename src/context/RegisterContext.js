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
    car: [],
    ine: [],
    plate: [],
    data: [],
    dataImagen: []
}

const RegisterReducer = (state = initialState, action) => {

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
        case 'SET_FETCHING_DATA':
            return {
                ...state,
                fetchingData: false,
                data: action.payload.response
            }
        case 'SET_IMAGEN_VALUE':
            let typedata = action.payload.type
            return {
                ...state,
                [typedata]: action.payload.img
            }
        case 'SET_IMAGENS_URLS':

            return {
                ...state,
                dataImagen: action.payload.ImagenList,
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

const setFetchingList = (dispatch) => {
    return async () => {
        try {

            const user = JSON.parse(await AsyncStorage.getItem('user'));
            const token = user.token
            const response = await httpClient.get(`buybuyingorders`, { 'Authorization': token });
            dispatch({
                type: 'SET_FETCHING_DATA',
                payload: { response }
            })
        } catch (error) {
            dispatch({
                type: 'SET_REQUEST_ERROR',
                payload: {
                    error: true,
                    message: 'Por el momento el servicio no está disponible, inténtelo mas tarde.'
                }
            })
        }
    }
}

const onChangeImagen = (dispatch) => {
    return async (type, value) => {
        let img;
        value.forEach(element => {
            //img = `data:image/jpeg;base64,${element.source}`;
            img = `${element.preview}`
        });
        dispatch({
            type: 'SET_IMAGEN_VALUE',
            payload: { img, type }
        })

    }
}

const getImagensOutTools = (dispatch) => {
    return async (plate, car, ine) => {

        let ImagenList = [
            plate,
            car,
            ine
        ]
        console.log(ImagenList);
        dispatch({
            type: 'SET_IMAGENS_URLS',
            payload: {
                ImagenList
            }
        });
    }
}

const store = (dispatch) => {
    return async (imagenes, data) => {

        let ImagenList = [
            plate,
            car,
            ine
        ]
        console.log(ImagenList);
        dispatch({
            type: 'SET_IMAGENS_URLS',
            payload: {
                ImagenList
            }
        });
    }
}


export const { Context, Provider } = createDataContext(
    RegisterReducer,
    {
        clearState,
        setFetchingList,
        onChangeImagen,
        getImagensOutTools
    },
    initialState
);