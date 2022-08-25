import React, { useContext, useState, useEffect } from 'react'
import { ScrollView, StyleSheet, Alert, View, Text, ActivityIndicator } from 'react-native'
import { useNavigation, } from '@react-navigation/native';
import { Input, Button } from 'react-native-elements'
import { Context as NewRegisterStep3Context } from '../context/NewRegisterStep3Context';
import EntryListFinal from '../components/EntryListFinal';
import EntryPayment from '../components/EntryPayment';
import StepStatus from '../components/StepStatus';
import HeadTitleScreen from '../components/Forms/HeadTitleScreen';
import tw from 'tailwind-react-native-classnames'


const NewRegisterStep4 = ({ route }) => {

    const navigation = useNavigation();
    const { params } = route
    const { state, storeFinal } = useContext(NewRegisterStep3Context);
    const getContent = () => {
        return (
            <ScrollView
                showsVerticalScrollIndicator={false}>

                <HeadTitleScreen title='Nuevo Registro' />
                <View style={tw`mb-4`}>
                    <StepStatus />
                </View>

                <Text style={[tw`text-lg`]}>Datos generales</Text>
                <View>
                    <Text style={[tw` text-sm`, { color: 'gray' }]}>Nombre: <Text style={[tw` text-sm`, { color: 'black' }]}>{params?.user.name} {params?.user.paternal_surname} {params?.user.maternal_surname}</Text></Text>
                    <Text style={[tw` text-sm`, { color: 'gray' }]}>Email: <Text style={[tw` text-sm`, { color: 'black' }]}>{params?.user.email}</Text></Text>
                    <Text style={[tw` text-xs`, { color: 'gray' }]}>Monto Total: <Text style={[tw` text-sm font-medium`, { color: 'black' }]}>${params?.total}</Text></Text>
                </View>
                <View style={{ borderColor: '#2D5DA0', borderTopWidth: 1.5 }}>
                    <Text style={[tw`text-xl my-2`]}>Programas Educativos</Text>
                    <View style={tw`flex-row items-start`}>
                        <Text style={[tw` text-sm w-9/12 text-white pl-2`, styles.itemsT]}>Items:</Text>
                        <Text style={[tw` text-sm w-60 text-white pl-2`, styles.itemsT]}>Monto</Text>
                    </View>
                    <EntryListFinal
                        data={params?.rows}
                        TotalCost={params?.total}
                    />
                </View>
                <View style={{ borderColor: '#2D5DA0', borderTopWidth: 1.5, marginTop: 10 }}>
                    <Text style={tw`text-xl my-2`}>Desglose de Pagos</Text>
                    <View style={tw`flex-row items-start my-2`}>
                        <Text style={[tw`  text-sm  w-5/12 text-white pl-2`, styles.itemsT]}>Fecha</Text>
                        <Text style={[tw`  text-sm  w-5/12 text-white pl-2`, styles.itemsT]}>Tipo</Text>
                        <Text style={[tw`  text-sm  w-1/3  text-white pl-2`, styles.itemsT]}>Monto</Text>
                    </View>
                    <EntryPayment
                        data={params?.payments}
                        TotalCost={params?.total}
                    />
                </View>
                <View style={tw`flex-row my-10 justify-around items-center `}>
                    <Button
                        titleStyle={tw`text-base font-bold`}
                        buttonStyle={[tw` mr-2 w-32 rounded-full `, { backgroundColor: '#868686' }]}
                        title="Cancelar"
                        onPress={() => navigation.navigate('HomeScreen')}
                    /><Button
                        titleStyle={tw`text-base font-bold `}
                        buttonStyle={[tw`mr-2 w-32 rounded-full  `, { backgroundColor: '#2D5DA0' }]}
                        title="Confirmar"
                        onPress={() => storeFinal(params)}
                    />

                </View>
            </ScrollView>
        );
    }
    return (
        <View>
            {

                getContent()

            }
        </View>
    )
}

export default NewRegisterStep4

const styles = StyleSheet.create({

    itemsT: {
        backgroundColor: '#2D5DA0',
        color: 'white'
    },

})
