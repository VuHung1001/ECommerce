import {createSlice} from '@reduxjs/toolkit'

export class Notify {
	notifyMess = '';
	notifyType = '';
	notifyTitle = '';

	constructor(mess, type, title) {
		this.notifyMess = mess ?? this.notifyMess;
		this.notifyType = type ?? this.notifyType;
		this.notifyTitle = title ?? this.notifyTitle;
	}
}

const notifyRedux = createSlice({
    name:'notify',
    initialState: {
		notifies: [],
		notifyStatus: false,
		notifyDuration: 10000
    },
    reducers: {
        setNotify: (state, action) => {
			const {notifies, status, duration} = action.payload;
			state.notifies = notifies ?? state.notifies;
			state.notifyStatus = status ?? state.notifyStatus;
			state.notifyDuration = duration ?? state.notifyDuration;

			if (state.notifyStatus) {
				setTimeout(() => {
					state.notifies = [];
					state.notifyStatus = false;
					state.notifyDuration = 10000;
				}, state.notifyDuration);
			}
		},
		resetNotify: (state) => {
			state.notifies = [];
			state.notifyStatus = false;
			state.notifyDuration = 10000;
		}
    }
})

export const {setNotify, resetNotify} = notifyRedux.actions
export default notifyRedux.reducer;