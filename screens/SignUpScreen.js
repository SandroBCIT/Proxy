import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Image, Button, TouchableOpacity, TouchableHighlight, AsyncStorage, Dimensions, Animated, Easing } from 'react-native';
import firebase from 'firebase';
import HamburgerBtn from './comp/HamburgerBtn';

const {height, width} = Dimensions.get('window');

const animVal1 = new Animated.Value(height);

class SignUpScreen extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            openSignUp: this.props.openSignUp,
            animVal:new Animated.Value(height),
            userEmail2:'',
            userPassword2:'',
            userPasswordCheck:'',
            checkResult: ''
        } 
        
        this.openAnim = this.openAnim.bind(this);
        this.closeAnim = this.closeAnim.bind(this);
        this.storeUserEmail2 = this.storeUserEmail2.bind(this);
        this.storeUserPassword2 = this.storeUserPassword2.bind(this);
        this.storeUserPasswordCheck = this.storeUserPasswordCheck.bind(this);
        this.passCheck = this.passCheck.bind(this);
    }
    
    componentDidMount(){
        this.checker();    
    }
       
    checker(){
        var checking = setInterval(() => {   
            if(this.props.openSignUp == true){
                this.openAnim();
                clearInterval(checking);
            }
        }, 50);
    }
    
    openAnim(){
        Animated.timing(this.state.animVal, {
            toValue: 0,
            duration: 500
        }).start();
    }
    
    closeAnim(){
        Animated.timing(this.state.animVal, {
            toValue: height,
            duration: 500
        }).start();
        this.props.openSignUp=false;
        this.checker();
    }
    
    //stores Email in state
    storeUserEmail2(text){
        const userEmail2 = text;
        
        this.setState({
            userEmail2:userEmail2    
        });
    }
    
    //stores Password in state
    storeUserPassword2(text){
        const userPassword2 = text;
        
        this.setState({
            userPassword2:userPassword2    
        }); 
    }
    
    //stores Password to be checked in state
    storeUserPasswordCheck(text){
        const userPasswordCheck = text;
        
        this.setState({
            userPasswordCheck:userPasswordCheck    
        });
    }
    
    //checks pasword 
    passCheck(){
        if(this.state.userPassword2 == this.state.userPasswordCheck){
            //GetEmail and Pass
            const email2 = this.state.userEmail2; 
            const pass2 = this.state.userPassword2;
            const auth = firebase.auth();
            //SignIn
            const promise = auth.createUserWithEmailAndPassword(email2,pass2);
            promise.catch(e => alert(e.message));
            
            this.closeAnim();             
        }else{
            this.setState({
                checkResult: '       Passwords do not match!'  
            });   
        }    
    }
    
//-------------------------------------------------------------------------
    
    render(){
        const checkRes = this.state.checkResult;
        
        if(this.state.openSignUp){
            this.openAnim();   
        }
        
        const animatedStyle = { 
            transform:[{translateY: this.state.animVal}] 
        };
        return (
            <Animated.View style={[styles.signUpArea, animatedStyle]}>
                <View style={styles.inputContainer} >
                    <Text style={styles.inputLabel} >email</Text>
                    <TextInput 
                        keyboardType='email-address'
                        returnKeyType='next'
                        style={styles.input}
                        placeholder='example@email.com'
                        underlineColorAndroid='transparent'
                        autoCapitalize='none'
                        autoCorrect={false}
                        onChangeText={this.storeUserEmail2}
                        onSubmitEditing={() => this.passwordInput.focus()}
                    />
                    <Text style={styles.inputLabel}>password</Text>
                    <TextInput 
                        secureTextEntry
                        returnKeyType='next'
                        style={styles.input}
                        placeholder='**********'
                        underlineColorAndroid='transparent'
                        ref={(input) => this.passwordInput = input}
                        onChangeText={this.storeUserPassword2}
                        onSubmitEditing={() => this.passwordInputCheck.focus()}
                    /> 
                    <Text style={styles.inputLabel}>re-enter password
                            <Text style={styles.matchAlert}>{checkRes}</Text>
                    </Text>
                    <TextInput 
                        secureTextEntry
                        returnKeyType='go'
                        style={styles.input}
                        placeholder='**********'
                        underlineColorAndroid='transparent'
                        ref={(input) => this.passwordInputCheck = input}
                        onChangeText={this.storeUserPasswordCheck}
                        onSubmitEditing={this.passCheck}
                    />
					<TouchableOpacity onPress={this.passCheck}>
						<View style={styles.btn}>
							<Text style={[styles.baseText, styles.btnLabel]}>sign up</Text>	
						</View>
					</TouchableOpacity>
                    <TouchableOpacity onPress={this.closeAnim}>
                        <Text style={styles.loginText}>Already have an account?</Text>
                        <Text style={[styles.loginText, styles.loginTextHighlight]}>Login here</Text>
                    </TouchableOpacity>
                </View>
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