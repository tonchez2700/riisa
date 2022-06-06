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
    cone: '',
    badge: '',
    patrol: [],
    fetchingData: false
}

const PatrolsListRedcer = (state = initialState, action) => {

    switch (action.type) {
        case 'CLEAR_STATE':
            return { ...initialState }
        case 'FETCHING_DATA':
            return {
                ...state,
                error: false,
                message: null,
                fetchingData: action.payload.fetchingData
            }
        case 'SET_PATROL':
            return {
                ...state,
                fetchingData: false,
                error: false,
                message: "",
                patrol: action.payload.response
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

const fetchingData = (dispatch) => {
    return async () => {
        try {
            dispatch({ type: 'FETCHING_DATA', payload: { fetchingData: true } });
            const user = JSON.parse(await AsyncStorage.getItem('user'));
            const token = user.token
            const response = await httpClient.get(`rondas/obtenerRondines`,
                {
                    'Authorization': `Bearer ${token}`,
                }
            );
            (user);
            dispatch({
                type: 'SET_PATROL',
                payload: { response }
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



export const { Context, Provider } = createDataContext(
    PatrolsListRedcer,
    {
        clearState,
        fetchingData,
    },
    initialState
);