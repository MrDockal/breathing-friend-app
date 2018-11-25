import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { ListItemProps, ListItem } from './ListItem';
import { Hr } from '../Hr/Hr';

export interface ListProps {
	listItems: ListItemProps[];
}

const styles = StyleSheet.create({
	wrapper: {
		paddingHorizontal: 30,
	}
});

export class List extends React.Component<ListProps> {

	public render() {
		return <View style={[styles.wrapper]}>
			<Hr theme={'black'} />
			{
				this.props.listItems.map((listItem: ListItemProps, index: number) => (
					<React.Fragment key={index}>
						<ListItem {...listItem} />
						<Hr theme={'black'} />
					</React.Fragment>
				))
			}
		</View>
	}
}
