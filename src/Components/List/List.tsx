import * as React from 'react';
import { View, Text } from 'react-native';
import { Divider } from 'react-native-elements';
import { ListItemProps, ListItem } from './ListItem';

export interface ListProps {
	listItems: ListItemProps[];
	width?: number | string;
}

export class List extends React.Component<ListProps> {

	public render() {
		return <View style={{width: this.props.width ? this.props.width : '80%'}}>
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
