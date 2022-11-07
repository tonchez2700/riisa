import React, { useState, useEffect, useContext } from 'react'
import {
    StyleSheet, View, ScrollView, TouchableHighlight,
    Text, FlatList
} from 'react-native';
import { Input, Button, Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native';
import { Context as RegisterContext } from '../context/RegisterContext';
import tw from 'tailwind-react-native-classnames'
import moment from 'moment';
import MenuItem from '../components/MenuItem';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = () => {
    const navigation = useNavigation();
    const { state,
        clearState, setFetchingList } = useContext(RegisterContext);

    useEffect(() => {
        setFetchingList();
    }, [])

    return (

        <View style={{ flex: 1 }}>
            <View style={[tw`my-3 flex-row`, {width: '100%'}]}>
                <Input
                    rightIcon={<Icon type='font-awesome-5' name='search' size={25} color='black' />}
                    inputStyle={tw`ml-3 text-sm`}
                    inputContainerStyle={tw`border pl-2 rounded-md`}

                    labelStyle={{ color: '#133C60' }}
                    placeholder="BUSCAR ORDEN DE COMPRA"
                // value={}
                />
            </View>
            <View style={tw`items-end m-2`}>
                <Button
                    titleStyle={tw`text-base font-bold  `}
                    buttonStyle={[tw` w-32 `, { backgroundColor: '#2D5DA0' }]}
                    title="Nueva entrada"
                    onPress={() => navigation.navigate('NewRegister')}
                />
            </View>
            <View style={[tw` flex-row justify-between`]}>
                <Text style={styles.TextTable}>Folio</Text>
                <Text style={styles.TextTable}>Fecha</Text>
                <Text style={styles.TextTable}>Empresa</Text>
                <Text style={styles.TextTable}>Accion</Text>
            </View>

            <FlatList
                data={state.data}
                initialNumToRender={3}
                maxToRenderPerBatch={15}
                updateCellsBatchingPeriod={50}
                keyExtractor={item => item.id}
                onEndReachedThreshold={0.5}
                onEndReached={() => console.log('load more')}
                renderItem={({ item, index, separators }) => (
                    <View style={[tw`flex-row justify-between`]}>
                        <Text style={styles.TextTableItems}>{item.folio}</Text>
                        <Text style={styles.TextTableItems}>{moment(item.created_at).format('YYYY-MM-DD')}</Text>
                        <Text style={styles.TextTableItems}>{item.supplier_rom.name}</Text>
                        <View style={[tw`flex-row `, {
                            width: '25%', borderBottomColor: '#E6E6E6',
                            borderBottomWidth: 1
                        }]}>
                            <Icon type='font-awesome' name='camera' size={20} color='#2D5DA0' style={{ padding: 10, }} />
                            <Icon type='font-awesome-5' name='arrow-circle-right' size={20} color='#EE3232' style={{ padding: 10, }} />
                        </View>
                    </View>
                )}
            />
        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    buttonsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        width: '100%',
        marginVertical: 20,
    },
    TextTable: {
        flex: 1,
        width: '25%',
        fontSize: 14,
        padding: 10,
        fontWeight: 'bold',
        backgroundColor: '#2D5DA0',
        color: 'white',
        borderBottomWidth: 1
    },
    TextTableItems: {
        flex: 1,
        width: '25%',
        fontSize: 13,
        padding: 10,
        fontWeight: 'bold',
        color: '#000000',
        borderBottomColor: '#E6E6E6',
        borderBottomWidth: 1

    },
})
