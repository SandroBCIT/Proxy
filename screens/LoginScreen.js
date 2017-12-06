import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Image, Button, TouchableOpacity, TouchableHighlight, Alert, Animated } from 'react-native';
import { DrawerNavigator } from 'react-navigation';
import firebase from 'firebase';
import Expo from 'expo';

import SignUpScreen from './SignUpScreen';
import MenuScreen from './MenuScreen';

//Firebase connection
const firebaseConfig = {
    apiKey: "AIzaSyDs090vaNwGe-DzG4pM5pguQUGdOsuW55k",
    authDomain: "proxy-e0029.firebaseapp.com",
    databaseURL: "https://proxy-e0029.firebaseio.com",
    storageBucket: "proxy-e0029.appspot.com",
    messagingSenderId: "294902702977",
};
firebase.initializeApp(firebaseConfig);


class LoginScreen extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            openSignUp: false,
            userEmail: '',
            userPassword: '',
            fontReady: false
        }
    } 

    goToHome = ()=>{
        this.props.navigation.navigate('Home');
    }
    
    //Add realtime listener
    componentWillMount() {
        firebase.auth().onAuthStateChanged(user => {
            if(user){
                this.goToHome();   
            }
        });
		this.animatedPosition = new Animated.Value(50);
        this.animatedOpacity = new Animated.Value(0);
    }

    async componentDidMount() {
        await Expo.Font.loadAsync({
            'open-sans-light': require('../assets/font/OpenSans-Light.ttf'),
        });

        this.setState({ fontReady: true });
		
		Animated.timing(this.animatedPosition, {
            toValue: 0,
            duration: 300
        }).start()
        Animated.timing(this.animatedOpacity, {
            toValue: 1,
            duration: 400
        }).start()
    }

    storeUserEmail = (text)=>{
        const userEmail = text;
        
        this.setState({
            userEmail:userEmail    
        });
    }
    
    storeUserPassword = (text)=>{
        const userPassword = text;
        
        this.setState({
            userPassword:userPassword    
        });  
    }
    
    loginUser = () => {
        const email = this.state.userEmail; 
        const pass = this.state.userPassword;
        const auth = firebase.auth();
        //SignIn
        const promise = auth.signInWithEmailAndPassword(email,pass);
        
        promise.catch(error =>{
            if(error.code == 'auth/invalid-email'){
                Alert.alert('Wrong Email and/or Password');
            }else if(error.code == 'auth/wrong-password'){
                Alert.alert('Wrong Email and/or Password');
            }else if(error.code == 'auth/user-disabled'){
                Alert.alert('Wrong Email and/or Password');
            }else if(error.code == 'auth/user-not-found'){
                Alert.alert('Wrong Email and/or Password');
            }
        });
    }
    
    async fbLogin(){
        const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync(
            '738055276391547',
            { permissions: ['public_profile', 'email'] }
        );

        if (type === 'success') {
            const credential = firebase.auth.FacebookAuthProvider.credential(token);
            console.log(credential);
            firebase.auth().signInWithCredential(credential).catch((error) => {
                alert(error);
            });
        }
    }
    
    async googleLogin(){
        try {
            const result = await Expo.Google.logInAsync({
                androidClientId: '294902702977-52kehrqpuvv6hefebqcqccc2muetbahf.apps.googleusercontent.com',
                iosClientId: '294902702977-3loqo1r883iodhrou17ie76egmuks4fo.apps.googleusercontent.com',
                scopes: ['profile', 'email'],
            });

            if (result.type === 'success') {
                const credential = firebase.auth.GoogleAuthProvider.credential(result.idToken);
                firebase.auth().signInWithCredential(credential).catch((error) => {
                    alert(error);
                });
            }
        } catch(e) {
            alert(e);
        }
    }
    
    triggerAnim = () => {
        this.setState({
            openSignUp:true    
        });
        setTimeout(() => {
            this.setState({
                openSignUp:false    
            });
        }, 1400)
    }
    
    unFocus = () => {
        this.refs.emailInput.blur()
        this.refs.passwordInput.blur()
    }

//-------------------------------------------------------------------------
    
    render() {
		const animatedStyle = {
            transform: [{translateY: this.animatedPosition}],
            opacity: this.animatedOpacity
        }
        
        if (this.state.fontReady) {
            return (
                <TouchableHighlight onPress={this.unFocus} activeOpacity={1} >
                    <Animated.View style={[styles.wrapper, animatedStyle]}>
                        <View style={styles.viewContainer}>
                            <Image 
                                style={styles.logo}
                                source={require('../img/proxy-logo.png')}
                            />
                            <View style={styles.inputContainer} >
                                <Text style={[styles.baseText, styles.inputLabel]} >email</Text>
                                <TextInput 
                                    ref='emailInput'
                                    keyboardType='email-address'
                                    returnKeyType='next'
                                    style={[styles.baseText, styles.input]}
                                    placeholder='example@email.com'
                                    placeholderTextColor='#58378F'
                                    underlineColorAndroid='transparent'
                                    autoCapitalize='none'
                                    autoCorrect={false}
                                    onChangeText={this.storeUserEmail}
                                    onSubmitEditing={() => this.refs.passwordInput.focus()}
                                />
                                <Text style={[styles.baseText, styles.inputLabel]} >password</Text>
                                <TextInput 
                                    secureTextEntry
                                    returnKeyType='go'
                                    style={[styles.baseText, styles.input]}
                                    placeholder='**********'
                                    placeholderTextColor='#58378F'
                                    underlineColorAndroid='transparent'
                                    ref='passwordInput'
                                    onChangeText={this.storeUserPassword}
                                    onSubmitEditing={this.loginUser}
                                />  
                            </View>
                            <View style={styles.btnContainer}>
                                <TouchableOpacity onPress={this.loginUser}>
                                    <View style={[styles.btn, styles.btnLogin]}>
                                        <Text style={[styles.baseText, styles.btnLabel]}>login</Text>	
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={this.fbLogin}>
                                    <View style={[styles.btn, styles.btnFacebook]}>
                                        <Text style={[styles.baseText, styles.btnLabel]}>login with Facebook</Text>	
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={this.googleLogin}>
                                    <View style={[styles.btn, styles.btnGoogle]}>
                                        <Text style={[styles.baseText, styles.btnLabel]}>login with Google</Text>	
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={this.triggerAnim}>
                                    <Text style={[styles.baseText, styles.signupText]}>sign up</Text>
                                </TouchableOpacity>
								
                            </View>
                        </View>
                        <SignUpScreen openSignUp={this.state.openSignUp} />
                    </Animated.View>
                </TouchableHighlight>
            );
        } else {
            return null;
        }
    }
}

//-------------------------------------------------------------------------

const styles = StyleSheet.create({
	wrapper: {
		height: '100%',
		width: '100%'
	},
	viewContainer: {
		flex: 1,
		alignSelf: 'stretch',
		flexDirection: 'column',
		justifyContent: 'center',
		backgroundColor: '#E9E9E9',
		paddingHorizontal: 50,
	},
	baseText: {
		fontFamily: 'open-sans-light'
	},
	logo: {
		alignSelf: 'center',
		width: 183,
		height: 55
	},
	inputContainer: {
		marginVertical: 20
	},
	inputLabel: {
		marginVertical: 5,
		paddingHorizontal: 15,
		color: '#58378F'
	},
	input: {
		height: 40,
		backgroundColor: 'rgba(255,255,255,1)',
		marginBottom: 10,
		paddingLeft: 15,
		borderBottomWidth: 2,
		borderColor: '#58378F'
	},
	btnContainer: {
		height: 180,
		justifyContent: 'space-between'
	},
	btn: {
		height: 35,
		justifyContent: 'center',
		alignItems: 'center',
	},
	btnLabel: {
		color: '#E9E9E9'
	},
	btnLogin: {
		backgroundColor: '#58378F'
	},
	btnFacebook: {
		backgroundColor: '#314E8F'
	},
	btnGoogle: {
		backgroundColor: '#D7282D'
	},
	signupText: {
		textAlign: 'center',
		color: '#58378F'
	}
});

export default LoginScreen;