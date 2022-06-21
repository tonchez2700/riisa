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
    comentario: '',
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
        case 'SET_DATA':
            let fieldName = action.payload.fieldName
            return {
                ...state,
                [fieldName]: action.payload.value,

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
        console.log(response);
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
    return async (id,latitud,longitud) => {

        const data = prepareData(latitud,longitud)
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

const RondaDelete = (dispatch) => {
    return async (id, comentario) => {
        console.log(id, comentario);
        const user = JSON.parse(await AsyncStorage.getItem('user'));
        const token = user.token
        const data = DeleteData(comentario)
        if (!data.error) {
            Alert.alert(
                "Completado",
                "Ronda cancelada",
                [{
                    text: "Aceptar",
                    onPress: () =>  rootNavigation.navigate('PatrolListScreen')
                }]
            )
            await httpClient.put(`rondas/cancelarRonda/${id}`,
                data.data,
                {
                    'Authorization': `Bearer ${token}`,
                }
            )
           
        } else {
            dispatch({
                type: 'SET_ERROR',
                payload: data
            })
            Alert.alert(
                "Error",
                data.message,
                [{
                    text: "Aceptar",
                }]
            )
        }

    }
}
const DeleteData = (comentario) => {
    let ErrorData = { error: false }
    if (comentario == "")
        return { ...ErrorData, error: true, message: 'Falta comentario' }
    let result = {
        error: false,
        data: {
            Comentario: comentario,
        }

    }
    return result
}


const handleInputChange = (dispatch, state) => {
    return async (value, fieldName) => {

        dispatch({
            type: 'SET_DATA',
            payload: { value, fieldName }
        })
    }
}
const prepareData = (latitud,longitud) => {

    let data = {
        latitud: latitud,
        longitud: longitud,
        fechaHoraCheckIn: new Date(),

    }
    return data
}

export const { Context, Provider } = createDataContext(
    PointsListRedcer,
    {
        clearState,
        clearStateList,
        RondaDelete,
        handleInputChange,
        setPointsList,
        storeCheck,
    },
    initialState
);