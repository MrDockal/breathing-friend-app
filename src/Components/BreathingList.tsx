import * as React from 'react';
import { List, ListItem } from 'react-native-elements'

interface LI {
	title: string;
	subtitle: string;
	icon: string;
}

export class BreathingList extends React.Component {
	public render() {
		const list = [
			{
				title: 'Odpočiň si',
				subtitle: '10 minut',
				icon: 'heart'
			},
			{
				title: 'Sladké sny',
				subtitle: '3 minuty',
				icon: 'smileo'
			},
			{
				title: 'Odpočiň si',
				subtitle: '10 minut',
				icon: 'heart'
			},
			{
				title: 'Sladké sny',
				subtitle: '3 minuty',
				icon: 'smileo'
			},
			{
				title: 'Odpočiň si',
				subtitle: '10 minut',
				icon: 'heart'
			},
			{
				title: 'Sladké sny',
				subtitle: '3 minuty',
				icon: 'smileo'
			}
		]
		return (
			<List containerStyle={{width: '100%'}}>
				{
					list.map((li: LI, index: number) => (
						<ListItem title={li.title} key={index} subtitle={li.subtitle}/>
					))
				}
			</List>
		);
	}
}
