import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Icon, Button } from 'react-native-elements';
import tw from 'tailwind-react-native-classnames';

const EntryList = ({ data, deleteItem, updateLeavingTime }) => {
    return (
        <View style={tw`mt-1`}>
            {
                data.map((item) => {
                    return (
                        <View key={item.id}>
                            <View style={tw`m-1 p-2 border border-gray-400 rounded`}>

                                <View style={tw`flex-row justify-between`}>
                                    <View style={[tw`flex-row`, { marginTop: 10 }]}>
                                        <Text style={[tw`text-black text-base font-bold`, { color: '#ee8920' }]}>{item.name}</Text>
                                    </View>
                                    <View style={[tw`flex-row`,]}>
                                        <View>
                                            <Button
                                                buttonStyle={[{ backgroundColor: '#FFFFFF00' }]}
                                                icon={
                                                    <Icon
                                                        name="map-marker"
                                                        type='font-awesome'
                                                        size={25} color="#133C60"
                                                        margin={2}
                                                    />
                                                }
                                            />
                                        </View>
                                        <View>
                                            <Button
                                                buttonStyle={[{ backgroundColor: '#FFFFFF00' }]}
                                                icon={
                                                    <Icon
                                                        name="circle"
                                                        type='font-awesome'
                                                        size={25} color="orange"
                                                        margin={2}
                                                    />
                                                }
                                            />
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    )
                })
            }
        </View>
    )
}

export default EntryList