import React from 'react'
import { SafeAreaView, View, Text, ImageBackground } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
//import { Provider as StatusFormProvider } from '../context/StatusFormContext';
//import { Provider as AdvanceProvider } from '../context/AdvanceContext'
import NewRegisterStep4 from './NewRegisterStep4';
import NewRegisterStep3 from './NewRegisterStep3';
import NewRegisterStep2 from './NewRegisterStep2';
import NewRegister from './NewRegister';
import tw from 'tailwind-react-native-classnames';
import Images from '@assets/images';
import NavBar from '../components/NavBar'
import HomeScreen from './HomeScreen';


const AppStack = createNativeStackNavigator();

const WrapperInnerScreens = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <NavBar />
            <View style={[tw`pl-8 pr-8`, { flex: 1 }]}>
                <AppStack.Navigator screenOptions={{ headerShown: false }}>
                    <AppStack.Screen name="HomeScreen" component={HomeScreen} />
                    <AppStack.Screen name="NewRegister" component={NewRegister} />
                    <AppStack.Screen name="NewRegisterStep2" component={NewRegisterStep2} />
                    <AppStack.Screen name="NewRegisterStep3" component={NewRegisterStep3} />
                    <AppStack.Screen name="NewRegisterStep4" component={NewRegisterStep4} />
                </AppStack.Navigator>
            </View>
        </SafeAreaView>
    )
}

export default WrapperInnerScreens

