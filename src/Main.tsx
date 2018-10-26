import React from 'react';
import { TabNavigation } from './Components/TabNavigation';
import SplashScreen from 'react-native-splash-screen'

export default class App extends React.Component {

	public componentDidMount() {
		SplashScreen.hide();
	}

	public render() {
		return (
			<TabNavigation/>
		);
	}
}
