import createDataContext from './createDataContext'
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import httpClient from '../services/httpClient'
import * as rootNavigation from '../helpers/rootNavigation';
import { Alert } from 'react-native';

const initialState = {
    error: false,
    message: null,
    name: '',
    patrolPoint: '',
    point: [],
    fetchingData: false
}

const PointsListRedcer = (state = initialState, action) => {

    switch (action.type) {
        case 'CLEAR_STATE':
            return { ...initialState }
        case 'FETCHING_DATA':
            return {
                ...state,
                fetchingData: action.payload.fetchingData,
                error: false,
                message: null,
                fetchingData: action.payload.fetchingData
            }
        case 'SET_PATROL_POINTS':
            return {
                ...state,
                fetchingData: false,
                error: false,
                message: "",
                patrolPoint: action.payload.ronda
            }
        case 'SET_POINTS':
            return {
                ...state,
                fetchingData: false,
                error: false,
                message: "",
                point: action.payload.response
            }
        case 'SET_ERROR':
            return {
                ...initialState,
                fetchingData: false,
                error: action.payload.error,
                message: action.payload.message
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

const setPatrol = (dispatch) => {
    return async (id) => {
        try {
            dispatch({ type: 'FETCHING_DATA', payload: { fetchingData: true } });
            const user = JSON.parse(await AsyncStorage.getItem('user'));
            const token = user.token
            const ronda = await httpClient.get(`rondas/crearRonda/${id}`,
                {
                    'Authorization': `Bearer ${token}`,
                });
            dispatch({
                type: 'SET_PATROL_POINTS',
                payload: { ronda }
            })
        } catch {
            Alert.alert(
                "Error",
                "No se encontro ningun rondin.",
                [{
                    text: "Aceptar",
                }]
            )
        }
    }
}

const setRonda = (dispatch) => {
    return async (id) => {
        try {
            dispatch({ type: 'FETCHING_DATA', payload: { fetchingData: true } });
            const user = JSON.parse(await AsyncStorage.getItem('user'));
            const token = user.token
            const response = await httpClient.get(`rondas/obtenerSiguientePunto/${id}`,
                {
                    'Authorization': `Bearer ${token}`,
                }
            );
            if (response) {
                dispatch({
                    type: 'SET_POINTS',
                    payload: { response }
                })
            } else {
                dispatch({
                    type: 'SET_REQUEST_ERROR',
                    payload: {
                        error: true,
                        message: 'No se encontraron invitaciones anteriores.'
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


const storeCheck = (dispatch) => {
    return async (id) => {
        try {

            const data = prepareData()
            dispatch({ type: 'FETCHING_DATA', payload: { fetchingData: true } });
            const user = JSON.parse(await AsyncStorage.getItem('user'));
            const token = user.token
            const response = await httpClient.put(`rondas/checkinPunto/${id}`,
                data,
                {
                    'Authorization': `Bearer ${token}`,
                }
            );
            (response);
        } catch (error) {
            Alert.alert(
                "Error",
                "No se pudo dar check-in",
                [{
                    text: "Aceptar",
                }]
            )
        }


    }
}

const prepareData = () => {

    let data = {
        latitud: 56565,
        longitud: -100.334885,
        fechaHoraCheckIn: new Date(),

    }
    return data
}

export const { Context, Provider } = createDataContext(
    PointsListRedcer,
    {
        clearState,
        setPatrol,
        setRonda,
        storeCheck,
    },
    initialState
);