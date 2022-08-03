import React, { useContext, useState, useEffect } from 'react'
import {
    ScrollView, StyleSheet, ImageBackground,
    Alert, View, Text,
    TouchableOpacity,
    Modal, Dimensions,
    Image
} from 'react-native';
import { Context as AdvanceContext } from '../context/AdvanceContext';
import ModalCan from '../components/Modal/ModalCan';
import ModalAccept from '../components/Modal/ModalAccept';
import ModalIncident from '../components/Modal/ModalIncident';
import Images from '@assets/images';
import StepStatus from '../components/StepStatus';
import TextInputForm from '../components/Forms/TextInputForm';
import { useNavigation, } from '@react-navigation/native';
import { Input, Switch, Icon } from 'react-native-elements'
import tw from 'tailwind-react-native-classnames'
import moment from 'moment'
import { Context } from '../context/AdvanceContext';

const { width } = Dimensions.get("window");

const LayoffPersonalScreen = ({ route }) => {

    const [modalVisible, setModalVisible] = useState(false);
    const { params } = route
    const { state, loadAdvance, getAdvanceById } = useContext(AdvanceContext);
    const initial_date = moment(params.createdAt).format('DD-MM-YYYY')


    return (

        <ScrollView resizeMode="cover" style={[tw`flex-1`, { backgroundColor: '#F5F5F5' }]}>
            <View style={tw`m-2`}>
                <View style={[tw`flex-row mt-4 justify-between`, { borderRadius: 1, borderBottomWidth: 3, paddingBottom: 10, marginBottom: 15, borderStyle: 'dashed', borderBottomColor: 'black', borderColor: 'white' }]}>
                    <Text style={[tw`text-xl font-bold `, { color: '#23233C' }]}>Autorización de anticipo</Text>
                    <View style={tw` flex-row`}>
                        <Icon type='font-awesome' name='user' size={25} color='#002443' style={{ marginRight: 10 }} />
                        <ModalIncident />
                    </View>

                </View>

                <View style={[tw`border-gray-400 pb-6`, { borderWidth: 1, elevation: 10, padding: 5, backgroundColor: 'white', borderRadius: 8 }]}>
                    <View style={tw` items-center`}>
                        <Text style={[tw`text-xl font-bold m-5`, { color: '#23233C' }]}>FLUJO DE AUTORIZACIONES</Text>
                    </View>
                    <StepStatus />
                </View>
                <View style={tw`flex-row mt-3  justify-between`}>
                    <View style={tw`flex-row`}>
                        <Text style={[tw`font-bold mr-2`, { color: 'black' }]}>Solicitante:</Text>
                        <Text style={[{ color: 'black' }]}>{params.userName}</Text>
                    </View>
                    <View style={tw`flex-row`}>
                        <Text style={[tw`font-bold mr-2`, { color: 'black' }]}>Fecha:</Text>
                        <Text style={[{ color: 'black' }]}>{initial_date}</Text>
                    </View>
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

                <View style={tw`flex-row justify-between `}>
                    <View style={[tw`p-2 pl-5 my-1`, { borderColor: '#00000029', width: '48%', elevation: 8, borderWidth: 1, padding: 5, backgroundColor: 'white', borderRadius: 8 }]}>
                        <Text style={[tw`text-base`, { color: '#002443', }]}> Cuenta </Text>
                        <Text style={[tw`text-lg`, { color: 'black' }]}> {params.advTypeLedgerAccount} </Text>
                    </View>
                    <View style={[tw`p-2 pl-5 my-1`, { borderColor: '#00000029', width: '48%', elevation: 8, borderWidth: 1, padding: 5, backgroundColor: 'white', borderRadius: 8 }]}>
                        <Text style={[tw`text-base`, { color: '#002443', }]}> Factura </Text>
                        <Text style={[tw`text-lg`, { color: 'black' }]}> {params.invoice} </Text>
                    </View>
                </View>

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
                <View style={[tw`border-gray-400 px-6  m-4`, { borderWidth: 1, elevation: 10, padding: 5, backgroundColor: 'white', borderRadius: 8 }]}>
                    <View style={tw` items-center`}>
                        <Text style={[tw`text-xl font-bold m-5`, { color: '#23233C' }]}>Archivos</Text>
                    </View>
                    <Text style={[tw`text-xl font-bold m-5`, { color: '#23233C' }]}>Lorem-Ipsum-Dolor.doc</Text>

                </View>
                <View style={[tw`border-gray-400 px-6  m-4 items-center`, { borderWidth: 1, elevation: 10, padding: 5, backgroundColor: 'white', borderRadius: 8 }]}>
                    <View style={tw` items-center`}>
                        <Text style={[tw`text-xl font-bold m-5`, { color: '#23233C' }]}>Check-List Jefe Directo</Text>
                    </View>
                    <View style={tw` flex-row items-center`}>
                        <Switch
                            onValueChange={(value) => setChecked(value)}
                        />
                        <Text style={[tw`text-base`, { color: '#002443', }]}> Llaves </Text>
                    </View>
                    <View style={tw` flex-row items-center`}>
                        <Switch
                            onValueChange={(value) => setChecked(value)}
                        />
                        <Text style={[tw`text-base`, { color: '#002443', }]}> Usuario y contraseña </Text>
                    </View>
                    <View style={tw` flex-row items-center`}>
                        <Switch
                            onValueChange={(value) => setChecked(value)}
                        />
                        <Text style={[tw`text-base`, { color: '#002443', }]}> Manuales y documentos </Text>
                    </View>
                    <View style={tw` flex-row items-center `}>
                        <Switch
                            onValueChange={(value) => setChecked(value)}
                        />
                        <Text style={[tw`text-base`, { color: '#002443', }]}> Mapa archivos PC </Text>
                    </View>
                    <View style={tw` flex-row items-center`}>
                        <Switch
                            onValueChange={(value) => setChecked(value)}
                        />
                        <Text style={[tw`text-base`, { color: '#002443', }]}> Herramientas de puesto </Text>
                    </View>

                </View>

                {
                    !params.processActions
                        ?
                        null


                        :
                        <View style={[tw`border-gray-400  mb-2`, { borderWidth: 1, elevation: 10, backgroundColor: '#cc0000', borderRadius: 8 }]}>
                            <View style={tw` items-center`}>
                                <Text style={[tw`text-xl font-bold m-2`, { color: 'white' }]}>"SIN PERMISO PARA AUTORIZAR"</Text>
                            </View>
                        </View>
                }
                {
                    !params.processActions
                        ?
                        <View>
                            <ModalAccept
                                data={params}
                            />
                            <ModalCan />
                        </View>

                        :
                        null
                }

            </View>

            {
                state.error === true
                    ?
                    Alert.alert(
                        "Ha ocurrido un error",
                        state.message,
                        [{
                            text: "OK",
                        }]
                    )
                    :
                    null
            }
        </ScrollView >

    )
}

export default LayoffPersonalScreen

const styles = StyleSheet.create({
});