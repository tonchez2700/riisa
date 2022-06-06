import React, { useContext, useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Modal, Dimensions, } from 'react-native'
import { Input, Button, Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import tw from 'tailwind-react-native-classnames'

const ModalCheck = () => {

    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);
    const toggleModalVisibility = () => {
        setModalVisible(!modalVisible);
    };
    const multipleFunction = () => {
        toggleModalVisibility();
        navigation.navigate('CeateReportScreen');
    }

    return (
        <View>
            <Button
                buttonStyle={{ backgroundColor: '#002443', marginBottom: 10 }}
                title={"Reportar incidente"}
                onPress={() => toggleModalVisibility()}>
            </Button>

            <Modal
                animationType="slide"
                transparent
                visible={modalVisible}
                presentationStyle="overFullScreen"
                onDismiss={() => toggleModalVisibility()}>
                <View style={styles.viewWrapper}>
                    <View style={styles.modalView}>
                        <Text style={styles.text}>¿Reportar incidente?</Text>

                        <View style={tw`flex-row justify-between`}>
                            <Button
                                title="Cancelar"
                                buttonStyle={{ backgroundColor: '#848484', marginBottom: 15 }}
                                onPress={() => toggleModalVisibility()} />

                            <Button
                                title="Aceptar"
                                buttonStyle={{ marginLeft: 100, backgroundColor: '#002443', marginBottom: 15 }}

                                onPress={() => multipleFunction()} />
                        </View>
                    </View>
                </View>
            </Modal>

        </View>
    )
}

export default ModalCheck

const styles = StyleSheet.create({})
