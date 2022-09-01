import React, { useContext, useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, } from 'react-native'
import tw from 'tailwind-react-native-classnames'
import { Icon, Switch } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native';

const EntryPayment = ({ data, TotalCost, taxable, fun }) => {

    const navigation = useNavigation();
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => {
        setIsEnabled(previousState => !previousState)
        fun(isEnabled)
    }

    return (

        <View>
            {
                data.map((item) =>
                    <View key={item.count}>
                        <View style={[tw`flex-row items-start py-2`, { borderBottomWidth: 1 }]}>
                            <Text style={[tw` text-sm w-5/12 pl-2`]}>{item.promess_date}</Text>
                            <Text style={[tw` text-sm  w-5/12 mr-2 mb-1`]}>Pago Inicial</Text>
                            <Text style={[tw` text-sm  w-1/3 mr-2 mb-1`]}>${item.amount}</Text>
                        </View>
                    </View>
                )}
            {
                TotalCost != 0
                    ?
                    <View style={tw`flex-row justify-between`}>
                        <View style={tw`flex-col items-center mt-2`}>
                            <Text style={[tw`text-sm `]}>Requiere Factura</Text>
                            <Switch
                                trackColor={{ false: "#767577", true: "#81b0ff" }}
                                thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                                onValueChange={toggleSwitch}
                                value={isEnabled}
                            />
                        </View>
                        <View style={tw`items-end flex-col mt-2`}>
                            <Text style={[tw`text-sm  text-right`]}>Subtotal: ${TotalCost}</Text>
                            {/* <Text style={[tw`text-sm  text-right`]}>IVA: $0</Text> */}
                            <Text style={[tw`text-sm  text-right`]}>Total: ${TotalCost}</Text>
                        </View>
                    </View>
                    :
                    null
            }
        </View>
    )
}

export default EntryPayment

const styles = StyleSheet.create({})
