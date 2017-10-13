import React, { Component } from 'react';
import { Text, View, Button, StyleSheet, Image, Alert } from 'react-native';
import { DrawerNavigator } from 'react-navigation';
import Map from './comp/Map';
import HamburgerBtn from './comp/HamburgerBtn';

class HomeScreen extends Component {
    constructor(props){
        super(props);
        
        this.goToLogin = this.goToLogin.bind(this);
        this.hamburgerFunction = this.hamburgerFunction.bind(this);
    }
    
    goToLogin(){
        const { navigate } = this.props.navigation;
        navigate('Login');
    }
    
    hamburgerFunction(){
        this.props.navigation.navigate('DrawerOpen');      
    }

//-------------------------------------------------------------------------
    
    render() {
        return (
            <View style={styles.viewContainer}>
                <Map />
                <HamburgerBtn whatToDo={this.hamburgerFunction} />
            </View>
        );
    }
}

//-------------------------------------------------------------------------

const styles = StyleSheet.create({
    viewContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        marginTop: 24
    },
    
});

export default HomeScreen;