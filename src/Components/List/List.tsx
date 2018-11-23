import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Divider } from 'react-native-elements';
import { ListItemProps, ListItem } from './ListItem';

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
			<Divider/>
			{
				this.props.listItems.map((listItem: ListItemProps, index: number) => (
					<React.Fragment key={index}>
						<ListItem {...listItem}/>
						<Divider/>
					</React.Fragment>
				))
			}
		</View>
	}
}
