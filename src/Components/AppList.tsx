import * as React from 'react';
import { List, ListItem, ListItemProps } from 'react-native-elements'

export interface AppListProps {
	list: ListItemProps[];
}

export class AppList extends React.Component<AppListProps, {}> {
	public render() {
		return (
			<List containerStyle={{width: '100%', marginTop: 0}}>
				{
					this.props.list.map((li: ListItemProps, index: number) => (
						<ListItem {...li} key={index}/>
					))
				}
			</List>
		);
	}
}
