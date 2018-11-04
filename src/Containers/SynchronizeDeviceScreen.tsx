import React from 'react';
import { NavigationInjectedProps, NavigationScreenProps } from 'react-navigation';
import {View, Text, StyleSheet} from 'react-native';
import { SyncButton } from '../Components/SyncButton';

const syncrhonizeDeviceScreensStyles = StyleSheet.create({
	wrapper: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	}
});

interface NavigationParams {
	search: () => void;
	searching: boolean;
}

interface State {
	searching: boolean;
}

type Props = NavigationInjectedProps<NavigationParams>;

export class SynchronizeDeviceScreen extends React.Component<Props, State> {
	
	private timeout: any = null;

	public constructor(props: Props) {
		super(props);
		this.state = {
			searching: false,
		};
	}

	static navigationOptions = ({navigation}: NavigationScreenProps<NavigationParams>) => ({
		title: 'Ahoj',
		headerRight: <SyncButton
						searching={navigation.state.params && navigation.state.params.searching}
						search={navigation.state.params ? navigation.state.params.search : () => false}
					/>,
	});

	public componentDidMount() {
		this.props.navigation.setParams({
			search: () => this.search(),
			searching: this.state.searching,
		})
	}


	public search() {
		this.props.navigation.setParams({
			searching: true,
		});
		clearTimeout(this.timeout);
		this.timeout = setTimeout(() => {
			this.props.navigation.setParams({
				searching: false,
			});
		}, 6E3);
	}

	public render() {
		return (
			<View style={syncrhonizeDeviceScreensStyles.wrapper}>
				<Text>Sync Device</Text>
			</View>
		)
	}
}
