import React, { useContext, useState, useEffect } from 'react'
import { ScrollView, StyleSheet, Alert, View, Text, Modal, Dimensions } from 'react-native'
import { NavigationHelpersContext, useNavigation, } from '@react-navigation/native';
import HeadTitleScreen from '../components/HeadTitleScreen.js'
import { Input, Button } from 'react-native-elements'
import tw from 'tailwind-react-native-classnames'

const { width } = Dimensions.get("window");

const CeateReportScreen = (props) => {

    const navigation = useNavigation();
    const [flexWrapper, setFlexWrapper] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);

    const toggleModalVisibility = () => {
        setModalVisible(!modalVisible);
    };
    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            padding={5}>
            <HeadTitleScreen title='Visitante' />
            <Input
                inputStyle={tw`text-center`}
                label='Fecha'
                value='02/02/2022'
                disabled={true}

                labelStyle={{ color: '#133C60' }}
                multiline={true}
            />
            <Input
                inputStyle={tw`text-center`}
                label='Hora'
                value='2:00pm'
                disabled={true}

                labelStyle={{ color: '#133C60' }}
                multiline={true}
            />
            <Input
                inputStyle={tw`text-center`}
                label='Ubicación'
                disabled={true}
                value='25.672092, -100.309392'
                labelStyle={{ color: '#133C60' }}
                multiline={true}
            />

            <Input
                inputStyle={tw`text-center`}
                label='Tipo de incidente'
                disabled={true}

                labelStyle={{ color: '#133C60' }}
                multiline={true}
            />
            <Input
                inputStyle={tw`text-center`}
                label='Fotografía'
                disabled={true}
                labelStyle={{ color: '#133C60' }}
                multiline={true}
            />
            
            <Input
                label='Describa el incidente'
                borderWidth={2}
                padding={50}
                disabled={true}
                onChangeText={(value) => handleInputChange(value, 'reason')}
                labelStyle={{ color: '#133C60' }}
                multiline={true}
            />


            <View style={tw`flex-row justify-between`}>
                <Button
                    buttonStyle={{ backgroundColor: '#848484', marginBottom: 15 }}
                    onPress={
                        () => navigation.navigate('PointsListScreen')
                    }
                    title="Rechazar" />

                <Button
                    buttonStyle={{ padding: 10, backgroundColor: '#002443', marginBottom: 15 }}
                    onPress={
                        toggleModalVisibility
                    }
                    title="Aceptar" />

                <Modal
                    animationType="slide"
                    transparent visible={modalVisible}
                    presentationStyle="overFullScreen"
                    onDismiss={toggleModalVisibility}>
                    <View style={styles.viewWrapper}>
                        <View style={styles.modalView}>
                            <Input
                                inputStyle={tw`text-center`}
                                label='Gafete'
                                labelStyle={{ color: '#133C60' }}
                            />
                            <Input
                                inputStyle={tw`text-center`}
                                label='Cono'
                                labelStyle={{ color: '#133C60' }}
                            />

                            <View style={tw`flex-row justify-between`}>
                                <Button
                                    title="Cancelar"
                                    buttonStyle={{ backgroundColor: '#848484', marginBottom: 15 }}
                                    onPress={toggleModalVisibility} />

                                <Button
                                    title="Aceptar"
                                    buttonStyle={{ marginLeft: 100, backgroundColor: '#002443', marginBottom: 15 }} />
                            </View>
                        </View>
                    </View>
                </Modal>
            </View >
        </ScrollView >
    )
}

export default CeateReportScreen

const styles = StyleSheet.create({

    screen: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
    },
    viewWrapper: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.2)",
    },
    modalView: {
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        top: "50%",
        left: "50%",
        elevation: 5,
        transform: [{ translateX: -(width * 0.4) },
        { translateY: -90 }],
        height: 250,
        width: width * 0.8,
        backgroundColor: "#fff",
        borderRadius: 7,
    },
});