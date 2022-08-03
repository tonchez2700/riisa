import React, { useContext } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { Context as AdvanceContext } from '../../context/AdvanceContext';
import tw from 'tailwind-react-native-classnames';
import moment from 'moment';

const InvitedListItem = (data) => {
    const { state, loadAdvance, getAdvanceById } = useContext(AdvanceContext);
    const navigation = useNavigation();
    return (

        <View style={tw`mt-2`}>
            {
                data ?
                    <View>
                        <View style={tw`border-gray-400 items-center`}>
                            <View style={tw`flex-row  justify-between`}>
                                <View style={tw`flex-col  pl-5`}>
                                    <Text style={[tw`text-black font-bold`, { color: '#23233C' }]}>Compañia:</Text>
                                    <Text style={[tw`text-black font-bold`, { color: '#23233C' }]}>Categoría:</Text>
                                    <Text style={[tw`text-black font-bold`, { color: '#23233C' }]}>Tipo Anticipo:</Text>
                                    <Text style={[tw`text-black font-bold`, { color: '#23233C' }]}>Cuenta:</Text>
                                    <Text style={[tw`text-black font-bold`, { color: '#23233C' }]}>Concepto:</Text>
                                </View>
                                <View style={tw`flex-col pl-5`}>
                                    <Text style={[tw`text-black font-bold`, { color: 'black' }]}>{data.data.genCompanyName}</Text>
                                    <Text style={[tw`text-black font-bold`, { color: 'black' }]}>{data.data.advCategoryName}</Text>
                                    <Text style={[tw`text-black font-bold`, { color: 'black' }]}>{data.data.advTypeName}</Text>
                                    <Text style={[tw`text-black font-bold`, { color: 'black' }]}>{data.data.advTypeLedgerAccount}</Text>
                                    <Text style={[tw`text-black font-bold`, { color: 'black' }]}>{data.data.advKeyConceptName}</Text>
                                </View>

                            </View>

                        </View>
                        <View style={tw`items-end`}>
                            <Button
                                buttonStyle={styles.primaryButton}
                                titleStyle={styles.primaryTitleButton}
                                title="i"
                                disabled={!data ? true : false}
                                onPress={() => getAdvanceById(data.data.id)}
                            />
                        </View>
                    </View>

                    :
                    <Text style={tw`text-red-800 mb-3 text-center border border-red-300 bg-red-200 p-3`}>No hay datos</Text>
            }
        </View>
    )
}

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
