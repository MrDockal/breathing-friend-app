import * as React from 'react';
import { View, TouchableNativeFeedback, StyleSheet } from 'react-native';
import { ListItemProps } from './ListItem';
import { TextNormal } from '../Text/TextNormal';
import { Icon } from 'react-native-elements';

export interface ListItemProps {
	title: string;
	onPress: () => void;
}

const styles = StyleSheet.create({
	listItem: {
		paddingVertical: 15,
		flex: 1,
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	wrapperView: {
		backgroundColor: 'transparent'
	}
});

export class ListItem extends React.Component<ListItemProps> {

	public render() {
		return (
			<View style={styles.wrapperView}>
				<TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('rgba(255, 255, 255, .1)', false)} onPress={() => this.props.onPress()}>
					<View style={styles.listItem}>
						<TextNormal>{this.props.title}</TextNormal>
						<Icon
							name='chevron-right'
							color='white'
							size={30}
						/>
					</View>
				</TouchableNativeFeedback>
			</View>
		);
	}
}
