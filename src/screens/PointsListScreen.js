import { Text, View, ScrollView, StyleSheet, TouchableOpacity, Alert, Modal, Dimensions, Picker } from 'react-native'
import React, { Component, useState } from 'react'
import tw from 'tailwind-react-native-classnames';
import EntryList from './../components/EntryList'
import { Input, Button, Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get("window");


const PointsListScreen = () => {

    const navigation = useNavigation();

    const [modalVisible, setModalVisible] = useState(false);

    const toggleModalVisibility = () => {
        setModalVisible(!modalVisible);
    };

    const multipleFunction = () =>{
        toggleModalVisibility();
        navigation.navigate('CeateReportScreen');
    }


    return (

        <ScrollView
            contentContainerStyle={{ paddingBottom: 100 }}>
            <Text style={styles.title}>Listado de puntos</Text>

            <Button
                style={styles.btnIncident}
                title= {"Reportar incidente"}
                onPress={() => toggleModalVisibility()}>
                <Text style={styles.btnText} >Reportar incidente</Text>
            </Button>

            <Modal
                animationType="slide"
                transparent
                visible={modalVisible}
                presentationStyle="overFullScreen"
                onDismiss={() => toggleModalVisibility()}>
                <View style={styles.viewWrapper}>
                    <View style={styles.modalView}>
                        <Text  style={styles.text}>¿Reportar incidente?</Text>

                        <View style={tw`flex-row justify-between`}>
                            <Button
                                title="Cancelar"
                                buttonStyle={{ backgroundColor: '#848484', marginBottom: 15 }}
                                onPress={() => toggleModalVisibility()} />

                            <Button
                                title="Aceptar"
                                buttonStyle={{ marginLeft: 100, backgroundColor: '#002443', marginBottom: 15 }}
                                 
                                onPress= {() => multipleFunction() }/>
                        </View>
                    </View>
                </View>
            </Modal>

            <EntryList
                data={state}
            />


        </ScrollView>
    );


}

export default PointsListScreen


const state = [
    { name: 'Puerta principal' }
]

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 30,
        backgroundColor: '#fff'
    },
    title: {
        textAlign: 'center',
        color: '#ffad00',
        fontSize: 30,
        marginBottom: 20,
        fontWeight: 'bold'
    },  
    text: {
        textAlign: 'center',
        color: '#133C60',
        fontSize: 20,
        fontWeight: 'bold'
    },
    btnIncident: {
        marginBottom: 20,
        height: 35,
        width: width - 60,
        backgroundColor: '#133C60',
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnText: {
        color: 'white'
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