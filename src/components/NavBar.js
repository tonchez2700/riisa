import React, { useContext } from 'react'
import { TouchableOpacity } from 'react-native';
import { Header, Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { Context as AuthContext} from '../context/AuthContext';
import Logo from './Logo';

const NavBar = () => {
    const { signout } = useContext(AuthContext);
    const navigation = useNavigation();
    return (
        <Header
            backgroundColor="#133C60" 
            centerComponent={ <Logo size='xs' /> }
            barStyle="default"
            leftContainerStyle={{ justifyContent: 'center' }}
            rightContainerStyle={{ justifyContent: 'center' }}
            leftComponent={
                <TouchableOpacity
                    onPress={() => navigation.navigate('PatrolListScreen')}>
                        <Icon
                        name='home'
                        type='font-awesome'
                        color='white' />
                </TouchableOpacity> 
            }
            rightComponent={
                <TouchableOpacity
                    onPress={() => signout()}>
                        <Icon
                        name='sign-out'
                        type='font-awesome'
                        color='white' />
                </TouchableOpacity> 
            }/>
      
    )
}

export default NavBar
