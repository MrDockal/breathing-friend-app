import React from 'react';
import {ScrollView, Text, StyleSheet} from 'react-native';
import { Button as ButtonRN, Divider } from 'react-native-elements';
import { themeSchema } from '../Core/ThemeSchema/themeSchema';
import { Button } from '../Components/Button';
import { AppList } from '../Components/AppList';

const homeScreenStyles = StyleSheet.create({
	wrapper: {
		flexGrow: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: themeSchema.color.backgroundColor,
	}
});

export class HomeScreen extends React.Component {
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
		];
		return (
			<ScrollView contentContainerStyle={homeScreenStyles.wrapper}>
				<Text style={{color: themeSchema.color.fontColor, fontSize: themeSchema.fontSize.h1}}>Lorem ipsum dole more</Text>
				<Text style={{color: themeSchema.color.fontColor, fontSize: themeSchema.fontSize.h2}}>Lorem ipsum dole more</Text>
				<Text style={{color: themeSchema.color.fontColor, fontSize: themeSchema.fontSize.normal}}>Lorem ipsum dole more</Text>
				<Divider/>
				<ButtonRN title='SUBMIT' color={'pink'} disabled={true} buttonStyle={{width: 150}} borderRadius={30} underlayColor={'#fff'} backgroundColor={"blue"} raised onPress={() => false}/>
				<Divider/>
				<ButtonRN title='HAHA' raised onPress={() => false}/>
				<Divider/>
				<Button title='TAP ME' onPress={() => false}/>
				<Divider/>
				<Button title='DISABLED' disabled={true} onPress={() => false}/>
				<Divider/>
				<AppList list={list}/>
			</ScrollView>
		)
	}
}
