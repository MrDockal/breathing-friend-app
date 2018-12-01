import * as React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { BackgroundGradient } from '../BackgroundGradient/BackgroundGradient';
import { themeSchema } from '../../Core/ThemeSchema/themeSchema';
import { Button } from '../Button/Button';
import { HeaderlessView } from '../HeaderlessView/HeaderlessView';
import { i18n } from '../../Core/i18n/i18n';
import { TextSmall } from '../Text/TextSmall';

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
		justifyContent: 'space-between',
		alignItems: 'center',
		textAlign: 'center',
		paddingBottom: 40,
	},
	input: {
		borderBottomWidth: 1,
		borderBottomColor: themeSchema.color.green,
		color: themeSchema.color.green,
		width: '90%',
		fontSize: themeSchema.fontSize.normal,
		textAlign: 'center',
		paddingTop: 20,
	},
	renameInputWrapper: {
		width: '100%',
		flex: 1,
		alignItems: 'center',
		justifyContent: 'flex-end',
	},
	buttonWrapper: {
		flex: 1,
		justifyContent: 'flex-end',
	},
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
				<HeaderlessView>
					<View style={styles.wrapper}>
						<View style={styles.renameInputWrapper}>
							<TextSmall>{i18n.t('bf_rename_text')}</TextSmall>
							<TextInput
								style={styles.input}
								onChangeText={this.onNameChange}
								value={this.state.name}
							/>
						</View>
						<View style={styles.buttonWrapper}>
							<Button theme={'black'} title={i18n.t('continue')} onPress={() => this.props.submit(this.state.name)} />
						</View>
					</View>
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
