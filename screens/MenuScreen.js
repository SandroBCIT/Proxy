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
            itemHighlight: 'home',
			boxStatus: false
        }
    }
    
    async componentDidMount() {
        await Expo.Font.loadAsync({
            'open-sans-light': require('../assets/font/OpenSans-Light.ttf'),
        });

        this.setState({ fontReady: true });
    }
	
	hamburgerFunction = () => {
        this.props.navigation.navigate('DrawerClose');      
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
    
    logOutUser = () => {
        firebase.auth().signOut(); 
        
        this.props.navigation.navigate('DrawerClose');
        this.props.navigation.navigate('Login');
        this.setState({ itemHighlight: 'home' });
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
		
		let activeStyle = null;
		
		if (this.state.boxStatus === true) {
			activeStyle = [styles.boxBase, styles.boxActive];
		} else {
			activeStyle = styles.boxBase;
		}
		
		let picSrc = this.props.screenProps.photoURL,
			nameSrc = this.props.screenProps.userName.toLowerCase(),
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
						<Image 
							style={styles.logo}
							source={require('../img/proxy-logo-white.png')}
						/>
                    </View>
									
					<View style={styles.userInfo}>
						<Image source={picReq} style={styles.profPic} />
						<Text style={styles.profName}>{nameReq}</Text>
					</View>
		
					<View style={styles.userSettings}>
						<Text style={styles.baseText}>toggle night mode</Text>
						<TouchableOpacity style={activeStyle} onPress={this.toggleNightMode}></TouchableOpacity>
					</View>
		
					<TouchableOpacity onPress={this.logOutUser} style={styles.btnCont}>
						<View style={styles.btn}>
							<Image
                                source={require('../img/proxy_logout.png')}
                                style={styles.btnIcon}
                            />
							<Text style={[styles.baseText, styles.btnLabel]}>logout</Text>	
						</View>
					</TouchableOpacity>
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
		justifyContent: 'space-between',
		alignItems: 'center',
		backgroundColor: '#321754',
		marginTop: 24,
		paddingVertical: 30
	},
	baseText: {
        fontFamily: 'open-sans-light',
		color: '#e9e9e9'
	},
    shadow: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.35,
        shadowRadius: 2,
        elevation: 2,
    },
	menuTop: {
		alignSelf: 'stretch',
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingHorizontal: 20,
	},
	hamburgerBtn: {
		width: 27,
		height: 25,
	},
	logo: {
		width: 120,
		height: 36,
	},
	boxBase: {
		width: 25,
		height: 25,
		borderRadius: 25,
		borderWidth: 2,
		borderColor: '#30B783'
	},
	boxActive: {
		backgroundColor: '#30B783'
	},
	userInfo: {
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 60,
		height: 60
	},
	profPic: {
		width: 80,
		height: 80,
		borderRadius: 40,
		borderWidth: 2,
		borderColor: '#695682'
	},
	profName: {
		fontFamily: 'open-sans-semibold',
		fontSize: 20,
		color: '#e9e9e9',
		marginTop: 10
	},
	userSettings: {
		width: '80%',
		padding: 20,
		marginTop: 20,
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	btnCont: {
		alignSelf: 'stretch',
		marginHorizontal: 20,
		padding: 10,
	},
	btn: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	btnIcon: {
		width: 30,
		height: 35,
		marginRight: 10
	},
});

export default MenuScreen;