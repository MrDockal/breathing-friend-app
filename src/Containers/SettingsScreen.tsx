import React from 'react';
import {ScrollView, Text, StyleSheet, Button} from 'react-native';
import { NavigationInjectedProps } from 'react-navigation';
import { routeNames } from '../Navigators/Navigators';
import { connect } from 'react-redux';
import { State } from '../Store/configureStore';
import { FirestoreReinitializeAction } from '../Store/Actions/breathingActions';
import { Dispatch } from 'redux';

const settingsScreenStyles = StyleSheet.create({
	wrapper: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	}
});

interface DispatchProps {
	reinitialize: () => void;
}

type OwnProps = NavigationInjectedProps;
type Props = OwnProps & DispatchProps;

class SettingsScreenHOC extends React.Component<Props> {
	public render() {
		return (
			<ScrollView contentContainerStyle={settingsScreenStyles.wrapper}>
				<Button 
					onPress={() => {
						this.props.navigation.navigate(routeNames.About)
					}}
					title='About'
				/>
				<Button 
					onPress={() => {
						this.props.navigation.navigate(routeNames.ReportBug)
					}}
					title='ReportBug'
				/>
				<Button 
					onPress={() => {
						this.props.navigation.navigate(routeNames.SignpostScreen)
					}}
					title='Switch devices'
				/>
				<Button 
					onPress={() => {
						this.props.reinitialize();
					}}
					title='Reinitialize'
				/>
				<Text>Settings!!</Text>
			</ScrollView>
		)
	}
}

export const SettingsScreen = connect<{}, DispatchProps, OwnProps>(
	(_state: State, _ownProps: OwnProps) => ({
	}),
	(dispatch: Dispatch) => ({
		reinitialize: () => {
			dispatch(FirestoreReinitializeAction());
		}
	}),
)(SettingsScreenHOC);
