// src/slice/uiSlice.ts
import { createSlice } from "@reduxjs/toolkit";

interface authModalSlice {
    authModalOpen: boolean;
}

const initialState: authModalSlice = {
    authModalOpen: false,
};

const authModalSlice = createSlice({
    name: "authModalSlice",
    initialState,
    reducers: {
        openAuthModal(state) {
            state.authModalOpen = true;
        },
        closeAuthModal(state) {
            state.authModalOpen = false;
        },
    },
});

export const { openAuthModal, closeAuthModal } = authModalSlice.actions;
export default authModalSlice.reducer;
