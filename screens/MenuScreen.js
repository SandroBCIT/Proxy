import React, { Component } from 'react';
import { Text, View, Button, StyleSheet, Image, TouchableHighlight, TouchableOpacity } from 'react-native';
import { DrawerNavigator } from 'react-navigation';
import firebase from 'firebase';
import HamburgerBtn from './comp/HamburgerBtn';

class MenuScreen extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            fontReady: false,
            itemHighlight: 'home'
        }
    }
    
    async componentDidMount() {
        await Expo.Font.loadAsync({
            'open-sans-light': require('../assets/font/OpenSans-Light.ttf'),
        });

        this.setState({ fontReady: true });
    }
    
    logOutUser = () => {
        firebase.auth().signOut(); 
        
        this.props.navigation.navigate('DrawerClose');
        this.props.navigation.navigate('Login');
        this.setState({ itemHighlight: 'home' });
    }
    
    handleHome = () => {
        this.setState({ itemHighlight: 'home' });
        this.props.navigation.navigate('DrawerClose');
        this.props.navigation.navigate('Home');
    }
    
    handleSettings = () => {
        this.setState({ itemHighlight: 'settings' });
        this.props.navigation.navigate('DrawerClose');
        this.props.navigation.navigate('Settings');
    }
    
    hamburgerFunction = () => {
        this.props.navigation.navigate('DrawerClose');      
    }
//-------------------------------------------------------------------------
    
    render() {
        
        let homeStyles = styles.menuBtn,
            settingsStyles = styles.menuBtn;
        
        if (this.state.itemHighlight === 'home') {
            homeStyles = [styles.menuBtn, styles.menuBtnActive];
        } else {
            settingsStyles = [styles.menuBtn, styles.menuBtnActive];
        }
        
        if (this.state.fontReady) {
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
                            style={homeStyles}
                            onPress={this.handleHome}
                        >
                            <Image
                                source={require('../img/proxy_home.png')}
                                style={styles.btnIcon}
                            />
                            <Text style={styles.baseText}>home</Text>	
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={settingsStyles}
                            onPress={this.handleSettings}
                        >
                            <Image
                                source={require('../img/icon-g-settings.png')}
                                style={styles.btnIcon}
                            />
                            <Text style={styles.baseText}>settings</Text>	
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.menuBtn}
                            onPress={this.logOutUser}
                        >
							<Image
                                source={require('../img/proxy_logout.png')}
                                style={styles.btnIcon}
                            />
                            <Text style={styles.baseText}>log out</Text>	
                        </TouchableOpacity>
                    </View>        
                </View>
            );
        } else {
            return null;
        }
        
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
        fontFamily: 'open-sans-light',
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
		width: '100%'
	},
	menuBtn: {
        paddingHorizontal: '10%',
		height: 60,
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center'
	},
    menuBtnActive: {
        backgroundColor: 'rgba(0,0,0,0.2)'
    },
	btnIcon: {
		width: 47,
		height: 45,
		marginRight: 20,
	},
});

export default MenuScreen;