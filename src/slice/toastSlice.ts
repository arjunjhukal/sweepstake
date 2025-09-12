import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum ToastVariant {
	SUCCESS = "SUCCESS",
	ERROR = "ERROR",
	INFO = "INFO",
	WARNING = "WARNING",
}

export interface ToastProps {
	variant: ToastVariant | null;
	message: string;
	isActive: boolean;
	autoTimeout?: boolean;
	duration?: number;
}

const initialState: ToastProps = {
	variant: null,
	message: "",
	isActive: false,
	autoTimeout: false,
	duration: 0,
};

const ToastSlice = createSlice({
	name: "toast",
	initialState,
	reducers: {
		showToast: (
			state,
			action: PayloadAction<{
				variant: ToastVariant;
				message: string;
				autoTime?: boolean;
				duration?: number;
			}>,
		) => {
			const {
				variant,
				message,
				autoTime = false,
				duration = 3000,
			} = action.payload;

			state.variant = variant;
			state.message = message;
			state.isActive = true;
			state.autoTimeout = autoTime;
			state.duration = duration;
		},
		closeToast: (state) => {
			state.isActive = false;
			state.message = "";
			state.variant = null;
			state.autoTimeout = false;
			state.duration = 0;
		},
	},
});

export const { showToast, closeToast } = ToastSlice.actions;
export default ToastSlice.reducer;
