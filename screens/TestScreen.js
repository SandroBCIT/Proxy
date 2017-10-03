import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';
import { StackNavigator } from 'react-navigation';

class HomeScreen extends Component {
    constructor() {
        super();
        
        //bind 'this' to access props handler
        this.goToLogin = this.goToLogin.bind(this);
        
         this.state = {
//            isLoggedIn : true,
        }
    }
    
    //removes header bar
    static navigationOptions = {
        header: null
    };

    goToLogin() {
        const { navigate } = this.props.navigation;
        navigate('Login');
    } 
    goToTest() {
        const { navigate } = this.props.navigation;
        navigate('TestScreen');   
    }

    render() {
        return (
            <View>
                <Text>Hello, Chat App!</Text>
                <Button
                      onPress={this.goToLogin}
                      title="Login"
                />
                <Button
                      onPress={this.goToTest}
                      title="TEST"
                />
            </View> 
        );
    }
}

export default HomeScreen;