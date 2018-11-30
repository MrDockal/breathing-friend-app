import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { ListItemProps, ListItem } from './ListItem';
import { Hr } from '../Hr/Hr';

export interface ListProps {
	listItems: ListItemProps[];
}

const styles = StyleSheet.create({
	listItem: {
		paddingHorizontal: 30,
	}
});

export class List extends React.Component<ListProps> {

	public render() {
		return <View>
			<Hr theme={'white'} />
			{
				this.props.listItems.map((listItem: ListItemProps, index: number) => (
					<React.Fragment key={index}>
						<View style={styles.listItem}>
							<ListItem {...listItem} />
							{
								(index +1 < this.props.listItems.length) && <Hr theme={'black'} />
							}
						</View>
					</React.Fragment>
				))
			}
		</View>
	}
}
