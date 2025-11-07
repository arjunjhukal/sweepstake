import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UpdatePasswordState {
    open: boolean;
    provider?: string;
    hasChangedPassword: boolean;
}

const initialState: UpdatePasswordState = {
    open: false,
    provider: undefined,
    hasChangedPassword: false,
};

const updatePasswordSlice = createSlice({
    name: "updatePassword",
    initialState,
    reducers: {
        openPasswordDialog: (state, action: PayloadAction<{ provider: string; hasChangedPassword?: boolean }>) => {
            state.open = true;
            state.provider = action.payload.provider;
            state.hasChangedPassword = action.payload.hasChangedPassword ?? true;
        },
        closeDialog: (state) => {
            state.open = false;
            state.provider = undefined;
            state.hasChangedPassword = false;
        },
    },
});

export const { openPasswordDialog, closeDialog } = updatePasswordSlice.actions;
export default updatePasswordSlice.reducer;
