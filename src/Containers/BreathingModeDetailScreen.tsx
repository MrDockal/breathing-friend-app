import React from 'react';
import { NavigationInjectedProps, NavigationScreenProps } from 'react-navigation';
import { ScrollView, Text, StyleSheet } from 'react-native';
import { BreathingMode } from '../Core/Entities/BreathingMode';

const styles = StyleSheet.create({
	wrapper: {
		flexGrow: 1,
		paddingTop: 20,
	}
});

interface BreathingModeDetailScreenNavigationParams {
	mode: BreathingMode,
	action: 'edit' | 'add'
}

interface OwnProps extends NavigationInjectedProps<BreathingModeDetailScreenNavigationParams> {

}

type Props = OwnProps;

export class BreathingModeDetailScreen extends React.Component<Props, {}> {
	
	public constructor(props: Props) {
		super(props);
	}

	static navigationOptions = ({navigation}: NavigationScreenProps<BreathingModeDetailScreenNavigationParams>) => ({
		title: navigation.state.params!.mode.name,
	});

	public render() {
		return (
			<ScrollView contentContainerStyle={styles.wrapper}>
				<Text>
					{
						this.props.navigation.state.params!.mode.name + 
						this.props.navigation.state.params!.mode.speed.normal.cycleSpeedEnd + 
						this.props.navigation.state.params!.mode.speed.normal.cycleSpeedStart + 
						this.props.navigation.state.params!.mode.speed.normal.duration + 
						this.props.navigation.state.params!.mode.speed.normal.freqHold1 + 
						this.props.navigation.state.params!.mode.speed.normal.freqHold1
					}
				</Text>
			</ScrollView>
		);
	}
}
