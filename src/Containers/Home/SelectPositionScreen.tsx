import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { ColoredSelectBox } from '../../Components/ColoredSelectBox/ColoredSelectBox';
import { NavigationInjectedProps } from 'react-navigation';
import { TextNormal } from '../../Components/Text/TextNormal';
import { BackgroundGradient, ColorTheme } from '../../Components/BackgroundGradient/BackgroundGradient';
import { DeviceSavedBreathingMode, BreathingMode } from '../../Core/Entities/BreathingMode';
import { H2 } from '../../Components/Text/H2';
import { Button } from '../../Components/Button/Button';
import { connect } from 'react-redux';
import { State } from '../../Store/configureStore';
import { getActiveBreathingModes, ActiveBreathingModes } from '../../Core/Helpers/getBreathingModesStatus';
import { getBreathingThemeByIndex } from '../../Core/Helpers/getBreathingTheme';
import { HeaderlessView } from '../../Components/HeaderlessView/HeaderlessView';
import { i18n } from '../../Core/i18n/i18n';
import { Dispatch } from 'redux';
import { DeviceBreathingModeUpdateAction } from '../../Store/Actions/Device/deviceBreathingModesActions';
import { findBreathingModeDefinitionByUidAndSpeed } from '../../Core/Helpers/findBreathingModeDefinitionByUidAndSpeed';

interface NavigationParams {
	mode: DeviceSavedBreathingMode;
}

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
		justifyContent: 'space-between',
		alignItems: 'center',
		textAlign: 'center',
		paddingBottom: 40,
		paddingHorizontal: 30,
	},
	fullWidht: {
		width: '100%'
	}
});

interface BreathingOption {
	index: number;
	selected: boolean;
	theme: ColorTheme;
	title: string;
}

export interface ComponentState {
	options: BreathingOption[];
	theme: ColorTheme;
	index: number;
}

interface StateProps {
	savedModes: DeviceSavedBreathingMode[];
	breathingModes: BreathingMode[];
}

interface DispatchProps {
	replaceBreahing: (mode: DeviceSavedBreathingMode, position: number) => void;
}

export type SelectPositionScreenProps = NavigationInjectedProps<NavigationParams> & StateProps & DispatchProps;

class SelectPositionScreenHOC extends React.Component<SelectPositionScreenProps, ComponentState> {

	public constructor(props: SelectPositionScreenProps) {
		super(props);
		const options = this.prepareOptionValues();
		this.state = {
			theme: 'black',
			options,
			index: -1,
		}
	}

	static navigationOptions = ({ navigation }: SelectPositionScreenProps) => ({
		headerTitle: <TextNormal>{i18n.t('select_position')}</TextNormal>,
		headerTransparent: true,
		headerTintColor: 'white',
	});

	public render() {
		const mode = this.props.breathingModes.find((mode: BreathingMode) => mode.uid === this.props.navigation.state.params!.mode.uid);
		return (
			<BackgroundGradient theme={this.state.theme}>
				<HeaderlessView contentContainerStyle={styles.wrapper}>
					<View>
						<H2 bold={true}>{i18n.t(mode!.name)}</H2>
						<TextNormal>{i18n.t('will_replace')}</TextNormal>
					</View>
					<View style={styles.fullWidht}>
						{
							this.state.options.map((option: BreathingOption, index: number) => (
								<ColoredSelectBox
									key={index}
									optionId={option.index}
									selected={option.selected}
									theme={option.theme}
									title={i18n.t(option.title)}
									onPress={() => {
										this.selectOption(option.index);
										this.changeTheme(option.theme)
									}}
								/>
							))
						}
					</View>
					<Button theme={this.state.theme} title={i18n.t('save')} onPress={this.submit} disabled={(this.state.index === -1)} />
				</HeaderlessView>
			</BackgroundGradient>
		);
	}

	private submit = () => {
		if (this.state.index === -1) {
			return;
		}
		console.log('s', this.state.index);
		this.props.replaceBreahing(this.props.navigation.state.params!.mode, this.state.index - 1);
	}

	private changeTheme(theme: ColorTheme) {
		this.setState((prevState: ComponentState) => {
			return {
				theme
			}
		})
	}

	private selectOption(index: number) {
		this.setState((prevState: ComponentState) => {
			const updatedOptions = prevState.options.map((option: BreathingOption) => {
				if (option.index === index) {
					return {
						...option,
						selected: true,
					}
				} else {
					return {
						...option,
						selected: false,
					}
				}
			});
			return {
				options: updatedOptions,
				index,
			}
		});
	}

	private prepareOptionValues () {
		const options = getActiveBreathingModes(this.props.savedModes, this.props.breathingModes);
		return options.map((activeModes: ActiveBreathingModes, index: number) => ({
			index: index + 1,
			selected: false,
			theme: getBreathingThemeByIndex(index),
			title: activeModes.name
		}));
	}
}

export const SelectPositionScreen = connect<StateProps>(
	(state: State): StateProps => {
		return {
			savedModes: state.device.devices[state.device.activeDeviceIndex].breathingModes,
			breathingModes: state.breathing.modes
		}
	},
	(dispatch: Dispatch) => {
		return {
			replaceBreahing: (mode: DeviceSavedBreathingMode, position: number) => {
				dispatch(DeviceBreathingModeUpdateAction(mode, position));
			}
		}
	}
)(SelectPositionScreenHOC);
