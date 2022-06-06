import { Text, View, ScrollView, StyleSheet, TouchableOpacity, Alert, Modal, Dimensions, ActivityIndicator } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import { Context as PointsListContext } from '../context/PointsListContext';
import { Context as PatrolsListContext } from '../context/PatrolsListContext';
import { Input, Button, Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import tw from 'tailwind-react-native-classnames';
import HeadTitleScreen from '../components/HeadTitleScreen';
import EntryList from './../components/EntryList'
import ModalIncident from '../components/Modal/ModalIncident';
import ModalCancel from '../components/Modal/ModalCancel';
import ModalCheck from '../components/Modal/ModalCheck';
import moment from 'moment'

const { width } = Dimensions.get("window");


const PointsListScreen = (data) => {

    const navigation = useNavigation();
    const { state, setRonda, setPatrol } = useContext(PointsListContext);
    const [clockState, setClockState] = useState();
    const { state: statePatrol, } = useContext(PatrolsListContext);
    const { route: { params: { id, nombre } } } = data;

    const full_initial_date = new Date(state.patrolPoint.fechaHoraInicio);
    const initial_date = moment(full_initial_date).format('DD-MM-YYYY');


    useEffect(() => {
        setInterval(() => {
            const today = new Date();
            setClockState(moment(today).format('h:mm:ss a'))
        }, 1000);
    }, []);


    useEffect(() => {

        if (state.patrolPoint != 'El Rondin 2, no existe') {
            setPatrol(statePatrol.patrol[0].id)
            setRonda(state.patrolPoint.id);
        }
    }, [state.patrolPoint.id]);


    return (

        <ScrollView
            contentContainerStyle={{ paddingBottom: 100 }}>


            <HeadTitleScreen title='Listado de rondines' />

            <View style={tw` flex-col items-center`}>
                <View style={tw`flex-row `}>
                    <Text style={[tw`flex-1 text-black font-bold text-lg`]}>ID: </Text>
                    <Text style={[tw`flex-1 text-black text-lg`]}> {state.patrolPoint.id}</Text>
                </View>
                <View style={tw`flex-row `}>
                    <Text style={[tw` flex-1 text-black font-bold text-lg `]}>Fecha de inicio: </Text>
                    <Text style={[tw` flex-1 text-black text-lg`]}> {initial_date}</Text>
                </View>
                <View style={tw`flex-row `}>
                    <Text style={[tw`flex-1 text-black font-bold text-lg `]}>Rondin: </Text>
                    <Text style={[tw`flex-1 text-black text-lg`]}> {state.patrolPoint.rondinNombre}</Text>
                </View>
                <View style={tw`flex-row `}>
                    <Text style={[tw`flex-1 text-black font-bold text-lg `]}>Tiempo Acumulado: </Text>
                    <Text style={[tw`flex-1 text-black text-lg`]}> {clockState}</Text>
                </View>

            </View>
            {

                !state.fetchingData
                    ?
                    !state.error
                        ?
                        <EntryList
                            data={state.point}
                        />
                        :
                        <View style={tw`flex-1 p-5 justify-center items-center`}>
                            <Text style={tw`text-center text-lg mb-3`}>
                                {state.message}
                            </Text>
                        </View>
                    :
                    <ActivityIndicator size="large" color="#118EA6" style={tw`mt-5`} />
            }


            <ModalIncident />
            <ModalCancel />

            <Button
                buttonStyle={{ backgroundColor: '#A2A2A2', marginBottom: 10 }}
                title={"Regresar"}
                onPress={() => navigation.goBack()}>
            </Button>

        </ScrollView>
    );


}

export default PointsListScreen


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 30,
        backgroundColor: '#fff'
    },
    viewWrapper: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.2)",
    },
    modalView: {
        alignItems: "center",
        justifyContent: "space-evenly",
        position: "absolute",
        top: "50%",
        left: "50%",
        elevation: 5,
        transform: [{ translateX: -(width * 0.4) },
        { translateY: -90 }],
        height: 250,
        width: width * 0.8,
        backgroundColor: "#fff",
        borderRadius: 15,
        padding: 5
    },
})