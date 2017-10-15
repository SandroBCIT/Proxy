import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Image, Button, TouchableOpacity, TouchableHighlight, Alert } from 'react-native';
import { DrawerNavigator } from 'react-navigation';
import firebase from 'firebase';
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
        }
        
        this.storeUserEmail = this.storeUserEmail.bind(this);
        this.storeUserPassword = this.storeUserPassword.bind(this);
        this.loginUser = this.loginUser.bind(this);
        this.triggerAnim = this.triggerAnim.bind(this);        
        this.goToHome = this.goToHome.bind(this);
    } 

    goToHome(){
        this.props.navigation.navigate('Home');
    }
    
    //Add realtime listener
    componentWillMount() {
        firebase.auth().onAuthStateChanged(user => {
            if(user){
                this.goToHome();   
            }
        });
        
    }

    storeUserEmail(text){
        const userEmail = text;
        
        this.setState({
            userEmail:userEmail    
        });
    }
    
    storeUserPassword(text){
        const userPassword = text;
        
        this.setState({
            userPassword:userPassword    
        });  
    }
    
    //Realtime user listener
//    firebase.auth().onAuthStateChange(user){
//        if(user){
//            
//        }else{
//            /*not logged in*/
//        }
//    }
    
    loginUser(){
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
//        firebase.auth().onAuthStateChanged(user => {
//            if(user){
//                this.goToHome();   
//            }
//        }) 
        
//        promise.catch(error => alert(e.message))
//        firebase.auth().signInWithEmailAndPassword(email, password)
//            .catch(function(error) {
//          // Handle Errors here.
//          var errorCode = error.code;
//          var errorMessage = error.message;
//          if (errorCode === 'auth/wrong-password') {
//            alert('Wrong password.');
//          } else {
//            alert(errorMessage);
//          }
//          console.log(error);
//        });
        
        
        
        
        
        
//        firebase.auth().onAuthStateChanged(firebaseUser => {
//            if(firebaseUser){
//                this.goToHome();
//            }
//        });
   
                
//        if(msg != null){
//            msg;
//        }else{
////            this.goToHome();
//            alert('logged in');
//        }
    
    
            

    triggerAnim(){
        this.setState({
            openSignUp:true    
        });
        setTimeout(() => {
            this.setState({
                openSignUp:false    
            });
        }, 1400)
    }

//-------------------------------------------------------------------------
    
    render() {
        return (
            <View style={styles.wrapper}>
                <View style={styles.viewContainer}>
                    <Image 
                        style={styles.logo}
                        source={require('../img/pin1.png')}
                    />
                    <View style={styles.inputContainer} >
                        <Text style={styles.inputLabel} >Email</Text>
                        <TextInput 
                            keyboardType='email-address'
                            returnKeyType='next'
                            style={styles.input}
                            placeholder='example@email.com'
                            underlineColorAndroid='transparent'
                            autoCapitalize='none'
                            autoCorrect={false}
                            onChangeText={this.storeUserEmail}
                            onSubmitEditing={() => this.passwordInput.focus()}
                        />
                        <Text style={styles.inputLabel} >Password</Text>
                        <TextInput 
                            secureTextEntry
                            returnKeyType='go'
                            style={styles.input}
                            placeholder='**********'
                            underlineColorAndroid='transparent'
                            ref={(input) => this.passwordInput = input}
                            onChangeText={this.storeUserPassword}
                            onSubmitEditing={this.loginUser}
                        />  
                    </View>
                    <View style={styles.btnContainer}>
                        <Button
                            title='Log In'
                            color='#634198'
                            accessibilityLabel='Learn more about this purple button'
                            onPress={this.loginUser}
                        />  
                        <Button
                            onPress={this.goToHome}
                            title='Log In with Facebook'
                            color='blue'
                            accessibilityLabel='Learn more about this purple button'
                        />
                        <Button
                            onPress={this.goToHome}
                            title='Log In with Google'
                            color='red'
                            accessibilityLabel='Learn more about this purple button'
                        />
                        <TouchableOpacity onPress={this.triggerAnim}>
                            <Text style={styles.signupText}>sign up</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <SignUpScreen openSignUp={this.state.openSignUp} />
            </View>
        );
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
        backgroundColor: '#FFEBEBEB',
        paddingHorizontal: 50,
        marginTop: 24
    },
    logo: {
        alignSelf: 'center',
        width: 100,
        height: 100
    },
    inputContainer: {
        padding: 20     
    },
    inputLabel: {
        marginVertical: 5
    },
    input: {
        height: 40,
        backgroundColor: 'rgba(255,255,255,1)',
        marginBottom: 20,
        paddingLeft: 20
    },
    btnContainer: {
        paddingHorizontal: 20,
        height: 180,
        justifyContent: 'space-between'
    },
    signupText: {
        textAlign: 'center'
    }
});

export default LoginScreen;