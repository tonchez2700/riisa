import React, { useContext, useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Modal, Dimensions, } from 'react-native'
import { Input, Button, Icon } from 'react-native-elements';
import DateRange from '../DateRange';
import { useNavigation } from '@react-navigation/native';
import DropdownSelect from '../DropdownSelect';
import tw from 'tailwind-react-native-classnames'


const { width } = Dimensions.get("window");

const ModalPayment = () => {

    const camp = [
        'campana 1',
        'campana 2',
        'campana 3',
    ];

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
                titleStyle={[tw`text-base`, { color: '#133C60' }]}
                buttonStyle={[tw` mr-2  rounded-md `, styles.items]}
                iconPosition={'left'}
                icon={{
                    name: 'plus',
                    type: 'font-awesome',
                    size: 15,
                    color: '#133C60',
                }}
                title="Agregar Pago"
                onPress={() => toggleModalVisibility()}
            />

            <Modal
                animationType="slide"
                transparent
                visible={modalVisible}
                presentationStyle="overFullScreen"
                onDismiss={() => toggleModalVisibility()}>
                <View style={styles.viewWrapper}>
                    <View style={styles.modalView}>
                        <View style={tw`flex-col items-start p-3`}>
                            <Text style={[tw` text-sm mb-1 font-bold `, { color: '#133C60' }]}>Selecciona la Campaña</Text>
                            <DateRange
                                titleDate="Fecha"
                            // onChangeDate={(date) => {
                            //     handleInputChange(date, 'date')
                            // }}
                            // onChangeTime={(time) => {
                            //     handleInputChange(time, 'time')
                            // }}
                            />
                            <Text style={[tw` text-sm  font-bold`, { color: '#133C60' }]}>Monto</Text>
                            <Input
                                inputStyle={tw`text-left`}
                                disabled={true}
                                // value={state.data[0].initial_date}
                                labelStyle={{ color: '#133C60' }}
                                multiline={false}
                            />
                        </View>
                        <View style={tw`flex-row  justify-between `}>
                            <Button
                                titleStyle={tw`text-xs font-bold`}
                                buttonStyle={[tw` mr-2  rounded-full `, { backgroundColor: '#868686' }]}
                                title="Cancelar"
                                onPress={() => toggleModalVisibility()}
                            /><Button
                                titleStyle={tw`text-xs font-bold `}
                                buttonStyle={[tw`mr-2 rounded-full  `, { backgroundColor: '#2D5DA0' }]}
                                title="Siguiente"
                            //onPress={() => navigation.navigate('NewRegisterStep2')}
                            />

                        </View>
                    </View>
                </View>
            </Modal>

        </View>
    )
}

export default ModalPayment

const styles = StyleSheet.create({

    items: {
        backgroundColor: 'white',
        borderRadius: 1,
        borderWidth: 1,
        borderColor: '#133C60',
    },
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
        top: "30%",
        left: "50%",
        elevation: 5,
        transform: [{ translateX: -(width * 0.4) },
        { translateY: -90 }],
        height: 300,
        width: width * 0.8,
        backgroundColor: "#fff",
        borderRadius: 5,
        padding: 5
    },
})