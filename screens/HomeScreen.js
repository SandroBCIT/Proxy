import React, { Component } from 'react';
import { Text, View, Button, StyleSheet, Image, Alert, TouchableHighlight } from 'react-native';
import { DrawerNavigator } from 'react-navigation';
import MapComp from './comp/MapComp';

class HomeScreen extends Component {
    constructor(props) {
        super(props);
        //bind 'this' to access props handler
        this.goToLogin = this.goToLogin.bind(this);
    }
    
    goToLogin() {
        const { navigate } = this.props.navigation;
        navigate('Login');
    }

    render() {
        return (
            <View style={styles.viewContainer}>
                <MapComp />
                <TouchableHighlight 
                    onPress={() => this.props.navigation.navigate('DrawerOpen')} 
                    style={{margin: 10, width: 40, height: 40}}
                    underlayColor='rgba(0,0,0,0)'>
                    
                    <Image
                        source={require('../img/hamburger.png')}
                        style={{width: 40, height: 40}}
                    />
                </TouchableHighlight>   
            </View>
        );
    }
}

const styles = StyleSheet.create({
    viewContainer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        marginTop: 24
    },
    hamburgerBtn: {
        left: 0,
        top: 0,
        position: 'absolute',
    }
});

export default HomeScreen;