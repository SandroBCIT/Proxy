import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Image, Button, TouchableOpacity, TouchableHighlight, AsyncStorage, Dimensions, Animated, Easing } from 'react-native';
import firebase from 'firebase';
import HamburgerBtn from './comp/HamburgerBtn';

const {height, width} = Dimensions.get('window');
const animVal1 = new Animated.Value(height);
var checkRes = null;

class SignUpScreen extends Component {
    constructor(props){
        super(props)
        
        this.state = {
            openSignUp: this.props.openSignUp,
            animVal:new Animated.Value(height),
            userEmail:'',
            userPassword:'',
            userPasswordCheck:'',
            checkResult: ''
        } 
    }
    
    componentDidMount(){
        this.checker()  
    }
       
    checker = ()=>{
        var checking = setInterval(() => {   
            if(this.props.openSignUp == true){
                this.openAnim()
                clearInterval(checking)
            }
        }, 50)
    }
    
    openAnim = ()=>{
        Animated.timing(this.state.animVal, {
            toValue: 0,
            duration: 500
        }).start()
    }
    
    closeAnim = ()=>{
        Animated.timing(this.state.animVal, {
            toValue: height,
            duration: 500
        }).start()
        this.props.openSignUp=false
        this.checker()
    }
    
    //stores Email in state
    storeUserEmail = (text)=>{
        this.setState({
            userEmail:text    
        })
    }
    
    //stores Password in state
    storeUserPassword = (text)=>{
        this.setState({
            userPassword:text    
        }) 
    }
    
    //stores Password to be checked in state
    storeUserPasswordCheck = (text)=>{
        this.setState({
            userPasswordCheck:text    
        })
    }
    
    signUserUp = ()=>{
        if(checkRes !== null){
            alert('passwords do not match')
        }else{
        //GetEmail and Pass
            const email = this.state.userEmail
            const pass = this.state.userPassword
            const auth = firebase.auth()
            //SignIn
            const promise = auth.createUserWithEmailAndPassword(email,pass);
            promise.catch(e => alert(e.message))
            
            if(promise.catch === null){
                this.closeAnim()
            }
        }
    }
    
    unFocus = () => {
        this.refs.emailInput.blur()
        this.refs.pwInput.blur()
        this.refs.pw2Input.blur()
    }
    
//-------------------------------------------------------------------------
    
    render(){
        if(this.state.openSignUp){
            this.openAnim();   
        }
        
        //Checks
        if(this.state.userPasswordCheck !== '' && this.state.userPassword !== this.state.userPasswordCheck){
            checkRes = 'Passwords do not match!';    
        }else{
            checkRes = null
        }
        
        const animatedStyle = { 
            transform:[{translateY: this.state.animVal}] 
        };
        return (
            <Animated.View style={[styles.signUpArea, animatedStyle]}>
                <TouchableOpacity onPress={this.unFocus} activeOpacity={1} >
                    <View style={styles.inputContainer}>
                        <Text style={[styles.inputLabel, styles.baseText]}>email</Text>
                        <TextInput 
                            ref='emailInput'
                            keyboardType='email-address'
                            returnKeyType='next'
                            style={[styles.input, styles.baseText]}
                            placeholder='example@email.com'
                            underlineColorAndroid='transparent'
                            autoCapitalize='none'
                            autoCorrect={false}
                            onChangeText={this.storeUserEmail}
                            onSubmitEditing={() => this.refs.pwInput.focus()}
                        />
                        <Text style={[styles.inputLabel, styles.baseText]}>password</Text>
                        <TextInput 
                            ref='pwInput'
                            secureTextEntry
                            returnKeyType='next'
                            style={[styles.input, styles.baseText]}
                            placeholder='**********'
                            underlineColorAndroid='transparent'
                            onChangeText={this.storeUserPassword}
                            onSubmitEditing={() => this.refs.pw2Input.focus()}
                        /> 
                        <Text style={[styles.inputLabel, styles.baseText]}>re-enter password</Text>
                        <TextInput 
                            ref='pw2Input'
                            secureTextEntry
                            returnKeyType='go'
                            style={[styles.input, styles.baseText]}
                            placeholder='**********'
                            underlineColorAndroid='transparent'
                            onChangeText={this.storeUserPasswordCheck}
                            onSubmitEditing={this.signUserUp}
                        />
                        <Text style={[styles.matchAlert, styles.baseText]}>{checkRes}</Text>
                        <TouchableOpacity onPress={this.signUserUp}>
                            <View style={styles.btn}>
                                <Text style={[styles.baseText, styles.btnLabel]}>sign up</Text>	
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.closeAnim}>
                            <Text style={[styles.loginText, styles.baseText]}>Already have an account?</Text>
                            <Text style={[styles.loginText, styles.loginTextHighlight]}>Login here</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </Animated.View>
        );    
    }
}

//-------------------------------------------------------------------------

const styles = StyleSheet.create({
	signUpArea: {
		position: 'absolute',
		backgroundColor: 'lightgrey',
		width: width,
		height: height,
		marginTop: 24
	},
	inputContainer: {
		paddingHorizontal: 50,
		paddingTop: 50
	},
    baseText: {
        fontFamily: 'open-sans-light'
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
		borderRadius: 5,
		borderWidth: 1,
		borderColor: '#58378F'
	},
	btn: {
		height: 35,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 5,
		backgroundColor: '#58378F',
		marginVertical: 30
	},
	btnLabel: {
		color: '#E9E9E9'
	},
	matchAlert: {
		color: 'red',
	},
	loginText: {
		textAlign: 'center'
	},
	loginTextHighlight: {
		color: '#58378F'
	}
});

export default SignUpScreen;