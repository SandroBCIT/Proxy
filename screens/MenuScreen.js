import React, { Component } from 'react';
import { Text, View, Button, StyleSheet, Image, TouchableHighlight, TouchableOpacity, Animated } from 'react-native';
import { DrawerNavigator } from 'react-navigation';
import firebase from 'firebase';
import HamburgerBtn from './comp/HamburgerBtn';

class MenuScreen extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            fontReady: false,
            itemHighlight: 'home',
			boxStatus: false,
			palette: this.props.screenProps.palette
        }
    }
	
	componentWillMount() {
        this.animatedPosition = new Animated.Value(-50);
        this.animatedOpacity = new Animated.Value(0);
    }
    
    animateOut = () => {
        Animated.timing(this.animatedPosition, {
            toValue: -50,
            duration: 150
        }).start()
        Animated.timing(this.animatedOpacity, {
            toValue: 0,
            duration: 150
        }).start()
    }
	
	animateIn = () => {
        Animated.timing(this.animatedPosition, {
            toValue: 0,
            duration: 150
        }).start()
        Animated.timing(this.animatedOpacity, {
            toValue: 1,
            duration: 150
        }).start()
    }
	
	hamburgerFunction = () => {
        this.props.navigation.navigate('DrawerClose');
		this.props.screenProps.toggleDrawer();
    }
    
    logOutUser = () => {
        firebase.auth().signOut(); 
        
        this.props.navigation.navigate('DrawerClose');
		this.props.screenProps.toggleDrawer();
        this.props.navigation.navigate('Login');
        this.setState({ itemHighlight: 'home' });
    }
	
	
	
//-------------------------------------------------------------------------
    
    render() {
		
		if (this.props.screenProps.drawerOpen === true) {
			this.animateIn();
		} else {
			this.animateOut();
		}
		
		let colPal = this.state.palette.light,
			activeStyle = [styles.boxBase,
						  styles.boxBase,
						  {borderColor: colPal.secondary}];
		
		if (this.props.screenProps.nightMode === true) {
			colPal = this.state.palette.dark;
			activeStyle = [styles.boxBase,
						   {borderColor: colPal.secondary},
						   {backgroundColor: colPal.secondary}];
		}
		
		let picSrc = this.props.screenProps.photoURL,
			nameSrc = this.props.screenProps.userName,
			emailSrc = this.props.screenProps.email,
			picReq = require('../assets/icon-proxy-200.png'),
			nameReq = "User";
		
		if (picSrc !== null) {
			picReq = {uri: picSrc};
		}
		
		if (nameSrc !== null) {
			nameReq = nameSrc.toLowerCase();
		} else if (emailSrc !== undefined) {
			nameReq = emailSrc;
		}
		
		const animatedStyle = {
            transform: [{translateX: this.animatedPosition}],
            opacity: this.animatedOpacity
        }
		
		return (
			<View style={{flex:1,flexDirection:'row',backgroundColor:'rgba(0,0,0,0)'}}>
				<View style={[styles.viewContainer, {backgroundColor: colPal.primary}]}>
					<View style={styles.menuTop}>
						<HamburgerBtn hamburgerFunction={this.hamburgerFunction} nightMode={this.props.screenProps.nightMode}/>
						<Image 
							style={styles.logo}
							source={require('../img/proxy-logo-white.png')}
						/>
					</View>
				
					<View style={styles.userInfo}>
						<Animated.Image source={picReq} style={[styles.profPic, animatedStyle]} />
						<Animated.Text style={[styles.profName, {color: colPal.text}, animatedStyle]}>{nameReq}</Animated.Text>
					</View>
				
					<TouchableOpacity onPress={this.props.screenProps.toggleNightMode} style={styles.btnCont}>
						<View style={styles.userSettings}>
							<Text style={[styles.baseText, {color: colPal.text}]}>toggle night mode</Text>
							<View style={activeStyle}></View>
						</View>
					</TouchableOpacity>
				
					<TouchableOpacity onPress={this.logOutUser} style={styles.btnCont}>
						<View style={styles.btn}>
							<Image
								source={require('../img/proxy_logout.png')}
								style={styles.btnIcon}
							/>
							<Text style={[styles.baseText, styles.btnLabel, {color: colPal.text}]}>logout</Text>	
						</View>
					</TouchableOpacity>
				</View>
				<TouchableOpacity onPress={this.hamburgerFunction} style={{width:'30%',height:'100%',opacity:0}} />
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
		paddingVertical: 40
	},
	baseText: {
        fontFamily: 'open-sans-light',
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
		alignItems: 'flex-start',
		marginHorizontal: 20,
	},
	logo: {
		width: 120,
		height: 36,
		marginTop: 5
	},
	boxBase: {
		width: 25,
		height: 25,
		borderRadius: 25,
		borderWidth: 2,
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
		marginTop: 10
	},
	userSettings: {
		paddingHorizontal: 20,
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