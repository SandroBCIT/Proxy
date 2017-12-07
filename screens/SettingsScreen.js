import React, { Component } from 'react';
import { Text, View, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { DrawerNavigator } from 'react-navigation';
import firebase from 'firebase';

import HamburgerBtn from './comp/HamburgerBtn';

class SettingsScreen extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			boxStatus: true
		}
	}
	
	hamburgerFunction = ()=>{
        this.props.navigation.navigate('DrawerOpen');      
    }
	
    render() {
		
		let activeStyle = null;
		
		if (this.state.boxStatus) {
			activeStyle = [styles.boxBase, styles.boxActive];
		} else {
			activeStyle = styles.boxBase;
		}
		
        return (
            <View style={styles.viewContainer}>
				<View style={styles.header}>
					<HamburgerBtn hamburgerFunction={this.hamburgerFunction} onMapPress={this.hamburgerFunction} />
					<View style={styles.userInfo}>
						<Image source={require('../assets/icon-proxy-200.png')} style={styles.profPic} />
						<Text style={styles.profName}>{this.props.screenProps.userName}</Text>
					</View>
				</View>

				<View style={styles.userSettings}>
					<Text style={styles.baseText}>toggle night mode</Text>
					<TouchableOpacity style={activeStyle}></TouchableOpacity>
				</View>

				<View></View>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    viewContainer: {
        flex: 1,
        alignSelf: 'stretch',
        flexDirection: 'column',
        justifyContent: 'space-between',
		alignItems: 'center',
        backgroundColor: '#E9E9E9',
		paddingHorizontal: 20
    },
    shadow: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.35,
        shadowRadius: 2,
        elevation: 2,
    },
	userInfo: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	baseText: {
		fontFamily: 'open-sans-light',
		color: 'black'
	},
	header: {
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginTop: 30
	},
	userSettings: {
		width: '80%',
		padding: 20,
		backgroundColor: 'lightgrey',
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	boxBase: {
		width: 25,
		height: 25,
		borderRadius: 25,
		borderWidth: 2,
		borderColor: '#58378F'
	},
	boxActive: {
		backgroundColor: '#58378F'
	},
	profPic: {
		width: 40,
		height: 40,
		borderRadius: 40,
		margin: 10
	},
	profName: {
		fontFamily: 'open-sans-semibold',
		fontSize: 18,
		color: '#58378F'
	},
});

export default SettingsScreen;