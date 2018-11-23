import * as React from 'react';
import { Slider as SliderRN, StyleSheet, View } from 'react-native';
import { TextSmall } from '../Text/TextSmall';

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'center',
	},
	labels: {
		width: 300,
		justifyContent: 'space-between',
		flexDirection: 'row',
		marginBottom: 20,
	},
	label: {
		opacity: 0,
	},
	labelVisible: {
		opacity: 1,
	},
	slider: {
		width: 157,
		transform: [
			{
				scaleX: 2,
			},
			{
				scaleY: 2
			}
		]
	},
});

export interface SliderProps {
	defaultSliderValue: number;
	onChange: (sliderValue: number) => void;
}

interface State {
	sliderValue: number;
}

export class Slider extends React.Component<SliderProps, State> {

	public constructor(props: SliderProps) {
		super(props);
		this.state = {
			sliderValue: this.props.defaultSliderValue,
		}
	}

	public render() {
		const labels = ['Pomalu', 'Středně', 'Rychle'];
		return (
			<View style={styles.wrapper}>
				<View style={styles.labels}>
					{labels.map((label: string, index: number) => (
						<TextSmall key={index} style={[styles.label, (index === this.state.sliderValue) && styles.labelVisible]}>{label}</TextSmall>
					))}
				</View>
				<View>
					<SliderRN
						thumbTintColor={'white'}
						minimumTrackTintColor={'transparent'}
						style={styles.slider}
						minimumValue={0}
						maximumValue={2}
						step={1}
						value={this.state.sliderValue}
						onValueChange={(sliderValue: number) => this.setState({sliderValue})}
						onSlidingComplete={() => this.props.onChange(this.state.sliderValue)}
					/>
				</View>
			</View>
		);
	}
}