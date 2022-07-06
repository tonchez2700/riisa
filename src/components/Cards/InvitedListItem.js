import React, { memo } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import tw from 'tailwind-react-native-classnames';
import moment from 'moment';

/**
 * Item general de la lista de invitados que recibe la data y una función
 */
const InvitedListItem = memo(({ data, onPress }) => {
    const navigation = useNavigation();

    return (

        <View style={tw`mt-2`}>
            {
                data ?
                    data.map((item) => {
                        return (
                            <View>
                                <View key={item.id} style={tw`border-gray-400 items-center`}>
                                    <View style={tw`flex-1 flex-col   `}>
                                        <View style={tw`flex-row justify-between `}>
                                            <Text style={[tw`text-black text-base font-bold pr-5`, { color: '#23233C' }]}>Compañia:</Text>
                                            <Text style={[tw`text-black text-base font-bold pl-5`, { color: 'black' }]}>  {item.compania}</Text>
                                        </View>
                                        <View style={tw`flex-row justify-between`}>
                                            <Text style={[tw`text-black text-base font-bold pr-5`, { color: '#23233C' }]}>Categoría:</Text>
                                            <Text style={[tw`text-black text-base font-bold pl-5`, { color: 'black' }]}>   {item.id}</Text>
                                        </View>
                                        <View style={tw`flex-row justify-between`}>
                                            <Text style={[tw`text-black text-base font-bold pr-5`, { color: '#23233C' }]}>Tipo Anticipo:</Text>
                                            <Text style={[tw`text-black text-base font-bold pl-5 `, { color: 'black' }]}>  {item.tipo}</Text>
                                        </View>
                                        <View style={tw`flex-row justify-between`}>
                                            <Text style={[tw`text-black text-base font-bold pr-5`, { color: '#23233C' }]}>Cuenta:</Text>
                                            <Text style={[tw`text-black text-base font-bold pl-5`, { color: 'black' }]}>   {item.cuenta}</Text>
                                        </View>
                                        <View style={tw`flex-row justify-between`}>
                                            <Text style={[tw`text-black text-base font-bold pr-5`, { color: '#23233C' }]}>Concepto:</Text>
                                            <Text style={[tw`text-black text-base font-bold pl-5`, { color: 'black' }]}>   {item.concepto}</Text>
                                        </View>


                                    </View>

                                </View>
                                <View style={tw`items-end`}>
                                    <Button
                                        buttonStyle={styles.primaryButton}
                                        titleStyle={styles.primaryTitleButton}
                                        title="i"
                                        disabled={!data ? true : false}
                                        onPress={() => navigation.navigate('StatusScreen')}
                                    />
                                </View>
                            </View>
                        );
                    })
                    :
                    <Text style={tw`text-red-800 mb-3 text-center border border-red-300 bg-red-200 p-3`}>No hay datos</Text>
            }
        </View>
    )
})

export default InvitedListItem

/* Estilos extras*/
const styles = StyleSheet.create({
    primaryButton: {
        width: 30,
        height: 30,
        borderBottomLeftRadius: 25,
        borderTopRightRadius: 25,
        borderTopStartRadius: 25,
        backgroundColor: 'red',
    },
});
