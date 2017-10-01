import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Image, Button, TouchableOpacity, AsyncStorage } from 'react-native';
import { StackNavigator } from 'react-navigation';

class LoginScreen extends Component {
    static navigationOptions = {
        title: 'Login',
    };

    constructor() {
        super();
        
        //bind 'this' to access props handler
        this.onPressButton = this.onPressButton.bind(this);
    }

    onPressButton() {
        const { navigate } = this.props.navigation;

        navigate('Home');
    }
    
    render() {
        return (
            <View style={styles.viewContainer}>
                <Image 
                    style={styles.logo}
                    source={require('../img/pin1.png')}
                />
                <View style={styles.inputContainer} >
                    <Text style={styles.inputLabel} >Username</Text>
                    <TextInput 
                        keyboardType='email-address'
                        style={styles.input}
                        placeholder='example@email.com'
                        underlineColorAndroid='transparent'
                        onSubmitEditing={() => this.passwordInput.focus()}
                        autoCapitalize='none'
                        autoCorrect={false}
                    />
                    <Text style={styles.inputLabel} >Password</Text>
                    <TextInput 
                        returnKeyType='go'
                        style={styles.input}
                        secureTextEntry
                        placeholder='**********'
                        underlineColorAndroid='transparent'
                        ref={(input) => this.passwordInput = input}
                    />  
                </View>
                <View style={styles.btnContainer}>
                    <Button
                        onPress={this.onPressButton}
                        title="Log In"
                        color="#634198"
                        accessibilityLabel="Learn more about this purple button"
                    />  
                    <Button
                        onPress={this.onPressButton}
                        title="Log In with Facebook"
                        color="blue"
                        accessibilityLabel="Learn more about this purple button"
                    />
                    <Button
                        onPress={this.onPressButton}
                        title="Log In with Google"
                        color="red"
                        accessibilityLabel="Learn more about this purple button"
                    />
                    <TouchableOpacity>
                        <Text style={styles.signupBtn}>sign up</Text>
                    </TouchableOpacity>
                </View>
                
            </View>
        );
    }
}

const styles = StyleSheet.create({
    viewContainer: {
        flex: 1,
        alignSelf: 'stretch',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: 'gray',
        paddingHorizontal: 50
    },
    logo: {
        alignSelf: 'center',
        width: 100,
        height: 100
    },
    inputContainer: {
        padding: 20     
    },
    inputLabel: {
        marginVertical: 5
    },
    input: {
        height: 40,
        backgroundColor: 'rgba(255,255,255,1)',
        marginBottom: 20,
        textDecorationLine: 'none'
    },
    btnContainer: {
        paddingHorizontal: 20,
        height: 180,
        justifyContent: 'space-between'
    },
    signupBtn: {
        textAlign: 'center'
    }
});

export default LoginScreen;