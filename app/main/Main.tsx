import { AppLoading, Constants, Font } from 'expo';
import { Body, Button, Container, Header, Icon, Right } from 'native-base';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Dispatch, connect } from 'react-redux';
import { IActionTypes } from '../Actions';
import { IState } from './../IState';
import Faders from './../faders/Faders';
import Output from './../output/Output';
import { createLoadingDone } from './MainActions';

interface IProps {
	isReady: boolean,
	loadingDone: () => any
}

const styles = StyleSheet.create({
	container: {
		marginTop: Constants.statusBarHeight
	}
})

class MainBase extends React.Component<IProps> {
	async loadAssetsAsync() {
		//makeConnection("192.168.0.2")
		await Font.loadAsync({
			'Roboto': require('native-base/Fonts/Roboto.ttf'),
			'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
		})
	}

	render() {
		if (this.props.isReady) {
			return (
				<Container style={styles.container}>
					<Header>
						<Body>
							<Output />
						</Body>
						<Right>
							<Button transparent>
								<Icon name="settings" />
							</Button>
						</Right>
					</Header>
					<Faders />
				</Container>
			)
		}
		else {
			return <AppLoading
				startAsync={this.loadAssetsAsync}
				onFinish={() => this.props.loadingDone()}
				onError={console.warn}
			/>
		}
	}
}
const mapStateToProps = (state: IState) => ({ isReady: state.main.isReady })
const mapDispatchToProps = (dispatch: Dispatch<IActionTypes>) => ({
	loadingDone: () => dispatch(createLoadingDone())
})
const Main = connect(mapStateToProps, mapDispatchToProps)(MainBase)
export default Main