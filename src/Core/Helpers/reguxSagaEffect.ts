
import { call, spawn, take } from 'redux-saga/effects';
import { Pattern } from 'redux-saga';
import { Action } from 'redux';

export function* takeFirst<A extends Action>(pattern: Pattern, saga: (action: A) => void) {
	const task = yield spawn(function* () {
		while (true) {
			const action = yield take(pattern);
			yield call(saga, action);
		}
	});
	return task;
}
