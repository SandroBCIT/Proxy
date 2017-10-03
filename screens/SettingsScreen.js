import React, { Component } from 'react';
import { Text, View, Button, StyleSheet, Image } from 'react-native';
import { DrawerNavigator } from 'react-navigation';

class SettingsScreen extends Component {
  

    render() {
        return (
            <View style={styles.viewContainer}>
                <Text>SETTINGS Screen</Text>
                <Button
                style={styles.btn1}
                onPress={() => this.props.navigation.navigate('DrawerOpen')}
                title="Menu"
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
        backgroundColor: 'gray',
        paddingHorizontal: 50
    },
    icon: {
        width: 24,
        height: 24,
    },
});

export default SettingsScreen;