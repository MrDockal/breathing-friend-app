import { NewNotificationObtained } from "../Actions/notificationActions";

export interface BreathingStatInterval {
	since: number;
	to: number;
}

export interface BreathingStat {
	[breahingId: string]: BreathingStatInterval[];
}

export interface StatsState {
	stats: BreathingStat;
}

export const statsInitialState: StatsState = {
	stats: {},
}

type Action =
	NewNotificationObtained
	;

export const statsReducer = (state: StatsState = statsInitialState, action: Action): StatsState => {
	switch (action.type) {
		case NewNotificationObtained:
			const prevStats = !(action.data.breathingUid in state.stats) ? [] : state.stats[action.data.breathingUid];
			return {
				...state,
				stats: {
					...state.stats,
					[action.data.breathingUid]: [
						...prevStats,
						{
							since: action.data.since,
							to: action.data.to
						}
					]
				}
			}
		default:
			return state;
	}
}
