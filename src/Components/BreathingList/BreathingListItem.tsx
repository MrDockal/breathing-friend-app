import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextSmall } from '../Text/TextSmall';
import { H2 } from '../Text/H2';

const styles = StyleSheet.create({
	wrapper: {
		paddingHorizontal: 20,
		paddingVertical: 25,
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignContent: 'center',
	},
	hide: {
		opacity: 0,
	},
	iconWrapper: {
		justifyContent: 'center',
	}
});

export interface BreathingListItemProps {
	textTop: string;
	textCenter: string;
	textBottom?: string;
	Icon: JSX.Element;
}

export class BreathingListItem extends React.Component<BreathingListItemProps, {}> {
	public render() {
		return (
			<View style={styles.wrapper}>
				<View style={styles.hide}>
					{
						this.props.Icon
					}
				</View>
				<View>
					<TextSmall>{this.props.textTop}</TextSmall>
					<H2 bold={true}>{this.props.textCenter}</H2>
					<TextSmall>{this.props.textBottom}</TextSmall>
				</View>
				<View style={styles.iconWrapper}>
					{
						this.props.Icon
					}
				</View>
			</View>
		);
	}
}
