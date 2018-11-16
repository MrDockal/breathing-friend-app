import * as React from 'react';
import { Button as RNButton } from 'react-native-elements';
import { themeSchema } from '../Core/ThemeSchema/themeSchema';

export interface ButtonProps {
	title: string;
	onPress: () => void;
	disabled?: boolean;
}

export class Button extends React.Component<ButtonProps> {
	public render() {
		return (
			<RNButton 
				{...this.props}
				title={this.props.title.toUpperCase()}
				buttonStyle={{borderRadius: 20, width: 200, backgroundColor: themeSchema.color.buttonBackground}}
				disabledTextStyle={{color: themeSchema.color.buttonBackground}}
			/>
		)
	}
}