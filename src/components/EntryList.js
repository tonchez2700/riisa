import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Modal, Dimensions, TouchableOpacity } from 'react-native';
import { Icon, Button } from 'react-native-elements';
import { Context as PointsListContext } from '../context/PointsListContext';
import tw from 'tailwind-react-native-classnames';
import moment from 'moment'

const { width } = Dimensions.get("window");

const EntryList = ({ data }) => {
    const { state, fetchingData, storeCheck, setPatrol } = useContext(PointsListContext)
    const [modalVisible, setModalVisible] = useState(false);
    const [modalData, setModalData] = useState(null);
    const [modalID, setModalID] = useState(null);
    const today = new Date();
    const todayFormat = moment(today).format('DD-MM-YYYY , h:mm:ss a')

    const toggleModalVisibility = () => {
        setModalVisible(!modalVisible);
    };

    return (
        <View style={tw`mb-9 mt-9`}>
            {
                data.map((item) => {
                    return (
                        <View key={item.id}>
                            {
                                data[0].id == item.id
                                    ?
                                    <View style={tw`flex-row  pt-5 pb-5 items-center border-b border-t border-gray-200`}>
                                        <View style={tw`flex-initial`}>
                                        </View>
                                        <View style={tw`flex-row`}>
                                            <Text style={[tw`flex-initial w-64  font-bold`, { color: '#002443' }]}>{item.descripcion}</Text>
                                            <TouchableOpacity
                                                style={tw`flex-none mr-1`}>
                                                <Icon
                                                    name='location-on'
                                                    type='material'
                                                    color='#002443' />
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                style={tw`flex-none`}
                                                onPress={() => {
                                                    toggleModalVisibility()
                                                    setModalData(item.descripcion)
                                                    setModalID(item.id)
                                                }}>
                                                <Icon
                                                    name='circle'
                                                    type='material'
                                                    color='#D6A51C' />
                                            </TouchableOpacity>
                                        </View>


                                    </View>
                                    :
                                    <View style={tw`flex-row  pt-5 pb-5 items-center border-b border-t border-gray-200`}>
                                        <View style={tw`flex-initial`}>
                                        </View>
                                        <View style={tw`flex-row`}>
                                            <Text style={[tw`flex-initial w-64  font-bold`, { color: '#002443' }]}>{item.descripcion}</Text>
                                            <Icon
                                                style={tw`flex-none`}
                                                name='location-on'
                                                type='material'
                                                color='#002443' />
                                            <Icon
                                                style={tw`flex-none`}
                                                name='circle'
                                                type='material'
                                                color='green' />

                                        </View>


                                    </View>
                            }
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
                        <Text style={[tw`mr-2 font-bold text-lg justify-center`, { color: '#002443' }]}>Check-In</Text>
                        <View >
                            <View style={tw`flex-row `}>
                                <Text style={[tw`mr-2 font-bold`, { color: '#002443' }]}>Punto:</Text>
                                <Text>{modalData}</Text>
                            </View>
                            <View style={tw`flex-row  `}>
                                <Text style={[tw`mr-2 font-bold`, { color: '#002443' }]}>Fecha y Hora:</Text>
                                <Text>{todayFormat}</Text>
                            </View>
                            <View style={tw`flex-row `}>
                                <Text style={[tw`mr-2 font-bold`, { color: '#002443' }]}>Ubicación:</Text>
                                <Text>3245454545, 54545454 </Text>
                            </View>
                        </View>

                        <View style={tw`flex-row justify-center  mt-5`}>
                            <Button
                                title="Aceptar"
                                buttonStyle={{ backgroundColor: '#002443', marginBottom: 15 }}
                                onPress={() => {
                                    storeCheck(modalID)
                                    setPatrol(state.patrolPoint.id)
                                }} />
                            <Button
                                title="Cancelar"
                                buttonStyle={{ marginLeft: 50, backgroundColor: '#848484', marginBottom: 15 }}
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