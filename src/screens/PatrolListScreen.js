import { Text, View, ScrollView, StyleSheet, TouchableOpacity, Alert, Modal, Dimensions, Picker } from 'react-native'
import React, { Component, useState } from 'react'
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component'
import { Input, Button, Icon } from 'react-native-elements';
import { Dropdown } from 'react-native-element-dropdown';
import tw from 'tailwind-react-native-classnames';
import PointsListScreen from './PointsListScreen';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get("window");

const PatrolListScreen = () => {

    const navigation = useNavigation();

    const renderButton = (data, index) => {
        console.log('jola')
        return (

            <TouchableOpacity
                onPress={() => navigation.navigate('PointsListScreen')}
            >
                <View style={styles.btnAction}>
                    <Text style={styles.btnText}>
                        <Icon type='font-awesome' name='angle-double-right' size={25} color='#133C60' />
                    </Text>

                </View>
            </TouchableOpacity>
        )
    }


    const _alertIndex = (index) => {
        Alert.alert(`This is row ${index + 1}`);
    }

    const alertAdd = () => {
        Alert.alert(`hola`);
    }

    const [modalVisible, setModalVisible] = useState(false);

    const toggleModalVisibility = () => {
        setModalVisible(!modalVisible);
    };

    const reason_list = [
        { reason: 'Ronda', value: '1' },
        { reason: 'Ronda', value: '2' },
        { reason: 'Ronda', value: '3' },
        { reason: 'Ronda', value: '4' },
    ]

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Listado de rondines</Text>
            <TouchableOpacity
                onPress={() => toggleModalVisibility()}
            >
                <View style={styles.btnAdd}>
                    <Text style={styles.btnText}>
                        <Icon type='font-awesome' name='plus-square' size={30} color='#133C60' />
                    </Text>

                </View>
            </TouchableOpacity>
            <Modal
                animationType="slide"
                transparent
                visible={modalVisible}
                presentationStyle="overFullScreen"
                onDismiss={toggleModalVisibility}>
                <View style={styles.viewWrapper}>
                    <View style={styles.modalView}>
                        <Text>Seleccionar ronda</Text>

                        <Dropdown
                            maxHeight={300}
                            style={styles.dropdown}
                            search
                            valueField="value"
                            searchPlaceholder="Buscar..."
                            placeholderStyle={{ color: 'gray' }}
                            selectedTextStyle={{ color: 'black' }}
                            placeholder="Ronda"
                            labelField="reason"
                            data={reason_list}
                            // onChange={item => {
                            //     handleInputChange(item.value, 'reason_id')
                            // } } 
                            //value={state.data[0].reason_id}
                            renderLeftIcon={() => (
                                <Icon type='font-awesome' name='circle-o-notch' size={25} color='black' marginRight={16} />
                            )}
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



            <Table >
                <Row data={state.tableHead} style={styles.head} textStyle={styles.headerText} />
                {
                    state.tableData.map((rowData, index) => (
                        <TableWrapper key={index} style={styles.row}>
                            {
                                rowData.map((cellData, cellIndex) => (
                                    <Cell key={cellIndex} data={cellIndex === 2 ? renderButton(cellData, index) : cellData} textStyle={styles.text} />

                                ))
                            }
                        </TableWrapper>
                    ))
                }
            </Table>
        </ScrollView>
    )
}


const state = {
    tableHead: ['Nombre', 'Fecha y Hora', 'Acciones'],
    tableData: [
        ['Patio 1', '01/01 10:30', ''],
        ['Almacen', '02/02 08:36', ''],
        ['Seguridad 1', '03/03 10:30', ''],
        ['asas', '04/04 08:36', '']
    ]
}

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
    head: {
        height: 40,
        backgroundColor: '#133C60'
    },
    text: {
        margin: 6,
        color: '#000',
        textAlign: 'left'
    },
    row: {
        height: 50,
        flexDirection: 'row',
        backgroundColor: '#FFF',
        borderBottomWidth: 1,
        borderColor: '#133C6020'
    },
    btnAction: {
        alignItems: 'center',
        alignSelf: 'center',
        width: 58,
        height: 30,
        backgroundColor: '#78B7BB00',
    },
    btnAdd: {
        alignItems: 'center',
        alignSelf: 'flex-end',
        width: 58,
        height: 30,
        backgroundColor: '#78B7BB00',
        borderRadius: 2,
        marginBottom: 10
    },
    btnText: {
        marginTop: 2
    },
    headerText: {
        textAlign: 'center',
        color: '#fff',
        textTransform: 'uppercase',
        fontWeight: 'bold'
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
        padding: 5
    },
    dropdown: {
        borderColor: 'gray',
        width: 300,
        height: 50,
        borderWidth: 1,
        borderRadius: 8,
        color: 'gray',
        paddingHorizontal: 8,
        marginBottom: 25
    },
});

export default PatrolListScreen