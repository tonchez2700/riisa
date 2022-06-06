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
    incident: [],
    commentIncident: '',
    incidenteTipoId: [],
    typeIncident: '',
    images: [],
    patrol: [],
    fetchingData: false
}

const IncidentRedcer = (state = initialState, action) => {

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

        case 'SET_DATA':
            let fieldName = action.payload.fieldName
            return {
                ...state,
                [fieldName]: action.payload.value,

            }
        case 'SET_INCIDENT':
            return {
                ...state,
                incident: action.payload.suggestions,

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

const setIncident = (dispatch) => {
    return async () => {
        dispatch({ type: 'FETCHING_DATA', payload: { fetchingData: true } });
        const user = JSON.parse(await AsyncStorage.getItem('user'));
        const token = user.token
        const response = await httpClient.get(`incidentes/obtenerIncidenteTipos`,
            {
                'Authorization': `Bearer ${token}`,
            }
        );
        const suggestions = response
            .filter(item => item.descripcion.toLowerCase())
            .map(item => ({
                value: item.id,
                description: item.descripcion,

            }))

        dispatch({
            type: 'SET_INCIDENT',
            payload: { suggestions }
        })
    }
}

const store = (dispatch) => {
    return async (params, id) => {
        try {
            dispatch({ type: 'FETCHING_DATA', payload: { fetchingData: true } });

            const user = JSON.parse(await AsyncStorage.getItem('user'))
            const token = user.token
            const data = prepareData(params, id)
            const response = await httpClient.post(
                'incidentes/crearIncidente',
                data,
                {
                    'Authorization': `Bearer ${token}`,
                }
            )
            console.log(response);
            console.log(response);
        } catch (error) {

        }
    }
}

const handleResponseBehaviour = (dispatch) => {
    if (response.Exito) {
        dispatch({ type: 'FETCHING_DATA1', fetchingData: true })
        dispatch({
            type: 'SET_SUCCESS_RESPONSE',
            payload: { error: false, message: null }
        })
        rootNavigation.navigate('FreeVisitorListScreen')
    } else {
        dispatch({
            type: 'SET_ERROR',
            payload: {
                error: true,
                message: response.Mensaje
            }
        })
    }
}

const handleInputChange = (dispatch, state) => {
    return async (value, fieldName) => {

        dispatch({
            type: 'SET_DATA',
            payload: { value, fieldName }
        })
    }
}

const prepareData = (data, id) => {
    let result = {

        IncidenteTipoId: data.incidenteTipoId,
        Evidencias: `data:image/jpeg;base64,${data.images[0].source}`,
        ComentarioGuardia: data.comentarioGuardia,


    }
    return result
}


export const { Context, Provider } = createDataContext(
    IncidentRedcer,
    {
        clearState,
        handleInputChange,
        setIncident,
        store,
    },
    initialState
);