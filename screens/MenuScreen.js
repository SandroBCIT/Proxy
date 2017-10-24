import React, { Component } from 'react';
import { Text, View, Button, StyleSheet, Image, TouchableHighlight } from 'react-native';
import { DrawerNavigator } from 'react-navigation';
import firebase from 'firebase';
import HamburgerBtn from './comp/HamburgerBtn';

class MenuScreen extends Component {
    constructor(props){
        super(props);
        
        this.logOutUser = this.logOutUser.bind(this);
        this.hamburgerFunction = this.hamburgerFunction.bind(this);
    }
    
    logOutUser(){
        firebase.auth().signOut(); 
        
        setTimeout(() => {this.props.navigation.navigate('DrawerClose')},500);
        setTimeout(() => {this.props.navigation.navigate('Login')},1000);
    }
    
    hamburgerFunction(){
        this.props.navigation.navigate('DrawerClose');      
    }
//-------------------------------------------------------------------------
    
    render() {
        return (
            <View style={styles.viewContainer}>
                <HamburgerBtn whatToDo={this.hamburgerFunction} />
                <Button
                    style={styles.menuButton}
                    onPress={() => this.props.navigation.navigate('DrawerClose')}
                    onPress={() => this.props.navigation.navigate('Home')}
                    title="Home"
                />
                <Button
                    style={styles.menuButton}
                    onPress={() => this.props.navigation.navigate('DrawerClose')}
                    onPress={() => this.props.navigation.navigate('Settings')}
                    title="Settings"
                />
                <Button
                    style={styles.menuButton}
                    onPress={this.logOutUser}
                    title="Log Out"
                />        
            </View>
        );
    }
}

//-------------------------------------------------------------------------

const styles = StyleSheet.create({
    viewContainer: {
        flex: 1,
        alignSelf: 'stretch',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'white',
        marginTop: 24
    },
    hamburgerBtn: {
        position: 'absolute',
        top: 5,
        left: 5
    },
    menuButton: {
       height: 100,
    },
});

export default MenuScreen;