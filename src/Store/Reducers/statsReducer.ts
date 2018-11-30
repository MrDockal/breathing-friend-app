import { NewNotificationObtained } from "../Actions/notificationActions";

export interface BreathingStatInterval {
	since: number;
	to: number;
	breathingUid: string;
}

export interface DeviceStat {
	deviceUid: string;
	stats: BreathingStatInterval[]
}

export interface StatsState {
	stats: DeviceStat[]
}

const initialState = {
	stats: [],
}

type Action =
	NewNotificationObtained
	;

export const statsReducer = (state: StatsState = initialState, action: Action): StatsState => {
	switch (action.type) {
		case NewNotificationObtained:
			const foundIndex = state.stats.findIndex((stat: DeviceStat) => stat.deviceUid === action.peripheralId);
			if (foundIndex === -1) {
				const deviceStat = {
					deviceUid: action.peripheralId,
					stats: [
						{
							...action.data
						}
					],
				};
				return {
					...state,
					stats: [
						...state.stats,
						deviceStat,
					]
				}
			} else {
				const statsWithoutUpdate = [
					...state.stats.slice(0, foundIndex),
					...state.stats.slice(foundIndex + 1)
				];
				const updatedStat = {
					...state.stats[foundIndex],
					stats: [
						...state.stats[foundIndex].stats,
						{
							...action.data,
						}
					],
				};
				return {
					...state,
					stats: [
						...statsWithoutUpdate,
						updatedStat,
					]
				}
			}
		default:
			return state;
	}
}
