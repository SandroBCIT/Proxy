import React, { Component } from 'react';
import { StyleSheet, Text, View, UIManager, Platform } from 'react-native';

import Animation from 'lottie-react-native';

export default class LogoAnim extends Component {
	constructor(props) {
		super(props);
		
		if (Platform.OS === 'android') {
			UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
		}
	}
	
	componentDidMount() {
		this.animation.play();
	}
	
	render() {
		return(
			<View style={{flex: 1}}>
				<Animation
					ref={animation => {
						this.animation = animation;
					}}
					style={{
						width: 60,
						height: 60
					}}
					loop={true}
					autoplay={true}
					source={require('../../assets/radius.json')}
				/>
				<View style={{ backgroundColor: '#58378F', borderRadius: 100, height:20, width:20, position: 'absolute', top: 20, left: 20}}></View>
			</View>
		);
	}
}