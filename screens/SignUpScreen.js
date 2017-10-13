import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Image, Button, TouchableOpacity, TouchableHighlight, AsyncStorage } from 'react-native';
import firebase from 'firebase';

class SignUpScreen extends Component {
    render() {
        return (
            <View style={styles.something}></View>
        );    
    }
}

const styles = StyleSheet.create({
    something: {
        backgroundColor: 'green',
        height: '100%',
        width: '100%'
    }   
});

export default SignUpScreen;