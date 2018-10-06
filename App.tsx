import React from 'react';
import { TabNavigation } from './src/Components/TabNavigation';
import { DrawerNavigation } from './src/Components/DrawerNavigation';
import { Drawer } from './src/Components/Drawer';

export default class App extends React.Component {
	public render() {
		return (
			<Drawer/>
			// <React.Fragment>
			// 	<DrawerNavigation/>
			// 	<TabNavigation/>
			// </React.Fragment>
			// <View style={styles.container}>
			// 	<Text style={styles.welcome}>
			// 		Weolcome to React Native!
			// 	</Text>
			// 	<Text style={styles.instructions}>To get started, edit App.js</Text>
        	// 	<Text style={styles.instructions}>{instructions}</Text>
			// 	<Hello name='docky' enthusiasmLevel={1}/>
			// 	{BottomNavigation()}
			// </View>
		);
	}
}
