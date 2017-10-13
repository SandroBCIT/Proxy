import React, { Component } from 'react';
import { Text, View, Button, StyleSheet, Image, TouchableHighlight } from 'react-native';
import { DrawerNavigator } from 'react-navigation';

class MenuScreen extends Component {

    render() {
        return (
            <View style={styles.viewContainer}>
                <TouchableHighlight 
                    onPress={() => this.props.navigation.navigate('DrawerClose')} 
                    style={{margin: 10, width: 40, height: 40}}
                    underlayColor='rgba(0,0,0,0)'>
                    
                    <Image
                        source={require('../img/hamburger.png')}
                        style={{width: 40, height: 40}}
                    />
                </TouchableHighlight>   
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
            </View>
        );
    }
}

const styles = StyleSheet.create({
    viewContainer: {
        flex: 1,
        alignSelf: 'stretch',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        backgroundColor: 'white',
        marginTop: 24
    },
    menuButton: {
       height: 100,
    },
});

export default MenuScreen;