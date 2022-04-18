import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, Dimensions } from 'react-native';
import { Icon, Button } from 'react-native-elements';
import tw from 'tailwind-react-native-classnames';

const { width } = Dimensions.get("window");

const EntryList = ({ data, deleteItem, updateLeavingTime }) => {

    const [modalVisible, setModalVisible] = useState(false);

    const toggleModalVisibility = () => {
        setModalVisible(!modalVisible);
    };

    return (
        <View style={tw`mt-1`}>
            {
                data.map((item) => {
                    return (
                        <View key={item.id}>
                            <View style={tw`m-1 p-2 border border-gray-400 rounded`}>

                                <View style={tw`flex-row justify-between`}>
                                    <View style={[tw`flex-row`, { marginTop: 10 }]}>
                                        <Text style={[tw`text-black text-base font-bold`, { color: '#ee8920' }]}>{item.name}</Text>
                                    </View>
                                    <View style={[tw`flex-row`,]}>
                                        <View>
                                            <Button
                                                buttonStyle={[{ backgroundColor: '#FFFFFF00' }]}
                                                icon={
                                                    <Icon
                                                        name="map-marker"
                                                        type='font-awesome'
                                                        size={25} color="#133C60"
                                                        margin={2}
                                                    />
                                                }
                                            />
                                        </View>
                                        <View>
                                            <Button
                                                buttonStyle={[{ backgroundColor: '#FFFFFF00' }]}
                                                onPress={() => toggleModalVisibility()}
                                                icon={
                                                    <Icon
                                                        name="circle"
                                                        type='font-awesome'
                                                        size={25} color="orange"
                                                        margin={2}
                                                    />
                                                }
                                            />
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>


                    )
                })
            }

            <Modal
                animationType="slide"
                transparent
                visible={modalVisible}
                presentationStyle="overFullScreen"
                onDismiss={() => toggleModalVisibility()}>
                <View style={styles.viewWrapper}>
                    <View style={styles.modalView}>
                        <Text style={styles.text}>Check-In</Text>
                        <View >
                            <View style={tw`flex-row justify-between`}>
                                <Text style={styles.textModal}>Punto:</Text>
                                <Text>Puerta principal </Text>
                            </View>
                            <View style={tw`flex-row justify-between`}>
                                <Text style={styles.textModal}>Fecha y Hora:</Text>
                                <Text>Fecha y Hora </Text>
                            </View>
                            <View style={tw`flex-row justify-between`}>
                                <Text style={styles.textModal}>Ubicación:</Text>
                                <Text>2131546 </Text>
                            </View>

                        </View>



                        <View style={tw`flex-row justify-between`}>
                            <Button
                                title="Cancelar"
                                buttonStyle={{ backgroundColor: '#848484', marginBottom: 15 }}
                                onPress={() => toggleModalVisibility()} />

                            <Button
                                title="Aceptar"
                                buttonStyle={{ marginLeft: 100, backgroundColor: '#002443', marginBottom: 15 }}

                                onPress={() => toggleModalVisibility()} />
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default EntryList

const styles = StyleSheet.create({

    screen: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
    },
    text: {
        textAlign: 'center',
        color: '#133C60',
        fontSize: 20,
        fontWeight: 'bold'
    },
    textModal: {
        color: '#133C60',
        fontWeight: 'bold',
        marginRight:50
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
});