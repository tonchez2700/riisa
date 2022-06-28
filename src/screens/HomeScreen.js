import React from 'react'
import { StyleSheet, View, ScrollView, Text, ImageBackground, FlatList } from 'react-native';
import { Icon } from 'react-native-elements'
import InvitedListItem from '../components/Cards/InvitedListItem';
import Images from '@assets/images';
import { useNavigation } from '@react-navigation/native';
import tw from 'tailwind-react-native-classnames'



const HomeScreen = () => {
    const navigation = useNavigation();




    return (
        <ImageBackground source={Images.background} resizeMode="cover" style={tw`flex-1 flex-row`}>
            <ScrollView
                showsVerticalScrollIndicator={false}>
                <View style={[tw`flex-row mt-5 justify-between`]}>
                    <Text style={[tw`text-xl font-bold `, { color: '#23233C' }]} color>Dashboard</Text>
                    <Icon type='font-awesome' name='user' size={25} color='#002443' style={{ marginRight: 1 }} />
                </View>
                <Text style={[tw`text-xl font-bold `, { color: '#23233C' }]} color>----------------------------------------</Text>
                <FlatList
                    /* Lista de las invitaciones anteriores como su diseño*/
                    data={data}
                    initialNumToRender={3}
                    maxToRenderPerBatch={15}
                    updateCellsBatchingPeriod={50}
                    keyExtractor={item => `${item.id}`}
                    onEndReachedThreshold={0.5}
                    onEndReached={() => console.log('load more')}
                    renderItem={({ item }) => {
                        return (
                            <InvitedListItem
                                key={item.id}
                                data={item}
                                onPress={(data) => {
                                    const currentDate = new Date();
                                    const timestamp = currentDate.getTime();
                                }}
                            />
                        )

                    }}
                />
            </ScrollView >
        </ImageBackground>
    )
}
const data = [[
    {
        id: '1',
        compania: 'peres',
        tipo: 'planta',
        cuenta: 'que cuenta'
    },
    {
        id: '2',
        compania: 'toto',
        tipo: 'tata',
        cuenta: 'tete'
    },
]]
export default HomeScreen

const styles = StyleSheet.create({})
