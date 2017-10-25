import React, { Component } from 'react';
import { Text, View, Button, StyleSheet, Image, TouchableHighlight, TouchableOpacity } from 'react-native';
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
                <View style={styles.menuTop}>
                	<TouchableHighlight onPress={this.hamburgerFunction}>
						<Image
							source={require('../img/icon-g-menu.png')}
							style={styles.hamburgerBtn}
						/>
					</TouchableHighlight>
                </View>
				<Image 
					style={styles.logo}
					source={require('../img/proxy-logo-white.png')}
				/>
                <View style={styles.menuBtnCont}>
					<TouchableOpacity
						style={styles.menuBtn}
						onPress={() => this.props.navigation.navigate('DrawerClose')}
						onPress={() => this.props.navigation.navigate('Home')}
					>
						<Image
							source={require('../img/icon-g-travels.png')}
							style={styles.homeBtnIcon}
						/>
						<Text style={styles.baseText}>home</Text>	
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.menuBtn}
						onPress={() => this.props.navigation.navigate('DrawerClose')}
						onPress={() => this.props.navigation.navigate('Settings')}
					>
						<Image
							source={require('../img/icon-g-settings.png')}
							style={styles.settingsBtnIcon}
						/>
						<Text style={styles.baseText}>settings</Text>	
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.menuBtn}
						onPress={this.logOutUser}
					>
						<Text style={[styles.baseText, styles.logOutLabel]}>log out</Text>	
					</TouchableOpacity>
                </View>        
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
		justifyContent: 'flex-start',
		alignItems: 'center',
		backgroundColor: '#321754',
		marginTop: 24
	},
	baseText: {
		color: '#36D994'
	},
	menuTop: {
		width: '100%',
		flexDirection: 'row',
		paddingHorizontal: 20,
		marginTop: 30
	},
	hamburgerBtn: {
		width: 27,
		height: 25
	},
	logo: {
		width: 150,
		height: 45,
		marginVertical: 40
	},
	menuBtnCont: {
		width: '80%'
	},
	menuBtn: {
		height: 60,
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
	},
	homeBtnIcon: {
		width: 33,
		height: 35,
		marginRight: 20,
	},
	settingsBtnIcon: {
		width: 33,
		height: 33,
		marginRight: 20,
	},
	logOutLabel: {
		paddingLeft: 53
	}
});

export default MenuScreen;