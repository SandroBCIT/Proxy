import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';
import { StackNavigator } from 'react-navigation';

class HomeScreen extends Component {
    constructor() {
        super();
        
        //bind 'this' to access props handler
        this.onPressButton = this.onPressButton.bind(this);
    }
    
    static navigationOptions = {
        title: 'Welcome',
    };

    onPressButton() {
        const { navigate } = this.props.navigation;

        navigate('Login');
    }   

    render() {
        return (
            <View>
                <Text>Hello, Chat App!</Text>
                <Button
                      onPress={this.onPressButton}
                      title="Login"
                />
            </View> 
        );
    }
}

export default HomeScreen;