import React, { Component } from 'react';
import { StyleSheet, Text, View, UIManager, Platform, Image } from 'react-native';

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
			<View style={styles.container}>
				<View style={{width: 200, height: 200}}>
					<Animation
						ref={animation => {
							this.animation = animation;
						}}
						style={{
							width: 200,
							height: 200,
						}}
						loop={true}
						autoplay={true}
						source={require('../../assets/loading.json')}
					/>
				</View>
				<Image
					source={require('../../assets/proxy-logo.png')}
					style={styles.logo}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	logo: {
		width: 150,
		height: 45,
		marginHorizontal: 25,
		alignSelf: 'center'
	}
})