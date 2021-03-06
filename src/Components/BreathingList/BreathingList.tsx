import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { ActiveBreathingListItem, ActiveBreathingListItemProps } from './ActiveBreathingListItem';
import { AvailableBreathingListItemProps, AvailableBreathingListItem } from './AvailableBreathingListItem';

const styles = StyleSheet.create({
	wrapper: {
	}
});

export interface BreathingListProps {
	active: ActiveBreathingListItemProps[];
	available: AvailableBreathingListItemProps[];
}

export class BreathingList extends React.Component<BreathingListProps, {}> {
	public render() {
		return (
			<View style={styles.wrapper}>
				{
					this.props.active.map((listItem: ActiveBreathingListItemProps, index: number) => (
						<ActiveBreathingListItem {...listItem} key={index} index={index + 1} />
					))
				}
				{
					this.props.available.map((listItem: ActiveBreathingListItemProps, index: number) => (
						<AvailableBreathingListItem {...listItem} key={index} />
					))
				}
			</View>
		);
	}
}
