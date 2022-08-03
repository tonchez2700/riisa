import React, { useContext, useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Modal, Dimensions, } from 'react-native'
import { Input, Button, Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import tw from 'tailwind-react-native-classnames'


const { width } = Dimensions.get("window");
const ModalIncident = () => {

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
            <TouchableOpacity
                onPress={toggleModalVisibility}>
                <Icon type='font-awesome' name='th-large' size={25} color='#002443'  />
            </TouchableOpacity>

            <Modal
                animationType="none"
                transparent visible={modalVisible}
                presentationStyle="overFullScreen"
                onDismiss={toggleModalVisibility}>
                <View style={styles.viewWrapper}>
                    <Button
                        title="Cancelar"
                        buttonStyle={{ backgroundColor: '#848484', marginBottom: 15 }}
                        onPress={() => toggleModalVisibility()}
                    />
                    <View style={[styles.modalView]}>

                        <View style={[tw`m-2 `]}>
                            <Button
                                buttonStyle={styles.primaryButton}
                                title="A"
                                onPress={() => navigation.navigate('StatusScreen')}
                            />
                            <Text style={[tw`font-bold `, { color: '#23233C' }]}>Personal</Text>
                        </View>
                        <View style={[tw`m-2`]}>
                            <Button
                                buttonStyle={styles.primaryButton}
                                titleStyle={styles.primaryTitleButton}
                                title="B"
                                onPress={() => navigation.navigate('StatusScreen')}
                            />
                            <Text style={[tw`font-bold `, { color: '#23233C' }]}>Personal</Text>
                        </View>
                        <View style={[tw`m-2`]}>
                            <Button
                                buttonStyle={styles.primaryButton}
                                titleStyle={styles.primaryTitleButton}
                                title="C"
                                onPress={() => navigation.navigate('StatusScreen')}
                            />
                            <Text style={[tw`font-bold `, { color: '#23233C' }]}>Personal</Text>
                        </View>
                        {/* <View style={[tw`m-2`]}>
                            <Button
                                buttonStyle={styles.primaryButton}
                                titleStyle={styles.primaryTitleButton}
                                title="D"
                                onPress={() => navigation.navigate('StatusScreen')}
                            />
                            <Text style={[tw`font-bold `, { color: '#23233C' }]}>Personal</Text>
                        </View> */}

                    </View>
                </View>
            </Modal>

        </View>
    )
}

export default ModalIncident


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
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        top: "10%",
        left: "50%",
        elevation: 5,
        transform: [{ translateX: -(width * 0.4) },
        { translateY: -90 }],
        height: 200,
        width: width * 0.8,
        backgroundColor: "#fff",
        borderRadius: 15,
        paddingTop: 50,
        padding: 10
    },

    primaryButton: {
        width: 50,
        height: 50,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        borderTopRightRadius: 25,
        borderTopStartRadius: 25,
        backgroundColor: '#23233C',
    },
})
