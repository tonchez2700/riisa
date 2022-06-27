import React from 'react'
import { Header, Icon } from 'react-native-elements';
import Logo from './Logo';
import Images from '@assets/images';

const SimpleNavBar = () => {
    return (
        <Header
            backgroundColor="#133C60" 
            backgroundImage={Images.navBAr_Background}
            centerComponent={ <Logo size='xs' /> }
            barStyle="default"/>
    )
}

export default SimpleNavBar
