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
    campains: [],
    dataDiplomant: [],
    cost: '',
    TotalCost: 0,
    dataProgram: [],
    dataBene: [],
    dataItems: [],
    data: '',
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
        case 'SET_CAMP':
            let DataCamp = action.payload.typeData
            return {
                ...state,
                data: {
                    ...state.data,
                    [DataCamp]: action.payload.value,
                    reg_product_type_id: action.payload.value.type
                },
            }
        case 'SET_PROG':
            let DataProg = action.payload.typeData
            let newCost = action.payload.value.cost
            if (state.TotalCost != '')
                newCost = state.TotalCost + newCost
            return {
                ...state,
                data: {
                    ...state.data,
                    [DataProg]: action.payload.value,
                    reg_product_type_id: action.payload.value.reg_product_type_id
                },
                TotalCost: newCost
            }
        case 'SET_DATA_ITEMS':
            let typeItem = action.payload.type
            return {
                ...state,
                dataItems: [
                    ...state.dataItems,
                    typeItem = action.payload.value
                ],
                data: '',
            }
        case 'SET_DATA_CAMPAINS':
            return {
                ...state,
                campains: action.payload.listcampain
            }
        case 'SET_DATA_PROGRAM':
            return {
                ...state,
                dataProgram: action.payload.listProgram
            }

        case 'SET_DATA_BENE':
            return {
                ...state,
                dataBene: action.payload.listBene
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


const getcampainsByStatus = (dispatch) => {
    return async () => {
        try {
            dispatch({ type: 'FETCHING_DATA', payload: { fetchingData: true } });
            const user = JSON.parse(await AsyncStorage.getItem('user'));
            const token = user.token
            const response = await httpClient
                .get(`campains?campain_status_id=1`, {
                    'Authorization': `Bearer ${token}`,
                }
                );
            if (response != '') {
                const listcampain = response.map(item => ({
                    id: item.id,
                    title: item.name,
                }))
                dispatch({
                    type: 'SET_DATA_CAMPAINS',
                    payload: { listcampain }
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
const getprogram = (dispatch) => {
    return async (id) => {
        try {
            dispatch({ type: 'FETCHING_DATA', payload: { fetchingData: true } });
            const user = JSON.parse(await AsyncStorage.getItem('user'));
            const token = user.token
            const response = await httpClient
                .get(`groups?diplomat_type_id=1&campain_id=${id}`, {
                    'Authorization': `Bearer ${token}`,
                }
                );
            if (response != '') {
                const listProgram = response.map(item => ({
                    group_id: item.diplomat.id,
                    reg_product_type_id: item.diplomat.diplomat_type_id,
                    title: item.diplomat.name,
                    cost: item.cost
                }))
                dispatch({
                    type: 'SET_DATA_PROGRAM',
                    payload: { listProgram }
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
const getBene = (dispatch) => {
    return async (id) => {
        try {
            dispatch({ type: 'FETCHING_DATA', payload: { fetchingData: true } });
            const user = JSON.parse(await AsyncStorage.getItem('user'));
            const token = user.token
            const response = await httpClient
                .get(`groups?diplomat_type_id=2&campain_id=${id}`, {
                    'Authorization': `Bearer ${token}`,
                }
                );
            if (response != '') {
                const listBene = response.map(item => ({
                    group_id: item.diplomat.id,
                    reg_product_type_id: item.diplomat.diplomat_type_id,
                    title: item.diplomat.name,
                    cost: item.cost
                }))
                dispatch({
                    type: 'SET_DATA_BENE',
                    payload: { listBene }
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

const handleInputChangeCamp = (dispatch) => {
    return async (value, typeData) => {
        dispatch({
            type: 'SET_CAMP',
            payload: { value, typeData }
        })
    }
}
const handleInputChangeProg = (dispatch) => {
    return async (value, typeData) => {
        dispatch({
            type: 'SET_PROG',
            payload: { value, typeData }
        })
    }
}

const handleInputItems = (dispatch) => {
    return async (value, type) => {
        dispatch({
            type: 'SET_DATA_ITEMS',
            payload: { value, type }
        })
    }
}

const store = (dispatch) => {
    return async (data, cost, user, id) => {

        const dataPlan = {
            student_id: id,
            data,
            cost,
            user
        }
        if (data != '') {
            Alert.alert(
                "Correcto",
                'Plan de estudio agregado correctamente.',
                [{
                    text: "Aceptar",
                    onPress: rootNavigation.navigate('NewRegisterStep3', dataPlan)
                }]
            )
        } else {
            Alert.alert(
                "Falta agregar campo",
                'Agerga un plan de estudio ',
                [{
                    text: "Aceptar"

                }]
            )
        }


    }
}

export const { Context, Provider } = createDataContext(
    NewRegisterStep2Reducer,
    {
        clearState,
        getcampainsByStatus,
        getprogram,
        getBene,
        handleInputChangeCamp,
        handleInputChangeProg,
        handleInputItems,
        store,


    },
    initialState
);