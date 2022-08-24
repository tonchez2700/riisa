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
    dataPayment: [],
    cost: '',
    TotalCost: 0,
    data: '',

}

const NewRegisterStep3Reducer = (state = initialState, action) => {

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
            let typeData = action.payload.typeData
            return {
                ...state,
                data: {
                    ...state.data,
                    [typeData]: action.payload.value
                }
            }
        case 'ADD_PAYMENT':
            let amount = 0;
            let newData = [action.payload.data];
            newData.forEach(element => {
                amount = state.TotalCost + parseInt(element.amount)
            });
            newData = [...state.dataPayment, action.payload.data];
            return {
                ...state,
                dataPayment: newData,
                TotalCost: amount
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


const handleInputChange = (dispatch) => {
    return async (value, typeData) => {
        dispatch({
            type: 'SET_INPUT',
            payload: { value, typeData }
        })
    }
}

const store = (dispatch) => {
    return async (data, payment, paymentDe, TotalCost) => {

        const dataTotal = {
            data,
            payment
        }
        if ((paymentDe - TotalCost) == 0) {
            Alert.alert(
                "Correcto",
                'Plan de estudio agregado correctamente.',
                [{
                    text: "Aceptar",
                    onPress: rootNavigation.navigate('NewRegisterStep4', dataTotal)
                }]
            )
        } else {
            Alert.alert(
                "Saldo Pendien",
                "Hay saldo pendiente por definir fecha de pago",
                [{
                    text: "Aceptar"
                }]
            )
        }
    }
}

const handleInputChangePayment = (dispatch) => {
    return async (data) => {
        dispatch({
            type: 'ADD_PAYMENT',
            payload: {
                data: {
                    ...data,
                    reg_payment_type_id: 1,
                    is_paid: 0,
                    is_taxable: 1
                }
            }
        })
    }
}


export const { Context, Provider } = createDataContext(
    NewRegisterStep3Reducer,
    {
        clearState,
        getcampainsByStatus,
        handleInputChange,
        handleInputChangePayment,
        store,


    },
    initialState
);