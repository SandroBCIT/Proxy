import React, { Component } from 'react';
import { Text, View, Button, StyleSheet, Image } from 'react-native';
import { DrawerNavigator } from 'react-navigation';

class MenuScreen extends Component {

    render() {
        return (
            <View style={styles.viewContainer}>
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
        justifyContent: 'center',
        backgroundColor: 'white',
        paddingHorizontal: 50
    },
    menuButton: {
       height: 100,
    },
});

export default MenuScreen;