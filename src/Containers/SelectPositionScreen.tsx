import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { ColoredSelectBox } from '../Components/ColoredSelectBox/ColoredSelectBox';
import { NavigationInjectedProps } from 'react-navigation';
import { TextNormal } from '../Components/Text/TextNormal';
import { BackgroundGradient, ColorTheme } from '../Components/BackgroundGradient';
import { BreathingMode } from '../Core/Entities/BreathingMode';
import { H2 } from '../Components/Text/H2';
import { Button } from '../Components/Button';

interface NavigationParams {
	mode: BreathingMode;
}

export type SelectPositionScreenProps = NavigationInjectedProps<NavigationParams>;

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
		justifyContent: 'space-between',
		alignItems: 'center',
		textAlign: 'center',
		paddingTop: 100,
		paddingBottom: 40,
		paddingHorizontal: 30,
	},
	fullWidht: {
		width: '100%'
	}
});

interface BreathingOption {
	index: string;
	selected: boolean;
	theme: ColorTheme;
	title: string;
}

export interface State {
	options: BreathingOption[];
	theme: ColorTheme;
}

export class SelectPositionScreen extends React.Component<SelectPositionScreenProps, State> {

	public constructor(props: SelectPositionScreenProps) {
		super(props);
		this.state = {
			theme: 'black',
			options: [{
				index: '1',
				selected: false,
				theme: 'red',
				title: 'ježek'
			}, {
				index: '2',
				selected: false,
				theme: 'orange',
				title: 'sova'
			}, {
				index: '3',
				selected: false,
				theme: 'blue',
				title: 'mezek'
			}]
		}
	}

	static navigationOptions = ({ navigation }: SelectPositionScreenProps) => ({
		headerTitle: <TextNormal>Výběr pozice</TextNormal>,
		headerTransparent: true,
		headerTintColor: 'white',
	});

	public render() {
		return (
			<BackgroundGradient theme={this.state.theme}>
				<View style={styles.wrapper}>
					<View>
						<H2 bold={true}>"Chvilka pro tebe"</H2>
						<TextNormal>Nahradí vybranou pozici v zařízení</TextNormal>
					</View>
					<View style={styles.fullWidht}>
						{
							this.state.options.map((option: BreathingOption, index: number) => (
								<ColoredSelectBox
									key={index}
									optionId={option.index}
									selected={option.selected}
									theme={option.theme}
									title={option.title}
									onPress={() => {
										this.selectOption(option.index);
										this.changeTheme(option.theme)
									}}
								/>
							))
						}
					</View>
					<Button theme={this.state.theme} title={'Uložit'} onPress={() => false} />
				</View>
			</BackgroundGradient>
		);
	}

	private changeTheme(theme: ColorTheme) {
		this.setState((prevState: State) => {
			return {
				theme
			}
		})
	}

	private selectOption(index: string) {
		this.setState((prevState: State) => {
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
				options: updatedOptions
			}
		});
	}
}
