import React, { Component } from 'react';
import { Text, View, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { DrawerNavigator } from 'react-navigation';
import firebase from 'firebase';

import HamburgerBtn from './comp/HamburgerBtn';

class SettingsScreen extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			boxStatus: false
		}
	}
	
	componentWillMount() {
		console.log(this.props.screenProps.email);
	}
	
	hamburgerFunction = ()=>{
        this.props.navigation.navigate('DrawerOpen');      
    }
	
	toggleNightMode = () => {
			if (this.state.boxStatus === true) {
				this.setState({
					boxStatus: false
				});
			} else {
				this.setState({
					boxStatus: true
				});
			}
		}
	
    render() {
		
		let activeStyle = null;
		
		if (this.state.boxStatus === true) {
			activeStyle = [styles.boxBase, styles.boxActive];
		} else {
			activeStyle = styles.boxBase;
		}
		
		let picSrc = this.props.screenProps.photoURL,
			nameSrc = this.props.screenProps.userName,
			emailSrc = this.props.screenProps.email,
			picReq = null,
			nameReq = null;
		
		if (picSrc !== null) {
			picReq = {uri: picSrc};
		} else {
			picReq = require('../assets/icon-proxy-200.png')
		}
		
		if (nameSrc !== null) {
			nameReq = nameSrc;
		} else {
			if (emailSrc !== undefined) {
				nameReq = emailSrc;
			} else {
				nameReq = "Hey there qt";
			}
		}
		
        return (
            <View style={styles.viewContainer}>
				<View style={styles.header}>
					<HamburgerBtn hamburgerFunction={this.hamburgerFunction} onMapPress={this.hamburgerFunction} />
					<View style={styles.userInfo}>
						<Image source={picReq} style={styles.profPic} />
						<Text style={styles.profName}>{nameReq}</Text>
					</View>
				</View>

				<View style={styles.userSettings}>
					<Text style={styles.baseText}>toggle night mode</Text>
					<TouchableOpacity style={activeStyle} onPress={this.toggleNightMode}></TouchableOpacity>
				</View>

				<View style={{marginBottom: 30}}>
					<Text style={styles.teamName}>team proxy is</Text>
					<Text style={styles.baseText}>
						alessandro grunwald
					</Text>
					<Text style={styles.baseText}>
						alessandro grunwald
					</Text>
					<Text style={styles.baseText}>
						alessandro grunwald
					</Text>
					<Text style={styles.baseText}>
						alessandro grunwald
					</Text>
					<Text style={styles.baseText}>
						alessandro grunwald
					</Text>
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
		color: 'black',
		textAlign: 'center'
	},
	header: {
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginTop: 33,
		height: 60
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
		borderRadius: 40/2,
		marginHorizontal: 10
	},
	teamName: {
		fontFamily: 'open-sans-semibold',
		fontSize: 18,
		color: '#58378F',
		marginBottom: 5,
		textAlign: 'center'
	},
	profName: {
		fontFamily: 'open-sans-semibold',
		fontSize: 18,
		color: '#58378F'
	},
});

export default SettingsScreen;