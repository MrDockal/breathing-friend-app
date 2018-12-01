import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { DeviceConnectionInfoBar } from '../DeviceConnectionInfoBar';
import { BackgroundGradient, ColorTheme } from '../../Components/BackgroundGradient/BackgroundGradient';
import { DeviceTile } from '../../Components/DeviceTile/DeviceTile';
import { Device } from '../../Core/Entities/Device';
import { connect } from 'react-redux';
import { State } from '../../Store/configureStore';
import { themeSchema } from '../../Core/ThemeSchema/themeSchema';
import { TextNormal } from '../../Components/Text/TextNormal';
import { BreathingStatInterval, DeviceStat } from '../../Store/Reducers/statsReducer';
import { StatsListItem } from '../../Components/StatsListItem/StatsListItem';
import { Hr } from '../../Components/Hr/Hr';
import { BreathingMode } from '../../Core/Entities/BreathingMode';
import { getBreathingModeByStateAndUid } from '../../Core/Helpers/getBreathingTheme';
import { ActivityIndicator } from '../../Components/ActivityIndicator/ActivityIndicator';
import { i18n } from '../../Core/i18n/i18n';
import { Title } from '../../Components/Text/Title';
import { TextSmall } from '../../Components/Text/TextSmall';

const styles = StyleSheet.create({
	wrapper: {
		flexGrow: 1,
		flexDirection: 'column',
		justifyContent: 'space-around',
		alignItems: 'stretch',
		paddingHorizontal: 30,
	},
	deviceTitle: {
		paddingTop: 20,
	},
	textRight: {
		alignItems: 'flex-end',
	},
	overview: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'flex-end',
		paddingVertical: 5,
	},
	blue: {
		color: themeSchema.button.blue.fontColor
	},
	tableHeader: {
		paddingBottom: 10,
	}
});

interface StateProps {
	device: Device;
	stats?: DeviceStat;
	breathingMode: BreathingMode[];
	updatedAt: Date;
}

interface NumberOfTimes {
	[id: string]: number;
}

export class StatsScreenHOC extends React.Component<StateProps> {
	public render() {
		const hasData = this.props.stats;
		const theme = 'black';
		const loaded = this.props.breathingMode && this.props.updatedAt;
		const updatedAt = new Date(this.props.updatedAt);
		return (
			<BackgroundGradient theme={theme}>
				<ScrollView contentContainerStyle={styles.wrapper}>
					{
						loaded ?
							<React.Fragment>
								<View>
									<View style={styles.textRight}>
										<TextSmall>{i18n.t('updated_at')}</TextSmall>
										<TextSmall>{updatedAt.toLocaleDateString(i18n.locale)}</TextSmall>
									</View>
									<View style={styles.deviceTitle}>
										<DeviceTile name={this.props.device.name} />
									</View>
								</View>
								{
									!hasData ?
										this.renderEmpty() :
										this.renderWithData(theme)
								}
							</React.Fragment> :
							<ActivityIndicator />
					}
				</ScrollView>
				<DeviceConnectionInfoBar />
			</BackgroundGradient>
		)
	}

	private renderEmpty() {
		return (
			<TextNormal>{i18n.t('no_stats')}</TextNormal>
		);
	}

	private renderWithData(theme: ColorTheme) {
		const data = this.loadData();
		const getThemeByUid = getBreathingModeByStateAndUid(this.props.device.breathingModes);
		const totalMinutes = data.totalTime;
		const hours = Math.floor(totalMinutes / 60);
		const minutes = totalMinutes - hours * 60;
		const totalMinutesText = i18n.t('minutes', {count: minutes});
		const totalHoursText = i18n.t('hours', {count: hours});
		return (
			<React.Fragment>
				<View>
					<View style={styles.overview}>
						{
							hours > 0 &&
							<React.Fragment>
								<Title style={styles.blue}>{hours.toLocaleString()}</Title>
								<TextNormal style={styles.blue}> {totalHoursText} </TextNormal>
							</React.Fragment>
						}
						<Title style={styles.blue}>{minutes.toLocaleString()}</Title>
						<TextNormal style={styles.blue}> {totalMinutesText}</TextNormal>
					</View>
					<TextNormal bold={true}>{i18n.t('total_breathing')}</TextNormal>
				</View>
				<View>
					<TextNormal bold={true} style={styles.tableHeader}>{i18n.t('this_month')}</TextNormal>
					{
						Object.keys(data.weekly).map((breathingId: string, index: number) => (
							<React.Fragment key={index}>
								<StatsListItem
									theme={getThemeByUid(breathingId)}
									rightText={data.weekly[breathingId].toString() + 'x'}
									title={i18n.t(this.getModeNameByUid(breathingId))}
								/>
								<Hr theme={'black'} />
							</React.Fragment>
						))
					}
				</View>
			</React.Fragment>
		);
	}

	private getModeNameByUid(modeUid: string) {
		const found = this.props.breathingMode.find((mode: BreathingMode) => modeUid === mode.uid)
		if (!found) {
			return i18n.t('unknown');
		} else {
			return found.name;
		}
	}

	private loadData() {
		if (!this.props.stats) {
			throw new Error('Could not load stat data');
		}
		const totalTimeInMinues = this.getTotalTime(this.props.stats.stats);
		const weeklyStats = this.getWeeklyStats(this.props.stats.stats);
		return {
			totalTime: totalTimeInMinues,
			weekly: weeklyStats,
		}
	}

	private getTotalTime(flattern: BreathingStatInterval[]) {
		return flattern.reduce((cumullated: number, next: BreathingStatInterval) => {
			return cumullated + Math.floor(Math.abs((next.to - next.since) / 1E3 / 60));
		}, 0);
	}

	private getWeeklyStats(flattern: BreathingStatInterval[]): NumberOfTimes {
		const lastWeek = new Date();
		lastWeek.setDate(lastWeek.getDate() - 300);
		const thisWeek = flattern.filter((flat: BreathingStatInterval) => flat.to > lastWeek.valueOf());
		return thisWeek.reduce((cummulated: NumberOfTimes, next: BreathingStatInterval) => {
			const countTimes = (next.breathingUid in cummulated) ? cummulated[next.breathingUid] : 0;
			return {
				...cummulated,
				[next.breathingUid]: countTimes + 1,
			}
		}, {});
	}
}

export const StatsScreen = connect<StateProps>(
	(state: State) => ({
		device: state.device.devices[state.device.activeDeviceIndex],
		stats: state.stats.stats.find((stat: DeviceStat) => stat.deviceUid === state.device.devices[state.device.activeDeviceIndex].uid),
		updatedAt: state.stats.updatedAt,
		breathingMode: state.breathing.modes,
	})
)(StatsScreenHOC);
