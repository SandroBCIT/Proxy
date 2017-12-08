import React, { Component } from 'react';
import { StyleSheet, Text, View, UIManager, Platform } from 'react-native';

import Animation from 'lottie-react-native';

export default class LogoAnim extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			palette: this.props.palette
		}
		
		if (Platform.OS === 'android') {
			UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
		}
	}
	
	componentDidMount() {
		this.animation.play();
	}
	
	render() {
		
		let btnCenter = this.state.palette.light.primary;
		
		if (this.props.nightMode === true) {
			btnCenter = this.state.palette.dark.secondary
		}
		
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
				<View style={{ backgroundColor: btnCenter, borderRadius: 100, height:20, width:20, position: 'absolute', top: 20, left: 20}}></View>
			</View>
		);
	}
}