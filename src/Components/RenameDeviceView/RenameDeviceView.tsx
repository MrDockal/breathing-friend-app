import * as React from 'react';
import { ScrollView, StyleSheet, View, TextInput } from 'react-native';
import { BackgroundGradient } from '../BackgroundGradient/BackgroundGradient';
import { themeSchema } from '../../Core/ThemeSchema/themeSchema';
import { Button } from '../Button/Button';
import { HeaderlessView } from '../HeaderlessView/HeaderlessView';

const renameDeviceScreenStyles = StyleSheet.create({
	wrapper: {
		flex: 1,
		justifyContent: 'space-between',
		alignItems: 'center',
		textAlign: 'center',
		padding: 40,
	},
	input: {
		borderBottomWidth: 1,
		borderBottomColor: themeSchema.color.green,
		color: themeSchema.color.green,
		width: '90%',
		fontSize: themeSchema.fontSize.normal,
		textAlign: 'center'
	}
});

export interface RenameDeviceViewProps {
	submit: (name: string) => void;
	name: string;
}

interface ComponentState {
	name: string;
}

export class RenameDeviceView extends React.Component<RenameDeviceViewProps, ComponentState> {

	public constructor(props: RenameDeviceViewProps) {
		super(props);
		this.state = {
			name: this.props.name
		}
	}

	public render() {
		return (
			<BackgroundGradient theme={'black'}>
				<HeaderlessView contentContainerStyle={renameDeviceScreenStyles.wrapper}>
					<View />
					<TextInput
						style={renameDeviceScreenStyles.input}
						onChangeText={this.onNameChange}
						value={this.state.name}
					/>
					<Button theme={'black'} title={'Pokračovat'} onPress={() => this.props.submit(this.state.name)} />
				</HeaderlessView>
			</BackgroundGradient>
		);
	}

	private onNameChange = (text: string) => {
		this.setState({
			name: text,
		});
	}
}
