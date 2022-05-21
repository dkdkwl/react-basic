import { takeLatest, all, put, fork, call } from 'redux-saga/effects';
import { fetchFlickr, fetchYoutube, fetchMembers } from './api';

//Flickr 데이터 요청 및 액션객체 반환
export function* returnFlickr(action) {
	try {
		const response = yield call(fetchFlickr, action.opt);
		yield put({ type: 'FLICKR_SUCCESS', payload: response.data.photos.photo });
	} catch (err) {
		yield put({ type: 'FLICKR_ERROR', payload: err });
	}
}
export function* callFlickr() {
	yield takeLatest('FLICKR_START', returnFlickr);
}

//youtube 데이터 요청 및 액션객체 반환
export function* returnYoutube() {
	try {
		const response = yield call(fetchYoutube);
		yield put({ type: 'YOUTUBE_SUCCESS', payload: response.data.items });
	} catch (err) {
		yield put({ type: 'YOUTUBE_ERROR', payload: err });
	}
}
export function* callYoutube() {
	yield takeLatest('YOUTUBE_START', returnYoutube);
}

//members 데이터 요청 및 액션객체 반환
export function* returnMembers() {
	try {
		const response = yield call(fetchMembers);
		yield put({ type: 'MEMBERS_SUCCESS', payload: response.data.data });
	} catch (err) {
		yield put({ type: 'MEMBERS_ERROR', payload: err });
	}
}
export function* callMembers() {
	yield takeLatest('MEMBERS_START', returnMembers);
}

export default function* rootSaga() {
	console.log('rootSaga');
	yield all([fork(callFlickr), fork(callYoutube), fork(callMembers)]);
}
