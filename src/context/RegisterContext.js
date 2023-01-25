import { Alert } from 'react-native'
import createDataContext from './createDataContext'
import AsyncStorage from '@react-native-async-storage/async-storage';
import httpClient from '../services/httpClient'
import * as rootNavigation from '../helpers/rootNavigation';
import { INVITED_ENTRY_TYPE, PROVIDER_ENTRY_TYPE, SERVICE_ENTRY_TYPE } from '../config/defines';
import moment from 'moment';

const initialState = {
    error: false,
    message: null,
    fetchingData: false,
    orderNum: '',
    car: [],
    ine: [],
    plate: [],
    data: [],
    ticket: [],
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
                data: [action.payload.response[0]]
            }
        case 'SET_ORDER_NUMBER':
            let type = action.payload.typedata
            return {
                ...state,
                [type]: action.payload.value
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
    return async (orderNum) => {
        try {

            const user = JSON.parse(await AsyncStorage.getItem('user'));
            const token = user.token
            const response = await httpClient.get(`buybuyingorders?folio=${orderNum}`, { 'Authorization': token });
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
            img = `data:image/jpeg;base64,${element.source}`;
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
        dispatch({
            type: 'SET_IMAGENS_URLS',
            payload: {
                ImagenList
            }
        });
    }
}

const store = (dispatch) => {
    return async (plate, car, ine, id) => {
        dispatch({ type: 'FETCHING_DATA', payload: { fetchingData: true } });
        let data = {
            folio: id,
            pictures: {
                tags: [{ file: plate }],
                trucks: [{ file: car }],
                ines: [{ file: ine }],
            }
        }
        const validated = validateData(plate, car, ine)
        if (!validated.error) {
            const user = JSON.parse(await AsyncStorage.getItem('user'));
            const token = user.token
            const response = await httpClient.post(
                `comings`,
                data,
                { 'Authorization': token });

            if (response.status) {
                dispatch({ type: 'FETCHING_DATA', payload: { fetchingData: false } });
                Alert.alert(
                    "Correcto",
                    "Entrada creada correctamente.",
                    [{
                        text: "Aceptar",
                        onPress: () => rootNavigation.navigate('HomeScreen')
                    }]
                )
            } else {
                Alert.alert(
                    "Error",
                    "Hubo un problema a generar la salida",
                    [{
                        text: "Aceptar",
                    }]
                )
            }
        } else {
            Alert.alert(
                "Error",
                validated.message,
                [{
                    text: "Aceptar",
                }]
            )
        }

    }
}

const storeOut = (dispatch) => {
    return async (id, dataFrom, Imagen) => {
        dispatch({ type: 'FETCHING_DATA', payload: { fetchingData: true } });
        const data = {
            ticket: dataFrom.Ticket,
            notes: 'pato',
            pictures: {
                ticket: [{ file: Imagen }]
            }
        }
        const user = JSON.parse(await AsyncStorage.getItem('user'));
        const token = user.token
        const response = await httpClient.put(
            `comings/${id}`,
            data,
            { 'Authorization': token });
        if (response.status) {
            Alert.alert(
                "Correcto",
                "Salida correctamente.",
                [{
                    text: "Aceptar",
                    onPress: () => rootNavigation.navigate('HomeScreen')
                }]
            )
            dispatch({ type: 'FETCHING_DATA', payload: { fetchingData: false } });
        } else {
            Alert.alert(
                "Error",
                "Hubo un problema a generar la salida",
                [{
                    text: "Aceptar",
                }]
            )
            dispatch({ type: 'FETCHING_DATA', payload: { fetchingData: false } });
        }
    }
}

const handleInputChange = (dispatch) => {
    return async (value, typedata) => {
        dispatch({
            type: 'SET_ORDER_NUMBER',
            payload: { value, typedata }
        })
    }
}

const ViewComing = (dispatch) => {
    return async (id) => {
        const user = JSON.parse(await AsyncStorage.getItem('user'));
        const token = user.token
        const response = await httpClient.get(`comings/${id}`, { 'Authorization': token });
        if (response != '') {
            rootNavigation.navigate('ViewComingScreen', response)
        } else {
            Alert.alert(
                "Error",
                "Hubo un problema a generar la salida",
                [{
                    text: "Aceptar",
                }]
            )
        }
    }
}

const validateData = (plate, car, ine) => {
    let result = { error: false }
    if (!plate)
        return { ...result, error: true, message: 'Fotografía de la Placa es requerido.' }
    if (!car)
        return { ...result, error: true, message: 'Fotografía del Camión es requerido.' }
    if (!ine)
        return { ...result, error: true, message: 'Fotografía del INE es requerido.' }

    return result
}


export const { Context, Provider } = createDataContext(
    RegisterReducer,
    {
        clearState,
        setFetchingList,
        onChangeImagen,
        storeOut,
        getImagensOutTools,
        handleInputChange,
        store,
        ViewComing,

    },
    initialState
);