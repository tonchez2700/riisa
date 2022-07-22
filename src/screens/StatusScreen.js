import React, { useContext, useState, useEffect } from 'react'
import {
    ScrollView, StyleSheet, ImageBackground,
    Alert, View, Text,
    TouchableOpacity,
    Modal, Dimensions,
    Image
} from 'react-native';
import Images from '@assets/images';
import StepStatus from '../components/StepStatus';
import TextInputForm from '../components/Forms/TextInputForm';
import { useNavigation, } from '@react-navigation/native';
import { Input, Button, Icon } from 'react-native-elements'
import tw from 'tailwind-react-native-classnames'
import moment from 'moment'

const { width } = Dimensions.get("window");

const StatusScreen = ({ route }) => {

    const [modalVisible, setModalVisible] = useState(false);
    const { params } = route
    const initial_date = moment(params.createdAt).format('DD-MM-YYYY')
    const toggleModalVisibility = () => {
        setModalVisible(!modalVisible);
    };
    return (

        <ScrollView resizeMode="cover" style={[tw`flex-1`, { backgroundColor: '#F5F5F5' }]}>
            <View style={tw`m-2`}>
                <View style={[tw`flex-row mt-4 justify-between`, { borderRadius: 1, borderWidth: 3, paddingBottom: 10, marginBottom: 15, borderStyle: 'dashed', borderBottomColor: 'black', borderColor: 'white' }]}>
                    <Text style={[tw`text-xl font-bold `, { color: '#23233C' }]}>Autorización de anticipo</Text>
                    <TouchableOpacity
                        onPress={toggleModalVisibility}>
                        <Icon type='font-awesome' name='user' size={25} color='#002443' style={{ marginRight: 1 }} />
                    </TouchableOpacity>
                </View>
                <View style={[tw`border-gray-400`, { borderWidth: 1, elevation: 10, padding: 5, backgroundColor: 'white', borderRadius: 8 }]}>
                    <View style={tw` items-center`}>
                        <Text style={[tw`text-xl font-bold m-5`, { color: '#23233C' }]}>FLUJO DE AUTORIZACIONES</Text>
                    </View>
                    <StepStatus />
                </View>
                <View style={tw`flex-row mt-3 `}>
                    <Text style={[tw`font-bold`, { color: 'black' }]}>Solicitante  </Text>
                    <Text style={[{ color: 'black' }]}>{params.userName}   </Text>
                    <Text style={[tw`font-bold`, { color: 'black' }]}>           Fecha </Text>
                    <Text style={[{ color: 'black' }]}>{initial_date}</Text>
                </View>

                <TextInputForm
                    type={'Compañía'}
                    data={params.genCompanyName}
                />
                <TextInputForm
                    type={'Orden de compra'}
                    data={params.advSupplierName}
                />
                <TextInputForm
                    type={'Categoría'}
                    data={params.advCategoryName}
                />
                <TextInputForm
                    type={'Moneda'}
                    data={params.genCurrencyName}
                />
                <TextInputForm
                    type={'Monto'}
                    data={params.amount}
                />
                <TextInputForm
                    type={'IVA'}
                    data={params.iva}
                />
                <TextInputForm
                    type={'Tipo de anticipo'}
                    data={params.advTypeName}
                />
                <TextInputForm
                    type={'Centro de costos'}
                    data={params.genCostCenterAreaName}
                />
                <TextInputForm
                    type={'A favor de'}
                    data={params.advSupplierName}
                />
                <TextInputForm
                    type={'Motívo'}
                    data={params.reason}
                />
            </View>
            <Modal
                animationType="slide"
                transparent visible={modalVisible}
                presentationStyle="overFullScreen"
                onDismiss={toggleModalVisibility}>
                <View style={styles.viewWrapper}>
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
        </ScrollView>

    )
}

export default StatusScreen

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
});