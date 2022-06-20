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
        case 'CLEAR_STATE1':
            return {
                ...state,
                error: false,
                message: null,
                point: [],
            }
        case 'FETCHING_DATA':
            return {
                ...state,
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

const clearStateList = (dispatch) => {
    return () => {
        dispatch({ type: 'CLEAR_STATE1' });
    }
}


const setPointsList = (dispatch) => {
    return async (id) => {

        const user = JSON.parse(await AsyncStorage.getItem('user'));
        const token = user.token
        const response = await httpClient.get(`rondas/obtenerSiguientePunto/${id}`,
            {
                'Authorization': `Bearer ${token}`,
            }
        )
        if (response != '' || response == null) {
            dispatch({
                type: 'SET_POINTS',
                payload: { response }
            })
        } else {
            Alert.alert(
                "Completo ",
                "Ronda completada .",

                [{
                    text: "Aceptar",
                    onPress: () => rootNavigation.navigate('PatrolListScreen')
                }]
            )
        }

    }
}


const storeCheck = (dispatch) => {
    return async (id) => {

        const data = prepareData()
        const user = JSON.parse(await AsyncStorage.getItem('user'));
        const token = user.token
        const response = await httpClient.put(`rondas/checkinPunto/${id}`,
            data,
            {
                'Authorization': `Bearer ${token}`,
            }
        );
        if (response.status == 404) {
            Alert.alert(
                "ERROR",
                "Hubo un error no es posible dar check-in .",
                [{
                    text: "Aceptar",
                }]
            )
        } else {
            Alert.alert(
                "Correcto",
                "Se dio Check-in Correctamente .",
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
        clearStateList,
        setPointsList,
        storeCheck,
    },
    initialState
);