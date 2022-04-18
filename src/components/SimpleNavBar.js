import React from 'react'
import { Header, Icon } from 'react-native-elements';
import Logo from './Logo';

const SimpleNavBar = () => {
    return (
        <Header
            backgroundColor="#133C60" 
            centerComponent={ <Logo size='xs' /> }
            barStyle="default"/>
    )
}

export default SimpleNavBar
